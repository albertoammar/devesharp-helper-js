import * as Case from 'case';

export function after(string: string, value: string) {
    let split = string.split(value);
    split.splice(0, 1);
    return split.join(value);
}

export function before(string: string, value: string) {
    let split = string.split(value);
    return split[0];
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

export function studly(string: string) {
    return Case.pascal(string);
}

export function snake(string: string) {
    return Case.snake(string);
}

export function contains(string: string, needles: string): boolean {
    let reg = new RegExp('.*\\'+needles+'.*');
    return reg.test(string);
}

export function containsAll(string: string, needles: string[]) {
    let truthy = needles.map(value => contains(string, value));
    return truthy.reduce((previous, current): boolean => previous && current);
}

export function finish(string: string, char: string) {
    return string[string.length - 1] !== char ? string + char : string;
}

export function start(string: string, char: string) {
    return string[0] !== char ? char + string : string;
}

export function limit(string: string, limit: number, end: string = '...') {
    return string.substr(0, limit) + end;
}

export function replaceArray(search: string, replace: any[], subject: string) {
    replace.forEach(i => {
        subject = subject.replace(search, i);
    });
    
    return subject;
}

export function replaceFirst(search: string, replace: string, subject: string) {
    return subject.replace(search, replace);
}

export function replaceLast(search: string, replace: string, subject: string) {
    return subject.substring(0, subject.lastIndexOf(search)) +
        replace +
        subject.substring(subject.lastIndexOf(search) + search.length);
}