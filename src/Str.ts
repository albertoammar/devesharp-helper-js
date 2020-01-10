export function after(string: string, beginWith: string) {
    let reg = new RegExp('^'+beginWith+'.*');
    return reg.test(string);
}

export function before(string: string, endWith: string) {
    let reg = new RegExp('.*'+endWith+'$');
    return reg.test(string);
}