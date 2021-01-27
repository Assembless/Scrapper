import fs from "fs";
import chalk from "chalk";

export const getFile = (filePath: fs.PathLike): object => {
  const rawConfig = fs.readFileSync(`${filePath}.json`, { encoding: "utf8" });
  const data = JSON.parse(rawConfig);
  console.log(chalk.yellowBright(`Data readed from ${filePath}`));
  return data;
};

export const saveFile = (filePath: fs.PathLike, data: any): void => {
  fs.writeFile(`${filePath}.json`, JSON.stringify(data, null, 4), (err) => {
    if (err) throw err;
    console.log(chalk.yellowBright(`Data written to ${filePath}`));
  });
};

export const getDirectoryFiles = (directoryPath: fs.PathLike) => {
  const files: string[] = [];
  fs.readdirSync(directoryPath).forEach((file) => {
    const name = file.split(".")[0];
    files.push(name);
  });
  return files;
};
