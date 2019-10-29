"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = evaluate;

var _chalk = _interopRequireDefault(require("chalk"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Evaluate an expression in meta.json in the context of
 * prompt answers data.
 */
function evaluate(exp, data) {
  /* eslint-disable no-new-func */
  const fn = new Function('data', 'with (data) { return ' + exp + '}');

  try {
    return fn(data);
  } catch (e) {
    console.error(_chalk.default.red('Error when evaluating filter condition: ' + exp));
  }
}