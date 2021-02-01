import puppeteer, { Browser, Page } from "puppeteer";
import cheerio from "cheerio";

export const BROWSER_CONFIG: puppeteer.LaunchOptions = {
  args: ["--lang=en"],
};

export const startBrowser = async (): Promise<Browser> => {
  const browser = await puppeteer.launch({
    args: ["--lang=en"],
  });

  return browser;
};

export const createMainInstance = async (browser: puppeteer.Browser): Promise<Page> => {
  const instance = await browser.newPage();
  return instance;
};

export const goToAndGetHTML = async (url: string, page: Page): Promise<cheerio.Root> => {
  await page.goto(url);
  const content = await page.content();
  return cheerio.load(content);
};
