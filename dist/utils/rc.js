"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _constants = require("./constants");

var _fs = require("fs");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const DEFAULT = Object.freeze({
  registry: 'saber-cli-templates'
});
const CONFIG_KEYS = Object.keys(DEFAULT);

function getRCConfig() {
  if (!(0, _fs.existsSync)(_constants.RCFilePath)) return null;
  const configStr = (0, _fs.readFileSync)(_constants.RCFilePath, {
    encoding: 'utf-8'
  });
  const config = JSON.parse(configStr);
  return config;
}

class RC {
  static getInstance() {
    if (RC.instance == null) {
      RC.instance = new RC();
    }

    return RC.instance;
  }

  getConfig() {
    const config = getRCConfig();
    return config || DEFAULT;
  }

  get(key) {
    const config = getRCConfig();
    return config ? config[key] : '';
  }

  set(key, value) {
    if (!key) return console.error('key is required!');
    if (!CONFIG_KEYS.includes(key)) return console.error(`available keys: "${CONFIG_KEYS.join(',')}" `);
    const config = getRCConfig() || {};
    config[key] = value;
    console.log(config[key]);
    return (0, _fs.writeFileSync)(_constants.RCFilePath, JSON.stringify(config, null, 2));
  }

  reset() {
    return (0, _fs.writeFileSync)(_constants.RCFilePath, JSON.stringify(DEFAULT, null, 2));
  }

}

exports.default = RC;

_defineProperty(RC, "instance", void 0);