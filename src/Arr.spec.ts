import * as Arr  from './Arr';

describe('Arr', () => {
    it('range', async () => {
        expect([0,1,2,3]).toEqual(Arr.range(0,3));
        expect([1,2,3,4]).toEqual(Arr.range(1,4));
        expect([1]).toEqual(Arr.range(1,1));
    });
});
