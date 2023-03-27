import {
  getJsonFromLocalStorage,
  removeLocalStorage,
  saveJsonToLocalStorage,
} from './localStorageAssist';
import { logExecute } from './loggerAssist';
import { getToken } from './tokenAssist';

const storageKeyCollection = {
  currentOperator: 'currentOperator',
};

/**
 * Get currentOperator cache key
 */
export function getCurrentOperatorCacheKey() {
  return storageKeyCollection.currentOperator;
}

/**
 * Get currentOperator cache
 */
export function getCurrentOperatorCache() {
  logExecute('getCurrentOperatorCache');

  const key = storageKeyCollection.currentOperator;

  const d = getJsonFromLocalStorage(key);

  if ((d || null) == null) {
    return null;
  }

  if (d.flag === '' || d.flag !== getToken()) {
    return null;
  }

  return d.data || null;
}

/**
 * Set currentOperator cache
 * @param {Object} value the value will cache
 */
export function setCurrentOperatorCache(value) {
  logExecute('setCurrentOperatorCache');

  const key = storageKeyCollection.currentOperator;

  const d = {
    data: value || null,
    flag: getToken() || '',
  };

  return saveJsonToLocalStorage(key, d);
}

/**
 * Remove currentOperator cache
 */
export function removeCurrentOperatorCache() {
  logExecute('removeCurrentOperatorCache');

  const key = storageKeyCollection.currentOperator;

  removeLocalStorage(key);
}
