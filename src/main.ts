import * as commander from 'commander';
import './update-notifier';
import { VERSION, __PROD__ } from './utils/constants'
import apply from './apply'
import { getCommandOptions, getAvailableOptionKeys, getAvailableOptionNames} from './options'
import { Command, IActionOption } from './index.d'

const program:Command = new commander.Command()

program.version(VERSION)

const actions: IActionOption[] = [
  {
    name: 'init',
    alias: 'i',
    description: 'generate a new project',
    usages: ['saber init templateName projectName']
  },
  {
    name: 'config',
    alias: 'cfg',
    description: 'config .saberrc',
    usages: [
        'saber config set <k> <v>',
        'saber config get <k>',
        'saber config get',
        'saber config reset'
    ]
  }
];

getCommandOptions().forEach(option => {
  program.option(option.key, option.desc)
})

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

function help() {
  console.log('\r\nUsage:');
  actions.forEach((action: IActionOption) => {
    action.usages.forEach(usage => {
        console.log('  - ' + usage);
    });
  });
  console.log('\r');
}
program.on('-h', help)
program.on('--help', help)


program.parse(process.argv);


interface CommandInfo {
  actionName: string,
  actionArgs: any[]
}
function printCommandInfo(info: CommandInfo) {
  function printOptions() {
    const props = getAvailableOptionNames()
    let result = props.reduce((sum, prop) => sum + `
    ${prop}: ${program[prop]}
    `, '');
    console.log(
      'OPTIONS',
      result)
  }
  if (!__PROD__) {
    console.log(`
    MODE: ${process.env.NODE_ENV}
    ARGS:`,
    process.argv,
    `
    actionName: ${info.actionName}
    actionArgs: `,
    info.actionArgs
    )
    printOptions()
  }
}

function getActionArgs() {
  const args = process.argv.slice(3)
  const keys = getAvailableOptionKeys()
  return args.filter(item => !keys.includes(item))
}
