import {
  checkStringIsNullOrWhiteSpace,
  isArray,
  isFunction,
  isNull,
  isObject,
  isString,
  isUndefined,
} from './checkAssist';
import { convertCollection, sortOperate } from './constants';
import { toString } from './convertAssist';
import { to } from './convertExtraAssist';
import { modulePackageName } from './definition';
import { formatTarget } from './formatAssist';
import { find, get } from './lodashTools';
import {
  showRuntimeError,
  showSimpleRuntimeError,
  showWarnMessage,
} from './messagePromptAssist';
import { buildPromptModuleInfo, promptTextBuilder } from './promptAssist';
import { mergeTextMessage } from './tools';

/**
 * Module Name.
 * @private
 */
const moduleName = 'common';

function buildPromptModuleInfoText(text, ancillaryInformation = '') {
  return buildPromptModuleInfo(
    modulePackageName,
    mergeTextMessage(text, ancillaryInformation),
    moduleName,
  );
}

/**
 * 文本缩略
 */
export function ellipsis(value, length, symbol = '...') {
  if (value && value.length > length) {
    return `${toString(value).slice(0, Math.max(0, length))}${symbol}`;
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
      const beforeKeep = text.slice(0, Math.max(0, beforeKeepLength) + 1);

      const afterKeep = text.slice(textLength - afterKeepLength);

      result = beforeKeep + replaceText + afterKeep;
    }
  }

  return result || '';
}

/**
 * Sleep thread with ms
 */
export function sleep(n, callback) {
  let start = Date.now();

  while (Date.now() - start <= n) {
    // do nothing
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
    const text = buildPromptModuleInfoText(
      'getPathValue',
      'path must be string',
    );

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
 * @param {string} target the string to be retrieved
 * @param {string} match matching specification
 */
export function removeEndMatch(target, match) {
  if (!isString(target)) {
    throw new Error(
      buildPromptModuleInfoText(
        'removeEndMatch',
        promptTextBuilder.buildMustString({ name: 'target', value: target }),
      ),
    );
  }

  if (!isString(match)) {
    throw new Error(
      buildPromptModuleInfoText(
        'removeEndMatch',
        promptTextBuilder.buildMustString({ name: 'match', value: match }),
      ),
    );
  }

  if (checkStringIsNullOrWhiteSpace(target)) {
    return target;
  }

  if (checkStringIsNullOrWhiteSpace(match)) {
    return target;
  }

  const lastIndex = target.lastIndexOf(match);

  if (lastIndex >= 0 && target.length === lastIndex + match.length) {
    return target.slice(lastIndex, match.length);
  }

  return target;
}

/**
 * Remove last match string
 * @param {string} target the string to be retrieved
 * @param {string} match matching specification
 */
export function removeLastMatch(target, match) {
  if (!isString(target)) {
    throw new Error(
      buildPromptModuleInfoText(
        'removeLastMatch',
        promptTextBuilder.buildMustString({ name: 'target', value: target }),
      ),
    );
  }

  if (!isString(match)) {
    throw new Error(
      buildPromptModuleInfoText(
        'removeLastMatch',
        promptTextBuilder.buildMustString({ name: 'match', value: match }),
      ),
    );
  }

  if (checkStringIsNullOrWhiteSpace(target)) {
    return target;
  }

  if (checkStringIsNullOrWhiteSpace(match)) {
    return target;
  }

  const lastIndex = target.lastIndexOf(match);

  if (lastIndex >= 0) {
    return target.slice(lastIndex, match.length);
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
    result = isFunction(convertBuilder)
      ? to({
          target: v,
          convert: convertBuilder,
        })
      : to({
          target: v,
          convert,
        });
  }

  if ((formatBuilder || null) != null || (format || null) != null) {
    result = isFunction(formatBuilder)
      ? formatTarget({
          target: result,
          format: formatBuilder,
        })
      : formatTarget({
          target: result,
          format,
        });
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

  for (const o of list || []) {
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
  }

  switch (operate) {
    case sortOperate.moveUp: {
      if (itemSort === sortInitialValue) {
        const text = '已经排在首位!';

        showWarnMessage({ message: text });

        return list;
      }

      for (const [index, o] of (beforeList || []).entries()) {
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
      }

      result = [...result, ...afterList];

      break;
    }

    case sortOperate.moveDown: {
      if (itemSort === (list || []).length + sortInitialValue - 1) {
        const text = '已经排在末位!';

        showWarnMessage({ message: text });

        return list;
      }

      result = [...result, ...beforeList];

      for (const [index, o] of (afterList || []).entries()) {
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
      }

      break;
    }

    default: {
      const text = `不符合的操作, 允许的操作为['${sortOperate.moveUp}','${sortOperate.moveDown}']!`;

      showWarnMessage({ message: text });

      break;
    }
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

/**
 * check exist in array
 * @param {Array} array the array will be seek
 * @param {Function} predicateFunction predicate function
 * @param {number} fromIndex from index position, default is 0
 */
export function checkExist(array, predicateFunction, fromIndex = 0) {
  const result = find(array, predicateFunction, fromIndex);

  return !isUndefined(result);
}

/**
 * 处理已存储的远程接口列表数据中的指定键数据
 * @param {Object} options 配置参数
 * @param {Object} options.target 目标调用对象, 需要具备 state 以及 setState
 * @param {string} options.value 目标对比值
 * @param {Function} options.compareValueHandler 解析处列表项键值数据进行对比, 需返回待对比数据
 * @param {Function} options.handler 处理对比命中的项的函数, 处理结果将被替换进列表
 */
export function handleItem({ target, value, compareValueHandler, handler }) {
  if (!isObject(target)) {
    throw new Error(
      buildPromptModuleInfoText(
        'handleItem',
        promptTextBuilder.buildMustObject({ name: 'target', value: target }),
      ),
    );
  }

  if (!isObject(target.state)) {
    throw new Error(
      buildPromptModuleInfoText(
        'handleItem',
        promptTextBuilder.buildMustObject({
          name: 'target.state',
          value: target.state,
        }),
      ),
    );
  }

  const { metaOriginalData } = target.state;

  if (!isObject(metaOriginalData)) {
    throw new Error(
      buildPromptModuleInfoText(
        'handleItem',
        promptTextBuilder.buildMustObject({
          name: 'target.state.metaOriginalData',
          value: metaOriginalData,
        }),
      ),
    );
  }

  let indexData = -1;

  if (!isFunction(compareValueHandler)) {
    showSimpleRuntimeError(
      buildPromptModuleInfoText(
        'handleItem',
        promptTextBuilder.buildMustFunction({
          name: 'compareValueHandler',
          value: compareValueHandler,
        }),
      ),
    );

    return;
  }

  if (!isFunction(handler)) {
    const text = `handler mast be function`;

    showRuntimeError({
      message: text,
    });

    return;
  }

  if ((metaOriginalData.list || null) == null) {
    throw new Error(
      buildPromptModuleInfoText(
        'handleItem',
        promptTextBuilder.buildMustArray({
          name: 'target.state.metaOriginalData.list',
          value: metaOriginalData.list,
        }),
      ),
    );
  }

  for (const [index, o] of metaOriginalData.list.entries()) {
    const compareDataId = compareValueHandler(o);

    if (compareDataId === value) {
      indexData = index;
    }
  }

  if (indexData >= 0) {
    metaOriginalData.list[indexData] = handler(
      metaOriginalData.list[indexData],
    );

    target.setState({ metaOriginalData: [...metaOriginalData] });
  }
}
