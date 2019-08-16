import chalk from 'chalk'
const prefix = 'saber-cli'

function fatal (...args) {
  console.log(chalk.red(`\n${prefix}-error:`, ...args))
  process.exit(1)
}

function success (...args) {
  console.log(chalk.green(`${prefix}:`, ...args))
}
export default {
  fatal,
  success
}