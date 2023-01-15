/**
 * base64 decode
 */
export function decodeBase64(target) {
  let commonContent = (target || '').replace(/\s/g, '+');
  commonContent = Buffer.from(commonContent, 'base64').toString();

  return commonContent;
}

/**
 * base64 encode
 */
export function encodeBase64(target) {
  const base64Content = Buffer.from(target).toString('base64');

  return base64Content;
}

export function fixedZero(val) {
  return val * 1 < 10 ? `0${val}` : val;
}
