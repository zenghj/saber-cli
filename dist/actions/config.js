"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _rc = _interopRequireDefault(require("../utils/rc"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const rc = _rc.default.getInstance();

const configAction = async function config(program, action, key, value) {
  switch (action) {
    case 'get':
      if (key) {
        console.log((await rc.get(key)));
      } else {
        const config = await rc.getConfig();
        console.log(JSON.stringify(config, null, 2));
      }

      break;

    case 'set':
      rc.set(key, value);
      break;

    case 'reset':
      rc.reset();
      break;

    default:
      console.log('unknown config action!');
  }
};

var _default = configAction;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hY3Rpb25zL2NvbmZpZy50cyJdLCJuYW1lcyI6WyJyYyIsIlJDIiwiZ2V0SW5zdGFuY2UiLCJjb25maWdBY3Rpb24iLCJjb25maWciLCJwcm9ncmFtIiwiYWN0aW9uIiwia2V5IiwidmFsdWUiLCJjb25zb2xlIiwibG9nIiwiZ2V0IiwiZ2V0Q29uZmlnIiwiSlNPTiIsInN0cmluZ2lmeSIsInNldCIsInJlc2V0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7Ozs7QUFHQSxNQUFNQSxFQUFFLEdBQUdDLFlBQUdDLFdBQUgsRUFBWDs7QUFFQSxNQUFNQyxZQUEwQixHQUFHLGVBQWVDLE1BQWYsQ0FBc0JDLE9BQXRCLEVBQXdDQyxNQUF4QyxFQUF3REMsR0FBeEQsRUFBcUVDLEtBQXJFLEVBQWlGO0FBQ2xILFVBQVFGLE1BQVI7QUFDRSxTQUFLLEtBQUw7QUFDRSxVQUFJQyxHQUFKLEVBQVM7QUFDUEUsUUFBQUEsT0FBTyxDQUFDQyxHQUFSLEVBQVksTUFBTVYsRUFBRSxDQUFDVyxHQUFILENBQU9KLEdBQVAsQ0FBbEI7QUFDRCxPQUZELE1BRU87QUFDTCxjQUFNSCxNQUFNLEdBQUcsTUFBTUosRUFBRSxDQUFDWSxTQUFILEVBQXJCO0FBQ0FILFFBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZRyxJQUFJLENBQUNDLFNBQUwsQ0FBZVYsTUFBZixFQUF1QixJQUF2QixFQUE2QixDQUE3QixDQUFaO0FBQ0Q7O0FBQ0Q7O0FBQ0YsU0FBSyxLQUFMO0FBQ0VKLE1BQUFBLEVBQUUsQ0FBQ2UsR0FBSCxDQUFPUixHQUFQLEVBQVlDLEtBQVo7QUFDQTs7QUFDRixTQUFLLE9BQUw7QUFDRVIsTUFBQUEsRUFBRSxDQUFDZ0IsS0FBSDtBQUNBOztBQUNGO0FBQ0VQLE1BQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLHdCQUFaO0FBaEJKO0FBa0JELENBbkJEOztlQW9CZVAsWSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSQyBmcm9tICcuLi91dGlscy9yYydcbmltcG9ydCB7IEFjdGlvbk1ldGhvZCwgQ29tbWFuZCB9IGZyb20gJy4uL2luZGV4LmQnXG5cbmNvbnN0IHJjID0gUkMuZ2V0SW5zdGFuY2UoKVxuXG5jb25zdCBjb25maWdBY3Rpb246IEFjdGlvbk1ldGhvZCA9IGFzeW5jIGZ1bmN0aW9uIGNvbmZpZyhwcm9ncmFtOiBDb21tYW5kLCBhY3Rpb246IHN0cmluZywga2V5OiBzdHJpbmcsIHZhbHVlOiBhbnkpIHtcbiAgc3dpdGNoIChhY3Rpb24pIHtcbiAgICBjYXNlICdnZXQnOiBcbiAgICAgIGlmIChrZXkpIHtcbiAgICAgICAgY29uc29sZS5sb2coYXdhaXQgcmMuZ2V0KGtleSkpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBjb25maWcgPSBhd2FpdCByYy5nZXRDb25maWcoKVxuICAgICAgICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShjb25maWcsIG51bGwsIDIpKVxuICAgICAgfVxuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnc2V0JzpcbiAgICAgIHJjLnNldChrZXksIHZhbHVlKVxuICAgICAgYnJlYWtcbiAgICBjYXNlICdyZXNldCc6XG4gICAgICByYy5yZXNldCgpXG4gICAgICBicmVha1xuICAgIGRlZmF1bHQ6XG4gICAgICBjb25zb2xlLmxvZygndW5rbm93biBjb25maWcgYWN0aW9uIScpXG4gIH1cbn1cbmV4cG9ydCBkZWZhdWx0IGNvbmZpZ0FjdGlvbiJdfQ==