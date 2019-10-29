"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _chalk = _interopRequireDefault(require("chalk"));

var _logSymbols = _interopRequireDefault(require("log-symbols"));

var _download = require("../utils/download");

var _logger = _interopRequireDefault(require("../utils/logger"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

const initAction =
/*#__PURE__*/
function () {
  var _init = _asyncToGenerator(function* (program, templateName, projectName, ...rest) {
    _logger.default.debug('initAction arguments', templateName, projectName);

    if (!templateName || !projectName) {
      return _logger.default.fatal('templateName or projectName not exist');
    }

    if (_fs.default.existsSync(projectName)) {
      console.error(_logSymbols.default.error, _chalk.default.red(`ERROR: peoject ${projectName} already exists!`));
      return process.exit(1);
    }

    try {
      _download.downloadAndGenerate.call(program, templateName, projectName);
    } catch (err) {
      _logger.default.fatal('init fails', err);
    }
  });

  function init(_x, _x2, _x3) {
    return _init.apply(this, arguments);
  }

  return init;
}();

var _default = initAction;
exports.default = _default;