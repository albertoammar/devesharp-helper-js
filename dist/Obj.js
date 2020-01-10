"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Str = require("./Str");
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
function get(obj, key) {
    let objDot = dot(obj);
    return objDot[key] ? objDot[key] : null;
}
exports.get = get;
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
//# sourceMappingURL=Obj.js.map