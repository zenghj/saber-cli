import { existsSync } from 'fs'
import path from 'path'
import Metalsmith from 'metalsmith'
import consolidate from 'consolidate'
import ask from './ask'
import filter from './filter'
import logger from './logger'
import renderFiles from './render-files'
import getGitUser from './git-user'
import { MetalSmithPlugin, MetaOption } from '../index.d'
const render = consolidate.handlebars.render

function getMetaData(name:string, dir:string):MetaOption {
  let data:MetaOption = {
    prompts: {},
    completeMessage: '',
  }
  const json = path.join(dir, 'meta.json')
  if (existsSync(json)) {
    data = require(json)
  }
  setDefaultPromptVal(data, 'name', name)
  const author = getGitUser()
  if (author) {
    setDefaultPromptVal(data, 'author', author)
  }
  return data
}

function setDefaultPromptVal(opts: MetaOption, key: string, value) {
  const prompts = opts.prompts || (opts.prompts = {})
  if (!prompts[key] || typeof prompts[key] !== 'object') {
    prompts[key] = {
      type: 'string',
      label: key,
      default: value
    }
  } else {
    prompts[key].default = value
  }
}

/**
 * 
 * @param name 生成的项目名
 * @param src 原文件路径
 * @param dest 生成的目标路径
 * @param done 回调
 */
export default async function generate(name: string, src: string, dest: string, done) {
  const metalsmith = Metalsmith(path.join(src, 'template'))
  const options:MetaOption = getMetaData(name, src)
  const metaData = metalsmith.metadata()
  Object.assign(metaData, {
    destDirName: name
  })
  metalsmith.use(askQuestions(options.prompts))
    .use(filterFiles(options.filters))
    .use(renderTemplateFiles(options.skipInterpolation))
  
  metalsmith.clean(false)
    .destination(dest)
    .source('.') // start from template root instead of `./src`
    .build((err, files) => {
      done(err)
      if (typeof options.complete === 'function') {
        options.complete(metaData)
      } else {
        logMessage(options.completeMessage, metaData)
      }
    })
}

function filterFiles(filters): MetalSmithPlugin {
  return function (files, metalsmith, done) {
    filter(filters, files, metalsmith.metadata(), done)
  }
}
function askQuestions(promps): MetalSmithPlugin {
  return function (files, metalsmith, done) {
    ask(promps, metalsmith.metadata(), done)
  }
}

function renderTemplateFiles (skipInterpolation): MetalSmithPlugin {
  skipInterpolation = typeof skipInterpolation === 'string' ? [skipInterpolation] : skipInterpolation
  return function (files, metalsmith, done) {
    renderFiles(skipInterpolation, files, metalsmith.metadata(), done)
  }
}
/**
 * Display template complete message.
 *
 * @param {String} message
 * @param {Object} data
 */


function logMessage (message, data) {
  if (!message) return
  render(message, data, (err, res) => {
    if (err) {
      console.error('\n   Error when rendering template complete message: ' + err.message.trim())
    } else {
      console.log('\n' + res.split(/\r?\n/g).map(line => '   ' + line).join('\n'))
    }
  })
}