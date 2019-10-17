import fs from 'fs'
import chalk from 'chalk'
import symbol from 'log-symbols'
import { downloadAndGenerate } from '../utils/download'
import logger from '../utils/logger';

export default async function init(templateName, projectName, ...rest) {
  console.log('arguments', templateName, projectName);
  if (!templateName || !projectName) {
    throw new Error('templateName or projectName not exist');
  }
  const program = this
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