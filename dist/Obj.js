"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Str = require("./Str");
const Arr_1 = require("./Arr");
const Str_1 = require("./Str");
function add(obj, key, value) {
    const objDot = dot(obj);
    if (!objDot[key]) {
        return set(obj, key, value);
    }
    return obj;
}
exports.add = add;
function except(obj, originalKeys) {
    const keys = Arr_1.wrap(originalKeys);
    return removeValue(obj, '', keys);
}
exports.except = except;
function pluck(array, key) {
    return array.map(obj => {
        return get(obj, key);
    });
}
exports.pluck = pluck;
function divide(obj) {
    return [Object.keys(obj), Object.values(obj)];
}
exports.divide = divide;
function get(obj, key, defaultValue = null) {
    const objDot = dot(obj);
    return objDot[key] ? objDot[key] : defaultValue;
}
exports.get = get;
function has(obj, key) {
    return !!dot(obj)[key];
}
exports.has = has;
function only(obj, keys) {
    const onlyKeys = Arr_1.wrap(keys).sort();
    const objDot = dot(obj);
    const newObjDot = {};
    Object.entries(objDot).forEach(i => {
        const [key, value] = i;
        onlyKeys.forEach(onlyKey => {
            const keyD = key
                .toString()
                .replace(/\.[0-9]+\./, '.')
                .replace(/\.[0-9]+$/, '')
                .replace(/^[0-9]+\./, '');
            const deep = new RegExp(`${onlyKey}\\.(.*)`).test(keyD);
            if (keyD === onlyKey || deep) {
                newObjDot[key] = value;
            }
        });
    });
    let newObj = {};
    Object.entries(newObjDot).forEach(i => {
        const [key, value] = i;
        newObj = set(newObj, key, value);
    });
    return convertArrayAssocToArraySeqRecursive(newObj);
}
exports.only = only;
function set(obj, key, value) {
    return setObj(obj, key, value);
}
exports.set = set;
function dot(obj) {
    return passingLastKey(obj, null);
}
exports.dot = dot;
function removeValue(obj, currentKey, keyRemove) {
    let isArray = false;
    if (obj instanceof Array) {
        isArray = true;
    }
    Object.entries(obj).forEach(entry => {
        const [key, value] = entry;
        const fullKey = currentKey + key;
        const keyRemoveArray = fullKey
            .toString()
            .replace(/\.[0-9]+\./, '.')
            .replace(/\.[0-9]+$/, '')
            .replace(/^[0-9]+\./, '');
        if (Str_1.equalsAny(fullKey, keyRemove) || Str_1.equalsAny(keyRemoveArray, keyRemove)) {
            delete obj[key];
        }
        else if (typeof value === 'object') {
            obj[key] = removeValue(value, `${fullKey}.`, keyRemove);
        }
    });
    if (isArray) {
        return Object.values(obj);
    }
    return obj;
}
function setObj(obj, key, value) {
    if (Str.contains(key, '.')) {
        const split = key.split('.');
        const keyFirst = split[0];
        const newKey = split.splice(1, split.length).join('.');
        const newObj = obj[keyFirst] ? obj[keyFirst] : {};
        obj[keyFirst] = setObj(newObj, newKey, value);
    }
    else {
        obj[key] = value;
    }
    return obj;
}
function passingLastKey(obj, originalKey) {
    let newObject = {};
    originalKey = originalKey === null ? '' : `${originalKey}.`;
    Object.entries(obj).forEach(entry => {
        if (entry[1] instanceof Object) {
            Object.entries(entry[1]).forEach(entry2 => {
                let key = originalKey + entry[0];
                const value = entry2[1];
                if (entry2[1] instanceof Object) {
                    key = `${key}.${entry2[0]}`;
                    newObject = Object.assign(Object.assign({}, newObject), passingLastKey(value, key));
                }
                else {
                    newObject[`${key}.${entry2[0]}`] = entry2[1];
                }
            });
        }
        else {
            newObject[originalKey + entry[0]] = entry[1];
        }
    });
    return newObject;
}
function convertArrayAssocToArraySeqRecursive(obj) {
    if (obj instanceof Object) {
        const keys = Object.keys(obj).map(i => parseInt(i));
        if (Arr_1.compareArray(keys, Arr_1.range(0, keys.length - 1)) && keys.length !== 0) {
            return Object.values(obj).map(i => convertArrayAssocToArraySeqRecursive(i));
        }
        Object.entries(obj).forEach(entry => {
            const [key, value] = entry;
            obj[key] = convertArrayAssocToArraySeqRecursive(value);
        });
    }
    return obj;
}
//# sourceMappingURL=Obj.js.map