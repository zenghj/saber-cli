"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = list;

var _rc = _interopRequireDefault(require("../utils/rc"));

var _axios = _interopRequireDefault(require("axios"));

var _logger = _interopRequireDefault(require("../utils/logger"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

const rc = _rc.default.getInstance();

function isGithubRegistry(registry) {
  // https://www.npmjs.com/package/download-git-repo
  return !registry.includes(':');
}
/**
 * 获取github组织下的repo列表
 * @param orgName 
 * https://docs.github.com/en/free-pro-team@latest/rest/reference/repos
 */


function getGithubRepos(_x) {
  return _getGithubRepos.apply(this, arguments);
}

function _getGithubRepos() {
  _getGithubRepos = _asyncToGenerator(function* (orgName) {
    const api = `https://api.github.com/orgs/${orgName}/repos`;

    const _ref = yield _axios.default.get(api, {
      headers: {
        Accept: 'application/vnd.github.v3+json'
      }
    }),
          repos = _ref.data;

    return repos.map(item => ({
      name: item.name,
      full_name: item.full_name
    }));
  });
  return _getGithubRepos.apply(this, arguments);
}

function list() {
  return _list.apply(this, arguments);
}

function _list() {
  _list = _asyncToGenerator(function* () {
    const registry = rc.getRegistry();

    if (isGithubRegistry(registry)) {
      try {
        const repos = yield getGithubRepos(registry);
        console.log('Available templates:');
        console.log(repos.map(item => item.name).join('\n'));
      } catch (e) {
        _logger.default.fatal('fail to fetch repo list', e);
      }
    } else {
      console.log('only github registry support list command');
      process.exit();
    }
  });
  return _list.apply(this, arguments);
}