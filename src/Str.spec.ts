import * as Str from './Str';

describe('Str', () => {
    
    it('after', async () => {
        expect(Str.after('This is my name', 'T')).toBeTruthy();
        expect(Str.after('This is my name', 'This is my')).toBeTruthy();
        expect(Str.after('This is my name', 'This is')).toBeTruthy();
        expect(Str.after('This is my name', 'This is2')).toBeFalsy();
        expect(Str.after('This is my name', 'my name')).toBeFalsy();
    });

    it('before', async () => {
        expect(Str.before('This is my name', 'e')).toBeTruthy();
        expect(Str.before('This is my name', 'my name')).toBeTruthy();
        expect(Str.before('This is my name', 'name')).toBeTruthy();
        expect(Str.before('This is my name', 'my nam')).toBeFalsy();
        expect(Str.before('This is my name', 'This')).toBeFalsy();
    });

});
