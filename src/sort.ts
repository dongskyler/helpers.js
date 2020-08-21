/**
 * Sorting algorithms
 */

import { valOfKeysAndIndices } from './others';

/**
 * Compare function for comparing lexicographic order
 * @param ignoreCase Ignore the case of the given string.
 * @param descending True for descending order, false for
 * ascending order
 * @param key An array of indices and/or keys pointing to the value for
 * comparison.
 * For example, if `x = {name: 'Tom'}`, use `comparatorLexic({key = 'name'})`
 * to fetch value `'Tom'` for comparison.
 * If `x = { key0: [{ key1: [Earth, Mars,] },] }`, to fetch `Mars` for
 * comparison, use `comparatorLexic({key = ['key0', 0, 'key', 1]})`.
 * See valOfKeysAndIndices for more details.
 */
const comparatorLexic = ({
  key = null,
  ignoreCase = false,
  descending = false,
}: {
  key?: (string | number)[] | null;
  ignoreCase?: boolean;
  descending?: boolean;
} = {}) => (x: any, y: any): number => {
  let a = '';
  let b = '';

  if (key === null) {
    a = x.toString();
    b = y.toString();
  } else if (typeof key === 'string' || typeof key === 'number') {
    a = x[key];
    b = y[key];
  } else if (Array.isArray(key)) {
    a = valOfKeysAndIndices(x, ...key);
    b = valOfKeysAndIndices(y, ...key);
  } else {
    throw new Error("Invalid argument 'key'.");
  }

  if (ignoreCase) {
    a = a.toUpperCase();
    b = b.toUpperCase();
  }

  if (descending) {
    if (a < b) return 1;
    if (a > b) return -1;
    return 0;
  }
  // if ascending
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
};

/**
 * Compare function for comparing numerical order
 * @param ignoreSign Ignore the sign of the number, i.e. use the absolute
 * value for comparison.
 * @param descending True for descending order, false for
 * ascending order
 * @param key An array of indices and/or keys pointing to the value
 * for comparison.
 * If `x = { key0: [{ key1: [3.142, 6.626,] },] }`, to fetch `6.626` for
 * comparison, use `comparatorLexic({key = ['key0', 0, 'key', 1]})`.
 * See valOfKeysAndIndices for more details.
 */
const comparatorNumeric = ({
  key = null,
  ignoreSign = false,
  descending = false,
}: {
  key?: (string | number)[] | null;
  ignoreSign?: boolean;
  descending?: boolean;
} = {}) => (x: any, y: any): number => {
  let a: number;
  let b: number;

  if (key === null) {
    a = x;
    b = y;
  } else if (typeof key === 'string' || typeof key === 'number') {
    a = x[key];
    b = y[key];
  } else if (Array.isArray(key)) {
    a = valOfKeysAndIndices(x, ...key);
    b = valOfKeysAndIndices(y, ...key);
  } else {
    throw new Error("Invalid argument 'key'.");
  }

  if (ignoreSign) {
    a = Math.abs(a);
    b = Math.abs(b);
  }

  if (descending) {
    if (a < b) return 1;
    if (a > b) return -1;
    return 0;
  }
  // if ascending
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
};

/**
 * Bubble sort
 * Stable: yes
 * @param arr (Positional, required) An array to be sorted.
 * @param comaprator (Positional, optional) Compare function.
 * @param k (Positional, optional) Partial sorting. Once the first k
 * elements are sorted, return the results.
 * @return An sorted array
 */
const bubbleSort = (
  arr: any[],
  comparator: (a: any, b: any) => number = comparatorLexic({}),
  k: number | null = null
): any[] => {
  const ans = arr.slice(0); // Eliminate side effects
  const len = ans.length;

  for (let start = 0; start < len; start += 1) {
    for (let i = len - 1; i > start; i -= 1) {
      const cmp = comparator(ans[i - 1], ans[i]);
      if (cmp > 0) {
        const swap = ans[i];
        ans[i] = ans[i - 1];
        ans[i - 1] = swap;
      }
    }

    if (k !== null && start === k - 1) {
      return ans;
    }
  }

  return ans;
};

/**
 * Merge sort
 * Stable: yes
 * @param arr An array to be sorted
 * @param comaprator (Optional) Compare function
 * @return An sorted array
 */
const mergeSort = (
  arr: any[],
  comparator: (a: any, b: any) => number = comparatorLexic({})
): any[] => {
  if (arr.length > 1) {
    const mid = Math.floor(arr.length / 2);
    const leftArr = mergeSort(arr.slice(0, mid), comparator);
    const rightArr = mergeSort(arr.slice(mid), comparator);

    const sortedArr = [];

    let iL = 0;
    let iR = 0;

    while (iL < leftArr.length && iR < rightArr.length) {
      const cmp = comparator(leftArr[iL], rightArr[iR]);
      if (cmp > 0) {
        sortedArr.push(rightArr[iR]);
        iR += 1;
      } else {
        sortedArr.push(leftArr[iL]);
        iL += 1;
      }
    }

    return sortedArr.concat(leftArr.slice(iL)).concat(rightArr.slice(iR));
  }

  return arr;
};

/**
 * Partial sort: Get first K sorted elements
 *
 * @param arr An array to be sorted.
 * @param comparator (Optional) Compare function.
 * @return An sorted array.
 *
 * The order depends on the comparator you use.
 * For example, if you want to get the first K smallest numbers, use compare
 * function `comparatorNumeric({descending: false})`.
 * If you want to get the first K largest numbers, use compare function
 * `comparatorNumeric({descending: true})`.
 */
const partialSort = (
  arr: any[],
  comparator: (a: any, b: any) => number = comparatorLexic({}),
  k: number | null = null
) => {
  // Use bubbleSort for small arrays
  // Will implement heapSort for large arrays

  return bubbleSort(arr, comparator, k);
};

export {
  comparatorLexic,
  comparatorNumeric,
  bubbleSort,
  mergeSort,
  partialSort,
};
