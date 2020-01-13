import * as Misc from './Misc';

describe('Misc', () => {
    it('md5', () => {
        expect('1bc29b36f623ba82aaf6724fd3b16718').toEqual(Misc.md5('md5'));
        expect('795f3202b17cb6bc3d4b771d8c6c9eaf').toEqual(Misc.md5('other'));
    });

    it('sha1', () => {
        expect('415ab40ae9b7cc4e66d6769cb2c08106e8293b48').toEqual(Misc.sha1('sha1'));
        expect('d0941e68da8f38151ff86a61fc59f7c5cf9fcaa2').toEqual(Misc.sha1('other'));
    });
});
