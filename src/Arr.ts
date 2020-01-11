
export function range(start: number, end: number) {
    let range = [];
    
    for (let i = start; end+1 > i; i++) {
        range.push(i);    
    }
    
    return range;
}

export function compareArray(array1: any[], array2: any[]) {
    return JSON.stringify(array1) == JSON.stringify(array2);
}

export function collapse(array: any[]) {
    let newArray = [];
    array.forEach(value => {
        newArray = [...newArray,...value];
    });
    
    return newArray;
}

export function wrap(value: any[] | any) {
    if(!(value instanceof Array)) {
        if(value === null || value === undefined) {
            return (value === null || value === undefined) ? [] : [value];    
        }
        return [value];
    }
    
    return value;
}