'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (filters, files, data, done) {
  debugger;
  if (!filters) {
    return done();
  }
  const fileNames = Object.keys(files);
  Object.keys(filters).forEach(glob => {
    fileNames.forEach(file => {
      if ((0, _minimatch2.default)(file, glob, {
        dot: true
      })) {
        const condition = filters[glob];
        if (!(0, _eval2.default)(condition, data)) {
          delete files[file];
        }
      }
    });
  });
};

var _eval = require('./eval');

var _eval2 = _interopRequireDefault(_eval);

var _minimatch = require('minimatch');

var _minimatch2 = _interopRequireDefault(_minimatch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }