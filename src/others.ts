/**
 * Helper functions that don't fit into other categories
 */

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
): any[] => {
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

/**
 * Returns the value in an array or an object (or you call it JSON, a hash map
 * or a dictionary) provided keys and/or indices pointing to the value.
 * @param obj An array, an object (or you call it JSON, a hash map or a
 * dictionary) or a combination.
 * @param k An arbitrary number of indices and/or keys pointing to the value.
 * For example, if `x = {name: 'Tom'}`, to fetch value `'Tom'`, use
 * `valOfKeysAndIndicies(x, 'name')`.
 * If `y = { key0: [{ key1: [3.142, 6.626,] },] }`, to fetch `6.626`, use
 * `valOfKeysAndIndicies(y, 'key0', 0, 'key', 1)`.
 * @return The value from the given indices/keys.
 */
const valOfKeysAndIndices = (obj: any, ...k: (string | number)[]): any => {
  if (k.length === 0) {
    return obj;
  }
  if (k.length === 1) {
    return obj[k[0]];
  }
  return valOfKeysAndIndices(obj[k[0]], ...k.slice(1));
};

export { runFuncsWithArgs, valOfKeysAndIndices };
