"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.__PROD__ = exports.__DEV__ = exports.RCFilePath = exports.HOME = exports.VERSION = exports.Env = void 0;

var _userHome = _interopRequireDefault(require("user-home"));

var path = _interopRequireWildcard(require("path"));

var _package = _interopRequireDefault(require("../../package.json"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let Env;
exports.Env = Env;

(function (Env) {
  Env["dev"] = "development";
  Env["prod"] = "production";
  Env["test"] = "test";
})(Env || (exports.Env = Env = {}));

const VERSION = _package.default.version;
exports.VERSION = VERSION;
const HOME = _userHome.default;
exports.HOME = HOME;
const RCFilePath = path.join(HOME, '.saberrc');
exports.RCFilePath = RCFilePath;

const __DEV__ = process.env.NODE_ENV === Env.dev;

exports.__DEV__ = __DEV__;

const __PROD__ = process.env.NODE_ENV === Env.prod || !process.env.NODE_ENV;

exports.__PROD__ = __PROD__;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9jb25zdGFudHMudHMiXSwibmFtZXMiOlsiRW52IiwiVkVSU0lPTiIsInBhY2thZ2VKc29uIiwidmVyc2lvbiIsIkhPTUUiLCJ1c2VySG9tZSIsIlJDRmlsZVBhdGgiLCJwYXRoIiwiam9pbiIsIl9fREVWX18iLCJwcm9jZXNzIiwiZW52IiwiTk9ERV9FTlYiLCJkZXYiLCJfX1BST0RfXyIsInByb2QiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFDQTs7Ozs7Ozs7SUFFWUEsRzs7O1dBQUFBLEc7QUFBQUEsRUFBQUEsRztBQUFBQSxFQUFBQSxHO0FBQUFBLEVBQUFBLEc7R0FBQUEsRyxtQkFBQUEsRzs7QUFLTCxNQUFNQyxPQUFjLEdBQUdDLGlCQUFZQyxPQUFuQzs7QUFDQSxNQUFNQyxJQUFXLEdBQUdDLGlCQUFwQjs7QUFDQSxNQUFNQyxVQUFpQixHQUFHQyxJQUFJLENBQUNDLElBQUwsQ0FBVUosSUFBVixFQUFnQixVQUFoQixDQUExQjs7O0FBQ0EsTUFBTUssT0FBZSxHQUFHQyxPQUFPLENBQUNDLEdBQVIsQ0FBWUMsUUFBWixLQUF5QlosR0FBRyxDQUFDYSxHQUFyRDs7OztBQUNBLE1BQU1DLFFBQWdCLEdBQUdKLE9BQU8sQ0FBQ0MsR0FBUixDQUFZQyxRQUFaLEtBQXlCWixHQUFHLENBQUNlLElBQTdCLElBQXFDLENBQUNMLE9BQU8sQ0FBQ0MsR0FBUixDQUFZQyxRQUEzRSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB1c2VySG9tZSBmcm9tICd1c2VyLWhvbWUnXG5pbXBvcnQgKiBhcyBwYXRoIGZyb20gJ3BhdGgnXG5pbXBvcnQgcGFja2FnZUpzb24gZnJvbSAnLi4vLi4vcGFja2FnZS5qc29uJ1xuXG5leHBvcnQgZW51bSBFbnYge1xuICBkZXYgPSAnZGV2ZWxvcG1lbnQnLFxuICBwcm9kID0gJ3Byb2R1Y3Rpb24nLFxuICB0ZXN0ID0gJ3Rlc3QnXG59XG5leHBvcnQgY29uc3QgVkVSU0lPTjpzdHJpbmcgPSBwYWNrYWdlSnNvbi52ZXJzaW9uXG5leHBvcnQgY29uc3QgSE9NRTpzdHJpbmcgPSB1c2VySG9tZVxuZXhwb3J0IGNvbnN0IFJDRmlsZVBhdGg6c3RyaW5nID0gcGF0aC5qb2luKEhPTUUsICcuc2FiZXJyYycpXG5leHBvcnQgY29uc3QgX19ERVZfXzpib29sZWFuID0gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09IEVudi5kZXZcbmV4cG9ydCBjb25zdCBfX1BST0RfXzpib29sZWFuID0gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09IEVudi5wcm9kIHx8ICFwcm9jZXNzLmVudi5OT0RFX0VOVlxuIl19