"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _chalk = _interopRequireDefault(require("chalk"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const prefix = 'saber-cli';

function fatal(...args) {
  console.log(_chalk.default.red(`\n${prefix}-error:`, ...args));
  process.exit(1);
}

function success(...args) {
  console.log(_chalk.default.green(`${prefix}:`, ...args));
} // const noop = () => {}
// // TODO
// function devWrapper(log) {
//   if (!__PROD__) {
//     return log
//   }
//   return noop;
// }


class Logger {
  constructor() {}

  fatal(...args) {
    return fatal(...args);
  }

  success(...args) {
    return success(...args);
  }

}

var _default = new Logger();

exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9sb2dnZXIudHMiXSwibmFtZXMiOlsicHJlZml4IiwiZmF0YWwiLCJhcmdzIiwiY29uc29sZSIsImxvZyIsImNoYWxrIiwicmVkIiwicHJvY2VzcyIsImV4aXQiLCJzdWNjZXNzIiwiZ3JlZW4iLCJMb2dnZXIiLCJjb25zdHJ1Y3RvciJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOzs7O0FBRUEsTUFBTUEsTUFBTSxHQUFHLFdBQWY7O0FBRUEsU0FBU0MsS0FBVCxDQUFnQixHQUFHQyxJQUFuQixFQUF5QjtBQUN2QkMsRUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVlDLGVBQU1DLEdBQU4sQ0FBVyxLQUFJTixNQUFPLFNBQXRCLEVBQWdDLEdBQUdFLElBQW5DLENBQVo7QUFDQUssRUFBQUEsT0FBTyxDQUFDQyxJQUFSLENBQWEsQ0FBYjtBQUNEOztBQUVELFNBQVNDLE9BQVQsQ0FBa0IsR0FBR1AsSUFBckIsRUFBMkI7QUFDekJDLEVBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZQyxlQUFNSyxLQUFOLENBQWEsR0FBRVYsTUFBTyxHQUF0QixFQUEwQixHQUFHRSxJQUE3QixDQUFaO0FBQ0QsQyxDQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUVBLE1BQU1TLE1BQU4sQ0FBYTtBQUNYQyxFQUFBQSxXQUFXLEdBQUcsQ0FBRTs7QUFDaEJYLEVBQUFBLEtBQUssQ0FBRSxHQUFHQyxJQUFMLEVBQVc7QUFDZCxXQUFPRCxLQUFLLENBQUMsR0FBR0MsSUFBSixDQUFaO0FBQ0Q7O0FBQ0RPLEVBQUFBLE9BQU8sQ0FBQyxHQUFHUCxJQUFKLEVBQVU7QUFDZixXQUFPTyxPQUFPLENBQUMsR0FBR1AsSUFBSixDQUFkO0FBQ0Q7O0FBUFU7O2VBVUUsSUFBSVMsTUFBSixFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGNoYWxrIGZyb20gJ2NoYWxrJ1xuaW1wb3J0IHsgX19QUk9EX18gfSBmcm9tICcuL2NvbnN0YW50cydcbmNvbnN0IHByZWZpeCA9ICdzYWJlci1jbGknXG5cbmZ1bmN0aW9uIGZhdGFsICguLi5hcmdzKSB7XG4gIGNvbnNvbGUubG9nKGNoYWxrLnJlZChgXFxuJHtwcmVmaXh9LWVycm9yOmAsIC4uLmFyZ3MpKVxuICBwcm9jZXNzLmV4aXQoMSlcbn1cblxuZnVuY3Rpb24gc3VjY2VzcyAoLi4uYXJncykge1xuICBjb25zb2xlLmxvZyhjaGFsay5ncmVlbihgJHtwcmVmaXh9OmAsIC4uLmFyZ3MpKVxufVxuXG4vLyBjb25zdCBub29wID0gKCkgPT4ge31cbi8vIC8vIFRPRE9cbi8vIGZ1bmN0aW9uIGRldldyYXBwZXIobG9nKSB7XG4vLyAgIGlmICghX19QUk9EX18pIHtcbi8vICAgICByZXR1cm4gbG9nXG4vLyAgIH1cbi8vICAgcmV0dXJuIG5vb3A7XG4vLyB9XG5cbmNsYXNzIExvZ2dlciB7XG4gIGNvbnN0cnVjdG9yKCkge31cbiAgZmF0YWwgKC4uLmFyZ3MpIHtcbiAgICByZXR1cm4gZmF0YWwoLi4uYXJncyk7XG4gIH1cbiAgc3VjY2VzcyguLi5hcmdzKSB7XG4gICAgcmV0dXJuIHN1Y2Nlc3MoLi4uYXJncyk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgbmV3IExvZ2dlcigpXG4iXX0=