import chalk from 'chalk'
import { __PROD__, __DEV__ } from './constants'

const prefix = 'saber-cli'

function fatal (...args) {
  console.log(chalk.red(`\n${prefix}-error:`, ...args))
  process.exit(1)
}

function success (...args) {
  console.log(chalk.green(`${prefix}:`, ...args))
}

class Logger {
  constructor() {}
  fatal (...args) {
    return fatal(...args);
  }
  success(...args) {
    return success(...args);
  }
  debug(...args) {
    if (__DEV__) {
      debugger;
      return console.log(...args)
    }
  }
}

export default new Logger()
