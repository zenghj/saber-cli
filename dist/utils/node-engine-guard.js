"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = nodeEngineGuard;

var _semver = _interopRequireDefault(require("semver"));

var _logger = _interopRequireDefault(require("./logger"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function nodeEngineGuard(versionRequirement, done) {
  if (_semver.default.satisfies(process.version, versionRequirement)) {
    return done();
  }

  _logger.default.fatal(`Your node engine version must ${versionRequirement}`);
}