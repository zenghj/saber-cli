"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = evaluate;
exports.geneFunctionFromString = geneFunctionFromString;

var _chalk = _interopRequireDefault(require("chalk"));

var _logger = _interopRequireDefault(require("./logger"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Evaluate an expression in meta.json in the context of
 * prompt answers data.
 */
function evaluate(exp, data) {
  /* eslint-disable no-new-func */
  const fn = new Function('data', 'with (data) { return ' + exp + '}');

  try {
    _logger.default.debug('evaluate\n', fn.toString());

    return fn(data);
  } catch (e) {
    console.error(_chalk.default.red('Error when evaluating filter condition: ' + exp));
  }
}
/**
 * generate a js function from a js function string
 * @param functionStr 
 */


function geneFunctionFromString(functionStr) {
  var fn = eval(`(${functionStr})`);

  if (typeof fn === 'function') {
    return function (...args) {
      return fn(...args);
    };
  }

  throw new Error(`can not get a JS function from "${functionStr}"`);
}