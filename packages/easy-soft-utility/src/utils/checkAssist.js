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

import { trim } from './lodashTools';
import { stringifyJson } from './meta';

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
    d.getFullYear() === Number.parseInt(result[1], 10) &&
    d.getMonth() + 1 === Number.parseInt(result[3], 10) &&
    d.getDate() === Number.parseInt(result[4], 10)
  );
}

/**
 * Check target is number
 */
export function isNumber(v) {
  if (Number.isInteger(v)) {
    return true;
  }

  return isNumberLodash(v);
}

/**
 * Check target is money
 */
export function isMoney(target) {
  const string_ = `${isUndefined(target) ? null : target}`;

  if (string_ === '') {
    return false;
  }

  const regular = /^([1-9]\d{0,15}|0)(\.\d{1,2})?$/;
  const re = new RegExp(regular);
  return re.test(string_);
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
  const d1 = stringifyJson(target || {});
  const d2 = stringifyJson(compareData || {});

  return d1 === d2;
}

/**
 * Check target is function
 */
export function isFunction(target) {
  return isFunctionLodash(target);
}

/**isDateLodash
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
 * Check target is empty array
 */
export function isEmptyArray(value) {
  if (!isArray(value)) {
    return false;
  }

  return value.length <= 0;
}

/**
 * Check target is object
 */
export function isObject(target) {
  return isObjectLodash(target);
}

/**
 * Check object has any key
 */
export function isEmptyObject(target) {
  if (!isObject(target)) {
    return false;
  }

  return Object.keys(target).length <= 0;
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
 * @param {string} target value collection
 */
export function checkStringIsNullOrWhiteSpace(target) {
  return trim(replaceLodash(target || '', ' ', '')) === '';
}

/**
 * Check value is undefined, null or empty object
 * @param {Object} target value collection
 */
export function checkObjectIsNullOrEmpty(target) {
  if (isUndefined(target)) {
    return true;
  }

  if (isNull(target)) {
    return true;
  }

  if (isArray(target)) {
    return false;
  }

  if (!isObject(target)) {
    return false;
  }

  return isEmptyObject(target);
}

/**
 * Check value in the collection.
 * @param {Array} collection value collection
 * @param {*} target the target value will be checked
 */
export function checkInCollection(collection, target) {
  let result = false;

  if (!isArray(collection)) {
    return result;
  }

  collection.some((o) => {
    if (o === target) {
      result = true;

      return true;
    }

    return false;
  });

  return result;
}

/**
 * 该方法检验指定的 key 是否在对象中.
 * @param {Object} object 要搜索的对象源.
 * @param {string} key 指定的 key.
 */
export function hasKey(object, key) {
  if (checkStringIsNullOrWhiteSpace(key)) {
    return false;
  }

  const keys = Object.keys(object);

  return checkInCollection(keys, key);
}

/**
 * check date is today
 * @param {Date} date the date will be checked
 */
export function isToday(date) {
  return (
    new Date().toISOString().slice(0, 10) === date.toISOString().slice(0, 10)
  );
}

/**
 * check datetime between min datetime and max datetime
 * @param {Date} min min datetime
 * @param {Date} max max datetime
 * @param {Date} datetime the datetime will check
 */
export function isBetweenDatetime(min, max, datetime) {
  return (
    datetime.getTime() >= min.getTime() && datetime.getTime() <= max.getTime()
  );
}

/**
 * check date is weekend
 * @param {Date} date the datetime will check
 */
export function isWeekend(date) {
  return date.getDay() === 6 || date.getDay() === 0;
}

/**
 * check date in the year
 * @param {Date} date the datetime will check
 * @param {string|number} year year
 */
export function inYear(date, year) {
  return date.getUTCFullYear() === new Date(`${year}`).getUTCFullYear();
}

/**
 * Check target is async function
 * @param {*} f the function will check
 */
export function isAsyncFunction(f) {
  return Object.prototype.toString.call(f) === '[object AsyncFunction]';
}
