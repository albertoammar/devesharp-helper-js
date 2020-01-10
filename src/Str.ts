export function after(string: string, beginWith: string) {
    let reg = new RegExp('^'+beginWith+'.*');
    return reg.test(string);
}