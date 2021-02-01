import { prompt } from "inquirer";
import { TExtractConfig, TMainConfig, TReviewConfig } from "./types";
import { saveFile } from "./utils";

export const createScrapingConfig = async () => {
  const { mainConfig }: { mainConfig: TMainConfig[] } = await prompt({
    type: "checkbox",
    message: "Select data to scrap",
    name: "mainConfig",
    choices: ["Title", "Year", "Plot", "StorylinePlot", "Poster", "Duration", "Raiting", "Metascore", "Genres", "Stars", "Type", "Director"],
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

  const config: TExtractConfig = {mainConfig: mapToLowerCases(mainConfig),reviewsConfig: mapToLowerCases(reviewConfig) }
  
  console.log(config.mainConfig)
  
  const { configName } = await prompt({
    type: "input",
    name: "configName",
    message: "What's your config name",
  });

  saveFile(`./queryConfigs/${configName}`, config);

  return config;
};
