import async from 'async'
import inquirer from 'inquirer'
import evaluate from './eval'

const promptMapping = {
  string: 'input',
  boolean: 'confirm'
}

export default function ask(prompts, data, done) {
  async.eachSeries(Object.keys(prompts), (key, next) => {
    prompt(data, key, prompts[key], next)
  }, done);
}

function prompt(data, key, promptOptions, done) {
  debugger
  if (promptOptions.when && !evaluate(promptOptions.when, data)) {
    return done()
  }
  let defaultValue = promptOptions.default
  if (typeof defaultValue === 'function') {
    defaultValue = defaultValue.call(this, data)
  }

  inquirer.prompt([{
    type: promptMapping[promptOptions.type] || promptOptions.type,
    name: key,
    message: promptOptions.message || promptOptions.label || key,
    default: defaultValue,
    choices: promptOptions.choices || [],
    validate: promptOptions.validate || (() => true)
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