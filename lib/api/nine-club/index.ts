import $ from "cheerio";
import fetchPage from "../../shared/fetch-page";
import { filterBySkater, filterTopScores } from "./filters";

const PAGE_URL = "https://streetleague.com/the-9-club/";

interface INineCluber {
  skater: string;
  trick: string;
  videoUrl: string;
}

export interface INineClubResponse {
  [key: string]: INineCluber[];
}

export interface INineClubQuery {
  limit?: number;
  skater?: string;
}

const parsePage = (html: string): INineClubResponse => {
  const result: INineClubResponse = {};

  const highestScore = $(".page-body >.nine_club_header", html).text().trim();

  $(".page-body #accordion .clubHead", html).map((_, partial: any) => {
    const score = $(partial).prevAll(".nine_club_header").slice(0, 1).text().trim() || highestScore;

    const skater = $(partial).children("h4").text();
    const trick = $(partial).children(".trick").text();
    const videoId = $(partial).next(".accordion-content").children(".uid").text();
    const videoUrl = `https://www.youtube.com/${videoId}`;

    result[score] = result[score] || [];
    result[score].push({
      skater,
      trick,
      videoUrl,
    });
  });

  return result;
};

export async function get(query: INineClubQuery = {}): Promise<INineClubResponse> {
  const html = await fetchPage(PAGE_URL);
  let json = parsePage(html);

  if (query.skater) {
    json = filterBySkater(json, query.skater);
  }

  if (query.limit > 0) {
    json = filterTopScores(json, query.limit);
  }

  return json;
}
