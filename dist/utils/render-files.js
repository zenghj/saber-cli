"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = renderFiles;

var _async = _interopRequireDefault(require("async"));

var _multimatch = _interopRequireDefault(require("multimatch"));

var _consolidate = _interopRequireDefault(require("consolidate"));

var _logger = _interopRequireDefault(require("./logger"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const render = _consolidate.default.handlebars.render;

function renderFiles(skips, files, data, done) {
  const fileNames = Object.keys(files);

  _logger.default.debug('renderFiles', 'fileNames', fileNames, 'skips', skips);

  _async.default.each(fileNames, (fileName, callback) => {
    // skip specific files
    if ((0, _multimatch.default)([fileName], skips, {
      dot: true
    }).length) {
      return callback();
    }

    const str = files[fileName].contents.toString(); // skip file with no handlebar syntax

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