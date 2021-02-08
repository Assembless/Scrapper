import { createScrapingConfig } from "./configCreator";
import { createMainInstance, startBrowser } from "./browser";
import {
  chooseFile,
  chooseFirebaseConfig,
  selectActionType,
  setAmountOfInstances,
  setConfig,
  setFileName,
  setProductionsNumber,
  setStartingIndex,
  whereToUpload,
} from "./prompts";
import { getDirectoryFiles, getFile, saveFile } from "./utils";
import { TData, TExtractConfig } from "./types";
import { scraper } from "./scraper";
import { browserStart, mainInstanceStart, scraperInitialize, stackCreate, welcomeMessage } from "./logs";
import { createNewFirebaseConfig, firebaseManager, TFirebaseInfo } from "./firebase";
import { textWhite } from "./styles";
import { dataChecker } from "./dataChecker";

welcomeMessage();


const Main = async () => {

  const { actionType } = await selectActionType();

  switch (actionType) {
    case "Upload data":
      const files = getDirectoryFiles("./results/");
      const { file } = await chooseFile(files);

      const data = getFile(`./results/${file}`) as TData[];

      const { destination } = await whereToUpload();

      if (destination === "firebase") {
        let config: TFirebaseInfo;

        const firebaseConfigs = getDirectoryFiles("./firebaseConfigs/");
        if (firebaseConfigs.length > 0) {
          const { firebaseConfig } = await chooseFirebaseConfig(firebaseConfigs);
          if (firebaseConfig === "create new config") {
            config = await createNewFirebaseConfig();
          } else {
            config = getFile(`./firebaseConfigs/${firebaseConfig}`) as TFirebaseInfo;
          }
        } else {
          config = await createNewFirebaseConfig();
        }

        console.log(data)
        const firebase = firebaseManager(config,data)

        firebase.saveToFirestore()

      }
      Main()
      return
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

      const userInput = { startingIndex, productionsNumber, instanceAmount };
      const scraperManager = await scraperInitialize(() => scraper(browser, config, userInput));

      await stackCreate(() => scraperManager.createStack(mainInstance));

      await scraperManager.createInstances();

      await scraperManager.startInstances();

      await scraperManager.watchStackFinish().then(async () => {
        const { fileName } = (await setFileName()) as { fileName: string };
        saveFile(`./results/${fileName}`, scraperManager.data);
      });

      Main()
      return
    case 'Run data check':
      await dataChecker()
      Main()
      return
    case 'Exit':
      console.log(textWhite('See you later'))
      process.exit()
    default:
      Main();
      return
  }
};

Main()