"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.downloadAndGenerate = downloadAndGenerate;

var _fs = require("fs");

var _path = _interopRequireDefault(require("path"));

var _downloadGitRepo = _interopRequireDefault(require("download-git-repo"));

var _ora = _interopRequireDefault(require("ora"));

var _rimraf = require("rimraf");

var _shelljs = _interopRequireDefault(require("shelljs"));

var _localPath = require("./local-path");

var _generate = _interopRequireDefault(require("./generate"));

var _logger = _interopRequireDefault(require("./logger"));

var _rc = _interopRequireDefault(require("./rc"));

var _constants = require("./constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

const rc = _rc.default.getInstance();

function downloadAndGenerate(templateName, projectName) {
  const program = this;

  const dest = _path.default.resolve(projectName);

  const clone = program.clone || false;
  const privateRepo = program.private || false;

  function generateProject(projectName, templatePath, dest) {
    return (0, _generate.default)(projectName, templatePath, dest, err => {
      if (err) {
        _logger.default.fatal('Fail to generate!', err);
      } else {
        _logger.default.success(`Generated ${projectName}.`);
      }
    });
  }

  function cloneFromPrivateGitRepo(_x, _x2) {
    return _cloneFromPrivateGitRepo.apply(this, arguments);
  }

  function _cloneFromPrivateGitRepo() {
    _cloneFromPrivateGitRepo = _asyncToGenerator(function* (gitRepoUrl, dest) {
      if ((0, _fs.existsSync)(dest)) (0, _rimraf.sync)(dest);

      if (!_shelljs.default.which('git')) {
        _shelljs.default.echo('Sorry, this script requires git');

        _shelljs.default.exit(1);
      }

      const projectName = _path.default.basename(dest);

      const workDir = _path.default.dirname(dest);

      _shelljs.default.cd(workDir);

      const command = `git clone ${gitRepoUrl} ${projectName}`;
      console.log(command);

      _shelljs.default.exec(command);

      return true;
    });
    return _cloneFromPrivateGitRepo.apply(this, arguments);
  }

  function downloadTemplate(_x3, _x4) {
    return _downloadTemplate.apply(this, arguments);
  }

  function _downloadTemplate() {
    _downloadTemplate = _asyncToGenerator(function* (templateName, projectName) {
      let config = rc.getConfig();
      let api = `${config.registry}/${templateName}`;
      return new Promise((resolve, reject) => {
        _constants.__DEV__ && console.log('download repo from ', api);

        if (privateRepo) {
          cloneFromPrivateGitRepo(`${api}.git`, projectName).then(resolve, reject);
        } else {
          (0, _downloadGitRepo.default)(`${api}`, projectName, {
            clone
          }, err => {
            if (err) {
              reject(err);
            } else {
              resolve();
            }
          });
        }
      });
    });
    return _downloadTemplate.apply(this, arguments);
  }

  if ((0, _localPath.isLocalPath)(templateName)) {
    const templatePath = (0, _localPath.getTemplatePath)(templateName);

    if ((0, _fs.existsSync)(templatePath)) {
      return generateProject(projectName, templatePath, dest);
    } else {
      _logger.default.fatal(`${templatePath} not exist.`);
    }
  } else {
    const tmp = _path.default.join(_constants.HOME, 'saber-cli-templates', templateName.replace(/[\/:]/g, '-'));

    const spinner = (0, _ora.default)('downloading template');
    spinner.start();
    if ((0, _fs.existsSync)(tmp)) (0, _rimraf.sync)(tmp);
    downloadTemplate(templateName, tmp).then(() => {
      return generateProject(projectName, tmp, dest);
    }, err => {
      return _logger.default.fatal(`Fail to download template: ${templateName}\n${err}`);
    }).finally(() => {
      spinner.stop();
    });
  }
}