import { checkStringIsNullOrWhiteSpace } from './checkAssist';
import { toString } from './convertAssist';

/**
 * Merge text message
 * @param {string} text the string will be merged
 * @param {string} ancillaryInformation when ancillary Information not empty, it will be merged
 */
export function mergeTextMessage(text, ancillaryInformation) {
  return `${toString(text)}${
    checkStringIsNullOrWhiteSpace(ancillaryInformation)
      ? ''
      : ` -> ${ancillaryInformation}`
  }`;
}

/**
 * Merge text use right arrow, ignore empty string
 * @param {Array} textCollection the string array will be merged
 */
export function mergeArrowText(...textCollection) {
  const list = [];

  for (const o of textCollection) {
    if (!checkStringIsNullOrWhiteSpace(o)) {
      list.push(o);
    }
  }

  return list.join(' -> ');
}
