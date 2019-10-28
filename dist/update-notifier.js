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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy91cGRhdGUtbm90aWZpZXIudHMiXSwibmFtZXMiOlsicGtnIiwicGFja2FnZUpzb24iLCJub3RpZnkiXSwibWFwcGluZ3MiOiI7O0FBQUE7O0FBQ0E7Ozs7QUFFQSw2QkFBZTtBQUFDQSxFQUFBQSxHQUFHLEVBQUVDO0FBQU4sQ0FBZixFQUFtQ0MsTUFBbkMsRyxDQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgdXBkYXRlTm90aWZpZXIgZnJvbSAndXBkYXRlLW5vdGlmaWVyJ1xuaW1wb3J0IHBhY2thZ2VKc29uIGZyb20gJy4uL3BhY2thZ2UuanNvbidcblxudXBkYXRlTm90aWZpZXIoe3BrZzogcGFja2FnZUpzb259KS5ub3RpZnkoKTtcblxuLy8gdGVzdCB1cGRhdGVcbi8vIHVwZGF0ZU5vdGlmaWVyKHtcbi8vIFx0cGtnOiB7XG4vLyBcdFx0bmFtZTogJ0B6ZW5naGovc2FiZXItY2xpJyxcbi8vIFx0XHR2ZXJzaW9uOiAnMC4wLjAnXG4vLyBcdH0sXG4vLyBcdHVwZGF0ZUNoZWNrSW50ZXJ2YWw6IDBcbi8vIH0pLm5vdGlmeSgpOyJdfQ==