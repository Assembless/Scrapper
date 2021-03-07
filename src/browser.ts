import puppeteer, { Browser, Page } from "puppeteer";
import cheerio from "cheerio";

const downloadChromium = async() => {
      const download = require('download-chromium');
    const os = require('os');
    const tmp = os.tmpdir();

    const exec = await download({
        revision: 722234,
        installPath: `${tmp}/.local-chromium`})

      return exec
    }


export const startBrowser = async (): Promise<Browser> => {

  const exec = await downloadChromium()

  const browser = await puppeteer.launch({
    args: ["--lang=en"],
    executablePath: exec,
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
