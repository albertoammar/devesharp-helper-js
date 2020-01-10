"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function after(string, beginWith) {
    let reg = new RegExp('^' + beginWith + '.*');
    return reg.test(string);
}
exports.after = after;
//# sourceMappingURL=Str.js.map