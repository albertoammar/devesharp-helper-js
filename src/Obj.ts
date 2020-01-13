import * as Str from './Str';
import { compareArray, range, wrap } from './Arr';
import { equalsAny } from './Str';

export function add(obj: Record<string, any>, key: string, value: any) {
    const objDot = dot(obj);
    if (!objDot[key]) {
        return set(obj, key, value);
    }
    return obj;
}

export function except(obj: Record<string, any>, originalKeys: string | string[]) {
    const keys = wrap(originalKeys);
    return removeValue(obj, '', keys);
}

export function pluck(array: Record<string, any>[], key: string) {
    return array.map(obj => {
        return get(obj, key);
    });
}

export function divide(obj: Record<string, any>) {
    return [Object.keys(obj), Object.values(obj)];
}

export function get(obj: Record<string, any>, key: string, defaultValue = null) {
    const objDot = dot(obj);
    return objDot[key] ? objDot[key] : defaultValue;
}

export function has(obj: Record<string, any>, key: string) {
    return !!dot(obj)[key];
}

export function only(obj: Record<string, any>, keys: string | string[]) {
    const onlyKeys = wrap(keys).sort();
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

export function set(obj: Record<string, any>, key: string, value: any) {
    return setObj(obj, key, value);
}

export function dot(obj) {
    return passingLastKey(obj, null);
}

function removeValue(obj: Record<string, any> | any[], currentKey, keyRemove: string[]) {
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

        if (equalsAny(fullKey, keyRemove) || equalsAny(keyRemoveArray, keyRemove)) {
            delete obj[key];
        } else if (typeof value === 'object') {
            obj[key] = removeValue(value, `${fullKey}.`, keyRemove);
        }
    });

    if (isArray) {
        return Object.values(obj);
    }

    return obj;
}

function setObj(obj: Record<string, any>, key: string, value: any) {
    if (Str.contains(key, '.')) {
        const split = key.split('.');
        const keyFirst = split[0];
        const newKey = split.splice(1, split.length).join('.');
        const newObj = obj[keyFirst] ? obj[keyFirst] : {};

        obj[keyFirst] = setObj(newObj, newKey, value);
    } else {
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
                    newObject = { ...newObject, ...passingLastKey(value, key) };
                } else {
                    newObject[`${key}.${entry2[0]}`] = entry2[1];
                }
            });
        } else {
            newObject[originalKey + entry[0]] = entry[1];
        }
    });

    return newObject;
}

function convertArrayAssocToArraySeqRecursive(obj) {
    if (obj instanceof Object) {
        const keys = Object.keys(obj).map(i => parseInt(i));
        if (compareArray(keys, range(0, keys.length - 1)) && keys.length !== 0) {
            return Object.values(obj).map(i => convertArrayAssocToArraySeqRecursive(i));
        }
        Object.entries(obj).forEach(entry => {
            const [key, value] = entry;
            obj[key] = convertArrayAssocToArraySeqRecursive(value);
        });
    }

    return obj;
}
