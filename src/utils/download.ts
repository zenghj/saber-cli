import { existsSync } from 'fs'
import path from 'path'
import downloadGit from 'download-git-repo'
import ora from 'ora'
import { sync as rmSync } from 'rimraf'
import shell from 'shelljs'
import { isLocalPath, getTemplatePath } from './path-util'
import generate from './generate'
import logger from './logger'
import RC from './rc'
import { HOME, __DEV__ } from './constants'

const rc = RC.getInstance();

function generateProject(projectName, templatePath, dest) {
  return generate(projectName, templatePath, dest, (err) => {
    if (err) {
      logger.fatal('Fail to generate!', err)
    } else {
      logger.success(`Generated ${projectName}.`)
    }
  })
}

async function cloneFromPrivateGitRepo(gitRepoUrl, dest) {
  if (existsSync(dest)) rmSync(dest)
  if (!shell.which('git')) {
    shell.echo('Sorry, this script requires git');
    shell.exit(1);
  }
  const projectName = path.basename(dest)
  const workDir = path.dirname(dest)
  shell.cd(workDir)
  const command = `git clone ${gitRepoUrl} ${projectName}`
  console.log(command)
  shell.exec(command)
  return true;
}



async function downloadTemplate(templateName: string, projectName: string, { isPrivate, clone }) {
  // let config = rc.getConfig()
  const registry = rc.getRegistry()
  let api = `${registry}/${templateName}`
  return new Promise((resolve, reject) => {
    const errorHandler = err => {
      logger.fatal(`template download fail\n`, `template target: ${api}\n`, err);
    }
    logger.debug('download repo from ', api)
    if (isPrivate) {
      cloneFromPrivateGitRepo(`${api}.git`, projectName).then(resolve, errorHandler)
    } else {
      downloadGit(`${api}`, projectName, { clone, }, err => {
        if (err) {
          errorHandler(err);
        } else {
          resolve()
        }
      })
    }
  })
}

function getDownloadedTemplate(templateName: string) {
  return path.join(HOME, 'saber-cli-templates', templateName.replace(/[\/:]/g, '-'));
}

export function downloadAndGenerate(templateName: string, projectName: string) {
  const program = this
  const dest = path.resolve(projectName)
  const clone = program.clone || false
  const privateRepo = program.private || false

  if (isLocalPath(templateName)) {
    const templatePath = getTemplatePath(templateName)
    if (existsSync(templatePath)) {
      return generateProject(projectName, templatePath, dest)
    } else {
      logger.fatal(`${templatePath} not exist.`)
    }
  } else {
    const tmp = getDownloadedTemplate(templateName)
    const spinner = ora('downloading template\n')
    spinner.start()
    if (existsSync(tmp)) rmSync(tmp)
    downloadTemplate(templateName, tmp, {
      isPrivate: privateRepo,
      clone: clone
    }).then(() => {
      return generateProject(projectName, tmp, dest)
    }, err => {
      return logger.fatal(`Fail to download template: ${templateName}\n${err}`)
    }).finally(() => {
      spinner.stop()
    })
  }
}