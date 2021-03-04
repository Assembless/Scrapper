import { selectActionType } from "./prompts";
import { welcomeMessage } from "./logs";
import { textWhite } from "./styles";

import { upload } from "./actions/upload";
import { scrap } from "./actions/scrap";
import { check } from "./actions/check";

welcomeMessage();

const Main = async () => {
  const { actionType } = await selectActionType();

  switch (actionType) {
    case "Upload data":
      await upload();

      setTimeout(Main, 500);

      return;
    case "Scrap productions":
      await scrap();

      setTimeout(Main, 500);

      return;
    case "Run data check":
      await check();

      setTimeout(Main, 500);

      return;
    case "Exit":
      console.log(textWhite("See you later"));
      process.exit();
    default:
      setTimeout(Main, 500);
      return;
  }
};

setTimeout(Main, 500);
