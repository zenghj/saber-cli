"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ask;

var _async = _interopRequireDefault(require("async"));

var _inquirer = _interopRequireDefault(require("inquirer"));

var _eval = _interopRequireWildcard(require("./eval"));

var _logger = _interopRequireDefault(require("./logger"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ask(prompts, data, done) {
  function _done() {
    done();

    _logger.default.debug('MetaData', data);
  }

  _async.default.eachSeries(Object.keys(prompts), (key, next) => {
    prompt(data, key, prompts[key], next);
  }, _done);
}

function prompt(data, key, promptOption, done) {
  if (promptOption.when && !(0, _eval.default)(promptOption.when, data)) {
    return done();
  }

  let defaultValue = promptOption.default;

  if (typeof defaultValue === 'function') {
    defaultValue = defaultValue.call(this, data);
  }

  const promptMapping = {
    string: 'input',
    boolean: 'confirm'
  };

  _inquirer.default.prompt([{
    // see https://www.npmjs.com/package/inquirer#prompt
    type: promptMapping[promptOption.type] || promptOption.type,
    name: key,
    message: promptOption.message || promptOption.label || key,
    default: defaultValue,
    choices: promptOption.choices || [],
    validate: typeof promptOption.validate === 'string' ? (0, _eval.geneFunctionFromString)(promptOption.validate) : () => true
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