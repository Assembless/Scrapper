import chalk from "chalk";
import { startBrowser } from "./browser";
import { chooseFile, chooseFirebaseConfig, newConfigName, saveNewConfig, selectActionType, setFirebaseInfo, whereToUpload } from "./prompts";
import { getDirectoryFiles, getFile, saveFile } from "./utils";

(async () => {
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
      break;
    default:
      return;
  }

  // console.log(chalk.magentaBright('Starting Browser'));
  // const { browser, page } = await startBrowser();
})();
