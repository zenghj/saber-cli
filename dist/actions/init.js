'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _logSymbols = require('log-symbols');

var _logSymbols2 = _interopRequireDefault(_logSymbols);

var _download = require('../utils/download');

var _logger = require('../utils/logger');

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = async function init(templateName, projectName) {
  const program = this;
  if (_fs2.default.existsSync(projectName)) {
    console.error(_logSymbols2.default.error, _chalk2.default.red(`ERROR: peoject ${projectName} already exists!`));
    return process.exit(1);
  }
  try {
    _download.downloadAndGenerate.call(program, templateName, projectName);
  } catch (err) {
    _logger2.default.fatal('init fails', err);
  }
};