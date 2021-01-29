import fs from "fs";
import chalk from "chalk";
import puppeteer from "puppeteer";
import { setProductionNumber, setStartingIndex } from "./prompts";
import { goToAndGetHTML } from "./browser";
import { linkExtractor } from "./linkExtractors";

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
      const productionPageLink = linkExtractor.productionPage($(element));
      stack.push(productionPageLink);
    }
  }

  return stack
};


export const createTask = async (stack: string[],instance: puppeteer.Page) => {

}