"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pkgJson = exports.__PROD__ = exports.__DEV__ = exports.RCFilePath = exports.HOME = exports.VERSION = exports.Env = void 0;

var _userHome = _interopRequireDefault(require("user-home"));

var path = _interopRequireWildcard(require("path"));

var _package = _interopRequireDefault(require("../../package.json"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

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
const pkgJson = Object.assign({}, _package.default);
exports.pkgJson = pkgJson;