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

export { valOfKeysAndIndices, runFuncsWithArgs };
