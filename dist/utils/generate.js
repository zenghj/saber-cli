'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fs = require('fs');

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _metalsmith = require('metalsmith');

var _metalsmith2 = _interopRequireDefault(_metalsmith);

var _consolidate = require('consolidate');

var _consolidate2 = _interopRequireDefault(_consolidate);

var _ask = require('./ask');

var _ask2 = _interopRequireDefault(_ask);

var _filter = require('./filter');

var _filter2 = _interopRequireDefault(_filter);

var _logger = require('./logger');

var _logger2 = _interopRequireDefault(_logger);

var _renderFiles = require('./render-files');

var _renderFiles2 = _interopRequireDefault(_renderFiles);

var _gitUser = require('./git-user');

var _gitUser2 = _interopRequireDefault(_gitUser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const render = _consolidate2.default.handlebars.render;

function getMetaData(name, dir) {
  let data = {};
  const json = _path2.default.join(dir, 'meta.json');
  if ((0, _fs.existsSync)(json)) {
    data = require(json);
  }
  setDefaultPromptVal(data, 'name', name);
  const author = (0, _gitUser2.default)();
  if (author) {
    setDefaultPromptVal(data, 'author', author);
  }
  return data;
}

function setDefaultPromptVal(opts, key, value) {
  const prompts = opts.prompts || (opts.prompts = {});
  if (!prompts[key] || typeof prompts[key] !== 'object') {
    prompts[key] = {
      type: 'string',
      default: value
    };
  } else {
    prompts[key].default = value;
  }
}

exports.default = async function generate(name, src, dest, done) {
  debugger;
  const metalsmith = (0, _metalsmith2.default)(_path2.default.join(src, 'template'));
  const options = getMetaData(name, src);
  const metaData = metalsmith.metadata();
  Object.assign(metaData, {
    destDirName: name
  });
  metalsmith.use(askQuestions(options.prompts)).use(filterFiles(options.filters)).use(renderTemplateFiles(options.skipInterpolation));

  metalsmith.clean(false).destination(dest).source('.') // start from template root instead of `./src`
  .build((err, files) => {
    done(err);
    if (typeof options.complete === 'function') {
      options.complete(metaData);
    } else {
      logMessage(options.completeMessage, metaData);
    }
  });
};

function filterFiles(filters) {
  return function (files, metalsmith, done) {
    (0, _filter2.default)(filters, files, metalsmith.metadata(), done);
  };
}
function askQuestions(promps) {
  return function (files, metalsmith, done) {
    (0, _ask2.default)(promps, metalsmith.metadata(), done);
  };
}

function renderTemplateFiles(skipInterpolation) {
  skipInterpolation = typeof skipInterpolation === 'string' ? [skipInterpolation] : skipInterpolation;
  return function (files, metalsmith, done) {
    (0, _renderFiles2.default)(skipInterpolation, files, metalsmith.metadata(), done);
  };
}
/**
 * Display template complete message.
 *
 * @param {String} message
 * @param {Object} data
 */

function logMessage(message, data) {
  if (!message) return;
  render(message, data, (err, res) => {
    if (err) {
      console.error('\n   Error when rendering template complete message: ' + err.message.trim());
    } else {
      console.log('\n' + res.split(/\r?\n/g).map(line => '   ' + line).join('\n'));
    }
  });
}