"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = generate;

var _fs = require("fs");

var _path = _interopRequireDefault(require("path"));

var _metalsmith = _interopRequireDefault(require("metalsmith"));

var _consolidate = _interopRequireDefault(require("consolidate"));

var _ask = _interopRequireDefault(require("./ask"));

var _filter = _interopRequireDefault(require("./filter"));

var _renderFiles = _interopRequireDefault(require("./render-files"));

var _gitUser = _interopRequireDefault(require("./git-user"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

const render = _consolidate.default.handlebars.render;

function getMetaData(name, dir) {
  let data = {
    prompts: {},
    completeMessage: ''
  };

  const json = _path.default.join(dir, 'meta.json');

  if ((0, _fs.existsSync)(json)) {
    data = require(json);
  }

  setDefaultPromptVal(data, 'name', name);
  const author = (0, _gitUser.default)();

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
      label: key,
      default: value
    };
  } else {
    prompts[key].default = value;
  }
}
/**
 * 
 * @param name project name
 * @param src origin repo path
 * @param destination path of generated project
 * @param callback will be invoked after generating finish
 */


function generate(_x, _x2, _x3, _x4) {
  return _generate.apply(this, arguments);
}

function _generate() {
  _generate = _asyncToGenerator(function* (name, src, dest, done) {
    const metalsmith = (0, _metalsmith.default)(_path.default.join(src, 'template'));
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
  });
  return _generate.apply(this, arguments);
}

function filterFiles(filters) {
  return function (files, metalsmith, done) {
    (0, _filter.default)(filters, files, metalsmith.metadata(), done);
  };
}

function askQuestions(promps) {
  return function (files, metalsmith, done) {
    (0, _ask.default)(promps, metalsmith.metadata(), done);
  };
}

function renderTemplateFiles(skipInterpolation) {
  skipInterpolation = typeof skipInterpolation === 'string' ? [skipInterpolation] : skipInterpolation;
  return function (files, metalsmith, done) {
    (0, _renderFiles.default)(skipInterpolation, files, metalsmith.metadata(), done);
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