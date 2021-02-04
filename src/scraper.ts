import { Browser, Page } from "puppeteer";
import { goToAndGetHTML } from "./browser";
import { contentExtractors } from "./contentExtractors";
import { miscExtractors } from "./miscExtractors";
import { TData, TExtractConfig, TReview } from "./types";
import { extractUID } from "./utils";
import { MAX_REVIEWS } from "./constants";
import { textGreen, textRed, textWhite, textYellow } from "./styles";

type TStatus = "disabled" | "active" | "waiting";

type TInstance = { name: string; page: Page; status: TStatus; logger: (task?: string) => void };

type TScraper = (
  browser: Browser,
  config: TExtractConfig,
  userInput: { startingIndex: number; productionsNumber: number; instanceAmount: number }
) => Promise<{
  startInstances: () => Promise<void>;
  createInstances: () => Promise<void>;
  createStack: (mainInstance: Page) => Promise<void>;
  watchStackFinish: () => Promise<void>;
  data: TData[];
}>;

export const scraper: TScraper = async (browser, config, userInput) => {
  const data: TData[] = [];
  const stack: string[] = [];
  let stackLength: number;
  const instances: TInstance[] = [];
  const { startingIndex, productionsNumber, instanceAmount } = userInput;

  const watchStackFinish = (): Promise<void> => {
    return new Promise((resolve) => {
      const interval = setInterval(() => {
        const test = instances.filter((e) => e.status === "active");
        if (stack.length === 0 && !test.length) {
          clearInterval(interval);
          resolve();
        }
      }, 1000);
    });
  };

  const createStack = async (mainInstance: Page) => {
    for (let i = startingIndex; i < startingIndex + productionsNumber; i += 50) {
      const $ = await goToAndGetHTML(`https://www.imdb.com/search/title/?companies=co0144901&start=${i}&ref_=adv_prv`, mainInstance);

      const elements = $("div.lister-list div.lister-item.mode-advanced");

      const length = elements.length > productionsNumber ? productionsNumber : elements.length;

      for (let j = 0; j < length; j++) {
        const element = elements[j];
        const productionPageLink = miscExtractors.productionPage($(element));
        stack.push(productionPageLink);
      }
    }
    stackLength = stack.length;
  };

  const createTask = async (instance: TInstance) => {
    if (stack.length <= 0) return;

    const page = instance.page;

    const stackItem = stack.shift()!;

    if (stackItem === "undefined") {
      instance.status = "waiting";
      instance.logger();
      createTask(instance);
      return;
    }

    const uid = extractUID(stackItem);

    instance.status = "active";
    instance.logger(`${uid} (${stackLength - stack.length} / ${stackLength})`);

    let productionData: TData = { uid };

    let $ = await goToAndGetHTML(stackItem, page);

    const HTML = $("div#pagecontent");

    const { mainConfig, reviewsConfig } = config;

    mainConfig.forEach((e) => {
      const result = contentExtractors[e](HTML);
      productionData = { ...productionData, [e]: result };
    });

    if (reviewsConfig.length > 0) {
      const link = miscExtractors.reviewsPage(HTML)!;

      if (link === undefined) {
        productionData = { ...productionData, reviews: [] };
      } else {
        $ = await goToAndGetHTML(link, page);

        const reviewsHTML = $("div#pagecontent");
        const reviews = miscExtractors.reviews(reviewsHTML).slice(0, MAX_REVIEWS);

        const reviewsData: TReview[] = [];

        reviews.each((j, e) => {
          let reviewData: TReview = {};
          reviewsConfig.forEach((el) => {
            const result = contentExtractors.review[el](e);
            reviewData = { ...reviewData, [el]: result };
          });
          reviewsData.push(reviewData);
        });
        productionData = { ...productionData, reviews: reviewsData };
      }
    }

    data.push(productionData);
    if (stack.length === 0) {
      instance.status = "disabled";
      instance.logger();
      await page.close();
      return;
    } else {
      instance.status = "waiting";
      instance.logger();
      createTask(instance);
    }
  };

  const createInstances = async () => {
    for (let i = 0; i < instanceAmount; i++) {
      const newPage = await browser.newPage();

      const newInstance: TInstance = {
        name: "Instance#" + i,
        page: newPage,
        status: "disabled",
        logger: (task?: string) => {
          const switchResult = () => {
            switch (newInstance.status) {
              case "active":
                return textGreen(newInstance.status);
              case "disabled":
                return textRed(newInstance.status);
              case "waiting":
                return textYellow(newInstance.status);
              default:
              case "disabled":
                return textRed(newInstance.status);
            }
          };
          const status = switchResult();
          console.log(textWhite(`${newInstance.name}   status: ${textRed(status)}   ${task ? `task: ${task}` : " "}`));
        },
      };
      instances[i] = newInstance;
      newInstance.logger();
    }
  };

  const startInstances = async () => {
    instances.forEach((instance) => {
      createTask(instance);
    });
  };

  return { startInstances, createInstances, createStack, watchStackFinish, data };
};
