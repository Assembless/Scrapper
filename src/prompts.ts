import inquirer, { prompt } from "inquirer";
import {PROMPTS_MESSAGES as messages} from './messages'
import {MAX_PRODUCTIONS} from './constants'
import {TChooseFile, TSelectActionType} from './types'

const firebaseQuestions = [
  {
    type: "input",
    name: "apiKey",
    message: messages.setFirebaseInfo.apiKey,
  },
  {
    type: "input",
    name: "authDomain",
    message: messages.setFirebaseInfo.authDomain,
  },
  {
    type: "input",
    name: "projectId",
    message: messages.setFirebaseInfo.projectId,
  },
];

export const selectActionType = async (): Promise<{ actionType: TSelectActionType }> => {
  return await prompt({
    type: "list",
    name: "actionType",
    message: messages.selectActionType,
    choices: ["Scrap productions", "Upload data",'Run data check','Exit'],
  });
};

export const setConfig = async (configs: string[]): Promise<{ configName: string | "Create config" }> => {
  return await prompt({
    type: "list",
    name: "configName",
    message: messages.setConfig,
    choices: [new inquirer.Separator("====== Actions ======"), "Create config", new inquirer.Separator("====== Configs ====== "), ...configs],
  });
};

export const setStartingIndex = async (): Promise<{ startingIndex: number }> => {
  return await prompt({
    type: "number",
    name: "startingIndex",
    message: messages.setStartingIndex,
    default: 1,
    validate: (val) => {
      if (isNaN(val)) {
        return "Your data must be a number";
      } else if (val > MAX_PRODUCTIONS || val < 1) {
        return "Your number is out of bounds";
      } else {
        return true;
      }
    },
  });
};
export const setFileName = async (): Promise<{ fileName:string }> => {
  return await prompt({
    type: "input",
    name: "fileName",
    message: messages.setFileName,
    default: "data",
  });
};

export const setProductionsNumber = async (startingIndex: number): Promise<{ productionsNumber: number }> => {
  return await prompt({
    type: "number",
    name: "productionsNumber",
    message: `${messages.setProductionsNumber} ( 1 - ${MAX_PRODUCTIONS - startingIndex}) ? `,
    default: 1,
    validate: (val) => {
      if (isNaN(val)) {
        return "Your data must be a number";
      } else if (val < 0 || val > MAX_PRODUCTIONS - startingIndex) {
        return "Your number is out of bounds";
      } else {
        return true;
      }
    },
  });
};

export const chooseFile = async (files: string[],type: TChooseFile): Promise<{ file: string }> => {
  return await prompt({
    type: "list",
    name: "file",
    message: messages.chooseFile[type],
    choices: files,
  });
};

export const whereToUpload = async (): Promise<{ destination: 'firebase' }> => {
  return await prompt({
    type: "list",
    name: "destination",
    message: messages.whereToUpload,
    choices: ["firebase"],
  });
};

export const chooseFirebaseConfig = async (files: string[]): Promise<{ firebaseConfig: string | 'Create new config' }> => {
  return await prompt({
    type: "list",
    name: "firebaseConfig",
    message: messages.chooseFirebaseConfig,
    choices: [...files, "Create new config"],
  });
};
export const firebaseCollectionName = async (): Promise<{ collectionName: string }> => {
  return await prompt({
    type: "input",
    name: "collectionName",
    message: messages.firebaseCollectionName,
  });
};
export const saveNewConfig = async (): Promise<{ saveInfo: boolean }> => {
  return await prompt({
    type: "confirm",
    name: "saveInfo",
    message: messages.saveNewConfig,
    default: true,
  });
};

export const newConfigName = async (): Promise<{ configName: string }> => {
  return await prompt({
    type: "input",
    name: "configName",
    message: messages.newConfigName,
  });
};
export const setAmountOfInstances = async (): Promise<{ instanceAmount: number }> => {
  return await prompt({
    type: "number",
    name: "instanceAmount",
    message: messages.setAmountOfInstances,
    validate: (val) => {
      if (isNaN(val)) {
        return "Please type number";
      } else if (val <= 0) {
        return "Number must be higher than 0";
      } else {
        return true;
      }
    },
  });
};

export const setFirebaseInfo = async (): Promise<{ apiKey: string; authDomain: string; projectId:string }> => {
  return await prompt(firebaseQuestions);
};
