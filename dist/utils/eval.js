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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9ldmFsLnRzIl0sIm5hbWVzIjpbImV2YWx1YXRlIiwiZXhwIiwiZGF0YSIsImZuIiwiRnVuY3Rpb24iLCJlIiwiY29uc29sZSIsImVycm9yIiwiY2hhbGsiLCJyZWQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7OztBQUVBOzs7O0FBS2UsU0FBU0EsUUFBVCxDQUFtQkMsR0FBbkIsRUFBZ0NDLElBQWhDLEVBQThDO0FBQzNEO0FBQ0EsUUFBTUMsRUFBRSxHQUFHLElBQUlDLFFBQUosQ0FBYSxNQUFiLEVBQXFCLDBCQUEwQkgsR0FBMUIsR0FBZ0MsR0FBckQsQ0FBWDs7QUFDQSxNQUFJO0FBQ0YsV0FBT0UsRUFBRSxDQUFDRCxJQUFELENBQVQ7QUFDRCxHQUZELENBRUUsT0FBT0csQ0FBUCxFQUFVO0FBQ1ZDLElBQUFBLE9BQU8sQ0FBQ0MsS0FBUixDQUFjQyxlQUFNQyxHQUFOLENBQVUsNkNBQTZDUixHQUF2RCxDQUFkO0FBQ0Q7QUFDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBjaGFsayBmcm9tICdjaGFsaydcblxuLyoqXG4gKiBFdmFsdWF0ZSBhbiBleHByZXNzaW9uIGluIG1ldGEuanNvbiBpbiB0aGUgY29udGV4dCBvZlxuICogcHJvbXB0IGFuc3dlcnMgZGF0YS5cbiAqL1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBldmFsdWF0ZSAoZXhwOiBzdHJpbmcsIGRhdGE6IE9iamVjdCkge1xuICAvKiBlc2xpbnQtZGlzYWJsZSBuby1uZXctZnVuYyAqL1xuICBjb25zdCBmbiA9IG5ldyBGdW5jdGlvbignZGF0YScsICd3aXRoIChkYXRhKSB7IHJldHVybiAnICsgZXhwICsgJ30nKVxuICB0cnkge1xuICAgIHJldHVybiBmbihkYXRhKVxuICB9IGNhdGNoIChlKSB7XG4gICAgY29uc29sZS5lcnJvcihjaGFsay5yZWQoJ0Vycm9yIHdoZW4gZXZhbHVhdGluZyBmaWx0ZXIgY29uZGl0aW9uOiAnICsgZXhwKSlcbiAgfVxufVxuIl19