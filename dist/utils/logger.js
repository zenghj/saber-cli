"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _chalk = _interopRequireDefault(require("chalk"));

var _constants = require("./constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const prefix = 'saber-cli';

function fatal(...args) {
  console.log(_chalk.default.red(`\n${prefix}-error:`, ...args));
  process.exit(1);
}

function success(...args) {
  console.log(_chalk.default.green(`${prefix}:`, ...args));
}

class Logger {
  constructor() {}

  fatal(...args) {
    return fatal(...args);
  }

  success(...args) {
    return success(...args);
  }

  debug(...args) {
    if (_constants.__DEV__) {
      debugger;
      return console.log(...args);
    }
  }

}

var _default = new Logger();

exports.default = _default;