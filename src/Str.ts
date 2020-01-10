import * as Case from 'case';

export function after(string: string, value: string) {
    let split = string.split(value);
    split.splice(0, 1);
    return split.join(value);
}

export function startsWith(string: string, beginWith: string) {
    let reg = new RegExp('^'+beginWith+'.*');
    return reg.test(string);
}

export function endsWith(string: string, endWith: string) {
    let reg = new RegExp('.*'+endWith+'$');
    return reg.test(string);
}

export function camel(string: string) {
    return Case.camel(string);
}

export function kebab(string: string) {
    return Case.kebab(string);
}

export function contains(string: string, needles: string): boolean {
    let reg = new RegExp('.*'+needles+'.*');
    return reg.test(string);
}

export function containsAll(string: string, needles: string[]) {
    let truthy = needles.map(value => contains(string, value));
    return truthy.reduce((previous, current): boolean => previous && current);
}