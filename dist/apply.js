"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = apply;

function apply(program, actionName, ...args) {
  const action = require(`./actions/${actionName}`).default;

  action(program, ...args);
}