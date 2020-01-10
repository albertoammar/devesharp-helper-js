"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Case = require("case");
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
function contains(string, needles) {
    let reg = new RegExp('.*' + needles + '.*');
    return reg.test(string);
}
exports.contains = contains;
function containsAll(string, needles) {
    let truthy = needles.map(value => contains(string, value));
    return truthy.reduce((previous, current) => previous && current);
}
exports.containsAll = containsAll;
//# sourceMappingURL=Str.js.map