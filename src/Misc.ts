import * as _md5 from 'md5';
import * as _sha1 from 'sha1';

export function sha1(value): string {
    return _sha1(value);
}

export function md5(value): string {
    return _md5(value);
}
