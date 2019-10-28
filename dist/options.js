"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCommandOptions = getCommandOptions;
exports.getAvailableOptionKeys = getAvailableOptionKeys;
exports.getAvailableOptionNames = getAvailableOptionNames;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class CommandOption {
  constructor(key, desc) {
    _defineProperty(this, "key", void 0);

    _defineProperty(this, "desc", void 0);

    this.key = key;
    this.desc = desc;
  }

  getKeys() {
    return this.key.split(',').map(k => k.trim());
  }

  getPropName() {
    return this.getKeys()[1].trim().replace('--', '');
  }

}

const commandOptions = [new CommandOption('-c, --clone', 'use git clone'), new CommandOption('-p, --private', 'directly git clone from private repository, make sure you have access to the repository')];
const availableOptions = commandOptions.reduce((sum, option) => {
  sum.push(...option.getKeys());
  return sum;
}, []);

function getCommandOptions() {
  return [...commandOptions];
}

function getAvailableOptionKeys() {
  return [...availableOptions];
}

function getAvailableOptionNames() {
  return commandOptions.map(o => o.getPropName());
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9vcHRpb25zLnRzIl0sIm5hbWVzIjpbIkNvbW1hbmRPcHRpb24iLCJjb25zdHJ1Y3RvciIsImtleSIsImRlc2MiLCJnZXRLZXlzIiwic3BsaXQiLCJtYXAiLCJrIiwidHJpbSIsImdldFByb3BOYW1lIiwicmVwbGFjZSIsImNvbW1hbmRPcHRpb25zIiwiYXZhaWxhYmxlT3B0aW9ucyIsInJlZHVjZSIsInN1bSIsIm9wdGlvbiIsInB1c2giLCJnZXRDb21tYW5kT3B0aW9ucyIsImdldEF2YWlsYWJsZU9wdGlvbktleXMiLCJnZXRBdmFpbGFibGVPcHRpb25OYW1lcyIsIm8iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsTUFBTUEsYUFBTixDQUFvQjtBQUdsQkMsRUFBQUEsV0FBVyxDQUFDQyxHQUFELEVBQU1DLElBQU4sRUFBWTtBQUFBOztBQUFBOztBQUNyQixTQUFLRCxHQUFMLEdBQVdBLEdBQVg7QUFDQSxTQUFLQyxJQUFMLEdBQVlBLElBQVo7QUFDRDs7QUFDREMsRUFBQUEsT0FBTyxHQUFHO0FBQ1IsV0FBTyxLQUFLRixHQUFMLENBQVNHLEtBQVQsQ0FBZSxHQUFmLEVBQW9CQyxHQUFwQixDQUF3QkMsQ0FBQyxJQUFJQSxDQUFDLENBQUNDLElBQUYsRUFBN0IsQ0FBUDtBQUNEOztBQUNEQyxFQUFBQSxXQUFXLEdBQUc7QUFDWixXQUFPLEtBQUtMLE9BQUwsR0FBZSxDQUFmLEVBQWtCSSxJQUFsQixHQUF5QkUsT0FBekIsQ0FBaUMsSUFBakMsRUFBdUMsRUFBdkMsQ0FBUDtBQUNEOztBQVppQjs7QUFlcEIsTUFBTUMsY0FBYyxHQUFHLENBQ3JCLElBQUlYLGFBQUosQ0FBa0IsYUFBbEIsRUFBaUMsZUFBakMsQ0FEcUIsRUFFckIsSUFBSUEsYUFBSixDQUNFLGVBREYsRUFFRSx5RkFGRixDQUZxQixDQUF2QjtBQU9BLE1BQU1ZLGdCQUFnQixHQUFHRCxjQUFjLENBQUNFLE1BQWYsQ0FBc0IsQ0FBQ0MsR0FBRCxFQUFNQyxNQUFOLEtBQWlCO0FBQzlERCxFQUFBQSxHQUFHLENBQUNFLElBQUosQ0FBUyxHQUFHRCxNQUFNLENBQUNYLE9BQVAsRUFBWjtBQUNBLFNBQU9VLEdBQVA7QUFDRCxDQUh3QixFQUd0QixFQUhzQixDQUF6Qjs7QUFLTyxTQUFTRyxpQkFBVCxHQUE2QjtBQUNsQyxTQUFPLENBQUMsR0FBR04sY0FBSixDQUFQO0FBQ0Q7O0FBRU0sU0FBU08sc0JBQVQsR0FBa0M7QUFDdkMsU0FBTyxDQUFDLEdBQUdOLGdCQUFKLENBQVA7QUFDRDs7QUFFTSxTQUFTTyx1QkFBVCxHQUFtQztBQUN4QyxTQUFPUixjQUFjLENBQUNMLEdBQWYsQ0FBbUJjLENBQUMsSUFBSUEsQ0FBQyxDQUFDWCxXQUFGLEVBQXhCLENBQVA7QUFDRCIsInNvdXJjZXNDb250ZW50IjpbImNsYXNzIENvbW1hbmRPcHRpb24ge1xuICBrZXk6IHN0cmluZztcbiAgZGVzYzogc3RyaW5nO1xuICBjb25zdHJ1Y3RvcihrZXksIGRlc2MpIHtcbiAgICB0aGlzLmtleSA9IGtleVxuICAgIHRoaXMuZGVzYyA9IGRlc2NcbiAgfVxuICBnZXRLZXlzKCkge1xuICAgIHJldHVybiB0aGlzLmtleS5zcGxpdCgnLCcpLm1hcChrID0+IGsudHJpbSgpKVxuICB9XG4gIGdldFByb3BOYW1lKCkge1xuICAgIHJldHVybiB0aGlzLmdldEtleXMoKVsxXS50cmltKCkucmVwbGFjZSgnLS0nLCAnJylcbiAgfVxufVxuXG5jb25zdCBjb21tYW5kT3B0aW9ucyA9IFtcbiAgbmV3IENvbW1hbmRPcHRpb24oJy1jLCAtLWNsb25lJywgJ3VzZSBnaXQgY2xvbmUnKSxcbiAgbmV3IENvbW1hbmRPcHRpb24oXG4gICAgJy1wLCAtLXByaXZhdGUnLFxuICAgICdkaXJlY3RseSBnaXQgY2xvbmUgZnJvbSBwcml2YXRlIHJlcG9zaXRvcnksIG1ha2Ugc3VyZSB5b3UgaGF2ZSBhY2Nlc3MgdG8gdGhlIHJlcG9zaXRvcnknXG4gIClcbl1cbmNvbnN0IGF2YWlsYWJsZU9wdGlvbnMgPSBjb21tYW5kT3B0aW9ucy5yZWR1Y2UoKHN1bSwgb3B0aW9uKSA9PiB7XG4gIHN1bS5wdXNoKC4uLm9wdGlvbi5nZXRLZXlzKCkpXG4gIHJldHVybiBzdW1cbn0sIFtdKVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0Q29tbWFuZE9wdGlvbnMoKSB7XG4gIHJldHVybiBbLi4uY29tbWFuZE9wdGlvbnNdXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRBdmFpbGFibGVPcHRpb25LZXlzKCkge1xuICByZXR1cm4gWy4uLmF2YWlsYWJsZU9wdGlvbnNdXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRBdmFpbGFibGVPcHRpb25OYW1lcygpIHtcbiAgcmV0dXJuIGNvbW1hbmRPcHRpb25zLm1hcChvID0+IG8uZ2V0UHJvcE5hbWUoKSlcbn0iXX0=