import assignLodash from 'lodash/assign';
import assignWithLodash from 'lodash/assignWith';
import differenceLodash from 'lodash/difference';
import dropRightLodash from 'lodash/dropRight';
import endsWithLodash from 'lodash/endsWith';
import filterLodash from 'lodash/filter';
import findLodash from 'lodash/find';
import findIndexLodash from 'lodash/findIndex';
import firstLodash from 'lodash/first';
import floorLodash from 'lodash/floor';
import forEachLodash from 'lodash/forEach';
import getLodash from 'lodash/get';
import gteLodash from 'lodash/gte';
import mapLodash from 'lodash/map';
import memoizeLodash from 'lodash/memoize';
import removeLodash from 'lodash/remove';
import replaceLodash from 'lodash/replace';
import reverseLodash from 'lodash/reverse';
import roundLodash from 'lodash/round';
import setLodash from 'lodash/set';
import sizeLodash from 'lodash/size';
import sortByLodash from 'lodash/sortBy';
import sortedUniqLodash from 'lodash/sortedUniq';
import splitLodash from 'lodash/split';
import startsWithLodash from 'lodash/startsWith';
import trimLodash from 'lodash/trim';
import uniqByLodash from 'lodash/uniqBy';
import hash from 'object-hash';
import { parse, stringify } from 'qs';

import {
  checkStringIsNullOrWhiteSpace,
  isArray,
  isFunction,
  isNull,
  isString,
  isUndefined,
} from './checkAssist';
import { convertCollection, sortOperate } from './constants';
import { toDatetime, toMoney, toNumber } from './convertAssist';
import { formatTarget } from './formatAssist';
import { showRuntimeError, showWarnMessage } from './promptAssist';

export function assign(target, source) {
  return assignLodash(target, source);
}

export function assignWith(target, sources, customizer) {
  return assignWithLodash(target, sources, customizer);
}

export function reverse(array) {
  return reverseLodash(array);
}

export function forEach(collection, iteratee) {
  return forEachLodash(collection, iteratee);
}

export function gte(value, other) {
  return gteLodash(value, other);
}

/**
 * Trim value.
 * @param {*} target the value will be trimmed
 * @returns result
 */
export function trim(target) {
  return trimLodash(target);
}

/**
 * Replace value.
 * @param {*} target the target value will be replaced
 * @param {*} pattern pattern mode
 * @param {*} value replace value
 * @returns result
 */
export function replace(target, pattern, value) {
  return replaceLodash(target, pattern, value);
}

/**
 * Check value in the collection.
 * @param {*} collection value collection
 * @param {*} target the target value will be checked
 * @returns boolean
 */
export function inCollection(collection, target) {
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

export function sha1(v) {
  return hash(v, { algorithm: 'sha1' });
}

export function md5(v) {
  return hash(v, { algorithm: 'md5' });
}

export function checkEnvIsDevelopment() {
  return process.env.NODE_ENV === 'development';
}

/**
 * 检测是否尚有更多数据，用于分页场景
 * @param {*} pageNo [number] page number
 * @param {*} pageSize [number] page size
 * @param {*} pageSize [number] data total count
 * @returns
 */
export function checkHasMore({ pageNo, pageSize, total }) {
  if ((total || 0) <= 0) {
    return false;
  }

  return (pageNo || 0) * (pageSize || 0) < (total || 0);
}

/**
 * 同步线程挂起若干时间(毫秒)
 * @param  n
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
 * 通过 path 获取对应得值
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

  const v = getLodash(o, path, defaultValue);

  if (isUndefined(defaultValue) || isNull(defaultValue)) {
    return v;
  }

  return v || defaultValue;
}

/**
 * 如果字符串末尾匹配目标字符串, 则从源字符串末尾移除匹配项
 */

/**
 * Remove end match string
 * @param {*} target string -> the target will be checked
 * @param {*} match string -> the match string
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
 * convertTarget
 * @param {*} param0
 * @returns
 */
export function convertTarget({ target, convert }) {
  if (isFunction(convert)) {
    return convert(target);
  }

  if (isString(convert)) {
    switch (convert) {
      case convertCollection.number:
        return toNumber(target);

      case convertCollection.datetime:
        return toDatetime(target);

      case convertCollection.string:
        return toString(target);

      case convertCollection.money:
        return toMoney(target);

      case convertCollection.array:
        return (target || null) == null
          ? []
          : isArray(target)
          ? target
          : [target];

      default:
        return target;
    }
  }

  return target;
}

/**
 * 通过 key 获取对应得值
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
      result = convertTarget({
        target: v,
        convert: convertBuilder,
      });
    } else {
      result = convertTarget({
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
 * 依照某个键的值进行排序, 请确保键的值为数字型
 */
export function sortCollectionByKey({
  operate,
  item,
  list,
  sortKey,
  sortMin = 0,
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
      if (itemSort === sortMin) {
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
      if (itemSort === (list || []).length + sortMin - 1) {
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

export function queryStringify(data, path = '') {
  let result = stringify(data);

  if (checkStringIsNullOrWhiteSpace(path)) {
    return result;
  }

  if (checkStringIsNullOrWhiteSpace(result)) {
    return path;
  }

  const connector = path.lastIndexOf('?') >= 0 ? '&' : '?';

  return `${path}${connector}${result}`;
}

export function queryStringParse(data) {
  return parse(data);
}
