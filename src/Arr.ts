
export function range(start: number, end: number) {
    let range = [];
    
    for (let i = start; end > i; i++) {
        range.push(i);    
    }
    
    return range;
}

export function compareArray(array1: any[], array2: any[]) {
    return JSON.stringify(array1) == JSON.stringify(array2);
}