'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const prefix = 'saber-cli';

function fatal(...args) {
  console.log(_chalk2.default.red(`\n${prefix}-error:`, ...args));
  process.exit(1);
}

function success(...args) {
  console.log(_chalk2.default.green(`${prefix}:`, ...args));
}
exports.default = {
  fatal,
  success
};