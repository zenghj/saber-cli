import { existsSync } from 'fs'
import path from 'path'
import Metalsmith from 'metalsmith'
import consolidate from 'consolidate'
import ask from './ask'
import filter from './filter'
import logger from './logger'
import renderFiles from './render-files'
import getGitUser from './git-user'
const render = consolidate.handlebars.render

function getMetaData(name, dir) {
  let data = {}
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

function setDefaultPromptVal(opts, key, value) {
  const prompts = opts.prompts || (opts.prompts = {})
  if (!prompts[key] || typeof prompts[key] !== 'object') {
    prompts[key] = {
      type: 'string',
      default: value
    }
  } else {
    prompts[key].default = value
  }
}

export default async function generate(name, src, dest, done) {
  debugger
  const metalsmith = Metalsmith(path.join(src, 'template'))
  const options = getMetaData(name, src)
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

function filterFiles(filters) {
  return function (files, metalsmith, done) {
    filter(filters, files, metalsmith.metadata(), done)
  }
}
function askQuestions(promps) {
  return function (files, metalsmith, done) {
    ask(promps, metalsmith.metadata(), done)
  }
}

function renderTemplateFiles (skipInterpolation) {
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