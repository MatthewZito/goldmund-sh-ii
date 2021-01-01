import { Maybe, Prop } from './utils.helpers';

/* Silencers - utilities for silent evaluations and executions */

/**
 * Nullifies a function call, including those that are curried
 */
const nullify = () => nullify;

/**
 * Returns the given argument
 * @param {any} _
 */
const identity = _ => _;

/**
 * Returns the given arguments
 * @param {any[]} _
 */
const identities = (..._) => _;

/**
 * Evaluates nested properties on a given object
 */
function has (obj) {
  return function (propList) {
    const props = propList.split('.');
    let prospect = Maybe.of(obj);

    for (const candidate of props) {
      prospect = prospect.chain(Prop(candidate));
    }

    return !prospect
      .chain(identity)
      .hasOwnProperty('chain'); // eslint-disable-line no-prototype-builtins
  };
}

export {
  nullify,
  identity,
  identities,
  has
};
