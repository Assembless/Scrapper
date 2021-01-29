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

export const linkExtractor = {
    reviewsPage,
    productionPage,
    mediavieverPage
}