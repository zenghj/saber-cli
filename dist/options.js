'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCommandOptions = getCommandOptions;
exports.getAvailableOptionKeys = getAvailableOptionKeys;
exports.getAvailableOptionNames = getAvailableOptionNames;
class CommandOption {
  constructor(key, desc) {
    this.key = key;
    this.desc = desc;
  }
  getKeys() {
    return this.key.split(',').map(k => k.trim());
  }
  getPropName() {
    return this.getKeys()[1].trim().replace('--', '');
  }
}

const commandOptions = [new CommandOption('-c, --clone', 'use git clone'), new CommandOption('-p, --private', 'directly git clone from private repository, make sure you have access to the repository')];
const availableOptions = commandOptions.reduce((sum, option) => {
  sum.push(...option.getKeys());
  return sum;
}, []);

function getCommandOptions() {
  return [...commandOptions];
}

function getAvailableOptionKeys() {
  return [...availableOptions];
}

function getAvailableOptionNames() {
  return commandOptions.map(o => o.getPropName());
}