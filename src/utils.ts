import fs from "fs";
import chalk from "chalk";
import puppeteer, { Browser,Page } from "puppeteer";
import { setProductionNumber, setStartingIndex } from "./prompts";
import { goToAndGetHTML } from "./browser";
import { miscExtractors } from "./miscExtractors";
import { TData, TExtractConfig, TMainConfig, TReview } from "./types";
import { contentExtractors } from "./contentExtractors";

export const extractUID = (string: string) => {
  const [a, b, c, d, e, f, g] = string.split("/");
  return e;
};

export const getFile = (filePath: fs.PathLike): object => {
  const rawConfig = fs.readFileSync(`${filePath}.json`, { encoding: "utf8" });
  const data = JSON.parse(rawConfig);
  console.log(chalk.yellowBright(`Data readed from ${filePath}`));
  return data;
};

export const saveFile = (filePath: fs.PathLike, data: any): void => {
  fs.writeFile(`${filePath}.json`, JSON.stringify(data, null, 4), (err) => {
    if (err) throw err;
    console.log(chalk.yellowBright(`Data written to ${filePath}`));
  });
};

export const getDirectoryFiles = (directoryPath: fs.PathLike) => {
  const files: string[] = [];
  fs.readdirSync(directoryPath).forEach((file) => {
    const name = file.split(".")[0];
    files.push(name);
  });
  return files;
};

export const createStack = async (maxProductions: number, mainInstance: puppeteer.Page) => {
  const { startingIndex } = await setStartingIndex(maxProductions);
  const { productionsNumber } = await setProductionNumber(startingIndex, maxProductions);

  const stack: string[] = [];

  for (let i = startingIndex; i < startingIndex + productionsNumber; i += 50) {
    const $ = await goToAndGetHTML(`https://www.imdb.com/search/title/?companies=co0144901&start=${startingIndex}&ref_=adv_prv`, mainInstance);

    const elements = $("div.lister-list div.lister-item.mode-advanced");

    const length = elements.length > productionsNumber ? productionsNumber : elements.length;

    for (let j = 0; j < length; j++) {
      const element = elements[j];
      const productionPageLink = miscExtractors.productionPage($(element));
      stack.push(productionPageLink);
    }
  }

  return stack
};

export const createTask = async (stack: string[], instance: puppeteer.Page, config: TExtractConfig, results: TData[]) => {
  const stackItem = stack[0];
  stack.splice(0, 1);

  const uid = extractUID(stackItem);

  console.log('Scraping:' + uid)

  let data: TData = { uid };

  let $ = await goToAndGetHTML(stackItem, instance);

  const HTML = $("div#pagecontent");

  const { mainConfig, reviewsConfig } = config;

  mainConfig.forEach((e) => {
    const result = contentExtractors[e](HTML);
    data = { ...data, [e]: result };
  });

  if (reviewsConfig.length > 0) {
    const link = miscExtractors.reviewsPage(HTML)!;
    $ = await goToAndGetHTML(link, instance);

    const MAX_REVIWS_NUMBER = 1;
    const reviewsHTML = $("div#pagecontent");
    const reviews = miscExtractors.reviews(reviewsHTML).slice(0,MAX_REVIWS_NUMBER);

    const reviewsData: TReview[] = [];

    
      reviews.each((j, e) => {
        let reviewData: TReview = {};
        reviewsConfig.forEach((el) => {
          const result = contentExtractors.review[el](e);
          reviewData = { ...reviewData, [el]: result };
        });
        reviewsData.push(reviewData);
      });
      data = { ...data, reviews: reviewsData };
    }

  results.push(data);
  console.log(data)
  if (stack.length === 0) {
    await instance.close();
    return;
  } else {
    createTask(stack, instance, config, results);
  }
};

export const createInstances = async (amount:number,browser: Browser)=> {
  const instances = new Array<Page>(amount)

  for(let i = 0;i < amount;i++){
    const newInstance = await browser.newPage()
    instances[i] = newInstance
  }

return instances

}

export const startInstances = async (instances: Page[], taskConfig: {stack:string[],config: TExtractConfig,data:TData[]}) => {
  instances.forEach((instance) => {
    const {stack,config,data} = taskConfig

    createTask(stack, instance, config, data);
  });
};