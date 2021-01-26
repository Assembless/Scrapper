import $ from 'cheerio'

const searchPage = (html: cheerio.Cheerio): string => {
  const link = $(html).find("div.lister-item-image.float-left a").attr("href");
  return link !== undefined ? `https://www.imdb.com${link}` : "Couldn't get a link";
};
const productionPage = (html: cheerio.Cheerio): string | undefined => {
  const link = $(html).find("div.user-comments").find("a").last().attr("href");
  return link !== undefined ? `https://www.imdb.com${link}` : undefined;
};
const mediaviever = (html: cheerio.Cheerio): string | undefined => {
  const link = $(html).find("div.poster").find("a").attr("href");
  return link !== undefined ? `https://www.imdb.com${link}` : undefined;
};

export const linkExtractor = {
    searchPage,
    productionPage,
    mediaviever
}