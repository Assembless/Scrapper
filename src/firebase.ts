import firebase from "firebase";
import { firebaseCollectionName, newConfigName, saveNewConfig, setFirebaseInfo } from "./prompts";
import { TData } from "./types";
import { saveFile } from "./utils";

export type TFirebaseInfo = {
  apiKey: string;
  authDomain: string;
  projectId: string;
};

export const createNewFirebaseConfig = async () => {
  const { apiKey, authDomain, projectId } = await setFirebaseInfo();
  const { saveInfo } = await saveNewConfig();

  if (saveInfo) {
    const { configName } = await newConfigName();
    saveFile(`./firebaseConfigs/${configName}`, { apiKey, authDomain, projectId });
  }
  return { apiKey, authDomain, projectId };
};

export const firebaseManager = (config: TFirebaseInfo,data:TData[]) => {
  

  firebase.initializeApp(config);
  const db = firebase.firestore();

  const saveToFirestore = async () => {

    const {collectionName} = await firebaseCollectionName()
    
    const batch = db.batch();

    data.forEach((e) => {
      batch.set(db.collection(collectionName).doc(e.uid), e);
    });

    await batch.commit();

    return
  };

  return {saveToFirestore}

};





