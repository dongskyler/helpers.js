# @dongskyler/helpers.js

Homepage: [https://github.com/dongskyler/helpers.js](https://github.com/dongskyler/helpers.js)

[![npm version](https://badge.fury.io/js/%40dongskyler%2Fhelpers.js.svg)](https://badge.fury.io/js/%40dongskyler%2Fhelpers.js)
![Node.js CI](https://github.com/dongskyler/helpers.js/workflows/Node.js%20CI/badge.svg)
[![codecov](https://codecov.io/gh/dongskyler/helpers.js/branch/master/graph/badge.svg)](https://codecov.io/gh/dongskyler/helpers.js)
[![CodeFactor](https://www.codefactor.io/repository/github/dongskyler/helpers.js/badge)](https://www.codefactor.io/repository/github/dongskyler/helpers.js)
[![DeepScan grade](https://deepscan.io/api/teams/9441/projects/13355/branches/222136/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=9441&pid=13355&bid=222136)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

[![GitHub issues](https://img.shields.io/github/issues/dongskyler/helpers.js.svg)](https://GitHub.com/dongskyler/helpers.js/issues/)
[![GitHub issues-closed](https://img.shields.io/github/issues-closed/dongskyler/helpers.js.svg)](https://GitHub.com/dongskyler/helpers.js/issues?q=is%3Aissue+is%3Aclosed)
[![GitHub pull-requests](https://img.shields.io/github/issues-pr/dongskyler/helpers.js.svg)](https://GitHub.com/dongskyler/helpers.js/pulls/)
[![GitHub pull-requests closed](https://img.shields.io/github/issues-pr-closed/dongskyler/helpers.js.svg)](https://GitHub.com/dongskyler/helpers.js/pulls/)

---

## Table of contents

- [Description](#description)
- [Functions](#functions)
  - [inputOutput](#inputOutput)
    - [`listFilesInDirSync()`](<#listFilesInDirSync()>)
    - [`loadFile()`](<#loadFile()>)
    - [`readPipeWrite()`](<#readPipeWrite()>)
    - [`writeToFile()`](<#writeToFile()>)
  - [others](#others)
    - [`runFuncsWithArgs()`](<#runFuncsWithArgs()>)
    - [`valOfKeysAndIndices()`](<#valOfKeysAndIndices()>)
  - [sort](#sort)
    - [`comparatorLexic()`](<#comparatorLexic()>)
    - [`comparatorNumeric()`](<#comparatorNumeric()>)
    - [`bubbleSort()`](<#bubbleSort()>)
    - [`mergeSort()`](<#mergeSort()>)

---

## Description

This is a collections of JavaScript and TypeScript helper functions.

---

## Functions

### `inputOutput`

- #### `listFilesInDirSync()`

  > `listFilesInDirSync(dir`_`[, ext, removeExt]`_`)`

  - Parameters
    - **`dir`**`: string` _(Positional, required)_
      - Path to directory.
    - **`ext`**`: string | null` _(Positional, optional)_
      - Filter by file extension.
    - **`removeExt`**`: boolean` _(Positional, optional)_
      - Remove the file extension from the filename string.
  - Return value`: string[] | null`
    - An array of filenames in a directory.

- #### `loadFile()`
- #### `readPipeWrite()`
- #### `writeToFile()`

### `others`

- #### `runFuncsWithArgs()`

  > `runFuncsWithArgs(funcs`_`[, args, spread]`_`)`

  - Run an array of functions with the same set of argument(s)
  - Parameters
    - **`funcs`**`: ((...args: any | any[] | null) => any)[]` _(Positional, required)_
      - An array of functions.
    - **`args`**`: any | any[] | null = null` _(Positional, optional)_
      - An array of arguments. Each element of the array will be presented to each function.
    - **`spread`**`: boolean` _(Positional, optional)_
      - If `args` is an array of arrays, you can choose to expand each sub-array with the spread operator.
      - _Default_ is false.
  - Return value`: any[]`
    - An array of return values from functions

- #### `valOfKeysAndIndices()`

  > `valOfKeysAndIndices(obj`_`[, key0[, key1[, ...keyN]]]`_`)`

  - Returns the value in an array or an object (or you call it JSON, a hash map or a dictionary) given the series of indices and/or keys pointing to the value.
  - Parameters
    - **`obj`**`: any` _(Positional, required)_
      - An array, an object (or you call it JSON, a hash map or a dictionary) or a combination.
      - The first index or key pointing to the value is required.
    - **`keyN`**`: string | number | null` _(Positional, optional)_
      - An arbitrary number of indices and/or keys pointing to the value.
      - For example, if `x = {name: 'Tom'}`, to fetch value `'Tom'`, use `valOfKeysAndIndicies(x, 'name')`. If `y = { key0: [{ key1: [3.142, 6.626,] },] }`, to fetch `6.626`, use `valOfKeysAndIndicies(y, 'key0', 0, 'key', 1)`.
  - Return value`: any`
    - The value from the given indices/keys.

### `sort`

- #### `comparatorLexic()`

  > `comparatorLexic(`_`[{key = [], ignoreCase = false, descending = false}`_`)`

  - Compare function for comparing lexicographic order.
  - Parameters
    - **`ignoreCase`**`: boolean` _(Named, optional)_
      - Ignore the case of the given string.
      - _Default_ is `false`.
    - **`descending`**`: boolean` _(Named, optional)_
      - Ascending or descending order.
      - _Default_ is `false`, that is, ascending order.
    - **`keyN`**`: string | number | null` _(Positional, optional)_
      - An arbitrary number of indices and/or keys pointing to the value for comparison.
      - For example, if `x = {name: 'Tom'}`, use `comparatorLexic('name')` to fetch value `'Tom'` for comparison. If `x = { key0: [{ key1: [Earth, Mars,] },] }`, to fetch `Mars` for comparison, use `comparatorLexic('key0', 0, 'key', 1)`.
      - See `keyN` in [`valOfKeysAndIndices`](<#valOfKeysAndIndices()>) for more details.
      - _Default_ is `null`.
  - Return value`: function`
    - Function `(x: any, y: any) => number`
      - Return value`: number`
        - `-1` if `a` should placed before `b`.
        - `0` if `a` and `b` are equal.
        - `1` if `a` should be placed after `b`.

- #### `comparatorNumeric()`

  > `comparatorNumeric(`_`[{key = [], ignoreSign = false, descending = false}`_`)`

  - Compare function for comparing numerical order.
  - Parameters
    - **`keyN`**`: string | number | null` _(Positional, optional)_
      - An arbitrary number of indices and/or keys pointing to the value for comparison.
      - If `x = { key0: [{ key1: [3.142, 6.626,] },] }`, to fetch `6.626` for comparison, use `comparatorLexic('key0', 0, 'key', 1)`.
      - See `keyN` in [`valOfKeysAndIndices`](<#valOfKeysAndIndices()>) for more details.
      - _Default_ is `null`.
    - **`ignoreSign`**`: boolean` _(Named, optional)_
      - Ignore the sign of the number, i.e. use the absolute value for comparison.
      - _Default_ is `false`.
    - **`descending`**`: boolean` _(Named, optional)_
      - Ascending or descending order.
      - _Default_ is `false`, that is, ascending order.
  - Return value`: function`
    - Function `(a: any, b: any) => number`
      - Return value`: number`
        - `-1` if `a` should placed before `b`.
        - `0` if `a` and `b` are equal.
        - `1` if `a` should be placed after `b`.

- #### `bubbleSort()`

  > `bubbleSort(arr`_`[, compareFunction, k]`_`)`

  - Bubble sort algorithm. Stable.
  - Parameters
    - **`arr`**`: any[]` _(Positional, required)_
      - An array to be sorted.
    - **`compareFunction`**`: (a: any, b: any) => number` _(Positional, optional)_
      - Compare function.
      - _Default_ is [comparatorLexic()](<#comparatorLexic()>).
    - **`k`**`: number` _(Positional, optional)_
      - Partially sort the array to get the first k sorted elements
  - Return value`: any[]`
    - A sorted array.

- #### `mergeSort()`

  > `mergeSort(arr`_`[, compareFunction]`_`)`

  - Merge sort algorithm. Stable.
  - Parameters
    - **`arr`**`: any[]` _(Positional, required)_
      - An array to be sorted.
    - **`compareFunction`**`: (a: any, b: any) => number` _(Positional, optional)_
      - Compare function.
      - _Default_ is [comparatorLexic()](<#comparatorLexic()>).
  - Return value`: any[]`
    - A sorted array.

- #### `partialSort()`

  > `partialSort(arr`_`[, compareFunction, k]`_`)`

  - Partially sort the array to get the first k sorted elements, given the compare function.
