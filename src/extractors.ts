import $ from "cheerio";
import { TStars } from "./types";

const title = (html: cheerio.Element): string => {
  return $(html).contents().find(".lister-item-header a").text().trim();
};
const getSearchPageProductionNumber = (html: any): number => {
  const data = $(html).contents().find("div.desc span").text().trim().slice(8, 14).split(",").join("");
  return parseInt(data);
};

const year = (html: cheerio.Element): string => {
  const data = $(html).contents().find("span.lister-item-year").text().trim();
  const removedBracket = data.slice(1, data.length - 1).trim();
  return removedBracket;
};
const director = (html: cheerio.Element): string => {
  const pData = $(html)
    .contents()
    .find("div.lister-item-content p")
    .filter((i, el) => {
      return $(el).attr("class") === "";
    })
    .text()
    .split("\n");

  return pData[1].trim() === "Director:" ? pData[2] : "No data";
};

const genres = (html: cheerio.Element): string[] => {
  return $(html).contents().find("span.genre").text().trim().split(",");
};
const plot = (html: cheerio.Element): string => {
  return $(html).contents().find("div.lister-item-content p.text-muted").last().text().trim();
};
const metascore = (html: cheerio.Element): number | string => {
  const data = $(html).contents().find("span.metascore").text().trim();
  return data === undefined ? "-" : data;
};

const raiting = (html: cheerio.Element): number | string => {
  const data = $(html).contents().find("div.inline-block.ratings-imdb-rating strong").text().trim();
  return data === "-" ? "-" : data;
};
const getSearchPageProductionPageLink = (html: cheerio.Element): string => {
  const link = $(html).find("div.lister-item-image.float-left a").attr("href");
  return link !== undefined ? `https://www.imdb.com${link}` : "Couldn't get a link";
};

const poster = (html: cheerio.Cheerio): string => {
  const poster = $(html).find("div.poster img").attr("src");
  return poster !== undefined ? poster : "Couldn't get poster";
};
const storylinePlot = (html: cheerio.Cheerio): string => {
  return $(html).find("div#titleStoryLine p span").text().trim();
};
const duration = (html: cheerio.Cheerio): string => {
  return $(html).find("time").first().text().trim();
};
const stars = (html: cheerio.Cheerio): TStars[] => {
  const stars: TStars[] = [];
  const elements = $(html).find("table.cast_list tbody").children();
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
  const text = $(html).find("div.subtext a").last().text().trim();
  if (text.includes("TV Series")) {
    return "series";
  } else if (text.includes("TV Mini-Series")) {
    return "mini-series";
  } else {
    return "movie";
  }
};

const getProductionPageReviewsLink = (html: cheerio.Cheerio): string | undefined => {
  const link = $(html).find("div.user-comments").find("a").last().attr("href");
  return link !== undefined ? `https://www.imdb.com${link}` : undefined;
};

const getProductionPageMediaviewerLink = (html: cheerio.Cheerio): string | undefined => {
  const link = $(html).find("div.poster").find("a").attr("href");
  return link !== undefined ? `https://www.imdb.com${link}` : undefined;
};

const reviewTitle = (html: cheerio.Cheerio): string => {
  return $(html).find("a.title").text().trim();
};
// const reviewsBoxes = (html: cheerio.Cheerio): cheerio.Cheerio => {
//   return $(html).find("div.lister-item.mode-detail.imdb-user-review.collapsable");
// };
const reviewRaiting = (html: cheerio.Cheerio): string => {
  return $(html).find("span.rating-other-user-rating span").first().text().trim();
};
const reviewDate = (html: cheerio.Cheerio): string => {
  return $(html).find("span.review-date").text().trim();
};
const reviewText = (html: cheerio.Cheerio): string => {
  return $(html).find("div.text").text().trim();
};

export const extractors = {
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

// export const productionPage = {
//   getReviewsLink: getProductionPageReviewsLink,
//   getMediaviewrLink: getProductionPageMediaviewerLink,
// };

// export const searchPage = {
//   getLink: getSearchPageProductionPageLink,
//   getProductionCount: getSearchPageProductionNumber,
// };
