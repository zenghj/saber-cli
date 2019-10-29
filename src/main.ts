import * as commander from 'commander';
import './update-notifier';
import { VERSION, __PROD__, pkgJson } from './utils/constants'
import apply from './apply'
import { getCommandOptions, getAvailableOptionKeys, getAvailableOptionNames } from './options'
import { Command, IActionOption } from './index.d'
import nodeEngineGuard from './utils/node-engine-guard'

const actions: IActionOption[] = [
  {
    name: 'init',
    alias: 'i',
    description: 'generate a new project',
    usages: [
      ['saber init templateName projectName', 'create a project from a template']
    ]
  },
  {
    name: 'config',
    alias: 'cfg',
    description: 'config .saberrc',
    usages: [
      ['saber config set <k> <v>', 'set config'],
      ['saber config get <k>', 'get config[k]'],
      ['saber config get', 'get total config'], 
      ['saber config reset', 'reset total config'],
      ['saber config select-registry', 'select registry from config.registries'],
      ['saber config sr', 'abbreviation of "saber config select-registry"']
    ]
  }
];
let program: Command;

nodeEngineGuard(pkgJson.engines.node, run)

function run() {
  program = new commander.Command()
  program.version(VERSION)

  assemblyProgramOptions();
  assemblyProgramActions();

  program.on('-h', help)
  program.on('--help', help)

  program.parse(process.argv);
}

function assemblyProgramOptions() {
  getCommandOptions().forEach(option => {
    program.option(option.key, option.desc)
  })
}

function assemblyProgramActions() {
  actions.forEach(action => {
    program.command(action.name)
      .description(action.description)
      .alias(action.alias)
      .action(() => {
        const actionArgs = getActionArgs()
        printCommandInfo({
          actionArgs,
          actionName: action.name
        })
        apply(program, action.name, ...actionArgs)
      })
  })
}

function help() {
  function getUsagePadding(): number {
    let width = 0;
    actions.forEach((action: IActionOption) => {
      action.usages.forEach(usage => {
        const w = usage[0].length
        if (w > width) {
          width = w
        }
      });
    });
    return width
  }
  function withPadding(width: number, str: string) {
    return str.padEnd(width, ' ')
  }
  console.log('\r\nUsage:');
  const padding = getUsagePadding();
  
  actions.forEach((action: IActionOption) => {
    action.usages.forEach(usage => {
      console.log('  - ' + `${withPadding(padding, usage[0])}  ${usage[1]}`);
    });
  });
  console.log('\r');
}

function printCommandInfo({actionName, actionArgs}) {
  function getProgramOptionValues() {
    const props = getAvailableOptionNames()
    return props.reduce((result, prop) => {
      result[prop] = program[prop]
      return result;
    } , {});
  }

  const result = {
    MODE: process.env.NODE_ENV,
    ARGS: process.argv,
    ACTION_NAME: actionName,
    ACTION_ARGS: actionArgs,
    OPTIONS: getProgramOptionValues(),
  }

  function printResult(data) {
    // Object.keys(data).forEach(key => {
    //   data[key] = JSON.stringify(data[key], null, 2)
    // })
    console.log(data);
  }
  
  if (!__PROD__) {
    printResult(result)
  }
}

function getActionArgs() {
  const args = process.argv.slice(3)
  const keys = getAvailableOptionKeys()
  return args.filter(item => !keys.includes(item))
}
