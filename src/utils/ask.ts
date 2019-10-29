import async from 'async'
import inquirer from 'inquirer'
import evaluate, { geneFunctionFromString } from './eval'
import { MetaPrompts, MetalSmithFiles, MetaData, CallbackFunction, MetaPrompt} from '../index.d'
import logger from './logger'

export default function ask(prompts: MetaPrompts, data: MetaData, done: CallbackFunction) {
  function _done () {
    done()
    logger.debug('MetaData', data)
  }
  async.eachSeries(Object.keys(prompts), (key: string, next) => {
    prompt(data, key, prompts[key], next)
  }, _done);
}

function prompt(data: MetaData, key: string, promptOption: MetaPrompt, done: CallbackFunction) {
  if (promptOption.when && !evaluate(promptOption.when, data)) {
    return done()
  }
  let defaultValue = promptOption.default
  if (typeof defaultValue === 'function') {
    defaultValue = defaultValue.call(this, data)
  }
  const promptMapping = {
    string: 'input',
    boolean: 'confirm'
  }
  
  inquirer.prompt([{
    // see https://www.npmjs.com/package/inquirer#prompt
    type: promptMapping[promptOption.type] || promptOption.type,
    name: key,
    message: promptOption.message || promptOption.label || key,
    default: defaultValue,
    choices: promptOption.choices || [],
    validate: typeof promptOption.validate === 'string' ? geneFunctionFromString(promptOption.validate) : (() => true)
  }]).then(answers => {
    if (Array.isArray(answers[key])) {
      data[key] = {}
      answers[key].forEach(answer => {
        data[key][answer] = true
      })
    } else if (typeof answers[key] === 'string') {
      data[key] = answers[key].replace(/"/g, '\\"')
    } else {
      data[key] = answers[key]
    }
    done()
  }).catch(done)
}