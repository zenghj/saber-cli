"use strict";

var _updateNotifier = _interopRequireDefault(require("update-notifier"));

var _package = _interopRequireDefault(require("../package.json"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _updateNotifier.default)({
  pkg: _package.default
}).notify(); // test update
// updateNotifier({
// 	pkg: {
// 		name: '@zenghj/saber-cli',
// 		version: '0.0.0'
// 	},
// 	updateCheckInterval: 0
// }).notify();