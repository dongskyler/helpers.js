/**
 * Helper functions that don't fit into other categories
 */

/**
 * Returns the value of an object provided keys and/or indices
 * an array of keys and indices
 * @param obj Object, array or a combination
 * @param k Keys or indices that point to the desired value in that order
 * For example, given obj = {name: 'Tom'}, use key = 'name' to fetch 'Tom'.
 * Given obj = { key0: [{ key1: [3.142, 6.626,] },] }, to fetch 6.626,
 * use k = ...['key0', 0, 'key', 1].
 */
const valOfKeysAndIndices = (obj: any, ...k: (string | number)[]): any => {
  if (k.length === 1) {
    return obj[k[0]];
  }
  return valOfKeysAndIndices(obj[k[0]], ...k.slice(1));
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
 * Sort array with the given comparator function
 * @param arr Input array
 * @param comparator
 *
 * This sorting function eliminates the side effect of JavaScript's build-in
 * .sort() by returning a new array.
 *
 */
const sortArray = (arr: any[], comparator: (a: any, b: any) => number): any[] =>
  arr.slice(0).sort(comparator);

/**
 * Bubble sort
 * Stable: yes
 * @param arr Array to be sorted
 * @param comparator Callback
 */
const bubbleSort = (
  arr: any[],
  comparator: (a: any, b: any) => number
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
 * Run an array of functions with the same set of argument(s)
 * @param funcs An array of functions.
 * @param args An array of arguments. Each element of the array will
 * be presented to each function.
 * @param spread If 'args' is an array of arrays, you can choose to
 * expand each sub-array with the spread operator. Default is false.
 * @return
 */
const runFuncsWithArgs = (
  funcs: ((...args: any | any[] | null) => any)[],
  args: any | any[] | null = null,
  spread = false
): any => {
  if (!Array.isArray(funcs)) {
    throw new TypeError("Argument 'funcs' needs to be an array.");
  }
  if (Array.isArray(args)) {
    return args.map((a) =>
      funcs.map((f) => (spread && Array.isArray(a) ? f(...a) : f(a)))
    );
  }
  if (args === null) {
    return funcs.map((f) => f(args));
  }
  if (spread) {
    return funcs.map((f) => f(...args));
  }
  return funcs.map((f) => f(args));
};

export {
  valOfKeysAndIndices,
  comparatorLexic,
  sortArray,
  bubbleSort,
  runFuncsWithArgs,
};
