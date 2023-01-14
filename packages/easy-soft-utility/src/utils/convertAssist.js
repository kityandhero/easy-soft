import roundLodash from 'lodash/round';
import toLowerLodash from 'lodash/toLower';
import toNumberLodash from 'lodash/toNumber';
import toStringLodash from 'lodash/toString';
import toUpperLodash from 'lodash/toUpper';

import { isDate, isMoney, isNumber, isPromise, isString } from './checkAssist';

/**
 * to precision number
 * @param {*} target number like -> the value will be check
 * @param {*} precision number -> the value will be check
 */
function toPrecision(target, precision) {
  const multiplier = Math.pow(10, precision + 1),
    wholeNumber = Math.floor(toNumber(target) * multiplier);

  return (Math.round(wholeNumber / 10) * 10) / multiplier;
}

/**
 * 转换为数字
 *
 * @param {*} value the value will be converted
 * @param {*} precision number converted, default is null, it mean not set precision
 */
export function toNumber(value, precision = null) {
  const valueAdjust = toNumberLodash(value);

  const v = Number.isNaN(valueAdjust) ? 0 : valueAdjust;

  if ((precision || null) == null) {
    return v;
  }

  return toPrecision(v, precision);
}

/**
 * Check value in the bound and return result, if value not in the bound, return boundary value
 * @param {*} value number -> the value will be check
 * @param {*} min number -> min bound
 * @param {*} max number -> max bound
 */
export function toBoundary(value, min, max) {
  if (!isNumber(value)) {
    throw new Error(`value must be number value`);
  }

  let v = toNumber(value);

  if (min !== undefined) {
    v = Math.max(value, min);
  }

  if (max !== undefined) {
    v = Math.min(v, max);
  }

  return v;
}

/**
 * Convert to money
 * @param {*} target number like -> the target will be converted
 */
export function toMoney(target) {
  if (isMoney(target)) {
    return parseFloat(target, 10);
  }

  return 0;
}

/**
 * Convert to percentage string, like '15%'
 * @param {*} target number like -> the target will be converted
 */
export function toPercentage(val) {
  return `${toMoney((toNumber(val) * 1000) / 10)}%`;
}

/**
 * Convert to string
 * @param {*} target any -> the target will be converted
 */
export function toString(target) {
  return toStringLodash(target);
}

/**
 * Convert to boolean
 * @param {*} target any -> the target will be converted
 */
export function toBoolean(target) {
  return !!target;
}

/**
 * Convert to upper
 * @param {*} target any -> the target will be converted
 */
export function toUpper(target) {
  return toUpperLodash(target);
}

/**
 * Convert to lower
 * @param {*} target any -> the target will be converted
 */
export function toLower(target) {
  return toLowerLodash(target);
}

/**
 * Convert to datetime
 * @param {*} target any -> the target will be converted
 */
export function toDatetime(target) {
  if ((target || null) == null) {
    return null;
  }

  if (isDate(target)) {
    return target;
  }

  if (isString(target)) {
    const i = target.indexOf('T');

    if (i < 0) {
      // eslint-disable-next-line no-useless-escape
      const value = target.replace(/\-/g, '/');
      const result = new Date(value);

      return result;
    }
  }

  return new Date(target);
}

/**
 * Convert to Promise
 * @param {*} target any -> the target will be converted
 */
export function toPromise(target) {
  if (isPromise(target)) {
    return target;
  }
  return Promise.resolve(target);
}

/**
 * Convert value use round mode
 * @param  {*} target number -> the value will be converted
 * @param  {*} decimalPlace number -> decimal place
 */
export function toRound(target, decimalPlace) {
  return roundLodash(target, decimalPlace);
}
