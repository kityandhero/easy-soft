import { checkStringIsNullOrWhiteSpace } from './checkAssist';

export function adjustUrl(url, prefix = '') {
  const regex = /\/\//gi;

  const urlAdjust = checkStringIsNullOrWhiteSpace(prefix)
    ? url
    : `${prefix}${url}`;

  const index = urlAdjust.indexOf('://');

  if (index < 0) {
    return urlAdjust.replaceAll(regex, '/');
  }

  const schemaRegex = /:\/\//gi;

  let urlNew = urlAdjust.replaceAll(schemaRegex, '!:-/-/!');

  urlNew = urlNew.replaceAll(regex, '/');

  const schemaSubstituteRegex = /!:-\/-\/!/gi;

  return urlNew.replaceAll(schemaSubstituteRegex, '://');
}
