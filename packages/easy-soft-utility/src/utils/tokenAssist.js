import {
  getStringFromLocalStorage,
  removeLocalStorage,
  saveStringToLocalStorage,
} from './localStorageAssist';

const storageKeyCollection = {
  token: 'token',
};

/**
 * Get token catch key
 */
export function getTokenKeyName() {
  return storageKeyCollection.token;
}

/**
 * Get token catch
 */
export function getToken() {
  const key = storageKeyCollection.token;

  return getStringFromLocalStorage(key);
}

/**
 * Set token catch
 * @param {String} value
 * @returns
 */
export function setToken(value) {
  const key = storageKeyCollection.token;

  return saveStringToLocalStorage(key, value);
}

/**
 * Remove token catch
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function removeToken() {
  const key = storageKeyCollection.token;

  return removeLocalStorage(key);
}

/**
 * build token object
 */
export function buildTokenData() {
  const tokenSetObject = {};

  tokenSetObject[`${getTokenKeyName()}`] = getToken() || '';

  return tokenSetObject;
}
