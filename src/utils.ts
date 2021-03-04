import fs from "fs";
import chalk, { yellow } from "chalk";
import { TData, TExtractConfig,TReviewConfig } from "./types";

import {TMainConfig} from './types'

export const extractUID = (string: string) => {
  const [a, b, c, d, e, f, g] = string.split("/");
  return e;
};

export const getFile = (filePath: fs.PathLike): object => {
  const rawConfig = fs.readFileSync(`${filePath}.json`, { encoding: "utf8" });
  const data = JSON.parse(rawConfig);
  console.log(yellow(`Data readed from ${filePath}`));
  return data;
};

export const saveFile = (filePath: fs.PathLike, data: any): void => {
  fs.writeFile(`${filePath}.json`, JSON.stringify(data, null, 4), (err) => {
    if (err) throw err;
    console.log(yellow(`Data written to ${filePath}`));
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


export const createConfigFromData = (file: TData[]): TExtractConfig => {
  const object = file[0];

  const rootKeys = Object.keys(object) as TMainConfig[];
  let reviewKeys: TReviewConfig[] = [];

  if (object.reviews) {
    reviewKeys = Object.keys(object.reviews[0]) as TReviewConfig[];
  }

  const config: TExtractConfig = { mainConfig: rootKeys, reviewsConfig: reviewKeys };

  return config;
};