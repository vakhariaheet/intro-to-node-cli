#!/usr/bin/env node
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var commander_1 = require("commander");
var chalk_1 = __importDefault(require("chalk"));
var figlet_1 = __importDefault(require("figlet"));
var inquirer_1 = __importDefault(require("inquirer"));
var child_process_1 = require("child_process");
var utils_1 = require("./utils/utils");
var utils_2 = require("./utils/utils");
var npm_api_1 = __importDefault(require("npm-api"));
var program = new commander_1.Command();
console.log(chalk_1.default.red(figlet_1.default.textSync('Hello', { horizontalLayout: 'full' })));
var npm = new npm_api_1.default();
npm.Repo('verifierjs').then(function (repo) {
    console.log(repo);
});
program.action(function () { return __awaiter(void 0, void 0, void 0, function () {
    var configFile_1, _a, _b, e_1, currentStep_1, runNextStep_1, err_1;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 5, , 6]);
                configFile_1 = {
                    steps: [],
                };
                (0, child_process_1.exec)('cd ~/Desktop/personal/Verificator && yarn commit');
                _c.label = 1;
            case 1:
                _c.trys.push([1, 3, , 4]);
                _b = (_a = JSON).parse;
                return [4 /*yield*/, (0, utils_2.readFile)('./helloconfig.json')];
            case 2:
                configFile_1 = _b.apply(_a, [_c.sent()]);
                return [3 /*break*/, 4];
            case 3:
                e_1 = _c.sent();
                console.log(chalk_1.default.red('No config file found'));
                return [3 /*break*/, 4];
            case 4:
                if (configFile_1.steps.length === 0) {
                    console.log(chalk_1.default.red('No steps found in config file'));
                    return [2 /*return*/];
                }
                currentStep_1 = 0;
                runNextStep_1 = function (step) { return __awaiter(void 0, void 0, void 0, function () {
                    var confirm_1, confirm_2;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (!(step.type === 'command')) return [3 /*break*/, 4];
                                if (typeof step.showCommand === 'undefined') {
                                    step.showCommand = true;
                                }
                                if (!step.askConfirmation) return [3 /*break*/, 2];
                                return [4 /*yield*/, inquirer_1.default.prompt([
                                        {
                                            type: 'confirm',
                                            name: 'confirm',
                                            message: step.confirmMessage,
                                            default: step.default,
                                        },
                                    ])];
                            case 1:
                                confirm_1 = (_a.sent()).confirm;
                                if (!confirm_1) {
                                    return [2 /*return*/];
                                }
                                _a.label = 2;
                            case 2: return [4 /*yield*/, (0, utils_1.runCommand)({
                                    command: step.command,
                                    timerMessage: "".concat(step.message || '', " ").concat(chalk_1.default.green('>'), "  ").concat(step.showCommand ? chalk_1.default.blue(step.command) : '', " "),
                                })];
                            case 3:
                                _a.sent();
                                _a.label = 4;
                            case 4:
                                if (!(step.type === 'confirm')) return [3 /*break*/, 6];
                                return [4 /*yield*/, inquirer_1.default.prompt([
                                        {
                                            type: 'confirm',
                                            default: step.default,
                                            name: 'confirm',
                                            message: step.question,
                                        },
                                    ])];
                            case 5:
                                confirm_2 = (_a.sent()).confirm;
                                if (!confirm_2) {
                                    throw new Error(step.errorMessage || 'Aborted');
                                }
                                _a.label = 6;
                            case 6:
                                currentStep_1++;
                                if (currentStep_1 < configFile_1.steps.length) {
                                    runNextStep_1(configFile_1.steps[currentStep_1]);
                                }
                                return [2 /*return*/];
                        }
                    });
                }); };
                runNextStep_1(configFile_1.steps[currentStep_1]);
                return [3 /*break*/, 6];
            case 5:
                err_1 = _c.sent();
                console.log(err_1);
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); });
program.parse(process.argv);
