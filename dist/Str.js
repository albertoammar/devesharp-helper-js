"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function after(string, beginWith) {
    let reg = new RegExp('^' + beginWith + '.*');
    return reg.test(string);
}
exports.after = after;
function before(string, endWith) {
    let reg = new RegExp('.*' + endWith + '$');
    return reg.test(string);
}
exports.before = before;
//# sourceMappingURL=Str.js.map