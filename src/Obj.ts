import * as Str from "./Str";
import { compareArray, range, wrap } from "./Arr";
import { equalsAny} from "./Str";

export function add(obj: Object, key: string, value: any) {
    let objDot = dot(obj);
    if(!objDot[key]) {
        return set(obj, key, value);
    }
    return obj;
}

export function except(obj: Object, keys: string| string[]) {
    keys = wrap(keys);
    return removeValue(obj, '', keys);
}

export function pluck(array: Object [], key: string) {
    return array.map(obj => {
        return get(obj, key);
    });
}

export function divide(obj: Object) {
    return [Object.keys(obj), Object.values(obj)];
}

export function get(obj: Object, key: string, defaultValue = null) {
    let objDot = dot(obj);
    return objDot[key] ? objDot[key] : defaultValue;
}

export function has(obj: Object, key: string) {
    return !!dot(obj)[key];
}

export function only(obj: Object, keys: string | string[]) {
    let onlyKeys = wrap(keys).sort();
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

export function set(obj: Object, key: string, value: any) {
    return setObj(obj, key, value);
}

export function dot(obj) {
    return passingLastKey(obj, null);
}

function removeValue(obj: Object | any[], currentKey, keyRemove: string[]) {
    let isArray = false;
    if(obj instanceof Array) {
        isArray = true;
    }
    
    Object.entries(obj).forEach(entry => {
        let [key, value] = entry;
        let fullKey = currentKey + key;
        let keyRemoveArray = fullKey.toString()
            .replace(/\.[0-9]+\./, '.')
            .replace(/\.[0-9]+$/, '')
            .replace(/^[0-9]+\./, '');
        
        if(equalsAny(fullKey, keyRemove) || equalsAny(keyRemoveArray, keyRemove)) {
            delete obj[key];
        } else {
            if(typeof value === 'object') {
                obj[key] = removeValue(value, fullKey + '.', keyRemove);    
            }
        }
    });
    
    if (isArray) {
        return Object.values(obj);
    }
    
    return obj;
}

function setObj(obj: Object, key: string, value: any) {
    
    if(Str.contains(key, '.')) {
        let split = key.split('.');
        let keyFirst = split[0];
        let newKey = split.splice(1, split.length).join('.');
        let newObj = obj[keyFirst] ? obj[keyFirst] : {};
        
        obj[keyFirst] = setObj(newObj, newKey, value);
        
    } else {
        obj[key] = value;
    }
    
    return obj;
}

function passingLastKey(obj, originalKey) {
    let newObject = {};
    
    originalKey = originalKey === null ? '' : originalKey + '.';
    
    Object.entries(obj).forEach(entry => {
        if(entry[1] instanceof Object) {
            Object.entries(entry[1]).forEach(entry2 => {
                let key = originalKey + entry[0];
                let value = entry2[1];
                if(entry2[1] instanceof Object) {
                    key = key + '.' + entry2[0];
                    newObject = {...newObject , ...passingLastKey(value, key)}    
                } else {
                    newObject[key + '.' + entry2[0]] = entry2[1];
                }
                
            });
        } else {
            newObject[originalKey + entry[0]] = entry[1];
        }
    });
    
    return newObject;
}

function convertArrayAssocToArraySeqRecursive(obj) {
    if(obj instanceof Object) {
        let keys = Object.keys(obj).map((i) => parseInt(i));
        if(compareArray(keys, range(0, keys.length-1)) && keys.length !== 0) {
            
            return Object.values(obj)
                .map(i => convertArrayAssocToArraySeqRecursive(i));
        } else {
            Object.entries(obj).forEach(entry => {
                let [key, value] = entry;
                obj[key] = convertArrayAssocToArraySeqRecursive(value);
            });
        }
    }
    
    return obj;
}