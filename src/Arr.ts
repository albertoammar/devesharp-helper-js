
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

export function warp(value: any[] | any) {
    if(!(value instanceof Array)) {
        if(value === null || value === undefined) {
            return (value === null || value === undefined) ? [] : [value];    
        }
        return [value];
    }
    
    return value;
}

// export function containsAll(array: any[], needles: any[] | any) {
//     array.forEach((i) => {
//         Object.entries(needles).forEach(entry => {
//             let [key, value] = entry;
//             if (i == value) {
//                 console.log(value);
//             }
//         })
//     });
//    
//     return true;
// }