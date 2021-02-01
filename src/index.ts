import { createScrapingConfig } from "./configCreator";
import { createMainInstance, goToAndGetHTML, startBrowser } from "./browser";
import { selectActionType, setAmountOfInstances, setConfig, setFileName, setProductionsNumber, setStartingIndex } from "./prompts";
import { getDirectoryFiles, getFile, saveFile } from "./utils";
import { TExtractConfig } from "./types";
import { scraper } from "./scraper";
import { browserStart, mainInstanceStart, scraperInitialize, stackCreate, welcomeMessage } from "./logs";

(async () => {
  welcomeMessage();

  const { actionType } = await selectActionType();

  switch (actionType) {
    case "Upload data":
      // const files = getDirectoryFiles("./results/");
      // const {file} = await chooseFile(files)

      // const data = getFile(`./results/${file}`);

      // const { destination } = await whereToUpload();

      // if (destination === "firebase") {
      //   const firebaseConfigs = getDirectoryFiles("./firebaseConfigs/");
      //   if (firebaseConfigs.length > 0) {
      //     const { firebaseConfig } = await chooseFirebaseConfig(firebaseConfigs);
      //     if (firebaseConfig === "create new config") {
      //       const { apiKey, authDomain, projectId } = await setFirebaseInfo();
      //       const { saveInfo } = await saveNewConfig();

      //       if (saveInfo) {
      //         const { configName } = await newConfigName();
      //         saveFile(`./firebaseConfigs/${configName}`, { apiKey, authDomain, projectId });
      //       }
      //     } else {
      //       const { apiKey, authDomain, projectId } = getFile(`./firebaseConfigs/${firebaseConfig}`) as { apiKey: string; authDomain: string; projectId: string };
      //     }
      //   } else {
      //     const { apiKey, authDomain, projectId } = await setFirebaseInfo();
      //     const { saveInfo } = await saveNewConfig();

      //     if (saveInfo) {
      //       const { configName } = await newConfigName();
      //       saveFile(`./firebaseConfigs/${configName}`, { apiKey, authDomain, projectId });
      //     }
      //   }
      // }

      break;
    case "Scrap productions":
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

      const userInput = {startingIndex,productionsNumber,instanceAmount}
      const scraperManager = await scraperInitialize(() => scraper(browser, config, userInput));

      await stackCreate(() => scraperManager.createStack(mainInstance));

      await scraperManager.createInstances();

      scraperManager.displayInstancesStatus();
      // await scraperManager.startInstances()

      // scraperManager.watchStackFinish().then(()=>[
      // const { fileName } = (await setFileName()) as { fileName: string };
      //   saveFile(`./results/${fileName}`,scraperManager.data)
      // ])

      break;
    default:
      return;
  }
})();
