/**
 * Sorting algorithms
 */

import { valOfKeysAndIndices } from './others';

/**
 * Compare function for comparing lexicographic order
 * @param ignoreCase Ignore the case of the given string.
 * @param descending True for descending order, false for
 * ascending order
 * @param key An arbitrary number of indices and/or keys pointing to the value
 * for comparison.
 * For example, if `x = {name: 'Tom'}`, use `comparatorLexic('name')` to fetch
 * value `'Tom'` for comparison. If `x = { key0: [{ key1: [Earth, Mars,] },] }`,
 * to fetch `Mars` for comparison, use `comparatorLexic('key0', 0, 'key', 1)`.
 * See valOfKeysAndIndices for more details.
 */
const comparatorLexic = (
  {
    ignoreCase = false,
    descending = false,
  }: {
    ignoreCase?: boolean;
    descending?: boolean;
  } = {},
  ...key: (string | number)[]
) => (x: any, y: any): number => {
  let a = '';
  let b = '';

  if (key.length === 0) {
    a = x.toString();
    b = y.toString();
  } else {
    a = valOfKeysAndIndices(x, ...key);
    b = valOfKeysAndIndices(y, ...key);
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
 * @param key An arbitrary number of indices and/or keys pointing to the value
 * for comparison.
 * If `x = { key0: [{ key1: [3.142, 6.626,] },] }`, to fetch `6.626` for
 * comparison, use `comparatorLexic('key0', 0, 'key', 1)`.
 * See valOfKeysAndIndices for more details.
 */
const comparatorNumeric = (
  {
    ignoreSign = false,
    descending = false,
  }: {
    ignoreSign?: boolean;
    descending?: boolean;
  } = {},
  ...key: (string | number)[]
) => (x: any, y: any): number => {
  let a: number;
  let b: number;

  if (key.length === 0) {
    a = x;
    b = y;
  } else {
    a = valOfKeysAndIndices(x, ...key);
    b = valOfKeysAndIndices(y, ...key);
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
 * @param arr An array to be sorted
 * @param comaprator (Optional) Compare function
 * @return An sorted array
 */
const bubbleSort = (
  arr: any[],
  comparator: (a: any, b: any) => number = comparatorLexic({})
): any[] => {
  const ans = arr; // Eliminate side effects

  for (let i = ans.length - 1; i >= 0; i -= 1) {
    for (let j = 0; j < i; j += 1) {
      const cmp = comparator(ans[j], ans[j + 1]);
      if (cmp > 0) {
        const swap = ans[j + 1];
        ans[j + 1] = ans[j];
        ans[j] = swap;
      }
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

export { comparatorLexic, comparatorNumeric, bubbleSort, mergeSort };
