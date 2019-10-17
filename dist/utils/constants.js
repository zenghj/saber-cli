'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.__PROD__ = exports.__DEV__ = exports.RC = exports.HOME = exports.VERSION = undefined;

var _userHome = require('user-home');

var _userHome2 = _interopRequireDefault(_userHome);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _package = require('../../package.json');

var _package2 = _interopRequireDefault(_package);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const VERSION = exports.VERSION = _package2.default.version;
const HOME = exports.HOME = _userHome2.default;
const RC = exports.RC = _path2.default.join(HOME, '.saberrc');
const __DEV__ = exports.__DEV__ = process.env.NODE_ENV === 'development';
const __PROD__ = exports.__PROD__ = process.env.NODE_ENV === 'production' || !process.env.NODE_ENV;