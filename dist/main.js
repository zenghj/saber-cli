"use strict";

var commander = _interopRequireWildcard(require("commander"));

require("./update-notifier");

var _constants = require("./utils/constants");

var _apply = _interopRequireDefault(require("./apply"));

var _options = require("./options");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const program = new commander.Command();
program.version(_constants.VERSION);
const actions = [{
  name: 'init',
  alias: 'i',
  description: 'generate a new project',
  usages: ['saber init templateName projectName']
}, {
  name: 'config',
  alias: 'cfg',
  description: 'config .saberrc',
  usages: ['saber config set <k> <v>', 'saber config get <k>', 'saber config get', 'saber config reset']
}];
(0, _options.getCommandOptions)().forEach(option => {
  program.option(option.key, option.desc);
});
actions.forEach(action => {
  program.command(action.name).description(action.description).alias(action.alias).action(() => {
    const actionArgs = getActionArgs();
    printCommandInfo({
      actionArgs,
      actionName: action.name
    });
    (0, _apply.default)(program, action.name, ...actionArgs);
  });
});

function help() {
  console.log('\r\nUsage:');
  actions.forEach(action => {
    action.usages.forEach(usage => {
      console.log('  - ' + usage);
    });
  });
  console.log('\r');
}

program.on('-h', help);
program.on('--help', help);
program.parse(process.argv);

function printCommandInfo(info) {
  function printOptions() {
    const props = (0, _options.getAvailableOptionNames)();
    let result = props.reduce((sum, prop) => sum + `
    ${prop}: ${program[prop]}
    `, '');
    console.log('OPTIONS', result);
  }

  if (!_constants.__PROD__) {
    console.log(`
    MODE: ${process.env.NODE_ENV}
    ARGS:`, process.argv, `
    actionName: ${info.actionName}
    actionArgs: `, info.actionArgs);
    printOptions();
  }
}

