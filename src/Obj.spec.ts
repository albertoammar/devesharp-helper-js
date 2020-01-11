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
                "products": {
                    "desk2": {
                        "price": 100
                    }
                }
            })
            .toEqual(Obj.except({'products':
                {
                    'desk': {
                        'price': 100
                    },
                    'desk2': {
                        'price': 100
                    }
                },
        }, 'products.desk'));

        expect({
            "products": {}
        })
            .toEqual(Obj.except({'products':
                    {
                        'desk': {
                            'price': 100
                        },
                    },
            }, 'products.desk'));

        expect({'products':
                [
                    {
                    },
                    {
                        'desk2': {
                            'price': 200
                        }
                    }
                ],
            })
            .toEqual(Obj.except({'products':
                    [
                        {
                            'desk': {
                                'price': 100
                            }
                        },
                        {
                            'desk': {
                                'price': 100
                            },
                            'desk2': {
                                'price': 200
                            }
                        }
                    ],
            }, 'products.desk'));

        expect({'products':
                [
                    {
                    },
                    {
                        'desk': {
                            'price': 100
                        },
                        'desk2': {
                            'price': 200
                        }
                    }
                ],
            })
            .toEqual(Obj.except({'products':
                    [
                        {
                            'desk': {
                                'price': 100
                            }
                        },
                        {
                            'desk': {
                                'price': 100
                            },
                            'desk2': {
                                'price': 200
                            }
                        }
                    ],
            }, 'products.0.desk'));

        expect({'value': [1,2,4]})
            .toEqual(Obj.except({'value': [1,2,3,4]}, 'value.2'));
        
        expect({'value': [2,4]})
            .toEqual(Obj.except({'value': [1,2,3,4]}, ['value.2', 'value.0']));
        
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
    
    it('only', async () => {
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
                            ],
                            'price2': [
                                'A',
                            ]
                        }
                    },
                    {
                        'desk': {
                            'price': [
                                'A',
                            ],
                            'price2': [
                                'A',
                            ]
                        }
                    },
                ]
        };
        
        expect({ simple_object: { desk: { price: 100 } } }).toEqual(Obj.only(obj, 'simple_object.desk.price'));
        expect({ value: 2 }).toEqual(Obj.only(obj, 'value'));
        expect({"array_object":[{"desk":{"price":["A"]}},{"desk":{"price":["A"]}}]}).toEqual(Obj.only(obj, 'array_object.desk.price'));
    });
    
    it('divide', async () => {
        expect([['key', 'key2'], ['value', 'value2']])
            .toEqual(Obj.divide({'key': 'value', 'key2': 'value2'}));
        expect([['key'], ['value']])
            .toEqual(Obj.divide({'key': 'value'}));
        expect([['key', 'key2'], ['value', {'b': 1}]])
            .toEqual(Obj.divide({'key': 'value', 'key2': {'b': 1}}));
    });
    
    it('pluck', async () => {
        expect([1,2,3])
            .toEqual(Obj.pluck([{'id': 1},{'id': 2},{'id': 3}], 'id'));
        expect(['Taylor', 'Abigail'])
            .toEqual(Obj.pluck([
                    {'developer': {'id': 1, 'name': 'Taylor'}},
                    {'developer': {'id': 2, 'name': 'Abigail'}}
                ], 'developer.name'));
    });
});
