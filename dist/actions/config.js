"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _rc = _interopRequireDefault(require("../utils/rc"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

const rc = _rc.default.getInstance();

const configAction =
/*#__PURE__*/
function () {
  var _config = _asyncToGenerator(function* (program, action, key, value) {
    switch (action) {
      case 'get':
        if (key) {
          console.log((yield rc.get(key)));
        } else {
          const config = yield rc.getConfig();
          console.log(JSON.stringify(config, null, 2));
        }

        break;

      case 'set':
        rc.set(key, value);
        break;

      case 'reset':
        rc.reset();
        break;

      case 'select-registry':
      case 'sr':
        rc.selectRegistry();
        break;

      default:
        console.log('unknown config action!');
    }
  });

  function config(_x, _x2, _x3, _x4) {
    return _config.apply(this, arguments);
  }

  return config;
}();

var _default = configAction;
exports.default = _default;