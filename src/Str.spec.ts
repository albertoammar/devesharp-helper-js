import * as Str from './Str';

describe('Str', () => {
    
    it('after', async () => {
        expect(Str.after('This is my name', 'This is my')).toEqual(' name');
        expect(Str.after('This is my name', 'my')).toEqual(' name');
        expect(Str.after('This is my name', 'na')).toEqual('me');
        expect(Str.after('This is my name my name', 'my')).toEqual(' name my name');
    });

    it('before', async () => {
        expect(Str.before('This is my name', 'my name')).toEqual('This is ');
        expect(Str.before('This is my name', 'my')).toEqual('This is ');
        expect(Str.before('This is my name', 's')).toEqual('Thi');
        expect(Str.before('This is my name my name', 'my')).toEqual('This is ');
    });
    
    it('camel', async () => {
        expect(Str.camel('foo_bar')).toEqual('fooBar');
        expect(Str.camel('_foo_bar')).toEqual('fooBar');
        expect(Str.camel('foo_Bar_Foo')).toEqual('fooBarFoo');
    });
    
    it('kebab', async () => {
        expect(Str.kebab('fooBar')).toEqual('foo-bar');
        expect(Str.kebab('foo--Bar')).toEqual('foo-bar');
        expect(Str.kebab('fooBarFoo')).toEqual('foo-bar-foo');
    });
    
    it('contains', async () => {
        expect(Str.contains('This is my name', 'e')).toBeTruthy();
        expect(Str.contains('This is my name', 'my name')).toBeTruthy();
        expect(Str.contains('This is my name', 'T')).toBeTruthy();
        expect(Str.contains('This is my name', 'nami')).toBeFalsy();
        expect(Str.contains('This is my name', 'b')).toBeFalsy();
        expect(Str.contains('This is my name', 't')).toBeFalsy();
    });

    it('contains', async () => {
        expect(Str.containsAll('This is my name', ['e', 'name'])).toBeTruthy();
        expect(Str.containsAll('This is my name', ['my name', 'This'])).toBeTruthy();
        expect(Str.containsAll('This is my name', ['T'])).toBeTruthy();
        expect(Str.containsAll('This is my name', ['nami', 'me'])).toBeFalsy();
        expect(Str.containsAll('This is my name', ['b', 'name'])).toBeFalsy();
        expect(Str.containsAll('This is my name', ['name','t','name'])).toBeFalsy();
    });

    it('startsWith', async () => {
        expect(Str.startsWith('This is my name', 'T')).toBeTruthy();
        expect(Str.startsWith('This is my name', 'This is my')).toBeTruthy();
        expect(Str.startsWith('This is my name', 'This is')).toBeTruthy();
        expect(Str.startsWith('This is my name', 'This is2')).toBeFalsy();
        expect(Str.startsWith('This is my name', 'my name')).toBeFalsy();
    });

    it('endsWith', async () => {
        expect(Str.endsWith('This is my name', 'e')).toBeTruthy();
        expect(Str.endsWith('This is my name', 'my name')).toBeTruthy();
        expect(Str.endsWith('This is my name', 'name')).toBeTruthy();
        expect(Str.endsWith('This is my name', 'my nam')).toBeFalsy();
        expect(Str.endsWith('This is my name', 'This')).toBeFalsy();
    });
    
    it('finish', async () => {
        expect(Str.finish('this/string/', '/')).toEqual('this/string/');
        expect(Str.finish('this/string', '/')).toEqual('this/string/');
    });
});
