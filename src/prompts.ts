import chalk from "chalk";
import inquirer, { prompt } from "inquirer";

type TSelectActionType = "Scrap productions" | "Update Data" | "Upload data";

export const selectActionType = async (): Promise<{ actionType: TSelectActionType }> => {
  return await prompt({
    type: "list",
    name: "actionType",
    message: "What do you want to do ?",
    choices: ["Scrap productions", "Update Data", "Upload data"],
  });
};

export const setConfig = async (configs: string[]) => {
  return await prompt({
    type: "list",
    name: "configName",
    message: "Which config do you want to use?",
    choices: [new inquirer.Separator("====== Actions ======"), "Create config", new inquirer.Separator("====== Configs ====== "), ...configs],
  });
};

export const setStartingIndex = async (maxProductions: number) => {
  return await prompt({
    type: "number",
    name: "startingIndex",
    message: `Type starting index (1 - ${maxProductions})`,
    default: 1,
    validate: (val) => {
      if (isNaN(val)) {
        return "Your data must be a number";
      } else if (val > maxProductions || val < 1) {
        return "Your number is out of bounds";
      } else {
        return true;
      }
    },
  });
};
export const setFileName = async () => {
  return await prompt({
    type: "input",
    name: "fileName",
    message: `Type file name to save`,
    default: "data",
  });
};

export const setProductionNumber = async (startingIndex: number, maxProductions: number) => {
  return await prompt({
    type: "number",
    name: "productionsNumber",
    message: `How many productions would you like to scrap ( 1 - ${maxProductions - startingIndex}) ? `,
    default: 1,
    validate: (val) => {
      if (isNaN(val)) {
        return "Your data must be a number";
      } else if (val < 0 || val > maxProductions - startingIndex) {
        return "Your number is out of bounds";
      } else {
        return true;
      }
    },
  });
};

export const setReviewsNumber = async () => {
  return await prompt({
    type: "number",
    name: "reviewsNumber",
    message: `How much reviews would you like to fetch ? (1 - 25)`,
    validate: (val) => {
      if (isNaN(val)) {
        return "Your data must be a number";
      } else if (val > 25 || val < 0) {
        return "Your number is out of bounds";
      } else {
        return true;
      }
    },
  });
};

export const chooseResult = async (results: string[]) => {
  return await prompt({
    type: "list",
    name: "result",
    message: `What result would you like to upload ? `,
    choices: results,
  });
};
