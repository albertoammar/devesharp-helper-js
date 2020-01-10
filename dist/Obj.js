"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Str = require("./Str");
const Arr_1 = require("./Arr");
function add(obj, key, value) {
    let objDot = dot(obj);
    if (!objDot[key]) {
        return set(obj, key, value);
    }
    return obj;
}
exports.add = add;
function except(obj, key) {
    return removeValue(obj, key);
}
exports.except = except;
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
            if (keyD === onlyKey) {
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
function removeValue(obj, key) {
    if (Str.contains(key, '.')) {
        let split = key.split('.');
        let keyFirst = split[0];
        let newKey = split.splice(1, split.length).join('.');
        let newObj = obj[keyFirst] ? obj[keyFirst] : {};
        obj[keyFirst] = removeValue(newObj, newKey);
    }
    else {
        if (obj instanceof Array) {
            obj.splice(key, 1);
        }
        else {
            delete obj[key];
        }
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
        if (Arr_1.compareArray(keys, Arr_1.range(0, keys.length)) && keys.length !== 0) {
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