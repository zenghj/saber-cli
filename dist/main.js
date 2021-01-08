"use strict";

var commander = _interopRequireWildcard(require("commander"));

require("./update-notifier");

var _constants = require("./utils/constants");

var _apply = _interopRequireDefault(require("./apply"));

var _options = require("./options");

var _nodeEngineGuard = _interopRequireDefault(require("./utils/node-engine-guard"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const actions = [{
  name: 'init',
  alias: 'i',
  description: 'generate a new project',
  usages: [['saber init templateName projectName', 'create a project from a template']]
}, {
  name: 'config',
  alias: 'cfg',
  description: 'config .saberrc',
  usages: [['saber config set <k> <v>', 'set config'], ['saber config set registry $registryUri', 'set a template registry'], ['saber config get <k>', 'get config[k]'], ['saber config get', 'get total config'], ['saber config reset', 'reset total config'], ['saber config select-registry', 'select registry from config.registries'], ['saber config sr', 'abbreviation of "saber config select-registry"']]
}, {
  name: 'list',
  alias: 'ls',
  description: 'list available templates',
  usages: [['saber list', 'list available templates'], ['saber ls', 'abbreviation of "saber list"']]
}, {
  name: 'version',
  alias: 'v',
  description: 'current cli version',
  usages: [['saber version', 'current cli version'], ['saber v', 'abbreviation of "saber version"']]
}];
let program;
(0, _nodeEngineGuard.default)(_constants.pkgJson.engines.node, run);

function run() {
  program = new commander.Command();
  program.version(_constants.VERSION);
  assemblyProgramOptions();
  assemblyProgramActions();
  program.on('-h', help);
  program.on('--help', help);
  program.parse(process.argv);
}

function assemblyProgramOptions() {
  (0, _options.getCommandOptions)().forEach(option => {
    program.option(option.key, option.desc);
  });
}

function assemblyProgramActions() {
  actions.forEach(action => {
    program.command(action.name).description(action.description).alias(action.alias).action(() => {
      const actionArgs = getActionArgs();
      printCommandInfo({
        actionArgs,
        actionName: action.name
      });
      (0, _apply.default)(program, action.name, ...actionArgs);
    });
  });
}

function help() {
  function getUsagePadding() {
    let width = 0;
    actions.forEach(action => {
      action.usages.forEach(usage => {
        const w = usage[0].length;

        if (w > width) {
          width = w;
        }
      });
    });
    return width;
  }

  function withPadding(width, str) {
    return str.padEnd(width, ' ');
  }

  console.log('\r\nUsage:');
  const padding = getUsagePadding();
  actions.forEach(action => {
    action.usages.forEach(usage => {
      console.log('  - ' + `${withPadding(padding, usage[0])}  ${usage[1]}`);
    });
  });
  console.log('\r');
}

function printCommandInfo({
  actionName,
  actionArgs
}) {
  function getProgramOptionValues() {
    const props = (0, _options.getAvailableOptionNames)();
    return props.reduce((result, prop) => {
      result[prop] = program[prop];
      return result;
    }, {});
  }

  const result = {
    MODE: process.env.NODE_ENV,
    ARGS: process.argv,
    ACTION_NAME: actionName,
    ACTION_ARGS: actionArgs,
    OPTIONS: getProgramOptionValues()
  };

  function printResult(data) {
    // Object.keys(data).forEach(key => {
    //   data[key] = JSON.stringify(data[key], null, 2)
    // })
    console.log(data);
  }

  if (!_constants.__PROD__) {
    printResult(result);
  }
}

function getActionArgs() {
  const args = process.argv.slice(3);
  const keys = (0, _options.getAvailableOptionKeys)();
  return args.filter(item => !keys.includes(item));
}