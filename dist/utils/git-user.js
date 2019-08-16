'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getGitUser;

var _child_process = require('child_process');

function getGitUser() {
  let name;
  let email;
  try {
    name = (0, _child_process.execSync)('git config --get user.name');
    email = (0, _child_process.execSync)('git config --get user.email');
  } catch (e) {}

  name = name && name.toString().trim();
  email = email && `<${email.toString().trim()}>`;
  return (name || '') + (email || '');
}