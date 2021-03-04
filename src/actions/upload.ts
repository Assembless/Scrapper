import { createNewFirebaseConfig, firebaseManager, TFirebaseInfo } from "../firebase";
import { chooseFile, chooseFirebaseConfig, whereToUpload } from "../prompts";
import { TData } from "../types";
import { getDirectoryFiles, getFile } from "../utils";

export const upload = async () => {

          const files = getDirectoryFiles("./results/");
          const { file } = await chooseFile(files, "upload");

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

            console.log(data);
            const firebase = firebaseManager(config, data);

            firebase.saveToFirestore();
          }
    
}