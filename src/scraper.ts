import { Browser, Page } from "puppeteer";
import { goToAndGetHTML } from "./browser";
import { contentExtractors } from "./contentExtractors";
import { miscExtractors } from "./miscExtractors";
import { TData, TExtractConfig, TReview } from "./types";
import { extractUID } from "./utils";
import { MAX_REVIEWS } from "./constants";
import ora, { Ora } from "ora";

type TInstance = { name: string; page: Page; status: "disabled" | "active" | "waiting"; logger: Ora };

type TScraper = (
  browser: Browser,
  config: TExtractConfig,
  userInput: { startingIndex: number; productionsNumber: number; instanceAmount: number }
) => Promise<{
  startInstances: () => Promise<void>;
  createInstances: () => Promise<void>;
  createStack: (mainInstance: Page) => Promise<void>;
  watchStackFinish: () => Promise<void>;
  displayInstancesStatus: () => void;
  data: TData[];
}>;

export const scraper: TScraper = async (browser, config, userInput) => {
  const data: TData[] = [];
  const stack: string[] = [];
  const instances: TInstance[] = [];
  const { startingIndex, productionsNumber, instanceAmount } = userInput;

  const watchStackFinish = (): Promise<void> => {
    return new Promise((resolve) => {
      const interval = setInterval(() => {
        if (stack.length === 0 && instances.findIndex((e) => e.status === "active")) {
          clearInterval(interval);
          resolve();
        }
      }, 1000);
    });
  };

  const createStack = async (mainInstance: Page) => {
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
  };

  const createTask = async (instance: TInstance) => {
    if ((instance.status = "disabled")) {
      instance.status = "active";
    }
    const page = instance.page;

    const stackItem = stack.shift()!;

    const uid = extractUID(stackItem);

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

    data.push(productionData);
    if (stack.length === 0) {
      await page.close();
      instance.status = "disabled";
      return;
    } else {
      createTask(instance);
    }
  };

  const createInstances = async () => {
    for (let i = 0; i < instanceAmount; i++) {
      const newInstance = await browser.newPage();
      const newLoger = ora({ spinner: "growHorizontal" });
      instances[i] = { name: "Instance#" + i, page: newInstance, status: "disabled", logger: newLoger };
    }
  };

  const displayInstancesStatus = () => {
    instances.forEach((e) => {
      e.logger.start(`${e.name}   status:${e.status} \n`);
    });
  };

  const startInstances = async () => {
    instances.forEach((instance) => {
      createTask(instance);
    });
  };

  return { startInstances, createInstances, createStack, watchStackFinish, displayInstancesStatus, data };
};
