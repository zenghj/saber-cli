'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _rc = require('../utils/rc');

exports.default = async function config(action, key, value) {
  switch (action) {
    case 'get':
      if (key) {
        console.log((await (0, _rc.get)(key)));
      } else {
        const config = await (0, _rc.getConfig)();
        console.log(JSON.stringify(config, null, 2));
      }
      break;
    case 'set':
      (0, _rc.set)(key, value);
      break;
    case 'reset':
      (0, _rc.reset)();
      break;
    default:
      console.log('unknown config action!');
  }
};