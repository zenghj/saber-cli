import chalk from 'chalk'
import { __PROD__ } from './constants'
const prefix = 'saber-cli'

function fatal (...args) {
  console.log(chalk.red(`\n${prefix}-error:`, ...args))
  process.exit(1)
}

function success (...args) {
  console.log(chalk.green(`${prefix}:`, ...args))
}

// const noop = () => {}
// // TODO
// function devWrapper(log) {
//   if (!__PROD__) {
//     return log
//   }
//   return noop;
// }

class Logger {
  constructor() {}
  fatal (...args) {
    return fatal(...args);
  }
  success(...args) {
    return success(...args);
  }
}

export default new Logger()
