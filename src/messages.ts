import { textGreen, textRed, textWhite, textWhiteBold, textYellow } from "./styles";
import {MAX_PRODUCTIONS} from './constants'

export const PROMPTS_MESSAGES = {
  selectActionType: textWhite(`What do you want to do ?`),
  setConfig: textWhite(`Which config do you want to use?`),
  setStartingIndex: textWhite(`Type starting index (1 - ${MAX_PRODUCTIONS})`),
  setFileName: textWhite(`Type file name to save`),
  setProductionsNumber: textWhite(`How many productions would you like to scrap ?`),
  chooseFile: {
    upload: textWhite(`What file would you like to upload ?`),
    fileToCheck: textWhite(`On which file would you like to run check ?`),
  },
  whereToUpload: textWhite(`Where would you like to upload your file ? `),
  setFirebaseInfo: {
    apiKey: textWhite(`ApiKey:`),
    authDomain: textWhite(`AuthDomain:`),
    projectId: textWhite(`projectId:`),
  },
  chooseFirebaseConfig: textWhite(`Choose firebase config`),
  saveNewConfig: textWhite(`Do you like to save your config for future ?`),
  newConfigName: textWhite(`What would be a name for your new config ?`),
  setAmountOfInstances: textWhite(`How many instances would you like to run?`),
  firebaseCollectionName: textWhite(`What is your collection name`),
};

export const LOGS_MESSAGES = {
  welcome: textWhite(`Hi wanderer ! \n Ready to gather some data ?`),
  browserStart: { start: textYellow(`Starting browser`), succeed: textGreen(`Browser started`), fail: textRed(`Browser starting Failed`) },
  mainInstanceStart: {
    start: textYellow(`Starting main instance`),
    succeed: textGreen(`Main instance started`),
    fail: textRed(`Main instance starting failed`),
  },
  scraperInitialize: { start: textYellow(`Initializing scraper`), succeed: textGreen(`Scraper initialized`), fail: textRed(`Failed to initialize scraper`) },
  stackCreate: { start: textYellow(`Creating task stack`), succeed: textGreen(`Task stack created`), fail: textRed(`Failed to create task stack`) },
};
