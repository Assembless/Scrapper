import puppeteer from "puppeteer";
import cheerio from "cheerio";

export const BROWSER_CONFIG: puppeteer.LaunchOptions = {
  args: ["--lang=en"],
};

export const startBrowser = async (): Promise<puppeteer.Browser> => {
  const browser = await puppeteer.launch({
    args: ["--lang=en"],
  });

  return browser;
};

export const createMainInstance = async (browser:puppeteer.Browser) => {
  const instance = await browser.newPage()
  return instance
}
export const createScrapingInstance = async (startingUrl: string,browser:puppeteer.Browser,task: (page:puppeteer.Page)=> void) => {
  const page = await browser.newPage()

  task(page)

  return page
}


export const goToAndGetHTML = async (url: string, page: puppeteer.Page): Promise<cheerio.Root> => {
  await page.goto(url);
  const content = await page.content();
  return cheerio.load(content);
};
