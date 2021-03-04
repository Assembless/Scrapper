import { chooseFile, setFileName } from "./prompts";
import { TData, TExtractConfig } from "./types";
import { getDirectoryFiles, getFile, saveFile } from "./utils";

export const dataChecker = async () => {
  const files = getDirectoryFiles("./results");
  const { file } = await chooseFile(files,'fileToCheck');
  const data = getFile(`./results/${file}`) as TData[];

  const configs = getDirectoryFiles("./queryConfigs");
  const config = (await chooseFile(configs)).file;
  const configData = getFile(`./queryConfigs/${config}`) as TExtractConfig;

  const problemStack: any[] = [];
  let numberOfErrors: number = 0


  data.forEach((e) => {
    const errorStack: string[] = [];
    configData.mainConfig.forEach((el) => {
      if (e[el] === "No data") {
        errorStack.push(el);
      }
    });
    if (errorStack.length) {
      numberOfErrors += errorStack.length
      problemStack.push({ uid: e.uid, problems: errorStack });
    }
  });


  if (problemStack.length){
    console.log(`Found ${numberOfErrors} problems in ${problemStack.length} files`)
  }else{
    console.log(`Didn't found any problems`)
  }
  const { fileName } = await setFileName();
  saveFile(`./dataChecks/${fileName}`, problemStack);
};
