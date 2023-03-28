import {
  getStringFromLocalStorage,
  removeLocalStorage,
  saveStringToLocalStorage,
} from './localStorageAssist';

const storageKeyCollection = {
  tokenLocalKey: 'ea-token',
  tokenKey: 'token',
};

/**
 * Get token catch key
 */
export function getTokenKeyName() {
  return storageKeyCollection.tokenKey;
}

/**
 * Get token catch
 */
export function getToken() {
  const key = storageKeyCollection.tokenLocalKey;

  return getStringFromLocalStorage(key);
}

/**
 * Set token catch
 * @param {string} value
 */
export function setToken(value) {
  const key = storageKeyCollection.tokenLocalKey;

  return saveStringToLocalStorage(key, value);
}

/**
 * Remove token catch
 */
export function removeToken() {
  const key = storageKeyCollection.tokenLocalKey;

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
