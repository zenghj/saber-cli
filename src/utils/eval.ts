import chalk from 'chalk'
import logger from './logger'

/**
 * Evaluate an expression in meta.json in the context of
 * prompt answers data.
 */

export default function evaluate (exp: string, data: Object): boolean {
  /* eslint-disable no-new-func */
  const fn = new Function('data', 'with (data) { return ' + exp + '}')
  try {
    logger.debug('evaluate\n', fn.toString())
    return fn(data)
  } catch (e) {
    console.error(chalk.red('Error when evaluating filter condition: ' + exp))
  }
}

/**
 * generate a js function from a js function string
 * @param functionStr 
 */
export function geneFunctionFromString(functionStr: string): (...args: any[]) => any {
  var fn = eval(`(${functionStr})`)
  if (typeof fn === 'function') {
    return function (...args) {
      return fn(...args)
    }
  }
  throw new Error(`can not get a JS function from "${functionStr}"`)
}