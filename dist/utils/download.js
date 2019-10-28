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

  async function cloneFromPrivateGitRepo(gitRepoUrl, dest) {
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
  }

  async function downloadTemplate(templateName, projectName) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9kb3dubG9hZC50cyJdLCJuYW1lcyI6WyJyYyIsIlJDIiwiZ2V0SW5zdGFuY2UiLCJkb3dubG9hZEFuZEdlbmVyYXRlIiwidGVtcGxhdGVOYW1lIiwicHJvamVjdE5hbWUiLCJwcm9ncmFtIiwiZGVzdCIsInBhdGgiLCJyZXNvbHZlIiwiY2xvbmUiLCJwcml2YXRlUmVwbyIsInByaXZhdGUiLCJnZW5lcmF0ZVByb2plY3QiLCJ0ZW1wbGF0ZVBhdGgiLCJlcnIiLCJsb2dnZXIiLCJmYXRhbCIsInN1Y2Nlc3MiLCJjbG9uZUZyb21Qcml2YXRlR2l0UmVwbyIsImdpdFJlcG9VcmwiLCJzaGVsbCIsIndoaWNoIiwiZWNobyIsImV4aXQiLCJiYXNlbmFtZSIsIndvcmtEaXIiLCJkaXJuYW1lIiwiY2QiLCJjb21tYW5kIiwiY29uc29sZSIsImxvZyIsImV4ZWMiLCJkb3dubG9hZFRlbXBsYXRlIiwiY29uZmlnIiwiZ2V0Q29uZmlnIiwiYXBpIiwicmVnaXN0cnkiLCJQcm9taXNlIiwicmVqZWN0IiwiX19ERVZfXyIsInRoZW4iLCJ0bXAiLCJqb2luIiwiSE9NRSIsInJlcGxhY2UiLCJzcGlubmVyIiwic3RhcnQiLCJmaW5hbGx5Iiwic3RvcCJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOzs7O0FBRUEsTUFBTUEsRUFBRSxHQUFHQyxZQUFHQyxXQUFILEVBQVg7O0FBRU8sU0FBU0MsbUJBQVQsQ0FBOEJDLFlBQTlCLEVBQW9EQyxXQUFwRCxFQUF5RTtBQUM5RSxRQUFNQyxPQUFPLEdBQUcsSUFBaEI7O0FBQ0EsUUFBTUMsSUFBSSxHQUFHQyxjQUFLQyxPQUFMLENBQWFKLFdBQWIsQ0FBYjs7QUFDQSxRQUFNSyxLQUFLLEdBQUdKLE9BQU8sQ0FBQ0ksS0FBUixJQUFpQixLQUEvQjtBQUNBLFFBQU1DLFdBQVcsR0FBR0wsT0FBTyxD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R0FBRyxrQkFBSSxzQkFBSixDQUFoQjtBQUNBQSxJQUFBQSxPQUFPLENBQUNDLEtBQVI7QUFDQSxRQUFJLG9CQUFXTCxHQUFYLENBQUosRUFBcUIsa0JBQU9BLEdBQVA7QUFDckJULElBQUFBLGdCQUFnQixDQUFDN0IsWUFBRCxFQUFlc0MsR0FBZixDQUFoQixDQUFvQ0QsSUFBcEMsQ0FBeUMsTUFBTTtBQUM3QyxhQUFPNUIsZUFBZSxDQUFDUixXQUFELEVBQWNxQyxHQUFkLEVBQW1CbkMsSUFBbkIsQ0FBdEI7QUFDRCxLQUZELEVBRUdRLEdBQUcsSUFBSTtBQUNSLGFBQU9DLGdCQUFPQyxLQUFQLENBQWMsOEJBQTZCYixZQUFhLEtBQUlXLEdBQUksRUFBaEUsQ0FBUDtBQUNELEtBSkQsRUFJR2lDLE9BSkgsQ0FJVyxNQUFNO0FBQ2ZGLE1BQUFBLE9BQU8sQ0FBQ0csSUFBUjtBQUNELEtBTkQ7QUFPRDtBQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZXhpc3RzU3luYyB9IGZyb20gJ2ZzJ1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCdcbmltcG9ydCBkb3dubG9hZEdpdCBmcm9tICdkb3dubG9hZC1naXQtcmVwbydcbmltcG9ydCBvcmEgZnJvbSAnb3JhJ1xuaW1wb3J0IHsgc3luYyBhcyBybVN5bmMgfSBmcm9tICdyaW1yYWYnXG5pbXBvcnQgc2hlbGwgZnJvbSAnc2hlbGxqcydcbmltcG9ydCB7IGlzTG9jYWxQYXRoLCBnZXRUZW1wbGF0ZVBhdGggfSBmcm9tICcuL2xvY2FsLXBhdGgnXG5pbXBvcnQgZ2VuZXJhdGUgZnJvbSAnLi9nZW5lcmF0ZSdcbmltcG9ydCBsb2dnZXIgZnJvbSAnLi9sb2dnZXInXG5pbXBvcnQgUkMgZnJvbSAnLi9yYydcbmltcG9ydCB7IEhPTUUsIF9fREVWX18gfSBmcm9tICcuL2NvbnN0YW50cydcblxuY29uc3QgcmMgPSBSQy5nZXRJbnN0YW5jZSgpO1xuXG5leHBvcnQgZnVuY3Rpb24gZG93bmxvYWRBbmRHZW5lcmF0ZSAodGVtcGxhdGVOYW1lOiBzdHJpbmcsIHByb2plY3ROYW1lOiBzdHJpbmcpIHtcbiAgY29uc3QgcHJvZ3JhbSA9IHRoaXNcbiAgY29uc3QgZGVzdCA9IHBhdGgucmVzb2x2ZShwcm9qZWN0TmFtZSlcbiAgY29uc3QgY2xvbmUgPSBwcm9ncmFtLmNsb25lIHx8IGZhbHNlXG4gIGNvbnN0IHByaXZhdGVSZXBvID0gcHJvZ3JhbS5wcml2YXRlIHx8IGZhbHNlXG5cbiAgZnVuY3Rpb24gZ2VuZXJhdGVQcm9qZWN0KHByb2plY3ROYW1lLCB0ZW1wbGF0ZVBhdGgsIGRlc3QpIHtcbiAgICByZXR1cm4gZ2VuZXJhdGUocHJvamVjdE5hbWUsIHRlbXBsYXRlUGF0aCwgZGVzdCwgKGVycikgPT4ge1xuICAgICAgaWYgKGVycikge1xuICAgICAgICBsb2dnZXIuZmF0YWwoJ0ZhaWwgdG8gZ2VuZXJhdGUhJywgZXJyKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbG9nZ2VyLnN1Y2Nlc3MoYEdlbmVyYXRlZCAke3Byb2plY3ROYW1lfS5gKVxuICAgICAgfVxuICAgIH0pXG4gIH1cblxuICBhc3luYyBmdW5jdGlvbiBjbG9uZUZyb21Qcml2YXRlR2l0UmVwbyhnaXRSZXBvVXJsLCBkZXN0KSB7XG4gICAgaWYgKGV4aXN0c1N5bmMoZGVzdCkpIHJtU3luYyhkZXN0KVxuICAgIGlmICghc2hlbGwud2hpY2goJ2dpdCcpKSB7XG4gICAgICBzaGVsbC5lY2hvKCdTb3JyeSwgdGhpcyBzY3JpcHQgcmVxdWlyZXMgZ2l0Jyk7XG4gICAgICBzaGVsbC5leGl0KDEpO1xuICAgIH1cbiAgICBjb25zdCBwcm9qZWN0TmFtZSA9IHBhdGguYmFzZW5hbWUoZGVzdClcbiAgICBjb25zdCB3b3JrRGlyID0gcGF0aC5kaXJuYW1lKGRlc3QpXG4gICAgc2hlbGwuY2Qod29ya0RpcilcbiAgICBjb25zdCBjb21tYW5kID0gYGdpdCBjbG9uZSAke2dpdFJlcG9Vcmx9ICR7cHJvamVjdE5hbWV9YFxuICAgIGNvbnNvbGUubG9nKGNvbW1hbmQpXG4gICAgc2hlbGwuZXhlYyhjb21tYW5kKVxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgYXN5bmMgZnVuY3Rpb24gZG93bmxvYWRUZW1wbGF0ZSAodGVtcGxhdGVOYW1lOiBzdHJpbmcsIHByb2plY3ROYW1lOiBzdHJpbmcpIHtcbiAgICBsZXQgY29uZmlnID0gcmMuZ2V0Q29uZmlnKClcbiAgICBsZXQgYXBpID0gYCR7Y29uZmlnLnJlZ2lzdHJ5fS8ke3RlbXBsYXRlTmFtZX1gXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIF9fREVWX18gJiYgY29uc29sZS5sb2coJ2Rvd25sb2FkIHJlcG8gZnJvbSAnLCBhcGkpXG4gICAgICBpZiAocHJpdmF0ZVJlcG8pIHtcbiAgICAgICAgY2xvbmVGcm9tUHJpdmF0ZUdpdFJlcG8oYCR7YXBpfS5naXRgLCBwcm9qZWN0TmFtZSkudGhlbihyZXNvbHZlLCByZWplY3QpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkb3dubG9hZEdpdChgJHthcGl9YCwgcHJvamVjdE5hbWUsIHsgY2xvbmUsIH0sIGVyciA9PiB7XG4gICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgcmVqZWN0KGVycilcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVzb2x2ZSgpXG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH0pXG4gIH1cblxuICBpZiAoaXNMb2NhbFBhdGgodGVtcGxhdGVOYW1lKSkge1xuICAgIGNvbnN0IHRlbXBsYXRlUGF0aCA9IGdldFRlbXBsYXRlUGF0aCh0ZW1wbGF0ZU5hbWUpXG4gICAgaWYgKGV4aXN0c1N5bmModGVtcGxhdGVQYXRoKSkge1xuICAgICAgcmV0dXJuIGdlbmVyYXRlUHJvamVjdChwcm9qZWN0TmFtZSwgdGVtcGxhdGVQYXRoLCBkZXN0KVxuICAgIH0gZWxzZSB7XG4gICAgICBsb2dnZXIuZmF0YWwoYCR7dGVtcGxhdGVQYXRofSBub3QgZXhpc3QuYClcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgY29uc3QgdG1wID0gcGF0aC5qb2luKEhPTUUsICdzYWJlci1jbGktdGVtcGxhdGVzJywgdGVtcGxhdGVOYW1lLnJlcGxhY2UoL1tcXC86XS9nLCAnLScpKVxuICAgIGNvbnN0IHNwaW5uZXIgPSBvcmEoJ2Rvd25sb2FkaW5nIHRlbXBsYXRlJylcbiAgICBzcGlubmVyLnN0YXJ0KClcbiAgICBpZiAoZXhpc3RzU3luYyh0bXApKSBybVN5bmModG1wKVxuICAgIGRvd25sb2FkVGVtcGxhdGUodGVtcGxhdGVOYW1lLCB0bXApLnRoZW4oKCkgPT4ge1xuICAgICAgcmV0dXJuIGdlbmVyYXRlUHJvamVjdChwcm9qZWN0TmFtZSwgdG1wLCBkZXN0KVxuICAgIH0sIGVyciA9PiB7XG4gICAgICByZXR1cm4gbG9nZ2VyLmZhdGFsKGBGYWlsIHRvIGRvd25sb2FkIHRlbXBsYXRlOiAke3RlbXBsYXRlTmFtZX1cXG4ke2Vycn1gKVxuICAgIH0pLmZpbmFsbHkoKCkgPT4ge1xuICAgICAgc3Bpbm5lci5zdG9wKClcbiAgICB9KVxuICB9XG59Il19