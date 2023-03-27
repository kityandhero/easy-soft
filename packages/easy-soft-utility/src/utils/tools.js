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
