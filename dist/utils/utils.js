"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.readFile = exports.runCommand = exports.showLoading = void 0;
var chalk_1 = __importDefault(require("chalk"));
var child_process_1 = require("child_process");
var fs_1 = __importDefault(require("fs"));
var showLoading = function (prefix) {
    if (prefix === void 0) { prefix = ''; }
    var steps = ['\\', '|', '/', '-'];
    var x = 0;
    return setInterval(function () {
        process.stdout.write(chalk_1.default.white("\r".concat(prefix).concat(steps[x++])));
        x &= 3;
    }, 200);
};
exports.showLoading = showLoading;
var increaseIndent = function (str, length) {
    var string = str.split('');
    for (var i = str.length; i < length; i++) {
        string.push(' ');
    }
    return string.join('');
};
var runCommand = function (command) {
    return new Promise(function (resolve, reject) {
        var defaults = {
            onSuccess: function (result) {
                console.log(chalk_1.default.dim(result));
            },
            onError: function (err) {
                console.log(chalk_1.default.red(err.message));
            },
            onFinish: function () { },
        };
        if (typeof command === 'string') {
            var timer_1 = (0, exports.showLoading)("running ".concat(chalk_1.default.blue(command), " "));
            (0, child_process_1.exec)(command, function (error, stdout, stderr) {
                process.stdout.write(chalk_1.default.dim("\rrunning ".concat(chalk_1.default.blue(command), "   ")));
                clearInterval(timer_1);
                defaults.onFinish();
                if (error) {
                    defaults.onError(error);
                    reject(error);
                }
                defaults.onSuccess(stdout);
                resolve(stdout);
            });
        }
        else {
            var cmd = command.command, _a = command.timerMessage, timerMessage_1 = _a === void 0 ? "running ".concat(chalk_1.default.blue(cmd), " ") : _a, _b = command.onFinishTimerMessage, onFinishTimerMessage_1 = _b === void 0 ? '' : _b, _c = command.onFinish, onFinish_1 = _c === void 0 ? defaults.onFinish : _c, _d = command.onError, onError_1 = _d === void 0 ? defaults.onError : _d, _e = command.onSuccess, onSuccess_1 = _e === void 0 ? defaults.onSuccess : _e;
            var timer_2 = (0, exports.showLoading)("".concat(timerMessage_1));
            (0, child_process_1.exec)(cmd, function (error, stdout, stderr) {
                process.stdout.write(chalk_1.default.dim("\r ".concat(onFinishTimerMessage_1
                    ? increaseIndent(onFinishTimerMessage_1, timerMessage_1.length)
                    : timerMessage_1, "   ")));
                clearInterval(timer_2);
                onFinish_1();
                if (error) {
                    onError_1(error);
                    reject(error);
                }
                onSuccess_1(stdout);
                resolve(stdout);
            });
        }
    });
};
exports.runCommand = runCommand;
var readFile = function (file) {
    return new Promise(function (resolve, reject) {
        fs_1.default.readFile(file, 'utf8', function (err, data) {
            if (err)
                reject(err);
            resolve(data);
        });
    });
};
exports.readFile = readFile;
