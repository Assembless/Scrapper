import { createMainInstance, startBrowser } from "../browser";
import { createScrapingConfig } from "../configCreator";
import { browserStart, mainInstanceStart, scraperInitialize, stackCreate } from "../logs";
import { setAmountOfInstances, setConfig, setFileName, setProductionsNumber, setStartingIndex } from "../prompts";
import { scraper } from "../scraper";
import { TExtractConfig } from "../types";
import { getDirectoryFiles, getFile, saveFile } from "../utils";

export const scrap = async () => {
    let config: TExtractConfig;
    const configs: string[] = getDirectoryFiles("./queryConfigs/");

    const { configName } = await setConfig(configs);

    if (configName === "Create config") {
      config = await createScrapingConfig();
    } else {
      config = getFile(`./queryConfigs/${configName}`) as TExtractConfig;
    }
    const { startingIndex } = await setStartingIndex();
    const { productionsNumber } = await setProductionsNumber(startingIndex);
    const { instanceAmount } = await setAmountOfInstances();

    const browser = await browserStart(startBrowser);

    const mainInstance = await mainInstanceStart(() => createMainInstance(browser));

    const userInput = { startingIndex, productionsNumber, instanceAmount };
    const scraperManager = await scraperInitialize(() => scraper(browser, config, userInput));

    await stackCreate(() => scraperManager.createStack(mainInstance));

    await scraperManager.createInstances();

    await scraperManager.startInstances();

    await scraperManager.watchStackFinish().then(async () => {
      const { fileName } = (await setFileName()) as { fileName: string };
      saveFile(`./results/${fileName}`, scraperManager.data);
    });

}