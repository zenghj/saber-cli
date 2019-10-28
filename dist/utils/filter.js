"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = filter;

var _eval = _interopRequireDefault(require("./eval"));

var _minimatch = _interopRequireDefault(require("minimatch"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function filter(filters, files, data, done) {
  if (!filters) {
    return done();
  }

  const fileNames = Object.keys(files);
  Object.keys(filters).forEach(glob => {
    fileNames.forEach(file => {
      if ((0, _minimatch.default)(file, glob, {
        dot: true
      })) {
        const condition = filters[glob];

        if (!(0, _eval.default)(condition, data)) {
          delete files[file];
        }
      }
    });
  });
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9maWx0ZXIudHMiXSwibmFtZXMiOlsiZmlsdGVyIiwiZmlsdGVycyIsImZpbGVzIiwiZGF0YSIsImRvbmUiLCJmaWxlTmFtZXMiLCJPYmplY3QiLCJrZXlzIiwiZm9yRWFjaCIsImdsb2IiLCJmaWxlIiwiZG90IiwiY29uZGl0aW9uIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7O0FBQ0E7Ozs7QUFHZSxTQUFTQSxNQUFULENBQWdCQyxPQUFoQixFQUFzQ0MsS0FBdEMsRUFBOERDLElBQTlELEVBQThFQyxJQUE5RSxFQUFzRztBQUNuSCxNQUFJLENBQUNILE9BQUwsRUFBYztBQUNaLFdBQU9HLElBQUksRUFBWDtBQUNEOztBQUNELFFBQU1DLFNBQVMsR0FBR0MsTUFBTSxDQUFDQyxJQUFQLENBQVlMLEtBQVosQ0FBbEI7QUFDQUksRUFBQUEsTUFBTSxDQUFDQyxJQUFQLENBQVlOLE9BQVosRUFBcUJPLE9BQXJCLENBQTZCQyxJQUFJLElBQUk7QUFDbkNKLElBQUFBLFNBQVMsQ0FBQ0csT0FBVixDQUFrQkUsSUFBSSxJQUFJO0FBQ3hCLFVBQUksd0JBQU1BLElBQU4sRUFBWUQsSUFBWixFQUFrQjtBQUNwQkUsUUFBQUEsR0FBRyxFQUFFO0FBRGUsT0FBbEIsQ0FBSixFQUVJO0FBQ0YsY0FBTUMsU0FBUyxHQUFHWCxPQUFPLENBQUNRLElBQUQsQ0FBekI7O0FBQ0EsWUFBSSxDQUFDLG1CQUFTRyxTQUFULEVBQW9CVCxJQUFwQixDQUFMLEVBQWdDO0FBQzlCLGlCQUFPRCxLQUFLLENBQUNRLElBQUQsQ0FBWjtBQUNEO0FBQ0Y7QUFDRixLQVREO0FBVUQsR0FYRDtBQVlEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGV2YWx1YXRlIGZyb20gJy4vZXZhbCdcbmltcG9ydCBtYXRjaCBmcm9tICdtaW5pbWF0Y2gnXG5pbXBvcnQgeyBNZXRhRmlsdGVycywgTWV0YWxTbWl0aEZpbGVzLCBNZXRhRGF0YSwgQ2FsbGJhY2tGdW5jdGlvbiB9IGZyb20gJy4uL2luZGV4LmQnXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGZpbHRlcihmaWx0ZXJzOiBNZXRhRmlsdGVycywgZmlsZXM6IE1ldGFsU21pdGhGaWxlcywgZGF0YTogTWV0YURhdGEsIGRvbmU6IENhbGxiYWNrRnVuY3Rpb24pIHtcbiAgaWYgKCFmaWx0ZXJzKSB7XG4gICAgcmV0dXJuIGRvbmUoKVxuICB9XG4gIGNvbnN0IGZpbGVOYW1lcyA9IE9iamVjdC5rZXlzKGZpbGVzKVxuICBPYmplY3Qua2V5cyhmaWx0ZXJzKS5mb3JFYWNoKGdsb2IgPT4ge1xuICAgIGZpbGVOYW1lcy5mb3JFYWNoKGZpbGUgPT4ge1xuICAgICAgaWYgKG1hdGNoKGZpbGUsIGdsb2IsIHtcbiAgICAgICAgZG90OiB0cnVlXG4gICAgICB9KSkge1xuICAgICAgICBjb25zdCBjb25kaXRpb24gPSBmaWx0ZXJzW2dsb2JdXG4gICAgICAgIGlmICghZXZhbHVhdGUoY29uZGl0aW9uLCBkYXRhKSkge1xuICAgICAgICAgIGRlbGV0ZSBmaWxlc1tmaWxlXVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSlcbiAgfSlcbn0iXX0=