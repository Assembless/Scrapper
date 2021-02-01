import boxen, { Options } from "boxen";
import ora from "ora";
import { LOGS_MESSAGES as messages } from "./constants";
import { colors } from "./styles";

const welcomeBoxOptions:Options = {
  align: "center",
  padding: { top: 1, bottom: 1, right: 25, left: 25 },
  margin: { top: 2, bottom: 2, left: 0, right: 0 },
  float: "left",
  borderColor: colors.yellow,
  borderStyle: "bold",
};

const logAsyncReturn = async (Execute: () => Promise<any>, messages: { start: string; fail: string; succeed: string }): Promise<any> => {
  console.log(messages.start);
  return await Execute()
    .then(() => console.log(messages.succeed))
    .catch((e: any) => {
      console.log(messages.fail);
      console.log(e);
    });
};
const oraAsyncReturn = async <A>(Execute: () => Promise<A>, ora: ora.Ora, messages: { start: any; fail: any; succeed: any }): Promise<A> => {
  ora.start(messages.start);
  return await Execute()
    .then(res => {
      ora.succeed(messages.succeed);
      return res
    })
    .catch((e: any) => {
      ora.fail(messages.fail);
      throw new Error(e)
    });
};
const oraAsyncVoid= async (Execute: () => Promise<void>, ora: ora.Ora, messages: { start: any; fail: any; succeed: any }): Promise<void> => {
  ora.start(messages.start);
  await Execute()
    .then(res => {
      ora.succeed(messages.succeed);
    })
    .catch((e: any) => {
      ora.fail(messages.fail);
      throw new Error(e)
    });
};


export const welcomeMessage = () => console.log(boxen(messages.welcome, welcomeBoxOptions));

const browserStartOra = ora();
export const browserStart = async <A>(Execute: () => Promise<A>) => await oraAsyncReturn(() => Execute(), browserStartOra, messages.browserStart);

const mainInstanceStartOra = ora()
export const mainInstanceStart = async <A>(Execute:()=> Promise<A>) => await oraAsyncReturn(() => Execute(), mainInstanceStartOra, messages.mainInstanceStart);

const scraperInitializeOra = ora()
export const scraperInitialize = async <A>(Execute: () => Promise<A>) => await oraAsyncReturn(() => Execute(), scraperInitializeOra, messages.scraperInitialize);

const stackCreateOra = ora()
export const stackCreate = async (Execute: () => Promise<void>) => await oraAsyncVoid(() => Execute(), stackCreateOra, messages.stackCreate);
