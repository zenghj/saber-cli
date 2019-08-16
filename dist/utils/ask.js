'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ask;

var _async = require('async');

var _async2 = _interopRequireDefault(_async);

var _inquirer = require('inquirer');

var _inquirer2 = _interopRequireDefault(_inquirer);

var _eval = require('./eval');

var _eval2 = _interopRequireDefault(_eval);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const promptMapping = {
  string: 'input',
  boolean: 'confirm'
};

function ask(prompts, data, done) {
  _async2.default.eachSeries(Object.keys(prompts), (key, next) => {
    prompt(data, key, prompts[key], next);
  }, done);
}

function prompt(data, key, promptOptions, done) {
  debugger;
  if (promptOptions.when && !(0, _eval2.default)(promptOptions.when, data)) {
    return done();
  }
  let defaultValue = promptOptions.default;
  if (typeof defaultValue === 'function') {
    defaultValue = defaultValue.call(this, data);
  }

  _inquirer2.default.prompt([{
    type: promptMapping[promptOptions.type] || promptOptions.type,
    name: key,
    message: promptOptions.message || promptOptions.label || key,
    default: defaultValue,
    choices: promptOptions.choices || [],
    validate: promptOptions.validate || (() => true)
  }]).then(answers => {
    if (Array.isArray(answers[key])) {
      data[key] = {};
      answers[key].forEach(answer => {
        data[key][answer] = true;
      });
    } else if (typeof answers[key] === 'string') {
      data[key] = answers[key].replace(/"/g, '\\"');
    } else {
      data[key] = answers[key];
    }
    done();
  }).catch(done);
}