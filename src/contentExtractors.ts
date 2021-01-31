import $ from "cheerio";
import { TStars } from "./types";

const title = (html: cheerio.Cheerio): string => {
  return html.find("h1").text().trim();
};

const year = (html: cheerio.Cheerio): string => {
  const data = html.find("div.subtext a").last().text().trim().split('(');
  const removedBracket = data[1].slice(0, data[1].length - 1).trim();
  return removedBracket
};
const director = (html: cheerio.Cheerio): string => {
  const data = html
    .contents()
    .find("div.credit_summary_item").first().children("a").text().trim()

  return data  ? data : "No data";
};

const genres = (html: cheerio.Cheerio): string[] => {
  const container = html.find("div.subtext a");
  const genresHref = container.slice(0,container.length - 1)
  const reviews:string[] = []
  genresHref.each((i,e)=>{
    const text = $(e).text().trim()
    reviews.push(text)
  })

  return reviews
};
const plot = (html: cheerio.Cheerio): string => {
  return html.find("div.summary_text").text().trim();
};
const metascore = (html: cheerio.Cheerio): number | string => {
  const data = html.find("div.metacriticScore.score_mixed.titleReviewBarSubItem span").text().trim();
  return data === undefined ? "-" : data;
};

const raiting = (html: cheerio.Cheerio): number | string => {
  const data = html.find("div.ratingValue strong span").text().trim();
  return data === "-" ? "-" : data;
};

const poster = (html: cheerio.Cheerio): string => {
  const poster = html.find("div.poster img").attr("src");
  return poster !== undefined ? poster : "Couldn't get poster";
};
const storylinePlot = (html: cheerio.Cheerio): string => {
  return html.find("div#titleStoryLine p span").text().trim();
};
const duration = (html: cheerio.Cheerio): string => {
  return html.find("time").first().text().trim();
};
const stars = (html: cheerio.Cheerio): TStars[] => {
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
  return stars;
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
  return $(element).find("a.title").text().trim();
};
const reviewRaiting = (element: cheerio.Element): string => {
  return $(element).find("span.rating-other-user-rating span").first().text().trim();
};
const reviewDate = (element: cheerio.Element): string => {
  return $(element).find("span.review-date").text().trim();
};
const reviewText = (element: cheerio.Element): string => {
  return $(element).find("div.text").text().trim();
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

