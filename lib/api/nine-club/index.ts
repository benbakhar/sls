import $ from 'cheerio';
import fetchPage from '../../helpers/fetch-page';

const PAGE_URL = 'https://streetleague.com/the-9-club/';

interface INineCluber {
  name: string;
  trick: string;
  videoUrl: string;
}

interface INineClubResponse {
  [key: string]: Array<INineCluber>
}

export async function list(): Promise<INineClubResponse> {
  const result = {};

  const html = await fetchPage(PAGE_URL);

  const highestScore = $('.page-body >.nine_club_header', html).text().trim()

  $('.page-body #accordion .clubHead', html).map((_, skater: any) => {
    const score = $(skater).prevAll('.nine_club_header').slice(0, 1).text().trim() || highestScore
    const name = $(skater).children('h4').text()
    const trick = $(skater).children('.trick').text()
    const videoId = $(skater).next('.accordion-content').children('.uid').text();
    const videoUrl = `https://www.youtube.com/${videoId}`

    result[score] = result[score] || []
    result[score].push({
      name,
      trick,
      videoUrl
    })
  });

  return result;
}