'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.downloadAndGenerate = downloadAndGenerate;

var _fs = require('fs');

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _downloadGitRepo = require('download-git-repo');

var _downloadGitRepo2 = _interopRequireDefault(_downloadGitRepo);

var _ora = require('ora');

var _ora2 = _interopRequireDefault(_ora);

var _rimraf = require('rimraf');

var _shelljs = require('shelljs');

var _shelljs2 = _interopRequireDefault(_shelljs);

var _localPath = require('./local-path');

var _generate = require('./generate');

var _generate2 = _interopRequireDefault(_generate);

var _logger = require('./logger');

var _logger2 = _interopRequireDefault(_logger);

var _rc = require('./rc');

var _constants = require('./constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function downloadAndGenerate(templateName, projectName) {
  const program = this;
  const dest = _path2.default.resolve(projectName);
  const clone = program.clone || false;
  const privateRepo = program.private || false;

  function generateProject(projectName, templatePath, dest) {
    return (0, _generate2.default)(projectName, templatePath, dest, err => {
      if (err) {
        _logger2.default.fatal('Fail to generate!', err);
      } else {
        _logger2.default.success(`Generated ${projectName}.`);
      }
    });
  }

  async function cloneFromPrivateGitRepo(gitRepoUrl, dest) {
    if ((0, _fs.existsSync)(dest)) (0, _rimraf.sync)(dest);
    if (!_shelljs2.default.which('git')) {
      _shelljs2.default.echo('Sorry, this script requires git');
      _shelljs2.default.exit(1);
    }
    const projectName = _path2.default.basename(dest);
    const workDir = _path2.default.dirname(dest);
    _shelljs2.default.cd(workDir);
    const command = `git clone ${gitRepoUrl} ${projectName}`;
    console.log(command);
    _shelljs2.default.exec(command);
    return true;
  }

  async function downloadTemplate(templateName, projectName) {
    let config = (0, _rc.getConfig)();
    let api = `${config.registry}/${templateName}`;
    return new Promise((resolve, reject) => {
      _constants.__DEV__ && console.log('download repo from ', api);
      if (privateRepo) {
        cloneFromPrivateGitRepo(`${api}.git`, projectName).then(resolve, reject);
      } else {
        (0, _downloadGitRepo2.default)(`direct:${api}`, projectName, { clone }, err => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      }
    });
  }

  if ((0, _localPath.isLocalPath)(templateName)) {
    const templatePath = (0, _localPath.getTemplatePath)(templateName);
    if ((0, _fs.existsSync)(templatePath)) {
      return generateProject(projectName, templatePath, dest);
    } else {
      _logger2.default.fatal(`${templatePath} not exist.`);
    }
  } else {
    const tmp = _path2.default.join(_constants.HOME, 'saber-cli-templates', templateName.replace(/[\/:]/g, '-'));
    const spinner = (0, _ora2.default)('downloading template');
    spinner.start();
    if ((0, _fs.existsSync)(tmp)) (0, _rimraf.sync)(tmp);
    downloadTemplate(templateName, tmp).then(() => {
      return generateProject(projectName, tmp, dest);
    }, err => {
      return _logger2.default.fatal(`Fail to download template: ${templateName}, ${err}`);
    }).finally(() => {
      spinner.stop();
    });
  }
}