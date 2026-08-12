export const isArray = Array.isArray.bind(Array);
export const isFunction = (o) => typeof o === 'function';
export const returnSelf = (m) => m;
export const noop = () => {};

export const findIndex = (array, predicate) => {
  for (let index = 0, { length } = array; index < length; index += 1) {
    if (predicate(array[index], index)) return index;
  }

  return -1;
};

export { isPlainObject } from 'is-plain-object';
