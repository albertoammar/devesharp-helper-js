<p align="center">
  <img src="https://user-images.githubusercontent.com/14295479/72281868-2e2d6d00-361a-11ea-913c-0ea04740a545.png"/>
</p>
<p align="center">
<a href="https://www.npmjs.com/package/@devesharp/helpers-js" target="_blank"><img src="https://img.shields.io/npm/v/@devesharp/helpers-js.svg" alt="NPM Version" /></a>
</p>

## Description
HelpersJS is a javascript library based on Laravel helpers. It is just based, contains too many functions and also the lack of some.

## Installation

```shell
$ npm i @devesharp/helpers-js 
$ yarn add @devesharp/helpers-js
```

## Usage

```ts
import { Str, Arr } from '@devesharp/helpers-js';

Str.contains('This is my name', 'my name'); 

// true

Arr.warp(1); 

// [1]

```

## Arr

#### `Arr.range()`

The `Arr.range()` method creates an array containing a range of elements.:

```ts
import { Arr } from '@devesharp/helpers-js';

Arr.range(1, 5); 

// [1,2,3,4,5]

Arr.range(1, 1); 

// [1]

```

#### `Arr.compareArray()`

The `Arr.compareArray()` method compare two arrays:

```ts
import { Arr } from '@devesharp/helpers-js';

Arr.range([0,1], [0,1]); 

// true

Arr.range([], [1]); 

// false

```

#### `Arr.wrap()`

The `Arr.wrap()` method wraps the given value in an array. If the given value is already an array it will not be changed:

```ts
import { Arr } from '@devesharp/helpers-js';

Arr.wrap('any'); 

// ['any']

Arr.wrap(0); 

// [0]

Arr.wrap([true]); 

// [true]

```

#### `Arr.collapse()`

The `Arr.collapse()` method collapses an array of arrays into a single array:

```ts
import { Arr } from '@devesharp/helpers-js';

Arr.wrap([[1, 2, 3], [4, 5, 6], [7, 8, 9]]); 

// [1, 2, 3, 4, 5, 6, 7, 8, 9]

```

## Obj

#### `Obj.add()`

The `Obj.add()` method adds a given key / value pair to an array if the given key doesn't already exist in the array or is set to null:

```ts
import { Obj } from '@devesharp/helpers-js';

Obj.add({name: 'Desk'}, 'price', 100); 

// {name: 'Desk', price: 100}

```

#### `Obj.except()`

The `Obj.except()` method removes the given key / value pairs from an array:

```ts
import { Obj } from '@devesharp/helpers-js';

Obj.except({name: 'Desk', price: 200}, ['price']); 

// {name: 'Desk'}

Obj.except({'value': [1,2,3,4]}, ['value.2', 'value.0']); 

// {'value': [2,4]}

Obj.except({'products':[{'desk': {'price': 100}},{'desk': {'price': 100}'desk2': {'price': 200}}]}, 
    'products.desk'); 
    
    // {'products':[{},{'desk2': {'price': 200}}]}
    
```

#### `Obj.pluck()`

The `Obj.pluck()` method retrieves all of the values for a given key from an array:

```ts
import { Obj } from '@devesharp/helpers-js';

Obj.pluck([{'id': 1},{'id': 2},{'id': 3}], 'id'); 

// [1,2,3]

Obj.pluck([
        {'developer': {'id': 1, 'name': 'Taylor'}},
        {'developer': {'id': 2, 'name': 'Abigail'}}
], 'developer.name') // ['Taylor', 'Abigail']
```

#### `Obj.divide()`

The `Obj.divide()` method returns two arrays, one containing the keys, and the other containing the values of the given array:

```ts
import { Obj } from '@devesharp/helpers-js';

Obj.divide({'key': 'value'}); 

// [['key'], ['value']]

Obj.divide({'key': 'value', 'key2': 'value2'}); 

// [['key', 'key2'], ['value', 'value2']]

```

#### `Obj.get()`

The `Obj.get()` method retrieves a value from a deeply nested array using "dot" notation:

```ts
import { Obj } from '@devesharp/helpers-js';

Obj.get({products: {desk: {price: 100}}}, 'products.desk.price'); 

// 100

Obj.get({products: {desk: {price: 100}}}, 'products.desk.price'); 

// 100

```

The `Obj.get()` method also accepts a default value, which will be returned if the specific key is not found:

```ts
import { Obj } from '@devesharp/helpers-js';

Obj.get({}, 'products.desk.price', 200); 

// 200

```

#### `Obj.has()`

The `Obj.has()` method checks whether a given item or items exists in an array using "dot" notation:

```ts
import { Obj } from '@devesharp/helpers-js';

Obj.get({products: {desk: {price: 100}}}, 'products.desk.price'); 

// true

Obj.get({products: {desk: {price: 100}}}, 'products.desk.price2'); 

// false

```

#### `Obj.only()`

The `Obj.only()` method returns only the specified key / value pairs from the given array:

```ts
import { Obj } from '@devesharp/helpers-js';

Obj.only({name: 'Desk', price: 200}, ['price']); 

// {price: 200}

```

#### `Obj.set()`

The `Obj.set()` method sets a value within a deeply nested array using "dot" notation:

```ts
import { Obj } from '@devesharp/helpers-js';

Obj.set({'products':{'desk': {'price': 100}}}, 'products.desk.price', 200); 

// {'products':{'desk': {'price': 200}}}

```

#### `Obj.dot()`

The `Obj.dot()` method flattens a multi-dimensional array into a single level array that uses "dot" notation to indicate depth:

```ts
import { Obj } from '@devesharp/helpers-js';

Obj.dot({'products':{'desk': {'price': 100, 'price2': 200}}}); 

// ['products.desk.price': 100, 'products.desk.price2': 200]

```