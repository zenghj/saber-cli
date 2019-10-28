import fs from 'fs'
import chalk from 'chalk'
import symbol from 'log-symbols'
import { downloadAndGenerate } from '../utils/download'
import logger from '../utils/logger';
import { __PROD__ } from '../utils/constants'
import { ActionMethod, Command } from '../index.d'

const initAction: ActionMethod = async function init(program: Command, templateName: string, projectName: string, ...rest) {
  !__PROD__ && console.log('arguments', templateName, projectName);
  if (!templateName || !projectName) {
    return logger.fatal('templateName or projectName not exist');
  }
  if (fs.existsSync(projectName)) {
    console.error(symbol.error, chalk.red(`ERROR: peoject ${projectName} already exists!`))
    return process.exit(1)
  }
  try {
    downloadAndGenerate.call(program, templateName, projectName)
  } catch (err) {
    logger.fatal('init fails', err)
  }
}
export default initAction;