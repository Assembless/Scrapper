"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var configCreator_1 = require("./configCreator");
var browser_1 = require("./browser");
var prompts_1 = require("./prompts");
var utils_1 = require("./utils");
var scraper_1 = require("./scraper");
var logs_1 = require("./logs");
var STARTING_URL = "https://www.imdb.com/search/title/?companies=co0144901&start=1&ref_=adv_prv";
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var actionType, _a, browser, mainInstance, $, MAX_PRODUCTIONS, config, configs, configName, fileName_1, scraperManager_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                logs_1.logs.welcomeMessage;
                return [4 /*yield*/, prompts_1.selectActionType()];
            case 1:
                actionType = (_b.sent()).actionType;
                _a = actionType;
                switch (_a) {
                    case "Upload data": return [3 /*break*/, 2];
                    case "Scrap productions": return [3 /*break*/, 3];
                }
                return [3 /*break*/, 16];
            case 2: 
            // const files = getDirectoryFiles("./results/");
            // const {file} = await chooseFile(files)
            // const data = getFile(`./results/${file}`);
            // const { destination } = await whereToUpload();
            // if (destination === "firebase") {
            //   const firebaseConfigs = getDirectoryFiles("./firebaseConfigs/");
            //   if (firebaseConfigs.length > 0) {
            //     const { firebaseConfig } = await chooseFirebaseConfig(firebaseConfigs);
            //     if (firebaseConfig === "create new config") {
            //       const { apiKey, authDomain, projectId } = await setFirebaseInfo();
            //       const { saveInfo } = await saveNewConfig();
            //       if (saveInfo) {
            //         const { configName } = await newConfigName();
            //         saveFile(`./firebaseConfigs/${configName}`, { apiKey, authDomain, projectId });
            //       }
            //     } else {
            //       const { apiKey, authDomain, projectId } = getFile(`./firebaseConfigs/${firebaseConfig}`) as { apiKey: string; authDomain: string; projectId: string };
            //     }
            //   } else {
            //     const { apiKey, authDomain, projectId } = await setFirebaseInfo();
            //     const { saveInfo } = await saveNewConfig();
            //     if (saveInfo) {
            //       const { configName } = await newConfigName();
            //       saveFile(`./firebaseConfigs/${configName}`, { apiKey, authDomain, projectId });
            //     }
            //   }
            // }
            return [3 /*break*/, 17];
            case 3:
                console.log('weird');
                return [4 /*yield*/, browser_1.startBrowser()];
            case 4:
                browser = _b.sent();
                return [4 /*yield*/, browser_1.createMainInstance(browser)];
            case 5:
                mainInstance = _b.sent();
                return [4 /*yield*/, browser_1.goToAndGetHTML(STARTING_URL, mainInstance)];
            case 6:
                $ = _b.sent();
                MAX_PRODUCTIONS = 5683;
                console.log(MAX_PRODUCTIONS);
                config = void 0;
                configs = utils_1.getDirectoryFiles('./queryConfigs/');
                return [4 /*yield*/, prompts_1.setConfig(configs)];
            case 7:
                configName = (_b.sent()).configName;
                if (!(configName === "Create config")) return [3 /*break*/, 9];
                return [4 /*yield*/, configCreator_1.createScrapingConfig()];
            case 8:
                config = _b.sent();
                return [3 /*break*/, 10];
            case 9:
                config = utils_1.getFile("./queryConfigs/" + configName);
                _b.label = 10;
            case 10: return [4 /*yield*/, prompts_1.setFileName()];
            case 11:
                fileName_1 = (_b.sent()).fileName;
                return [4 /*yield*/, scraper_1.scraper(browser, config)];
            case 12:
                scraperManager_1 = _b.sent();
                return [4 /*yield*/, scraperManager_1.createStack(MAX_PRODUCTIONS, mainInstance)];
            case 13:
                _b.sent();
                return [4 /*yield*/, scraperManager_1.createInstances()];
            case 14:
                _b.sent();
                return [4 /*yield*/, scraperManager_1.startInstances()];
            case 15:
                _b.sent();
                scraperManager_1.watchStackFinish().then(function () { return [
                    utils_1.saveFile("./results/" + fileName_1, scraperManager_1.data)
                ]; });
                return [3 /*break*/, 17];
            case 16: return [2 /*return*/];
            case 17: return [2 /*return*/];
        }
    });
}); })();
