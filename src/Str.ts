import * as Case from 'case';

export function after(string: string, beginWith: string) {
    let reg = new RegExp('^'+beginWith+'.*');
    return reg.test(string);
}

export function before(string: string, endWith: string) {
    let reg = new RegExp('.*'+endWith+'$');
    return reg.test(string);
}

export function camel(string: string) {
    return Case.camel(string);
}

export function kebab(string: string) {
    return Case.kebab(string);
}

export function contains(string: string, needles: string) {
    let reg = new RegExp('.*'+needles+'.*');
    return reg.test(string);
}