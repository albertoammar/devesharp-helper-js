"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function chunk(array, chunkN) {
    chunkN = chunkN === 0 ? 1 : chunkN;
    const chunks = [];
    for (let i = 0, j = array.length; i < j; i += chunkN) {
        chunks.push(array.slice(i, i + chunkN));
    }
    return chunks;
}
exports.chunk = chunk;
function range(start, end) {
    const rangeArray = [];
    for (let i = start; end + 1 > i; i += 1) {
        rangeArray.push(i);
    }
    return rangeArray;
}
exports.range = range;
function compareArray(array1, array2) {
    return JSON.stringify(array1) === JSON.stringify(array2);
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
function wrap(value) {
    if (!(value instanceof Array)) {
        if (value === null || value === undefined) {
            return value === null || value === undefined ? [] : [value];
        }
        return [value];
    }
    return value;
}
exports.wrap = wrap;
//# sourceMappingURL=Arr.js.map