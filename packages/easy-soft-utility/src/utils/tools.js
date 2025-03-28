import { isArray } from 'lodash';

import { checkStringIsNullOrWhiteSpace, isEmptyArray } from './checkAssist';
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
