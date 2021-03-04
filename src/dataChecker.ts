import { chooseFile, setFileName } from "./prompts";
import { TData } from "./types";
import { createConfigFromData, getDirectoryFiles, getFile, saveFile } from "./utils";

export const dataChecker = async () => {
  const files = getDirectoryFiles("./results");
  const { file } = await chooseFile(files,'fileToCheck');
  const data = getFile(`./results/${file}`) as TData[];

  const config = createConfigFromData(data)

  const problemStack: any[] = [];
  let numberOfErrors: number = 0


  data.forEach((e) => {
    const errorStack: string[] = [];
    config.mainConfig.forEach((el) => {
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
