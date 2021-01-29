import { prompt } from "inquirer";
import { TExtractConfig, TMainConfig, TReviewConfig } from "./types";
import { saveFile } from "./utils";

export const createScrapingConfig = async () => {
  const { mainConfig }: { mainConfig: TMainConfig[] } = await prompt({
    type: "checkbox",
    message: "Select data to scrap",
    name: "mainConfig",
    choices: ["Title", "Year", "Plot", "Storyline Plot", "Poster", "Duration", "Raiting", "Metascore", "Genres", "Stars", "Type", "Director"],
    validate: (answer) => (answer.length < 1 ? "You must choose at least one" : true),
  });

    const { reviewConfig }: { reviewConfig: TReviewConfig[] } = await prompt({
      type: "checkbox",
      message: "Select review data to scrap",
      name: "reviewConfig",
      choices: ["Title", "Raiting", "Date", "Text"],})


  const mapToLowerCases = <A extends string>(data: A[]) => {
    return data.map((e:A) =>e.charAt(0).toLowerCase() + e.slice(1)) as A[]
  }

  // const config = scrappingConfig.map((e: string | string[]) => {
  //   if (typeof e === "string") {
  //     const lowerCased = e.charAt(0).toLowerCase() + e.slice(1);
  //     const noWhiteSpaces = lowerCased.replace(/\s+/g, "");
  //     return noWhiteSpaces;
  //   } else {
  //     return e.map((el) => {
  //       const lowerCased = el.charAt(0).toLowerCase() + el.slice(1);
  //       const noWhiteSpaces = lowerCased.replace(/\s+/g, "");
  //       return noWhiteSpaces;
  //     });
  //   }
  // });

  const config: TExtractConfig = {main: mapToLowerCases(mainConfig),reviews: mapToLowerCases(reviewConfig) }
  
  const { configName } = await prompt({
    type: "input",
    name: "configName",
    message: "What's your config name",
  });

  const data = JSON.stringify(config, null, 4);
  saveFile(`./queryConfigs/${configName}`, data);

  return config;
};