function getActionArgs() {
  const args = process.argv.slice(3);
  const keys = (0, _options.getAvailableOptionKeys)();
  return args.filter(item => !keys.includes(item));
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9tYWluLnRzIl0sIm5hbWVzIjpbInByb2dyYW0iLCJjb21tYW5kZXIiLCJDb21tYW5kIiwidmVyc2lvbiIsIlZFUlNJT04iLCJhY3Rpb25zIiwibmFtZSIsImFsaWFzIiwiZGVzY3JpcHRpb24iLCJ1c2FnZXMiLCJmb3JFYWNoIiwib3B0aW9uIiwia2V5IiwiZGVzYyIsImFjdGlvbiIsImNvbW1hbmQiLCJhY3Rpb25BcmdzIiwiZ2V0QWN0aW9uQXJncyIsInByaW50Q29tbWFuZEluZm8iLCJhY3Rpb25OYW1lIiwiaGVscCIsImNvbnNvbGUiLCJsb2ciLCJ1c2FnZSIsIm9uIiwicGFyc2UiLCJwcm9jZXNzIiwiYXJndiIsImluZm8iLCJwcmludE9wdGlvbnMiLCJwcm9wcyIsInJlc3VsdCIsInJlZHVjZSIsInN1bSIsInByb3AiLCJfX1BST0RfXyIsImVudiIsIk5PREVfRU5WIiwiYXJncyIsInNsaWNlIiwia2V5cyIsImZpbHRlciIsIml0ZW0iLCJpbmNsdWRlcyJdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7Ozs7Ozs7QUFHQSxNQUFNQSxPQUFlLEdBQUcsSUFBSUMsU0FBUyxDQUFDQyxPQUFkLEVBQXhCO0FBRUFGLE9BQU8sQ0FBQ0csT0FBUixDQUFnQkMsa0JBQWhCO0FBRUEsTUFBTUMsT0FBd0IsR0FBRyxDQUMvQjtBQUNFQyxFQUFBQSxJQUFJLEVBQUUsTUFEUjtBQUVFQyxFQUFBQSxLQUFLLEVBQUUsR0FGVDtBQUdFQyxFQUFBQSxXQUFXLEVBQUUsd0JBSGY7QUFJRUMsRUFBQUEsTUFBTSxFQUFFLENBQUMscUNBQUQ7QUFKVixDQUQrQixFQU8vQjtBQUNFSCxFQUFBQSxJQUFJLEVBQUUsUUFEUjtBQUVFQyxFQUFBQSxLQUFLLEVBQUUsS0FGVDtBQUdFQyxFQUFBQSxXQUFXLEVBQUUsaUJBSGY7QUFJRUMsRUFBQUEsTUFBTSxFQUFFLENBQ0osMEJBREksRUFFSixzQkFGSSxFQUdKLGtCQUhJLEVBSUosb0JBSkk7QUFKVixDQVArQixDQUFqQztBQW9CQSxrQ0FBb0JDLE9BQXBCLENBQTRCQyxNQUFNLElBQUk7QUFDcENYLEVBQUFBLE9BQU8sQ0FBQ1csTUFBUixDQUFlQSxNQUFNLENBQUNDLEdBQXRCLEVBQTJCRCxNQUFNLENBQUNFLElBQWxDO0FBQ0QsQ0FGRDtBQUlBUixPQUFPLENBQUNLLE9BQVIsQ0FBZ0JJLE1BQU0sSUFBSTtBQUN4QmQsRUFBQUEsT0FBTyxDQUFDZSxPQUFSLENBQWdCRCxNQUFNLENBQUNSLElBQXZCLEVBQ0dFLFdBREgsQ0FDZU0sTUFBTSxDQUFDTixXQUR0QixFQUVHRCxLQUZILENBRVNPLE1BQU0sQ0FBQ1AsS0FGaEIsRUFHR08sTUFISCxDQUdVLE1BQU07QUFDWixVQUFNRSxVQUFVLEdBQUdDLGFBQWEsRUFBaEM7QUFDQUMsSUFBQUEsZ0JBQWdCLENBQUM7QUFDZkYsTUFBQUEsVUFEZTtBQUVmRyxNQUFBQSxVQUFVLEVBQUVMLE1BQU0sQ0FBQ1I7QUFGSixLQUFELENBQWhCO0FBSUEsd0JBQU1OLE9BQU4sRUFBZWMsTUFBTSxDQUFDUixJQUF0QixFQUE0QixHQUFHVSxVQUEvQjtBQUNELEdBVkg7QUFXRCxDQVpEOztBQWNBLFNBQVNJLElBQVQsR0FBZ0I7QUFDZEMsRUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksWUFBWjtBQUNBakIsRUFBQUEsT0FBTyxDQUFDSyxPQUFSLENBQWlCSSxNQUFELElBQTJCO0FBQ3pDQSxJQUFBQSxNQUFNLENBQUNMLE1BQVAsQ0FBY0MsT0FBZCxDQUFzQmEsS0FBSyxJQUFJO0FBQzNCRixNQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxTQUFTQyxLQUFyQjtBQUNILEtBRkQ7QUFHRCxHQUpEO0FBS0FGLEVBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLElBQVo7QUFDRDs7QUFDRHRCLE9BQU8sQ0FBQ3dCLEVBQVIsQ0FBVyxJQUFYLEVBQWlCSixJQUFqQjtBQUNBcEIsT0FBTyxDQUFDd0IsRUFBUixDQUFXLFFBQVgsRUFBcUJKLElBQXJCO0FBR0FwQixPQUFPLENBQUN5QixLQUFSLENBQWNDLE9BQU8sQ0FBQ0MsSUFBdEI7O0FBT0EsU0FBU1QsZ0JBQVQsQ0FBMEJVLElBQTFCLEVBQTZDO0FBQzNDLFdBQVNDLFlBQVQsR0FBd0I7QUFDdEIsVUFBTUMsS0FBSyxHQUFHLHVDQUFkO0FBQ0EsUUFBSUMsTUFBTSxHQUFHRCxLQUFLLENBQUNFLE1BQU4sQ0FBYSxDQUFDQyxHQUFELEVBQU1DLElBQU4sS0FBZUQsR0FBRyxHQUFJO01BQzlDQyxJQUFLLEtBQUlsQyxPQUFPLENBQUNrQyxJQUFELENBQU87S0FEWixFQUVWLEVBRlUsQ0FBYjtBQUdBYixJQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FDRSxTQURGLEVBRUVTLE1BRkY7QUFHRDs7QUFDRCxNQUFJLENBQUNJLG1CQUFMLEVBQWU7QUFDYmQsSUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQWE7WUFDTEksT0FBTyxDQUFDVSxHQUFSLENBQVlDLFFBQVM7VUFEN0IsRUFHQVgsT0FBTyxDQUFDQyxJQUhSLEVBSUM7a0JBQ2FDLElBQUksQ0FBQ1QsVUFBVztpQkFMOUIsRUFPQVMsSUFBSSxDQUFDWixVQVBMO0FBU0FhLElBQUFBLFlBQVk7QUFDYjtBQUNGOztBQUVELFNBQVNaLGFBQVQsR0FBeUI7QUFDdkIsUUFBTXFCLElBQUksR0FBR1osT0FBTyxDQUFDQyxJQUFSLENBQWFZLEtBQWIsQ0FBbUIsQ0FBbkIsQ0FBYjtBQUNBLFFBQU1DLElBQUksR0FBRyxzQ0FBYjtBQUNBLFNBQU9GLElBQUksQ0FBQ0csTUFBTCxDQUFZQyxJQUFJLElBQUksQ0FBQ0YsSUFBSSxDQUFDRyxRQUFMLENBQWNELElBQWQsQ0FBckIsQ0FBUDtBQUNEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgY29tbWFuZGVyIGZyb20gJ2NvbW1hbmRlcic7XG5pbXBvcnQgJy4vdXBkYXRlLW5vdGlmaWVyJztcbmltcG9ydCB7IFZFUlNJT04sIF9fUFJPRF9fIH0gZnJvbSAnLi91dGlscy9jb25zdGFudHMnXG5pbXBvcnQgYXBwbHkgZnJvbSAnLi9hcHBseSdcbmltcG9ydCB7IGdldENvbW1hbmRPcHRpb25zLCBnZXRBdmFpbGFibGVPcHRpb25LZXlzLCBnZXRBdmFpbGFibGVPcHRpb25OYW1lc30gZnJvbSAnLi9vcHRpb25zJ1xuaW1wb3J0IHsgQ29tbWFuZCwgSUFjdGlvbk9wdGlvbiB9IGZyb20gJy4vaW5kZXguZCdcblxuY29uc3QgcHJvZ3JhbTpDb21tYW5kID0gbmV3IGNvbW1hbmRlci5Db21tYW5kKClcblxucHJvZ3JhbS52ZXJzaW9uKFZFUlNJT04pXG5cbmNvbnN0IGFjdGlvbnM6IElBY3Rpb25PcHRpb25bXSA9IFtcbiAge1xuICAgIG5hbWU6ICdpbml0JyxcbiAgICBhbGlhczogJ2knLFxuICAgIGRlc2NyaXB0aW9uOiAnZ2VuZXJhdGUgYSBuZXcgcHJvamVjdCcsXG4gICAgdXNhZ2VzOiBbJ3NhYmVyIGluaXQgdGVtcGxhdGVOYW1lIHByb2plY3ROYW1lJ11cbiAgfSxcbiAge1xuICAgIG5hbWU6ICdjb25maWcnLFxuICAgIGFsaWFzOiAnY2ZnJyxcbiAgICBkZXNjcmlwdGlvbjogJ2NvbmZpZyAuc2FiZXJyYycsXG4gICAgdXNhZ2VzOiBbXG4gICAgICAgICdzYWJlciBjb25maWcgc2V0IDxrPiA8dj4nLFxuICAgICAgICAnc2FiZXIgY29uZmlnIGdldCA8az4nLFxuICAgICAgICAnc2FiZXIgY29uZmlnIGdldCcsXG4gICAgICAgICdzYWJlciBjb25maWcgcmVzZXQnXG4gICAgXVxuICB9XG5dO1xuXG5nZXRDb21tYW5kT3B0aW9ucygpLmZvckVhY2gob3B0aW9uID0+IHtcbiAgcHJvZ3JhbS5vcHRpb24ob3B0aW9uLmtleSwgb3B0aW9uLmRlc2MpXG59KVxuXG5hY3Rpb25zLmZvckVhY2goYWN0aW9uID0+IHtcbiAgcHJvZ3JhbS5jb21tYW5kKGFjdGlvbi5uYW1lKVxuICAgIC5kZXNjcmlwdGlvbihhY3Rpb24uZGVzY3JpcHRpb24pXG4gICAgLmFsaWFzKGFjdGlvbi5hbGlhcylcbiAgICAuYWN0aW9uKCgpID0+IHtcbiAgICAgIGNvbnN0IGFjdGlvbkFyZ3MgPSBnZXRBY3Rpb25BcmdzKClcbiAgICAgIHByaW50Q29tbWFuZEluZm8oe1xuICAgICAgICBhY3Rpb25BcmdzLFxuICAgICAgICBhY3Rpb25OYW1lOiBhY3Rpb24ubmFtZVxuICAgICAgfSlcbiAgICAgIGFwcGx5KHByb2dyYW0sIGFjdGlvbi5uYW1lLCAuLi5hY3Rpb25BcmdzKVxuICAgIH0pXG59KVxuXG5mdW5jdGlvbiBoZWxwKCkge1xuICBjb25zb2xlLmxvZygnXFxyXFxuVXNhZ2U6Jyk7XG4gIGFjdGlvbnMuZm9yRWFjaCgoYWN0aW9uOiBJQWN0aW9uT3B0aW9uKSA9PiB7XG4gICAgYWN0aW9uLnVzYWdlcy5mb3JFYWNoKHVzYWdlID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coJyAgLSAnICsgdXNhZ2UpO1xuICAgIH0pO1xuICB9KTtcbiAgY29uc29sZS5sb2coJ1xccicpO1xufVxucHJvZ3JhbS5vbignLWgnLCBoZWxwKVxucHJvZ3JhbS5vbignLS1oZWxwJywgaGVscClcblxuXG5wcm9ncmFtLnBhcnNlKHByb2Nlc3MuYXJndik7XG5cblxuaW50ZXJmYWNlIENvbW1hbmRJbmZvIHtcbiAgYWN0aW9uTmFtZTogc3RyaW5nLFxuICBhY3Rpb25BcmdzOiBhbnlbXVxufVxuZnVuY3Rpb24gcHJpbnRDb21tYW5kSW5mbyhpbmZvOiBDb21tYW5kSW5mbykge1xuICBmdW5jdGlvbiBwcmludE9wdGlvbnMoKSB7XG4gICAgY29uc3QgcHJvcHMgPSBnZXRBdmFpbGFibGVPcHRpb25OYW1lcygpXG4gICAgbGV0IHJlc3VsdCA9IHByb3BzLnJlZHVjZSgoc3VtLCBwcm9wKSA9PiBzdW0gKyBgXG4gICAgJHtwcm9wfTogJHtwcm9ncmFtW3Byb3BdfVxuICAgIGAsICcnKTtcbiAgICBjb25zb2xlLmxvZyhcbiAgICAgICdPUFRJT05TJyxcbiAgICAgIHJlc3VsdClcbiAgfVxuICBpZiAoIV9fUFJPRF9fKSB7XG4gICAgY29uc29sZS5sb2coYFxuICAgIE1PREU6ICR7cHJvY2Vzcy5lbnYuTk9ERV9FTlZ9XG4gICAgQVJHUzpgLFxuICAgIHByb2Nlc3MuYXJndixcbiAgICBgXG4gICAgYWN0aW9uTmFtZTogJHtpbmZvLmFjdGlvbk5hbWV9XG4gICAgYWN0aW9uQXJnczogYCxcbiAgICBpbmZvLmFjdGlvbkFyZ3NcbiAgICApXG4gICAgcHJpbnRPcHRpb25zKClcbiAgfVxufVxuXG5mdW5jdGlvbiBnZXRBY3Rpb25BcmdzKCkge1xuICBjb25zdCBhcmdzID0gcHJvY2Vzcy5hcmd2LnNsaWNlKDMpXG4gIGNvbnN0IGtleXMgPSBnZXRBdmFpbGFibGVPcHRpb25LZXlzKClcbiAgcmV0dXJuIGFyZ3MuZmlsdGVyKGl0ZW0gPT4gIWtleXMuaW5jbHVkZXMoaXRlbSkpXG59XG4iXX0=