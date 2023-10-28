# simplify-ranges

> Merge and normalize adjacent or overlapping integer ranges

## Install

```sh
npm install simplify-ranges
```

## Usage

```js
import simplifyRanges from 'simplify-ranges';

const ranges = [[1, 2], [3, 4], [2, 3]];

console.log(simplifyRanges(ranges));
//=> [[1, 4]]
```

## API

### `simplifyRanges(ranges: number[][], options?: object): number[][]`

The function takes an array of [closed integer ranges](https://simple.wikipedia.org/wiki/Interval_(mathematics)#Closed_Intervals).

Normalizes reversed ranges by converting them from `[3, 1]` to `[1, 3]` and also supports negative numbers.

### options

Type: `object`

#### separateTwoNumberRanges

Type: `boolean`\
Default: `false`

Separate two-number ranges `[[1, 2], [4, 5]]` into individual ranges `[[1, 1], [2, 2], [4, 4], [5, 5]]`.

This can be useful if you have special handling for single-number ranges.
