"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = filter;

var _eval = _interopRequireDefault(require("./eval"));

var _minimatch = _interopRequireDefault(require("minimatch"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function filter(filters, files, data, done) {
  if (!filters) {
    return done();
  }

  const fileNames = Object.keys(files);
  Object.keys(filters).forEach(glob => {
    fileNames.forEach(file => {
      if ((0, _minimatch.default)(file, glob, {
        dot: true
      })) {
        const condition = filters[glob];

        if (!(0, _eval.default)(condition, data)) {
          delete files[file];
        }
      }
    });
  });
}