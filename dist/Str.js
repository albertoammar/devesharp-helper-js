"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Case = require("case");
console.log(Case.camel('sdsd'));
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
function camel(string) {
    return Case.camel(string);
}
exports.camel = camel;
function kebab(string) {
    return Case.kebab(string);
}
exports.kebab = kebab;
//# sourceMappingURL=Str.js.map