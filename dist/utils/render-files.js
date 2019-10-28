"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = renderFiles;

var _async = _interopRequireDefault(require("async"));

var _multimatch = _interopRequireDefault(require("multimatch"));

var _consolidate = _interopRequireDefault(require("consolidate"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const render = _consolidate.default.handlebars.render;

function renderFiles(skips, files, data, done) {
  const fileNames = Object.keys(files);

  _async.default.each(fileNames, (fileName, callback) => {
    if ((0, _multimatch.default)([fileName], skips, {
      dot: true
    }).length) {
      return callback();
    }

    const str = files[fileName].contents.toString();

    if (!/{{([^{}]+)}}/g.test(str)) {
      return callback();
    }

    render(str, data, (err, res) => {
      if (err) {
        err.message = `[${fileName}] ${err.message}`;
        return callback(err);
      }

      files[fileName].contents = Buffer.from(res);
      callback();
    });
  }, done);
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9yZW5kZXItZmlsZXMudHMiXSwibmFtZXMiOlsicmVuZGVyIiwiY29uc29saWRhdGUiLCJoYW5kbGViYXJzIiwicmVuZGVyRmlsZXMiLCJza2lwcyIsImZpbGVzIiwiZGF0YSIsImRvbmUiLCJmaWxlTmFtZXMiLCJPYmplY3QiLCJrZXlzIiwiYXN5bmMiLCJlYWNoIiwiZmlsZU5hbWUiLCJjYWxsYmFjayIsImRvdCIsImxlbmd0aCIsInN0ciIsImNvbnRlbnRzIiwidG9TdHJpbmciLCJ0ZXN0IiwiZXJyIiwicmVzIiwibWVzc2FnZSIsIkJ1ZmZlciIsImZyb20iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFDQTs7OztBQUNBLE1BQU1BLE1BQU0sR0FBR0MscUJBQVlDLFVBQVosQ0FBdUJGLE1BQXRDOztBQUVlLFNBQVNHLFdBQVQsQ0FBcUJDLEtBQXJCLEVBQTRCQyxLQUE1QixFQUFtQ0MsSUFBbkMsRUFBeUNDLElBQXpDLEVBQStDO0FBQzVELFFBQU1DLFNBQVMsR0FBR0MsTUFBTSxDQUFDQyxJQUFQLENBQVlMLEtBQVosQ0FBbEI7O0FBQ0FNLGlCQUFNQyxJQUFOLENBQVdKLFNBQVgsRUFBc0IsQ0FBQ0ssUUFBRCxFQUFXQyxRQUFYLEtBQXdCO0FBQzVDLFFBQUkseUJBQVcsQ0FBQ0QsUUFBRCxDQUFYLEVBQXVCVCxLQUF2QixFQUE4QjtBQUNoQ1csTUFBQUEsR0FBRyxFQUFFO0FBRDJCLEtBQTlCLEVBRURDLE1BRkgsRUFFVztBQUNULGFBQU9GLFFBQVEsRUFBZjtBQUNEOztBQUNELFVBQU1HLEdBQUcsR0FBR1osS0FBSyxDQUFDUSxRQUFELENBQUwsQ0FBZ0JLLFFBQWhCLENBQXlCQyxRQUF6QixFQUFaOztBQUNBLFFBQUksQ0FBQyxnQkFBZ0JDLElBQWhCLENBQXFCSCxHQUFyQixDQUFMLEVBQWdDO0FBQzlCLGFBQU9ILFFBQVEsRUFBZjtBQUNEOztBQUNEZCxJQUFBQSxNQUFNLENBQUNpQixHQUFELEVBQU1YLElBQU4sRUFBWSxDQUFDZSxHQUFELEVBQU1DLEdBQU4sS0FBYztBQUM5QixVQUFJRCxHQUFKLEVBQVM7QUFDUEEsUUFBQUEsR0FBRyxDQUFDRSxPQUFKLEdBQWUsSUFBR1YsUUFBUyxLQUFJUSxHQUFHLENBQUNFLE9BQVEsRUFBM0M7QUFDQSxlQUFPVCxRQUFRLENBQUNPLEdBQUQsQ0FBZjtBQUNEOztBQUNEaEIsTUFBQUEsS0FBSyxDQUFDUSxRQUFELENBQUwsQ0FBZ0JLLFFBQWhCLEdBQTJCTSxNQUFNLENBQUNDLElBQVAsQ0FBWUgsR0FBWixDQUEzQjtBQUNBUixNQUFBQSxRQUFRO0FBQ1QsS0FQSyxDQUFOO0FBUUQsR0FsQkQsRUFrQkdQLElBbEJIO0FBbUJEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGFzeW5jIGZyb20gJ2FzeW5jJ1xuaW1wb3J0IG11bHRpbWF0Y2ggZnJvbSAnbXVsdGltYXRjaCdcbmltcG9ydCBjb25zb2xpZGF0ZSBmcm9tICdjb25zb2xpZGF0ZSdcbmNvbnN0IHJlbmRlciA9IGNvbnNvbGlkYXRlLmhhbmRsZWJhcnMucmVuZGVyXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHJlbmRlckZpbGVzKHNraXBzLCBmaWxlcywgZGF0YSwgZG9uZSkge1xuICBjb25zdCBmaWxlTmFtZXMgPSBPYmplY3Qua2V5cyhmaWxlcylcbiAgYXN5bmMuZWFjaChmaWxlTmFtZXMsIChmaWxlTmFtZSwgY2FsbGJhY2spID0+IHtcbiAgICBpZiAobXVsdGltYXRjaChbZmlsZU5hbWVdLCBza2lwcywge1xuICAgICAgZG90OiB0cnVlXG4gICAgfSkubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gY2FsbGJhY2soKVxuICAgIH1cbiAgICBjb25zdCBzdHIgPSBmaWxlc1tmaWxlTmFtZV0uY29udGVudHMudG9TdHJpbmcoKVxuICAgIGlmICghL3t7KFtee31dKyl9fS9nLnRlc3Qoc3RyKSkge1xuICAgICAgcmV0dXJuIGNhbGxiYWNrKClcbiAgICB9XG4gICAgcmVuZGVyKHN0ciwgZGF0YSwgKGVyciwgcmVzKSA9PiB7XG4gICAgICBpZiAoZXJyKSB7XG4gICAgICAgIGVyci5tZXNzYWdlID0gYFske2ZpbGVOYW1lfV0gJHtlcnIubWVzc2FnZX1gXG4gICAgICAgIHJldHVybiBjYWxsYmFjayhlcnIpXG4gICAgICB9XG4gICAgICBmaWxlc1tmaWxlTmFtZV0uY29udGVudHMgPSBCdWZmZXIuZnJvbShyZXMpXG4gICAgICBjYWxsYmFjaygpXG4gICAgfSlcbiAgfSwgZG9uZSlcbn0iXX0=