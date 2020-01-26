import * as Arr from './Arr';

describe('Arr', () => {
    it('chunk', async () => {
        expect([[0, 1], [2, 3], [4, 5], [6, 7], [8, 9], [10]]).toEqual(
            Arr.chunk([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 2),
        );
        expect([
            [0, 1, 2, 3, 4, 5, 6, 7],
            [8, 9, 10],
        ]).toEqual(Arr.chunk([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 8));
        expect([[0, 1]]).toEqual(Arr.chunk([0, 1], 8));
        expect([[0], [1]]).toEqual(Arr.chunk([0, 1], 0));
    });

    it('range', async () => {
        expect([0, 1, 2, 3]).toEqual(Arr.range(0, 3));
        expect([1, 2, 3, 4]).toEqual(Arr.range(1, 4));
        expect([1]).toEqual(Arr.range(1, 1));
    });

    it('compareArray', async () => {
        expect(Arr.compareArray([0], [0])).toBeTruthy();
        expect(Arr.compareArray([0, 1, 3], [0, 1, 3])).toBeTruthy();
        expect(Arr.compareArray([undefined, 'b', 3], [undefined, 'b', 3])).toBeTruthy();
        expect(Arr.compareArray([0], [1])).toBeFalsy();
        expect(Arr.compareArray([0], [0, 1])).toBeFalsy();
        expect(Arr.compareArray(['b'], ['b', 'b'])).toBeFalsy();
        expect(Arr.compareArray(['b'], ['ba'])).toBeFalsy();
    });

    it('wrap', async () => {
        expect(Arr.wrap(0)).toEqual([0]);
        expect(Arr.wrap('b')).toEqual(['b']);
        expect(Arr.wrap([0])).toEqual([0]);
        expect(Arr.wrap(['b'])).toEqual(['b']);
        expect(Arr.wrap(undefined)).toEqual([]);
        expect(Arr.wrap(null)).toEqual([]);
    });

    it('collapse', async () => {
        expect([1, 2, 3, 4, 5, 6, 7, 8, 9]).toEqual(
            Arr.collapse([
                [1, 2, 3],
                [4, 5, 6],
                [7, 8, 9],
            ]),
        );
    });
});
