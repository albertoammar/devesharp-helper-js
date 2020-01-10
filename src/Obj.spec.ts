import * as Obj  from './Obj';

describe('Obj', () => {
    
    it('dot', async () => {
        let obj = {
            'value': 2,
            'simple_object':
                {
                    'desk': {
                        'price': 100
                    }
                },
            'object_with_array':
                {
                    'desk': {
                        'price': [
                            'A',
                            'B',
                        ]
                    }
                },
            'array_object':
                [
                    {
                    'desk': {
                        'price': [
                            'A',
                            'B',
                        ]
                    }
                },
                {
                    'desk': {
                        'price': [
                            'A',
                            'B',
                        ]
                    }
                },
            ]
        };
        
        expect(Obj.dot(obj))
            .toEqual(
                {
                    'value': 2,
                    'simple_object.desk.price': 100,
                    'object_with_array.desk.price.0': 'A',
                    'object_with_array.desk.price.1': 'B',
                    'array_object.0.desk.price.0': 'A',
                    'array_object.0.desk.price.1': 'B',
                    'array_object.1.desk.price.0': 'A',
                    'array_object.1.desk.price.1': 'B'
                });
    });
    
    it('set', async () => {
        let obj = {
            'value': 2,
        };
        
        expect(Obj.set(obj, 'simple_object.desk.price', 100))
            .toEqual(
                {
                    'value': 2,
                    'simple_object':
                        {
                            'desk': {
                                'price': 100
                            }
                        },
                });

        let obj2 = {
            'value': 2,
            'simple_object':
                {
                    'desk': {
                        'price2': 200
                    }
                },
        };

        expect(Obj.set(obj2, 'simple_object.desk.price', 100))
            .toEqual(
                {
                    'value': 2,
                    'simple_object':
                        {
                            'desk': {
                                'price': 100,
                                'price2': 200
                            }
                        },
                });
    });
    
    it('get', async () => {
        let obj = {
            'value': 2,
            'simple_object':
                {
                    'desk': {
                        'price': 100
                    }
                },
            'object_with_array':
                {
                    'desk': {
                        'price': [
                            'A',
                            'B',
                        ]
                    }
                },
        };
        
        expect(100).toEqual(Obj.get(obj, 'simple_object.desk.price'));
        expect(2).toEqual(Obj.get(obj, 'value'));
        expect('A').toEqual(Obj.get(obj, 'object_with_array.desk.price.0'));
        expect(null).toEqual(Obj.get(obj, 'object_with_array.desk.price.2'));
        expect(null).toEqual(Obj.get(obj, 'value2'));
        expect(null).toEqual(Obj.get(obj, 'simple_object.desk.price2'));
        expect(0).toEqual(Obj.get(obj, 'object_with_array.desk.price.2', 0));
        expect(0).toEqual(Obj.get(obj, 'value2', 0));
        expect(0).toEqual(Obj.get(obj, 'simple_object.desk.price2', 0));
    });
    
    it('add', async () => {
        let obj = {
            'value': 2,
            'simple_object':
            {
                'desk': {
                    'price': 100
                }
            },
        };
        
        expect({
            'value': 2,
            'simple_object':
                {
                    'desk': {
                        'price': 100
                    }
                },
        }).toEqual(Obj.add(obj, 'simple_object.desk.price', 200));

        expect({
            'value': 2,
            'simple_object':
                {
                    'desk': {
                        'price': 100,
                        'price2': 200,
                    }
                },
        }).toEqual(Obj.add(obj, 'simple_object.desk.price2', 200));

        expect({
            'value': 2,
            'simple_object':
                {
                    'desk': {
                        'price': 100,
                        'price2': 200,
                    }
                },
        }).toEqual(Obj.add(obj, 'simple_object.desk.price2', 200));
    });
    
    it('except', async () => {
        expect({
            'value': 2,
            'simple_object': {}
        }).toEqual(Obj.except({
            'value': 2,
            'simple_object':
            {
                'desk': {
                    'price': 100
                }
            },
        }, 'simple_object.desk'));
        
        expect({
            'simple_object': {
                'desk': {
                    'price': 100
                }
            }
        }).toEqual(Obj.except({
            'value': 2,
            'simple_object':
            {
                'desk': {
                    'price': 100
                }
            },
        }, 'value'));

        expect({
            'value': [1,2,4],
        }).toEqual(Obj.except({
            'value': [1,2,3,4],
        }, 'value.2'));
        
    });

    it('has', async () => {
        let obj = {
            'value': 2,
            'simple_object':
                {
                    'desk': {
                        'price': 100
                    }
                },
            'object_with_array':
                {
                    'desk': {
                        'price': [
                            'A',
                            'B',
                        ]
                    }
                },
        };

        expect(true).toEqual(Obj.has(obj, 'simple_object.desk.price'));
        expect(true).toEqual(Obj.has(obj, 'value'));
        expect(true).toEqual(Obj.has(obj, 'object_with_array.desk.price.0'));
        expect(false).toEqual(Obj.has(obj, 'object_with_array.desk.price.2'));
        expect(false).toEqual(Obj.has(obj, 'value2'));
        expect(false).toEqual(Obj.has(obj, 'simple_object.desk.price2'));
    });
});
