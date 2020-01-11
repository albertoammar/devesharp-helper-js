"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Str = require("./Str");
const Arr_1 = require("./Arr");
const Str_1 = require("./Str");
function add(obj, key, value) {
    let objDot = dot(obj);
    if (!objDot[key]) {
        return set(obj, key, value);
    }
    return obj;
}
exports.add = add;
function except(obj, keys) {
    keys = Arr_1.warp(keys);
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
    let objDot = dot(obj);
    return objDot[key] ? objDot[key] : defaultValue;
}
exports.get = get;
function has(obj, key) {
    return !!dot(obj)[key];
}
exports.has = has;
function only(obj, keys) {
    let onlyKeys = Arr_1.warp(keys).sort();
    let objDot = dot(obj);
    let newObjDot = {};
    Object.entries(objDot).forEach(i => {
        let [key, value] = i;
        onlyKeys.forEach(onlyKey => {
            let keyD = key.toString()
                .replace(/\.[0-9]+\./, '.')
                .replace(/\.[0-9]+$/, '')
                .replace(/^[0-9]+\./, '');
            let deep = new RegExp(onlyKey + '\\.(.*)').test(keyD);
            if (keyD === onlyKey || deep) {
                newObjDot[key] = value;
            }
        });
    });
    let newObj = {};
    Object.entries(newObjDot).forEach(i => {
        let [key, value] = i;
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
        let [key, value] = entry;
        let fullKey = currentKey + key;
        let keyRemoveArray = fullKey.toString()
            .replace(/\.[0-9]+\./, '.')
            .replace(/\.[0-9]+$/, '')
            .replace(/^[0-9]+\./, '');
        if (Str_1.equalsAny(fullKey, keyRemove) || Str_1.equalsAny(keyRemoveArray, keyRemove)) {
            delete obj[key];
        }
        else {
            if (typeof value === 'object') {
                obj[key] = removeValue(value, fullKey + '.', keyRemove);
            }
        }
    });
    if (isArray) {
        return Object.values(obj);
    }
    return obj;
}
function setObj(obj, key, value) {
    if (Str.contains(key, '.')) {
        let split = key.split('.');
        let keyFirst = split[0];
        let newKey = split.splice(1, split.length).join('.');
        let newObj = obj[keyFirst] ? obj[keyFirst] : {};
        obj[keyFirst] = setObj(newObj, newKey, value);
    }
    else {
        obj[key] = value;
    }
    return obj;
}
function passingLastKey(obj, originalKey) {
    let newObject = {};
    originalKey = originalKey === null ? '' : originalKey + '.';
    Object.entries(obj).forEach(entry => {
        if (entry[1] instanceof Object) {
            Object.entries(entry[1]).forEach(entry2 => {
                let key = originalKey + entry[0];
                let value = entry2[1];
                if (entry2[1] instanceof Object) {
                    key = key + '.' + entry2[0];
                    newObject = Object.assign(Object.assign({}, newObject), passingLastKey(value, key));
                }
                else {
                    newObject[key + '.' + entry2[0]] = entry2[1];
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
        let keys = Object.keys(obj).map((i) => parseInt(i));
        if (Arr_1.compareArray(keys, Arr_1.range(0, keys.length - 1)) && keys.length !== 0) {
            return Object.values(obj)
                .map(i => convertArrayAssocToArraySeqRecursive(i));
        }
        else {
            Object.entries(obj).forEach(entry => {
                let [key, value] = entry;
                obj[key] = convertArrayAssocToArraySeqRecursive(value);
            });
        }
    }
    return obj;
}
//# sourceMappingURL=Obj.js.map