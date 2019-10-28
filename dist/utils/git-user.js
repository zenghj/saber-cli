"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getGitUser;

var _child_process = require("child_process");

function getGitUser() {
  let name;
  let email;

  try {
    const nameBuffer = (0, _child_process.execSync)('git config --get user.name');
    const emailBuffer = (0, _child_process.execSync)('git config --get user.email');
    name = nameBuffer && nameBuffer.toString().trim();
    email = emailBuffer && `<${emailBuffer.toString().trim()}>`;
  } catch (e) {}

  return (name || '') + (email || '');
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9naXQtdXNlci50cyJdLCJuYW1lcyI6WyJnZXRHaXRVc2VyIiwibmFtZSIsImVtYWlsIiwibmFtZUJ1ZmZlciIsImVtYWlsQnVmZmVyIiwidG9TdHJpbmciLCJ0cmltIiwiZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOztBQUtlLFNBQVNBLFVBQVQsR0FBNkI7QUFDMUMsTUFBSUMsSUFBSjtBQUNBLE1BQUlDLEtBQUo7O0FBRUEsTUFBSTtBQUNGLFVBQU1DLFVBQWtCLEdBQUcsNkJBQVMsNEJBQVQsQ0FBM0I7QUFDQSxVQUFNQyxXQUFtQixHQUFHLDZCQUFTLDZCQUFULENBQTVCO0FBQ0FILElBQUFBLElBQUksR0FBR0UsVUFBVSxJQUFJQSxVQUFVLENBQUNFLFFBQVgsR0FBc0JDLElBQXRCLEVBQXJCO0FBQ0FKLElBQUFBLEtBQUssR0FBR0UsV0FBVyxJQUFLLElBQUdBLFdBQVcsQ0FBQ0MsUUFBWixHQUF1QkMsSUFBdkIsRUFBOEIsR0FBekQ7QUFDRCxHQUxELENBS0UsT0FBT0MsQ0FBUCxFQUFVLENBQUU7O0FBRWQsU0FBTyxDQUFDTixJQUFJLElBQUksRUFBVCxLQUFnQkMsS0FBSyxJQUFJLEVBQXpCLENBQVA7QUFDRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGV4ZWNTeW5jIH0gZnJvbSAnY2hpbGRfcHJvY2VzcydcblxuLyoqXG4gKiBAcmV0dXJuIFwiZ2l0VXNlck5hbWU8Z2l0VXNlckVtYWlsPlwiXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdldEdpdFVzZXIoKTpzdHJpbmcge1xuICBsZXQgbmFtZTpzdHJpbmdcbiAgbGV0IGVtYWlsOnN0cmluZ1xuICBcbiAgdHJ5IHtcbiAgICBjb25zdCBuYW1lQnVmZmVyOiBCdWZmZXIgPSBleGVjU3luYygnZ2l0IGNvbmZpZyAtLWdldCB1c2VyLm5hbWUnKVxuICAgIGNvbnN0IGVtYWlsQnVmZmVyOiBCdWZmZXIgPSBleGVjU3luYygnZ2l0IGNvbmZpZyAtLWdldCB1c2VyLmVtYWlsJylcbiAgICBuYW1lID0gbmFtZUJ1ZmZlciAmJiBuYW1lQnVmZmVyLnRvU3RyaW5nKCkudHJpbSgpXG4gICAgZW1haWwgPSBlbWFpbEJ1ZmZlciAmJiBgPCR7ZW1haWxCdWZmZXIudG9TdHJpbmcoKS50cmltKCl9PmBcbiAgfSBjYXRjaCAoZSkge31cbiAgXG4gIHJldHVybiAobmFtZSB8fCAnJykgKyAoZW1haWwgfHwgJycpXG59XG4iXX0=