'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getConfig = getConfig;
exports.get = get;
exports.set = set;
exports.reset = reset;

var _constants = require('./constants');

var _fs = require('fs');

const DEFAULT = Object.freeze({
  registry: 'saber-cli-templates'
});

const CONFIG_KEYS = Object.keys(DEFAULT);

function getRCConfig() {
  if (!(0, _fs.existsSync)(_constants.RC)) return null;
  let config = (0, _fs.readFileSync)(_constants.RC, { encoding: 'utf-8' });
  config = JSON.parse(config);
  return config;
}

function getConfig() {
  const config = getRCConfig();
  return config || DEFAULT;
}

function get(key) {
  const config = getRCConfig();
  return config ? config[key] : '';
}

function set(key, value) {
  if (!key) return console.error('key is required!');
  if (!CONFIG_KEYS.includes(key)) return console.error(`available keys: "${CONFIG_KEYS.join(',')}" `);
  const config = getRCConfig() || {};
  config[key] = value;
  console.log(config[key]);
  return (0, _fs.writeFileSync)(_constants.RC, JSON.stringify(config, null, 2));
}

function reset() {
  return (0, _fs.writeFileSync)(_constants.RC, JSON.stringify(DEFAULT, null, 2));
}