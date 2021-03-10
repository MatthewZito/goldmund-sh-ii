/* Common heuristics for evaluating types, properties, etc */

// Type-check fn Generator
const typeChecks = [
  'Function',
  'String',
  'Number',
  'Error',
  'Object',
  'Array'
].reduce((obj, name) => {
  obj['is' + name] = x => toString.call(x) == '[object ' + name + ']'; // eslint-disable-line eqeqeq
  return obj;
}, {});

/**
 * @summary Generate a typecheck function for `type` (must be an object constructor e.g. Array, String, etc)
 * @param {constructor} type
 * @generator
 */
const is = (type) => (x) => Object(x) instanceof type;

const {
  isFunction,
  isString,
  isNumber,
  isError,
  isObject,
  isArray
} = typeChecks;

/**
 * @summary Determine whether a given property occurs on given object, or at some point in its prototype chain
 * @param {object} target Object on which to check for existence of `prop`
 * @param {(string|null)} prop Property to check on `target`
 */
const notInPrototypeChain = (target, prop) => !prop || !Reflect.has(target, prop);

/**
 * @summary Determine if an object is NOT empty
 * @param {any} candidate Prospective object to test
 */
function objNotEmpty (candidate) {
  if (isObject(candidate)) {
    return Object.keys(candidate).length > 0;
  }
  return false;
}

/**
 * @summary Determine if an object does NOT contain *only* empty arrays; and null, or undefined values - no matter how nested
 * @param {any} candidate Prospective object to test
 * NOTE: Arrays with falsy values are not considered empty here
 */
function objNotEmptyDeep (candidate) {
  if (isArray(candidate)) return candidate.length > 0; // [null, undefined, ...] is OK, [] is not
  if (!isObject(candidate) && (
    candidate === 0 /* allow val == zero */ ||
    candidate === '' /* allow val == '' */ ||
    !!candidate
  )) return true;

  if (isObject(candidate)) {
    return Object.values(candidate)
      .map(objNotEmptyDeep)
      .includes(true);
  }

  return false;
}

export {
  is,
  isFunction,
  isString,
  isNumber,
  isError,
  isObject,
  isArray,
  notInPrototypeChain,
  objNotEmpty,
  objNotEmptyDeep
};
