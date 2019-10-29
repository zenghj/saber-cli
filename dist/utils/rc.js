"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _constants = require("./constants");

var _fs = require("fs");

var _inquirer = _interopRequireDefault(require("inquirer"));

var _logger = _interopRequireDefault(require("./logger"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const registerKey = 'registry';
const DEFAULT_CONFIG = Object.freeze({
  v: 1,
  registries: ['saber-cli-templates'],
  currentRegistryIndex: 0
});
const CONFIG_KEYS = Object.keys(DEFAULT_CONFIG);

function getRCConfig() {
  if (!(0, _fs.existsSync)(_constants.RCFilePath)) return null;
  const configStr = (0, _fs.readFileSync)(_constants.RCFilePath, {
    encoding: 'utf-8'
  });
  const config = JSON.parse(configStr);
  return config;
}

class RC {
  constructor() {
    _defineProperty(this, "protectedConfigKeys", ['v', 'registries', 'currentRegistryIndex']);

    _defineProperty(this, "setableKeys", [...CONFIG_KEYS, registerKey].filter(item => !this.protectedConfigKeys.includes(item)));
  }

  static getInstance() {
    if (RC.instance == null) {
      RC.instance = new RC();
    }

    return RC.instance;
  }

  getConfig() {
    const config = getRCConfig();
    return config || JSON.parse(JSON.stringify(DEFAULT_CONFIG));
  }

  get(key) {
    if (key === registerKey) return this.getRegistry();
    const config = this.getConfig();
    return config ? config[key] : '';
  }

  set(key, value) {
    if (!key) return console.error('key is required!');
    if (!this.setableKeys.includes(key)) return console.error(`available keys: "${this.setableKeys.join(',')}" `);
    const config = this.getConfig();

    if (key === registerKey) {
      if (value == null) {
        return console.log('value can\'t be empty!');
      }

      if (config.registries.includes(value)) {
        config.currentRegistryIndex = config.registries.indexOf(value);
      } else {
        config.registries.push(value);
        config.currentRegistryIndex = config.registries.length - 1;
      }
    } else {
      config[key] = value;
    }

    console.log(config);
    return this.saveConfig(config);
  }

  reset() {
    return this.saveConfig(DEFAULT_CONFIG);
  }

  saveConfig(config) {
    return (0, _fs.writeFileSync)(_constants.RCFilePath, JSON.stringify(config, null, 2));
  }

  selectRegistry() {
    const config = this.getConfig();
    const registries = config.registries || [];
    const choices = registries.map((r, index) => ({
      value: index,
      name: r
    })); // console.log(choices, config.currentRegistryIndex)

    _inquirer.default.prompt({
      type: 'list',
      name: 'currentRegistryIndex',
      default: config.currentRegistryIndex,
      choices: choices,
      message: 'select a template registry'
    }).then(answers => {
      _logger.default.debug(answers);

      if (answers && answers.currentRegistryIndex !== undefined && answers.currentRegistryIndex !== config.currentRegistryIndex) {
        config.currentRegistryIndex = answers.currentRegistryIndex;
        this.saveConfig(config);
      }
    });
  }

  getDefaultRegistry() {
    return DEFAULT_CONFIG.registries[DEFAULT_CONFIG.currentRegistryIndex];
  }

  getRegistry() {
    const config = this.getConfig();
    return config.registries[config.currentRegistryIndex] || this.getDefaultRegistry();
  }

}

exports.default = RC;

_defineProperty(RC, "instance", void 0);