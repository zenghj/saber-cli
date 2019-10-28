"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = apply;

function apply(program, actionName, ...args) {
  const action = require(`./actions/${actionName}`).default;

  action(program, ...args);
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9hcHBseS50cyJdLCJuYW1lcyI6WyJhcHBseSIsInByb2dyYW0iLCJhY3Rpb25OYW1lIiwiYXJncyIsImFjdGlvbiIsInJlcXVpcmUiLCJkZWZhdWx0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQ2UsU0FBU0EsS0FBVCxDQUFlQyxPQUFmLEVBQXdCQyxVQUF4QixFQUFvQyxHQUFHQyxJQUF2QyxFQUE2QztBQUMxRCxRQUFNQyxNQUFvQixHQUFHQyxPQUFPLENBQUUsYUFBWUgsVUFBVyxFQUF6QixDQUFQLENBQW1DSSxPQUFoRTs7QUFDQUYsRUFBQUEsTUFBTSxDQUFDSCxPQUFELEVBQVUsR0FBR0UsSUFBYixDQUFOO0FBQ0QiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBY3Rpb25NZXRob2QgfSBmcm9tICcuL2luZGV4LmQnXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhcHBseShwcm9ncmFtLCBhY3Rpb25OYW1lLCAuLi5hcmdzKSB7XG4gIGNvbnN0IGFjdGlvbjogQWN0aW9uTWV0aG9kID0gcmVxdWlyZShgLi9hY3Rpb25zLyR7YWN0aW9uTmFtZX1gKS5kZWZhdWx0XG4gIGFjdGlvbihwcm9ncmFtLCAuLi5hcmdzKVxufSJdfQ==