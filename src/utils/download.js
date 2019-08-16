import { existsSync } from 'fs'
import path from 'path'
import downloadGit from 'download-git-repo'
import ora from 'ora'
import { sync as rmSync } from 'rimraf'
import { isLocalPath, getTemplatePath } from './local-path'
import generate from './generate'
import logger from './logger'
import { getConfig } from './rc'
import { HOME } from './constants'

export function downloadAndGenerate (templateName, projectName) {
  const program = this
  const dest = path.resolve(projectName)
  const clone = program.clone || false

  function generateProject(projectName, templatePath, dest) {
    return generate(projectName, templatePath, dest, (err) => {
      if (err) {
        logger.fatal('Fail to generate!', err)
      } else {
        logger.success(`Generated ${projectName}.`)
      }
    })
  }

  async function downloadTemplate (templateName, projectName) {
    let config = getConfig()
    let api = `${config.registry}/${templateName}`
    return new Promise((resolve, reject) => {
      downloadGit(api, projectName, { clone }, err => {
        if (err) {
          reject(err)
        } else {
          resolve()
        }
      })
    })
  }

  if (isLocalPath(templateName)) {
    const templatePath = getTemplatePath(templateName)
    if (existsSync(templatePath)) {
      return generateProject(projectName, templatePath, dest)
    } else {
      logger.fatal(`${templatePath} not exist.`)
    }
  } else {
    const tmp = path.join(HOME, 'saber-cli-templates', templateName.replace(/[\/:]/g, '-'))
    const spinner = ora('downloading template')
    spinner.start()
    if (existsSync(tmp)) rmSync(tmp)
    downloadTemplate(templateName, tmp).then(() => {
      return generateProject(projectName, tmp, dest)
    }, err => {
      return logger.fatal(`Fail to download template: ${templateName}, ${err}`)
    }).finally(() => {
      spinner.stop()
    })
  }
}