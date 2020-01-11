"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function range(start, end) {
    let range = [];
    for (let i = start; end + 1 > i; i++) {
        range.push(i);
    }
    return range;
}
exports.range = range;
function compareArray(array1, array2) {
    return JSON.stringify(array1) == JSON.stringify(array2);
}
exports.compareArray = compareArray;
function collapse(array) {
    let newArray = [];
    array.forEach(value => {
        newArray = [...newArray, ...value];
    });
    return newArray;
}
exports.collapse = collapse;
function warp(value) {
    if (!(value instanceof Array)) {
        if (value === null || value === undefined) {
            return (value === null || value === undefined) ? [] : [value];
        }
        return [value];
    }
    return value;
}
exports.warp = warp;
//# sourceMappingURL=Arr.js.map