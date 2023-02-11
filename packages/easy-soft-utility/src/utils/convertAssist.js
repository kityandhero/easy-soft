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
  isNumber,
  isPromise,
  isString,
} from './checkAssist';
import { convertCollection } from './constants';
import { round } from './lodashTools';

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
 */
export function toString(target) {
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
 * Convert to lower
 */
export function toLower(target) {
  return toString(target).toLowerCase();
}

export function toLowerFirst(target) {
  return lowerFirstLodash(target);
}

/**
 * Convert to datetime
 */
export function toDatetime(target) {
  if ((target || null) == null) {
    return null;
  }

  if (isDate(target)) {
    return target;
  }

  if (isString(target)) {
    const index = target.indexOf('T');

    if (index < 0) {
      // eslint-disable-next-line no-useless-escape
      const value = target.replace(/-/g, '/');
      const result = new Date(value);

      return result;
    }
  }

  return new Date(target);
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
