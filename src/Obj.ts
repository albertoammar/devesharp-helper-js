import * as Str from "./Str";
import {numberLiteralTypeAnnotation} from "@babel/types";

export function add(obj: Object, key: string, value: any) {
    let objDot = dot(obj);
    if(!objDot[key]) {
        return set(obj, key, value);
    }
    return obj;
}

export function except(obj: Object, key: string) {
    return removeValue(obj, key);
}

export function get(obj: Object, key: string) {
    let objDot = dot(obj);
    return objDot[key] ? objDot[key] : null;
}

export function set(obj: Object, key: string, value: any) {
    return setObj(obj, key, value);
}

export function dot(obj) {
    return passingLastKey(obj, null);
}

function removeValue(obj: Object, key: string) {

    if(Str.contains(key, '.')) {
        let split = key.split('.');
        let keyFirst = split[0];
        let newKey = split.splice(1, split.length).join('.');
        let newObj = obj[keyFirst] ? obj[keyFirst] : {};

        obj[keyFirst] = removeValue(newObj, newKey);
    } else {
        if (obj instanceof Array) {
            obj.splice(key as any, 1);
        } else {
            delete obj[key];
        }
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