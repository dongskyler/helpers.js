/**
 * Sorting algorithms
 */

import { valOfKeysAndIndices } from './others';

/**
 * Comparator for lexigraphical order
 * @param key A string, a number or an array of keys, indicies or
 * a combination that points to a value for comparison.
 * See valOfKeysAndIndices for more details. For example, if x = {name: 'Tom'},
 * use key = 'name' to fetch value 'Tom' for comparison. If
 * x = { key0: [{ key1: [3.142, 6.626,] },] }, to fetch 6.626 for comparison,
 * use key = ['key0', 0, 'key', 1].
 * @param ignoreCase
 * @param descending True for descending order, false for
 * ascending order
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
  } else if (
    typeof key === 'string' ||
    typeof key === 'number' ||
    Array.isArray(key)
  ) {
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
 * Comparator for lexigraphical order
 * @param key A string, a number or an array of keys, indicies or
 * a combination that points to a value for comparison.
 * See valOfKeysAndIndices for more details. For example, if x = {name: 'Tom'},
 * use key = 'name' to fetch value 'Tom' for comparison. If
 * x = { key0: [{ key1: [3.142, 6.626,] },] }, to fetch 6.626 for comparison,
 * use key = ['key0', 0, 'key', 1].
 * @param ignoreCase
 * @param descending True for descending order, false for
 * ascending order
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
  } else if (
    typeof key === 'string' ||
    typeof key === 'number' ||
    Array.isArray(key)
  ) {
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
 * @param arr Array to be sorted
 * @param comaprator (Optional) comparator function
 * @return
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
 * @param arr Array
 * @param comaprator (Optional) comparator function
 * @return
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
