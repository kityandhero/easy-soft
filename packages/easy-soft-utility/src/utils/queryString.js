import { parse, stringify } from 'qs';

import { checkStringIsNullOrWhiteSpace } from './checkAssist';

/**
 * Build query string url，default path is '', result like 'https://www.a.com?userId=2'
 */
export function buildQueryStringify(data, path = '') {
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

/**
 * Parse query string
 */
export function parseQueryString(data) {
  return parse(data);
}
