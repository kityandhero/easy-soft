import { decode, encode } from 'js-base64';

/**
 * base64 decode
 * @param {String} target the string will decode
 */
export function decodeBase64(target) {
  return decode(target);
}

/**
 * base64 encode
 * @param {String} target the string will encode
 */
export function encodeBase64(target) {
  return encode(target);
}

export function fixedZero(val) {
  return val * 1 < 10 ? `0${val}` : val;
}
