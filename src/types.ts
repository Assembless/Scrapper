import { Browser, Page } from "puppeteer";

export type TStars = {
  image: string | undefined;
  actor: string;
  character: string;
};

export type TReview = {
  title?: string;
  date?: string;
  raiting?: string;
  text?: string;
};

export type TType = "series" | "movie" | "mini-series";

export type TData = {
  uid: string;
  title?: string;
  year?: string;
  plot?: string;
  storylinePlot?: string;
  poster?: string;
  duration?: string;
  raiting?: number | string;
  metascore?: number | string;
  genres?: string[];
  reviews?: Array<TReview>;
  stars?: Array<TStars>;
  type?: TType;
  director?: string;
};

export type TReviewConfig = "title"| "raiting"| "date"| "text"
export type TMainConfig = "title" | "year" | "director" | "genres" | "raiting" | "metascore" | "plot" | "poster" | "storylinePlot" | "duration" | "type" | "stars";

export type TExtractConfig = {mainConfig: TMainConfig[],reviewsConfig: TReviewConfig[]}


type TStatus = "disabled" | "active" | "waiting";

export type TInstance = { name: string; page: Page; status: TStatus; logger: (task?: string) => void };

export type TScraper = (
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

export type TSelectActionType = "Scrap productions" | "Upload data" | "Run data check" | "Exit";
export type TChooseFile = 'upload' | 'fileToCheck'


export type TFolders = 'dataChecks' | 'queryConfigs' | 'firebaseConfigs' | 'results'