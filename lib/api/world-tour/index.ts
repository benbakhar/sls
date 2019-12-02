import $ from "cheerio";
import fetchPage from "../../shared/fetch-page";

const PAGE_URL = "http://streetleague.com/tickets";

interface IWorldTourLocation {
  location: string;
  venue: string;
  date: string;
}

interface IWorldTourResponse {
  year: number;
  locations: IWorldTourLocation[];
}

const parsePage = (html: string): IWorldTourResponse => {
  const locations: IWorldTourLocation[] = [];

  const year = +$("#content .container .page-title-heading", html).text().replace(/\D/g, "");

  $("#content #event-items li", html).map((_, eventItem) => {
    const location = $(eventItem).find(".event-title h4 a").text();
    const venue = $(eventItem).find(".event-venue").text();
    const date = $(eventItem).find(".event-date span").slice(0, 1).text();

    locations.push({
      date,
      location,
      venue,
    });
  });

  return {
    locations,
    year,
  };
};

export async function get(): Promise<IWorldTourResponse> {
  const html = await fetchPage(PAGE_URL);

  return parsePage(html);
}
