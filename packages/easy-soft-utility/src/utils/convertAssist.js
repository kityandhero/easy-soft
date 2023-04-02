import lowerFirstLodash from 'lodash/lowerFirst';
import toNumberLodash from 'lodash/toNumber';
import toStringLodash from 'lodash/toString';
import upperFirstLodash from 'lodash/upperFirst';
import hash from 'object-hash';

import {
  isArray,
  isDate,
  isFunction,
  isMoney,
  isNull,
  isNumber,
  isPromise,
  isString,
} from './checkAssist';
import { convertCollection, emptyDatetime } from './constants';
import { round } from './lodashTools';
import { logDevelop } from './loggerAssist';

/**
 * Convert target to Sha1 string
 */
export function toSha1(v) {
  return hash(v, { algorithm: 'sha1' });
}

export function toMd5(target) {
  return hash(target, { algorithm: 'md5' });
}

/**
 * Convert to precision number
 */
function toPrecision(target, precision) {
  const multiplier = Math.pow(10, precision + 1),
    wholeNumber = Math.floor(toNumber(target) * multiplier);

  return (Math.round(wholeNumber / 10) * 10) / multiplier;
}

/**
 * Convert to number, precision default is null, it mean not set precision
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
 * Check value in the bound and return result, if value not in the bound, return nearest boundary value
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
 */
export function toMoney(target) {
  if (isMoney(target)) {
    return Number.parseFloat(target, 10);
  }

  return 0;
}

/**
 * Convert to percentage string, like '15%'
 */
export function toPercentage(value) {
  return `${toMoney((toNumber(value) * 1000) / 10)}%`;
}

/**
 * Convert to string
 * @param {*} target
 */
export function toString(target) {
  if (isNull(target)) {
    return '';
  }

  return toStringLodash(target);
}

/**
 * Convert to boolean
 */
export function toBoolean(target) {
  return !!target;
}

/**
 * Convert to upper
 */
export function toUpper(target) {
  return toString(target).toUpperCase();
}

export function toUpperFirst(source) {
  return upperFirstLodash(source);
}

/**
 * Convert to lower string
 * @param {string|null} target
 */
export function toLower(target) {
  return toString(target).toLowerCase();
}

/**
 * Convert to lower first string
 * @param {string|null} target
 */
export function toLowerFirst(target) {
  return lowerFirstLodash(target);
}

/**
 * Convert to datetime
 * @param {Date|string|number} target
 */
export function toDatetime(target) {
  let valueAdjust = target;

  if ((valueAdjust || null) == null) {
    valueAdjust = emptyDatetime;

    logDevelop(
      'easy-soft-utility::toDatetime',
      `parameter is not time, use default value ${emptyDatetime}`,
    );
  }

  if (isDate(valueAdjust)) {
    return new Date(valueAdjust);
  }

  if (isString(valueAdjust)) {
    const index = valueAdjust.indexOf('T');

    if (index < 0) {
      // eslint-disable-next-line no-useless-escape
      const value = valueAdjust.replace(/-/g, '/');
      const result = new Date(value);

      return result;
    }
  }

  if (isNumber(valueAdjust)) {
    return new Date(toNumber(valueAdjust));
  }

  return new Date(valueAdjust);
}

/**
 * Convert to Promise
 */
export function toPromise(target) {
  if (isPromise(target)) {
    return target;
  }
  return Promise.resolve(target);
}

/**
 * Convert value to number with round mode
 */
export function toRound(target, decimalPlace) {
  return round(target, decimalPlace);
}

/**
 * Convert target use specified conversion, convert value taken from convertCollection.
 */
export function to({ target, convert }) {
  if (isFunction(convert)) {
    return convert(target);
  }

  if (isString(convert)) {
    switch (convert) {
      case convertCollection.number: {
        return toNumber(target);
      }

      case convertCollection.datetime: {
        return toDatetime(target);
      }

      case convertCollection.string: {
        return toString(target);
      }

      case convertCollection.money: {
        return toMoney(target);
      }

      case convertCollection.array: {
        return (target || null) == null
          ? []
          : isArray(target)
          ? target
          : [target];
      }

      default: {
        return target;
      }
    }
  }

  return target;
}

/**
 * Gets an array of unique array
 * @param {Array} array the array will be changed
 */
export function toUniqueArray(array) {
  return [...new Set(array)];
}
