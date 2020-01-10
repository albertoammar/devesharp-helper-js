export function dot(obj) {
    let newObject = {};

    if(obj !instanceof Object) {
        new Error('Parameter must be object');
    }

    return passingLastKey(obj, null);
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