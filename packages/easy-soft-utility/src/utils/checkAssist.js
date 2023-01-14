import isBooleanLodash from 'lodash/isBoolean';
import isDateLodash from 'lodash/isDate';
import isEqualLodash from 'lodash/isEqual';
import isFunctionLodash from 'lodash/isFunction';
import isNullLodash from 'lodash/isNull';
import isNumberLodash from 'lodash/isNumber';
import isObjectLodash from 'lodash/isObject';
import isStringLodash from 'lodash/isString';
import isUndefinedLodash from 'lodash/isUndefined';
import replaceLodash from 'lodash/replace';
import trimLodash from 'lodash/trim';

/**
 * Check target is invalid
 */
export function isInvalid(target) {
  return isUndefined(target);
}

/**
 * Check target is datetime
 */
export function isDatetime(target) {
  const date = `${isUndefined(target) ? null : target}`;
  const result = date.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/);

  if (result == null) {
    return false;
  }

  const d = new Date(result[1], result[3] - 1, result[4]);

  return (
    d.getFullYear() === parseInt(result[1], 10) &&
    d.getMonth() + 1 === parseInt(result[3], 10) &&
    d.getDate() === parseInt(result[4], 10)
  );
}

/**
 * Check target is number
 */
export function isNumber(v) {
  return isNumberLodash(v);
}

/**
 * Check target is money
 */
export function isMoney(target) {
  const str = `${isUndefined(target) ? null : target}`;

  if (str === '') {
    return false;
  }

  const regular = /^([1-9][\d]{0,15}|0)(\.[\d]{1,2})?$/;
  const re = new RegExp(regular);
  return re.test(str);
}

/**
 * Check both is equal by deep compare. Method supports comparison arrays, array buffers, booleans, date objects, error objects, maps, numbers, Object objects, regexes, sets, strings, symbols and typed arrays. Object values compare properties of the object itself, excluding inherited and enumerable properties. Comparisons between functions and DOM nodes are not supported.
 */
export function isEqual(target, compareData) {
  return isEqualLodash(target, compareData);
}

/**
 * Check both is equal by serialize
 */
export function isEqualBySerialize(target, compareData) {
  const d1 = JSON.stringify(target || {});
  const d2 = JSON.stringify(compareData || {});

  return d1 === d2;
}

/**
 * Check target is function
 */
export function isFunction(target) {
  return isFunctionLodash(target);
}

/**
 * Check target is boolean
 */
export function isBoolean(target) {
  return isBooleanLodash(target);
}

/**
 * Check target is undefined
 */
export function isUndefined(target) {
  return isUndefinedLodash(target);
}

/**
 * Check target is null
 */
export function isNull(target) {
  return isNullLodash(target);
}

/**
 * Check target is date
 */
export function isDate(target) {
  return isDateLodash(target);
}

/**
 * Check target is string
 */
export function isString(target) {
  return isStringLodash(target);
}

export function isArray(value) {
  return Array.isArray(value);
}

/**
 * Check target is object
 */
export function isObject(target) {
  return isObjectLodash(target);
}

/**
 * Check target is plain object
 */
export function isPlainObject(target) {
  return target !== null && typeof target === 'object' && !isArray(target);
}

/**
 * Check target is promise
 */
export function isPromise(target) {
  return (
    isPlainObject(target) && isFunction(target.then) && isFunction(target.catch)
  );
}

/**
 * Check target is url
 */
export function isUrl(target) {
  const regular = /(http|https):\/\/([\w.]+\/?)\S*/;
  const re = new RegExp(regular);

  return re.test(target);
}

/**
 * Check target is base64 image
 */
export function isImageBase4(target) {
  const regular = /(data):image\/([\w.]+\/?)\S*/;
  const re = new RegExp(regular);

  return re.test(target);
}

/**
 * Check value is null or empty string
 * @returns
 */
export function checkStringIsNullOrWhiteSpace(target) {
  return trimLodash(replaceLodash(target || '', ' ', '')) === '';
}
