import chalk from 'chalk'

export const colors = {
  green: "#74cc99",
  lightGreen: "#5afa9d",
  white: "#d6d6d6",
  red: "#ff6b6b",
  yellow: "#ffe66d",
};

export const textRed = (text: string) => chalk.hex(colors.red)(text)
export const textYellow = (text: string) => chalk.hex(colors.yellow)(text)
export const textWhite = (text: string) => chalk.hex(colors.white)(text)
export const textLightGreen = (text: string) => chalk.hex(colors.lightGreen)(text)
export const textGreen = (text: string) => chalk.hex(colors.green)(text)

export const textRedBold = (text: string) => chalk.hex(colors.red).bold(text)
export const textYellowBold = (text: string) => chalk.hex(colors.yellow).bold(text)
export const textWhiteBold = (text: string) => chalk.hex(colors.white).bold(text)
export const textLightGreenBold = (text: string) => chalk.hex(colors.lightGreen).bold(text)
export const textGreenBold = (text: string) => chalk.hex(colors.green).bold(text)