import puppeteer from "puppeteer";
import cheerio from "cheerio";

export const BROWSER_CONFIG: puppeteer.LaunchOptions = {
  args: ["--lang=en"],
};

export const startBrowser = async (): Promise<{ browser: puppeteer.Browser; page: puppeteer.Page }> => {
  const browser = await puppeteer.launch({
    args: ["--lang=en"],
  });
  const page = await browser.newPage();

  return { browser, page };
};

export const goToAndGetHTML = async (url: string, page: puppeteer.Page): Promise<cheerio.Root> => {
  await page.goto(url);
  const content = await page.content();
  return cheerio.load(content);
};
