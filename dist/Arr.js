"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function range(start, end) {
    let range = [];
    for (let i = start; end > i; i++) {
        range.push(i);
    }
    return range;
}
exports.range = range;
function compareArray(array1, array2) {
    return JSON.stringify(array1) == JSON.stringify(array2);
}
exports.compareArray = compareArray;
//# sourceMappingURL=Arr.js.map