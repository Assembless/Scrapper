import { chooseFile, setFileName } from "./prompts";
import { TData, TExtractConfig } from "./types";
import { getDirectoryFiles, getFile, saveFile } from "./utils";

export const dataChecker = async () => {
  const files = getDirectoryFiles("./results");
  const { file } = await chooseFile(files);
  const data = getFile(`./results/${file}`) as TData[];

  const configs = getDirectoryFiles("./queryConfigs");
  const config = (await chooseFile(configs)).file;
  const configData = getFile(`./queryConfigs/${config}`) as TExtractConfig;

  const problemStack: any[] = [];

  data.forEach((e) => {
    const errorStack: string[] = [];
    configData.mainConfig.forEach((el) => {
      if (e[el] === "No data") {
        errorStack.push(el);
      }
    });
    if (errorStack.length) {
      problemStack.push({ uid: e.uid, problems: errorStack });
    }
  });

  const { fileName } = await setFileName();
  saveFile(`./dataChecks/${fileName}`, problemStack);
};
