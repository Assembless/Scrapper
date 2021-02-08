import $ from "cheerio";
import { TStars } from "./types";

const title = (html: cheerio.Cheerio): string => {
  const data = html.find("h1").text().trim()
  return data ? data : 'No data';
};

const year = (html: cheerio.Cheerio): string => {
  const splitted = html.find("div.subtext a").last().text().trim().split(' ');
  const numbersOnly = splitted.map((e) => e.replace(/[^\d–]+/g, ""));
  const filtered = numbersOnly.filter(e=> {
    return e.length === 4 || e.length === 5 || e.length === 9
  })
  return filtered[0] ? filtered[0] : 'No data'

};
const director = (html: cheerio.Cheerio): string => {
  const data = html
    .contents()
    .find("div.credit_summary_item").first().children("a").text().trim()

  return data  ? data : "No data";
};

const genres = (html: cheerio.Cheerio): string[] | string => {
  const container = html.find("div.subtext a");
  const genresHref = container.slice(0,container.length - 1)
  const genres:string[] = []
  genresHref.each((i,e)=>{
    const text = $(e).text().trim()
    genres.push(text)
  })

  return genres.length ? genres : 'No data'
};
const plot = (html: cheerio.Cheerio): string => {
  const data = html.find("div.summary_text").text().trim();
  return data ? data : 'No data'
};
const metascore = (html: cheerio.Cheerio): string => {
  const data = html.find("div.metacriticScore.score_mixed.titleReviewBarSubItem span").text().trim();
  return data ? data : 'No data';
};

const raiting = (html: cheerio.Cheerio): string => {
  const data = html.find("div.ratingValue strong span").text().trim();
  return data === "-" ? "No data" : data;
};

const poster = (html: cheerio.Cheerio): string => {
  const poster = html.find("div.poster img").attr("src");
  return poster ? poster : "No data";
};
const storylinePlot = (html: cheerio.Cheerio): string => {
  const data = html.find("div#titleStoryLine p span").text().trim();
  return data ? data : 'No data'
};
const duration = (html: cheerio.Cheerio): string => {
  const data = html.find("time").first().text().trim();
  return data ? data : 'No data'
};
const stars = (html: cheerio.Cheerio): TStars[] | string => {
  const stars: TStars[] = [];
  const elements = html.find("table.cast_list tbody").children();
  const filtered = elements.slice(1, elements.length).filter((i, e) => {
    return $(e).children().first().attr("colspan") !== "4";
  });

  filtered.slice(0, 10).each((i, el) => {
    const cells = $(el).children();
    const image = cells.first().find("img").attr("src");
    const actor = cells.first().next().find("a").text().trim();

    const character =
      cells.next().next().find("a").first().attr("class") === "toggle-episodes"
        ? cells.next().next().remove("a").first().next().text().split("\n")[1].trim()
        : cells.next().next().find("a").first().text().trim();
    const data = { image, actor, character };
    stars.push(data);
  });
  return stars.length ? stars : 'No data';
};

const type = (html: cheerio.Cheerio): string => {
  const text = html.find("div.subtext a").last().text().trim();
  if (text.includes("TV Series")) {
    return "series";
  } else if (text.includes("TV Mini-Series")) {
    return "mini-series";
  } else {
    return "movie";
  }
};

const reviewTitle = (element: cheerio.Element): string => {
  const data = $(element).find("a.title").text().trim();
  return data ? data : 'No data';
};
const reviewRaiting = (element: cheerio.Element): string => {
  const data = $(element).find("span.rating-other-user-rating span").first().text().trim();
  return data ? data : 'No data';
};
const reviewDate = (element: cheerio.Element): string => {
  const data = $(element).find("span.review-date").text().trim();
  return data ? data : 'No data';
};
const reviewText = (element: cheerio.Element): string => {
  const data = $(element).find("div.text").text().trim();
  return data ? data : 'No data';
};


export const contentExtractors = {
  title,
  year,
  raiting,
  genres,
  metascore,
  plot,
  director,
  poster,
  storylinePlot,
  duration,
  type,
  stars,
  review: {
    title: reviewTitle,
    raiting: reviewRaiting,
    date: reviewDate,
    text: reviewText,
  },
};

