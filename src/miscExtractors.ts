import $ from 'cheerio'

const productionPage = (html: cheerio.Cheerio): string => {
  const link = html.find("div.lister-item-image.float-left a").attr("href");
  return link !== undefined ? `https://www.imdb.com${link}` : "Couldn't get a link";
};
const reviewsPage = (html: cheerio.Cheerio): string | undefined => {
  const link = html.find("div.user-comments").find("a").last().attr("href");
  return link !== undefined ? `https://www.imdb.com${link}` : undefined;
};
const mediavieverPage = (html: cheerio.Cheerio): string | undefined => {
  const link = html.find("div.poster").find("a").attr("href");
  return link !== undefined ? `https://www.imdb.com${link}` : undefined;
};

export const reviews = (html: cheerio.Cheerio): cheerio.Cheerio => {
  return html.find("div.lister-item.mode-detail.imdb-user-review.collapsable");
};

const productionCount = (html: cheerio.Cheerio): number => {
  const data = $(html).contents().find("div.desc span").text().trim().slice(8, 14).split(",").join("");
  return parseInt(data);
};

export const miscExtractors = {
  reviewsPage,
  productionPage,
  mediavieverPage,
  productionCount,
  reviews
};