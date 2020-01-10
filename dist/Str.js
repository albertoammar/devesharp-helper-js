"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Case = require("case");
function after(string, value) {
    let split = string.split(value);
    split.splice(0, 1);
    return split.join(value);
}
exports.after = after;
function before(string, value) {
    let split = string.split(value);
    return split[0];
}
exports.before = before;
function startsWith(string, beginWith) {
    let reg = new RegExp('^' + beginWith + '.*');
    return reg.test(string);
}
exports.startsWith = startsWith;
function endsWith(string, endWith) {
    let reg = new RegExp('.*' + endWith + '$');
    return reg.test(string);
}
exports.endsWith = endsWith;
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