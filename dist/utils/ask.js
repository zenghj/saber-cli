"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ask;

var _async = _interopRequireDefault(require("async"));

var _inquirer = _interopRequireDefault(require("inquirer"));

var _eval = _interopRequireDefault(require("./eval"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const promptMapping = {
  string: 'input',
  boolean: 'confirm'
};

function ask(prompts, data, done) {
  _async.default.eachSeries(Object.keys(prompts), (key, next) => {
    prompt(data, key, prompts[key], next);
  }, done);
}

function prompt(data, key, promptOption, done) {
  if (promptOption.when && !(0, _eval.default)(promptOption.when, data)) {
    return done();
  }

  let defaultValue = promptOption.default;

  if (typeof defaultValue === 'function') {
    defaultValue = defaultValue.call(this, data);
  }

  _inquirer.default.prompt([{
    // see https://www.npmjs.com/package/inquirer#prompt
    type: promptMapping[promptOption.type] || promptOption.type,
    name: key,
    message: promptOption.message || promptOption.label || key,
    default: defaultValue,
    choices: promptOption.choices || [],
    validate: promptOption.validate || (() => true)
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