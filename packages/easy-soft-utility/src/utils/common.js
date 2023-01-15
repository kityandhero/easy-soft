import {
  checkStringIsNullOrWhiteSpace,
  isArray,
  isFunction,
  isNull,
  isString,
  isUndefined,
} from './checkAssist';
import { convertCollection, sortOperate } from './constants';
import { to, toString } from './convertAssist';
import { formatTarget } from './formatAssist';
import { find, get } from './lodashTools';
import { showRuntimeError, showWarnMessage } from './messagePromptAssist';

/**
 * 文本缩略
 */
export function ellipsis(value, length, symbol = '...') {
  if (value && value.length > length) {
    return `${toString(value).substring(0, length)}${symbol}`;
  }

  return toString(value);
}

/**
 * Replace string with keep
 */
export function replaceWithKeep(
  text,
  replaceText,
  beforeKeepLength,
  afterKeepLength,
) {
  let result = toString(text);

  const textLength = (text || '').length;
  if (textLength > 0 && (beforeKeepLength >= 0 || afterKeepLength >= 0)) {
    if (
      beforeKeepLength >= textLength ||
      afterKeepLength >= textLength ||
      (beforeKeepLength || 0) + (afterKeepLength || 0) >= textLength
    ) {
      result = text;
    } else {
      const beforeKeep = text.substr(0, beforeKeepLength);

      const afterKeep = text.substr(
        textLength - afterKeepLength,
        afterKeepLength,
      );

      result = beforeKeep + replaceText + afterKeep;
    }
  }

  return result || '';
}

/**
 * Sleep thread with ms
 */
export function sleep(n, callback) {
  let start = new Date().getTime();

  while (true) {
    if (new Date().getTime() - start > n) {
      break;
    }
  }

  if (isFunction(callback)) {
    callback();
  }
}

/**
 * Get value from object by path
 */
export function getPathValue(o, path, defaultValue = null) {
  if (isUndefined(o)) {
    return null || defaultValue;
  }

  if (o == null) {
    return null || defaultValue;
  }

  if (!isString(path)) {
    const text = 'getPathValue Function param path must be string';

    showRuntimeError({
      message: text,
    });

    return null;
  }

  const v = get(o, path, defaultValue);

  if (isUndefined(defaultValue) || isNull(defaultValue)) {
    return v;
  }

  return v || defaultValue;
}

/**
 * Remove end match string
 */
export function removeEndMatch(target, match) {
  if (!isString(target)) {
    throw new Error('removeEndMatch only use for string target');
  }

  if (!isString(match)) {
    throw new Error('removeEndMatch only use for string match');
  }

  if (checkStringIsNullOrWhiteSpace(target)) {
    return target;
  }

  if (checkStringIsNullOrWhiteSpace(match)) {
    return target;
  }

  const lastIndex = target.lastIndexOf(match);

  if (lastIndex >= 0 && target.length === lastIndex + match.length) {
    return target.substr(lastIndex, match.length);
  }

  return target;
}

/**
 * Remove last match string
 */
export function removeLastMatch(target, match) {
  if (!isString(target)) {
    throw new Error('removeEndMatch only use for string source');
  }

  if (!isString(match)) {
    throw new Error('removeEndMatch only use for string target');
  }

  if (checkStringIsNullOrWhiteSpace(target)) {
    return target;
  }

  if (checkStringIsNullOrWhiteSpace(match)) {
    return target;
  }

  const lastIndex = target.lastIndexOf(match);

  if (lastIndex >= 0) {
    return target.substr(lastIndex, match.length);
  }

  return target;
}

/**
 * Get value with key from object, convert value taken from convertCollection, format value taken from formatCollection, convertBuilder priority greater than convert, formatBuilder priority greater than format,
 */
export function getValueByKey({
  data,
  key,
  defaultValue = null,
  convert = null,
  convertBuilder = null,
  format = null,
  formatBuilder = null,
}) {
  const v = getPathValue(data, key, defaultValue);

  let result = v;

  if ((convertBuilder || null) != null || (convert || null) != null) {
    if (isFunction(convertBuilder)) {
      result = to({
        target: v,
        convert: convertBuilder,
      });
    } else {
      result = to({
        target: v,
        convert,
      });
    }
  }

  if ((formatBuilder || null) != null || (format || null) != null) {
    if (isFunction(formatBuilder)) {
      result = formatTarget({
        target: result,
        format: formatBuilder,
      });
    } else {
      result = formatTarget({
        target: result,
        format,
      });
    }
  }

  return result;
}

/**
 * Sort collection by key, the value must be number type, sortInitialValue mean begin sort if value greater than it.
 */
export function sortCollectionByKey({
  operate,
  item,
  list,
  key: sortKey,
  sortInitialValue = 0,
}) {
  if ((item || null) == null) {
    return list;
  }

  const beforeList = [];
  const afterList = [];
  let result = [];

  if ((list || []).length <= 1) {
    const text = '无需排序!';

    showWarnMessage({ message: text });

    return list;
  }

  const itemSort = getValueByKey({
    data: item,
    key: sortKey,
    convert: convertCollection.number,
  });

  (list || []).forEach((o) => {
    const sort = getValueByKey({
      data: o,
      key: sortKey,
      convert: convertCollection.number,
    });

    if (sort < itemSort) {
      beforeList.push(o);
    }

    if (sort > itemSort) {
      afterList.push(o);
    }
  });

  switch (operate) {
    case sortOperate.moveUp:
      if (itemSort === sortInitialValue) {
        const text = '已经排在首位!';

        showWarnMessage({ message: text });

        return list;
      }

      (beforeList || []).forEach((o, index) => {
        if (index < beforeList.length - 1) {
          result.push(o);
        } else {
          const o1 = item;
          o1[sortKey] -= 1;

          result.push(o1);

          const o2 = o;
          o2[sortKey] += 1;

          result.push(o2);
        }
      });

      result = result.concat(afterList);

      break;

    case sortOperate.moveDown:
      if (itemSort === (list || []).length + sortInitialValue - 1) {
        const text = '已经排在末位!';

        showWarnMessage({ message: text });

        return list;
      }

      result = result.concat(beforeList);

      (afterList || []).forEach((o, index) => {
        if (index === 0) {
          const o2 = o;
          o2[sortKey] -= 1;

          result.push(o2);

          const o1 = item;
          o1[sortKey] += 1;

          result.push(o1);
        } else {
          result.push(o);
        }
      });

      break;

    default:
      const text = `不符合的操作, 允许的操作为['${sortOperate.moveUp}','${sortOperate.moveDown}']!`;

      showWarnMessage({ message: text });

      break;
  }

  return result;
}

/**
 * Transform list data with convert
 */
export function transformListData({
  list = [],
  convert = null,
  recursiveKey = 'children',
}) {
  const listData = isArray(list) ? list : [list];

  const l = listData.map((one) => {
    return transformData({ data: one, convert, target: recursiveKey });
  });

  return l;
}

/**
 * Transform data with convert
 */
export function transformData({
  data,
  convert = null,
  recursiveKey = 'children',
}) {
  if (!isFunction(convert)) {
    return data;
  }

  const d = convert(data);

  const children = data[recursiveKey];

  let listData = [];

  if (isArray(children)) {
    listData = children.map((one) => {
      return transformData({ data: one, convert, target: recursiveKey });
    });
  }

  d[recursiveKey] = listData;

  return d;
}

export function checkExist(array, predicateFunction, fromIndex = 0) {
  const result = find(array, predicateFunction, fromIndex);

  return !isUndefined(result);
}
