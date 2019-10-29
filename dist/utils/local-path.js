"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isLocalPath = isLocalPath;
exports.getTemplatePath = getTemplatePath;

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isLocalPath(templatePath) {
  return /^[./]|(^[a-zA-Z]:)/.test(templatePath);
}

function getTemplatePath(templatePath) {
  return _path.default.isAbsolute(templatePath) ? templatePath : _path.default.normalize(_path.default.join(process.cwd(), templatePath));
}