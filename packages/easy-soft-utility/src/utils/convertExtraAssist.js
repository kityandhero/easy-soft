import { isArray, isDate, isFunction, isNumber, isString } from './checkAssist';
import { convertCollection, emptyDatetime } from './constants';
import { toMoney, toNumber } from './convertAssist';
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
