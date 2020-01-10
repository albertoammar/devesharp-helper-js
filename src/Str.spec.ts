import * as Str from './Str';

describe('Str', () => {
    
    it('after', async () => {
        expect(Str.after('This is my name', 'T')).toBeTruthy();
        expect(Str.after('This is my name', 'This is my')).toBeTruthy();
        expect(Str.after('This is my name', 'This is')).toBeTruthy();
        expect(Str.after('This is my name', 'This is2')).toBeFalsy();
        expect(Str.after('This is my name', 'my name')).toBeFalsy();
    });

});
