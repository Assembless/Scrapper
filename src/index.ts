import chalk from "chalk";
import progressbar from "cli-progress";
import cheerio from 'cheerio'
import { createScrapingConfig } from "./configCreator";
import { createMainInstance, goToAndGetHTML, startBrowser } from "./browser";
import { contentExtractors } from "./contentExtractors";
import { chooseFile, chooseFirebaseConfig, newConfigName, saveNewConfig, selectActionType, setAmountOfInstances, setConfig, setFileName, setFirebaseInfo, setProductionNumber, setStartingIndex, whereToUpload } from "./prompts";
import { createStack, getDirectoryFiles, getFile, saveFile, createInstances, createTask, startInstances } from "./utils";
import { TData, TExtractConfig } from "./types";
import { miscExtractors } from "./miscExtractors";
import { scraper } from "./scraper";

(async () => {

  const STARTING_URL = "https://www.imdb.com/search/title/?companies=co0144901&start=1&ref_=adv_prv";
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
      console.log('Starting browser')
      const browser = await startBrowser()
      const mainInstance = await createMainInstance(browser)
      let $ =  await goToAndGetHTML(STARTING_URL,mainInstance)
      const pageContent = $('div#pagecontent')
      const MAX_PRODUCTIONS = 5683;

      console.log(MAX_PRODUCTIONS)

      let config: TExtractConfig
      const configs: string[] = getDirectoryFiles('./queryConfigs/')

      const {configName} = await setConfig(configs)

      if (configName === "Create config"){
        config = await createScrapingConfig()
      }else {
        config = getFile(`./queryConfigs/${configName}`) as TExtractConfig
      }

        const { fileName } = (await setFileName()) as { fileName: string };

        const scraperManager = await scraper(browser,config)

        await scraperManager.createStack(MAX_PRODUCTIONS,mainInstance)

        await scraperManager.createInstances()

        await scraperManager.startInstances()

        scraperManager.watchStackFinish().then(()=>[
          saveFile(`./results/${fileName}`,scraperManager.data)
        ])
        // const stack = await createStack(MAX_PRODUCTIONS,mainInstance)

        // const data:TData[] = [] 

        // const {instanceAmount} = await setAmountOfInstances()

        // const instacnes = await createInstances(instanceAmount,browser)

        // const taskConfig = {stack,config,data}

        // await startInstances(instacnes,taskConfig);

      break;
    default:
      return;
  }
})();
