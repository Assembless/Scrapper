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
var firebase_1 = require("./firebase");
var styles_1 = require("./styles");
logs_1.welcomeMessage();
var Main = function () { return __awaiter(void 0, void 0, void 0, function () {
    var actionType, _a, files, file, data, destination, config_1, firebaseConfigs, firebaseConfig, firebase_2, config_2, configs, configName, startingIndex, productionsNumber, instanceAmount, browser_2, mainInstance_1, userInput_1, scraperManager_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, prompts_1.selectActionType()];
            case 1:
                actionType = (_b.sent()).actionType;
                _a = actionType;
                switch (_a) {
                    case "Upload data": return [3 /*break*/, 2];
                    case "Scrap productions": return [3 /*break*/, 13];
                    case 'Exit': return [3 /*break*/, 27];
                }
                return [3 /*break*/, 28];
            case 2:
                files = utils_1.getDirectoryFiles("./results/");
                return [4 /*yield*/, prompts_1.chooseFile(files)];
            case 3:
                file = (_b.sent()).file;
                data = utils_1.getFile("./results/" + file);
                return [4 /*yield*/, prompts_1.whereToUpload()];
            case 4:
                destination = (_b.sent()).destination;
                if (!(destination === "firebase")) return [3 /*break*/, 12];
                firebaseConfigs = utils_1.getDirectoryFiles("./firebaseConfigs/");
                if (!(firebaseConfigs.length > 0)) return [3 /*break*/, 9];
                return [4 /*yield*/, prompts_1.chooseFirebaseConfig(firebaseConfigs)];
            case 5:
                firebaseConfig = (_b.sent()).firebaseConfig;
                if (!(firebaseConfig === "create new config")) return [3 /*break*/, 7];
                return [4 /*yield*/, firebase_1.createNewFirebaseConfig()];
            case 6:
                config_1 = _b.sent();
                return [3 /*break*/, 8];
            case 7:
                config_1 = utils_1.getFile("./firebaseConfigs/" + firebaseConfig);
                _b.label = 8;
            case 8: return [3 /*break*/, 11];
            case 9: return [4 /*yield*/, firebase_1.createNewFirebaseConfig()];
            case 10:
                config_1 = _b.sent();
                _b.label = 11;
            case 11:
                console.log(data);
                firebase_2 = firebase_1.firebaseManager(config_1, data);
                firebase_2.saveToFirestore();
                _b.label = 12;
            case 12:
                Main();
                return [2 /*return*/];
            case 13:
                configs = utils_1.getDirectoryFiles("./queryConfigs/");
                return [4 /*yield*/, prompts_1.setConfig(configs)];
            case 14:
                configName = (_b.sent()).configName;
                if (!(configName === "Create config")) return [3 /*break*/, 16];
                return [4 /*yield*/, configCreator_1.createScrapingConfig()];
            case 15:
                config_2 = _b.sent();
                return [3 /*break*/, 17];
            case 16:
                config_2 = utils_1.getFile("./queryConfigs/" + configName);
                _b.label = 17;
            case 17: return [4 /*yield*/, prompts_1.setStartingIndex()];
            case 18:
                startingIndex = (_b.sent()).startingIndex;
                return [4 /*yield*/, prompts_1.setProductionsNumber(startingIndex)];
            case 19:
                productionsNumber = (_b.sent()).productionsNumber;
                return [4 /*yield*/, prompts_1.setAmountOfInstances()];
            case 20:
                instanceAmount = (_b.sent()).instanceAmount;
                return [4 /*yield*/, logs_1.browserStart(browser_1.startBrowser)];
            case 21:
                browser_2 = _b.sent();
                return [4 /*yield*/, logs_1.mainInstanceStart(function () { return browser_1.createMainInstance(browser_2); })];
            case 22:
                mainInstance_1 = _b.sent();
                userInput_1 = { startingIndex: startingIndex, productionsNumber: productionsNumber, instanceAmount: instanceAmount };
                return [4 /*yield*/, logs_1.scraperInitialize(function () { return scraper_1.scraper(browser_2, config_2, userInput_1); })];
            case 23:
                scraperManager_1 = _b.sent();
                return [4 /*yield*/, logs_1.stackCreate(function () { return scraperManager_1.createStack(mainInstance_1); })];
            case 24:
                _b.sent();
                return [4 /*yield*/, scraperManager_1.createInstances()];
            case 25:
                _b.sent();
                return [4 /*yield*/, scraperManager_1.startInstances()];
            case 26:
                _b.sent();
                scraperManager_1.watchStackFinish().then(function () { return __awaiter(void 0, void 0, void 0, function () {
                    var fileName;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, prompts_1.setFileName()];
                            case 1:
                                fileName = (_a.sent()).fileName;
                                utils_1.saveFile("./results/" + fileName, scraperManager_1.data);
                                return [2 /*return*/];
                        }
                    });
                }); });
                Main();
                return [2 /*return*/];
            case 27:
                console.log(styles_1.textWhite('See you later'));
                process.exit();
                _b.label = 28;
            case 28:
                Main();
                return [2 /*return*/];
        }
    });
}); };
Main();
