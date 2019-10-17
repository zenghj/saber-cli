'use strict';

var _commander = require('commander');

var _commander2 = _interopRequireDefault(_commander);

var _constants = require('./utils/constants');

var _apply = require('./apply');

var _apply2 = _interopRequireDefault(_apply);

var _options = require('./options');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const program = new _commander2.default.Command();

program.version(_constants.VERSION);

const actionMap = {
  init: {
    description: 'generate a new project',
    usages: ['saber init templateName projectName']
  },
  config: {
    alias: 'cfg',
    description: 'config .saberrc',
    usages: ['saber config set <k> <v>', 'saber config get <k>', 'saber config get', 'saber config reset']
  }
};

(0, _options.getCommandOptions)().forEach(option => {
  program.option(option.key, option.desc);
});

Object.keys(actionMap).forEach(actionName => {
  program.command(actionName).description(actionMap[actionName].description).alias(actionMap[actionName].alias).action(() => {
    const actionArgs = getActionArgs();
    printCommandInfo({
      actionArgs,
      actionName
    });
    (0, _apply2.default)(program, actionName, ...actionArgs);
  });
});

function help() {
  console.log('\r\nUsage:');
  Object.keys(actionMap).forEach(action => {
    actionMap[action].usages.forEach(usage => {
      console.log('  - ' + usage);
    });
  });
  console.log('\r');
}
program.on('-h', help);
program.on('--help', help);

program.parse(process.argv);

function printCommandInfo(info) {
  function printOptions() {
    const props = (0, _options.getAvailableOptionNames)();
    let result = props.reduce((sum, prop) => sum + `
    ${prop}: ${program[prop]}
    `, '');
    console.log('OPTIONS', result);
  }
  if (!_constants.__PROD__) {
    console.log(`
    MODE: ${process.env.NODE_ENV}
    ARGS:`, process.argv, `
    actionName: ${info.actionName}
    actionArgs: `, info.actionArgs);
    printOptions();
  }
}

function getActionArgs() {
  const args = process.argv.slice(3);
  const keys = (0, _options.getAvailableOptionKeys)();
  return args.filter(item => !keys.includes(item));
}