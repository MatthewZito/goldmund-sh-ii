const noop = () => {};

/**
 * @summary Nullify an operation
 * Note: supports infinite invocation e.g. `nullify()()()()`
 */
const nullify = () => nullify;

/**
 * @summary Hardcode a function with its first parameter's argument(s),
 * to be invoked with its second parameter's argument(s) at some later time (i.e. partial application)
 * @generator
 */
const partial = (fn, ...args) => (...rest) => fn(...args, ...rest);

/**
 * @summary Create an inline filter
 * @generator
 */
const filter = (predicate, list) => list.filter(predicate);

const identity = _ => _;

/**
 * @summary Generate a pipeline
 * @generator
 * @example See search translator
 */
const pipe = (fn, ...fns) =>
  (...args) => fns.reduce((acc, fn) => fn(acc), fn(...args));

/**
 * @summary Generate a contractual predicate
 * @generator
 * @throws When predicate returns false (contract is violated)
 */
function contract (predicate) {
  return function (test) {
    if (predicate(test)) return true;
    throw new Error('Contract violation');
  };
}

export {
  partial,
  filter,
  identity,
  contract,
  pipe,
  nullify,
  noop
};
