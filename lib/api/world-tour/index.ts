import $ from 'cheerio';
import fetchPage from '../../helpers/fetch-page';

const PAGE_URL = 'http://streetleague.com/tickets';

interface WorldTourLocation {
  location: string
  venue: string
  date: string
}

interface IWorldTourResponse {
  year: number;
  locations: Array<WorldTourLocation>;
}

export async function list(): Promise<IWorldTourResponse> {
  const locations = []
  const html = await fetchPage(PAGE_URL);

  const year = +$('#content .container .page-title-heading', html).text().replace(/\D/g, '')

  $('#content #event-items li', html).map((_, event) => {
    const location = $(event).find('.event-title h4 a').text()
    const venue = $(event).find('.event-venue').text()
    const date = $(event).find('.event-date span').slice(0, 1).text()

    locations.push({
      location,
      venue,
      date
    })
  })

  return {
    year,
    locations
  }
}