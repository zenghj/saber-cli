import commander from 'commander';
import { VERSION } from './utils/constants'
import apply from './apply'

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

program
  .option('-c, --clone', 'use git clone')

Object.keys(actionMap).forEach(actionName => {
  program.command(actionName)
    .description(actionMap[actionName].description)
    .alias(actionMap[actionName].alias)
    .action(() => {
      apply(program, actionName, ...process.argv.slice(3))
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