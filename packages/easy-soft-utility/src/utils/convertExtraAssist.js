import { isArray, isDate, isFunction, isNumber, isString } from './checkAssist';
import {
  convertCollection,
  emptyDatetime,
  whetherNumber,
  whetherString,
} from './constants';
import { toMoney, toNumber, toString } from './convertAssist';
import { logDevelop } from './loggerAssist';

/**
 * Convert to datetime
 * @param {Date|string|number} target
 */
export function toDatetime(target) {
  let valueAdjust = target;

  if ((valueAdjust || null) == null) {
    valueAdjust = emptyDatetime;

    logDevelop(
      {
        parameter: target,
      },
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
      const value = valueAdjust.replaceAll('-', '/');
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
 * Convert target use specified conversion, convert value taken from convertCollection.
 * @param {Object} options options
 * @param {number} options.target value will be converted
 * @param {string} options.convert convert mode, if it not in convertCollection, will return raw data
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

      case convertCollection.whetherNumber: {
        const v = toNumber(target);

        return v === whetherNumber.yes ? whetherNumber.yes : whetherNumber.no;
      }

      case convertCollection.whetherString: {
        const v = toNumber(target);

        return v === whetherNumber.yes ? whetherString.yes : whetherString.no;
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
