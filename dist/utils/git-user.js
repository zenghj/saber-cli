"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getGitUser;

var _child_process = require("child_process");

function getGitUser() {
  const user = getGitUserInfo();
  return (user.name || '') + (user.email ? `<${user.email}>` : '');
}

function getGitUserInfo() {
  let name;
  let email;

  try {
    const nameBuffer = (0, _child_process.execSync)('git config --get user.name');
    const emailBuffer = (0, _child_process.execSync)('git config --get user.email');
    name = nameBuffer && nameBuffer.toString().trim();
    email = emailBuffer && `${emailBuffer.toString().trim()}`;
  } catch (e) {}

  return {
    name,
    email
  };
}