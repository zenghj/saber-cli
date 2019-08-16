'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = renderFiles;

var _async = require('async');

var _async2 = _interopRequireDefault(_async);

var _multimatch = require('multimatch');

var _multimatch2 = _interopRequireDefault(_multimatch);

var _consolidate = require('consolidate');

var _consolidate2 = _interopRequireDefault(_consolidate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const render = _consolidate2.default.handlebars.render;

function renderFiles(skips, files, data, done) {
  const fileNames = Object.keys(files);
  _async2.default.each(fileNames, (fileName, callback) => {
    if ((0, _multimatch2.default)([fileName], skips, {
      dot: true
    }).length) {
      return callback();
    }
    const str = files[fileName].contents.toString();
    if (!/{{([^{}]+)}}/g.test(str)) {
      return callback();
    }
    render(str, data, (err, res) => {
      if (err) {
        err.message = `[${fileName}] ${err.message}`;
        return callback(err);
      }
      files[fileName].contents = Buffer.from(res);
      callback();
    });
  }, done);
}