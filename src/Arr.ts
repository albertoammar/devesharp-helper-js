export function chunk<T = any>(array: T[], chunkN: number): T[][] {
    chunkN = chunkN === 0 ? 1 : chunkN;
    const chunks = [];
    for (let i = 0, j = array.length; i < j; i += chunkN) {
        chunks.push(array.slice(i, i + chunkN));
    }

    return chunks;
}

export function range(start: number, end: number): number[] {
    const rangeArray = [];

    for (let i = start; end + 1 > i; i += 1) {
        rangeArray.push(i);
    }

    return rangeArray;
}

export function compareArray(array1: any[], array2: any[]): boolean {
    return JSON.stringify(array1) === JSON.stringify(array2);
}

export function collapse(array: any[]): any[] {
    let newArray = [];
    array.forEach(value => {
        newArray = [...newArray, ...value];
    });

    return newArray;
}

export function wrap(value: any[] | any): any {
    if (!(value instanceof Array)) {
        if (value === null || value === undefined) {
            return value === null || value === undefined ? [] : [value];
        }
        return [value];
    }

    return value;
}
