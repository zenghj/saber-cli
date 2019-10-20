import commander from 'commander';
import './update-notifier';
import { VERSION, __PROD__ } from './utils/constants'
import apply from './apply'
import { getCommandOptions, getAvailableOptionKeys, getAvailableOptionNames} from './options'

const program = new commander.Command()

program.version(VERSION)

const actionMap = {
  init: {
    description: 'generate a new project',
    usages: ['saber init templateName projectName']
  },
  config: {
    alias: 'cfg',
    description: 'config .saberrc',
    usages: [
        'saber config set <k> <v>',
        'saber config get <k>',
        'saber config get',
        'saber config reset'
    ]
  }
}

getCommandOptions().forEach(option => {
  program.option(option.key, option.desc)
})

Object.keys(actionMap).forEach(actionName => {
  program.command(actionName)
    .description(actionMap[actionName].description)
    .alias(actionMap[actionName].alias)
    .action(() => {
      const actionArgs = getActionArgs()
      printCommandInfo({
        actionArgs,
        actionName
      })
      apply(program, actionName, ...actionArgs)
    })
})

function help() {
  console.log('\r\nUsage:');
  Object.keys(actionMap).forEach((action) => {
      actionMap[action].usages.forEach(usage => {
          console.log('  - ' + usage);
      });
  });
  console.log('\r');
}
program.on('-h', help)
program.on('--help', help)


program.parse(process.argv);

function printCommandInfo(info) {
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
