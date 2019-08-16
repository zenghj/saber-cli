'use strict';

var _commander = require('commander');

var _commander2 = _interopRequireDefault(_commander);

var _constants = require('./utils/constants');

var _apply = require('./apply');

var _apply2 = _interopRequireDefault(_apply);

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

program.option('-c, --clone', 'use git clone');

Object.keys(actionMap).forEach(actionName => {
  program.command(actionName).description(actionMap[actionName].description).alias(actionMap[actionName].alias).action(() => {
    (0, _apply2.default)(program, actionName, ...process.argv.slice(3));
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