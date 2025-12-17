import {
  checkStringIsNullOrWhiteSpace,
  isArray,
  isEmptyArray,
  isFunction,
} from './checkAssist';
import { toString } from './convertAssist';

/**
 * Merge text use separator, ignore empty string
 * @param {Object} options options
 * @param {Array} options.textCollection the string array will be merged
 * @param {string} options.separator string separator
 */
export function mergeTextCollection({ textCollection, separator = ',' }) {
  if (!isArray(textCollection) || isEmptyArray(textCollection)) {
    return '';
  }

  const list = [];

  for (const o of textCollection) {
    const v = toString(o);

    if (!checkStringIsNullOrWhiteSpace(v)) {
      list.push(v);
    }
  }

  if (list.length <= 0) {
    return '';
  }

  return list.join(separator);
}

/**
 * Merge text use right arrow, ignore empty string
 * @param {Array} textCollection the string array will be merged
 */
export function mergeArrowText(...textCollection) {
  return mergeTextCollection({
    textCollection: textCollection,
    separator: ' -> ',
  });
}

/**
 * Merge text message
 * @param {string} text the string will be merged
 * @param {string} ancillaryInformation when ancillary Information not empty, it will be merged
 */
export function mergeTextMessage(text, ancillaryInformation) {
  return mergeArrowText(toString(text), ancillaryInformation);
}

export function buildBase64Png(v) {
  if (checkStringIsNullOrWhiteSpace(v)) {
    return '';
  }

  return `data:image/png;base64,${v}`;
}

export function buildBase64Jpeg(v) {
  if (checkStringIsNullOrWhiteSpace(v)) {
    return '';
  }

  return `data:image/jpeg;base64,${v}`;
}

/**
 * 依据条件相邻位去重
 * @param {Array} list 即将去重的数据集合
 * @param {Function} split 分割逻辑
 * @returns 去重后的数据集合
 */
export function distinctAdjacent(list, split) {
  if (!isArray(list)) {
    return [];
  }

  if (isEmptyArray(list)) {
    return [];
  }

  if (!isFunction(split)) {
    throw new Error('distinctAdjacent 参数 split 需要为函数且返回 bool 值');
  }

  if (list.length === 1) {
    return list;
  }

  const first = list[0];

  const firstWhetherSplit = split(first);
  let previousWhetherSplit = firstWhetherSplit;

  const listGroup = [];

  const listSplit = [];

  let listTemporaryGroup = [];
  let listTemporarySplit = [];

  if (previousWhetherSplit) {
    listTemporarySplit.push(first);
  } else {
    listTemporaryGroup.push(first);
  }

  list.shift();

  const listAdjust = [...list];

  for (const item of listAdjust) {
    if (split(item)) {
      if (previousWhetherSplit) {
        listTemporarySplit.push(item);
      } else {
        if (!isEmptyArray(listTemporarySplit)) {
          listSplit.push([...listTemporarySplit]);

          listTemporarySplit = [];
        }

        listTemporarySplit.push(item);
      }
    } else {
      if (previousWhetherSplit) {
        if (!isEmptyArray(listTemporaryGroup)) {
          listGroup.push([...listTemporaryGroup]);

          listTemporaryGroup = [];
        }

        listTemporaryGroup.push(item);
      } else {
        listTemporaryGroup.push(item);
      }
    }

    previousWhetherSplit = split(item);
  }

  listSplit.push([...listTemporarySplit]);
  listGroup.push([...listTemporaryGroup]);

  const listSplitAdjust = [];

  for (const item of listSplit) {
    if (item.length === 1) {
      listSplitAdjust.push(item);

      continue;
    }

    if (item.length > 1) {
      listSplitAdjust.push([item[0]]);
    }
  }

  const listResult = [];

  if (firstWhetherSplit) {
    for (const [index, element] of listSplitAdjust.entries()) {
      listResult.push(element);

      if (listGroup.length > index) {
        listResult.push(listGroup[index]);
      }
    }
  } else {
    for (const [index, element] of listGroup.entries()) {
      listResult.push(element);

      if (listSplitAdjust.length > index) {
        listResult.push(listSplitAdjust[index]);
      }
    }
  }

  return listResult.flat();
}
