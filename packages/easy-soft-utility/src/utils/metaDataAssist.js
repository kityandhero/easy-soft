import {
  getJsonFromLocalStorage,
  removeLocalStorage,
  saveJsonToLocalStorage,
} from './localStorageAssist';
import { logExecute } from './loggerAssist';

const storageKeyCollection = {
  metaData: 'metaData',
};

/**
 * Get metaData cache
 */
export function getMetaDataCache() {
  logExecute('getMetaDataCache');

  const key = storageKeyCollection.metaData;

  const d = getJsonFromLocalStorage(key);

  if ((d || null) == null) {
    return null;
  }

  return d;
}

/**
 * Set metaData cache
 * @param {Object} value the value will cache
 */
export function setMetaDataCache(value) {
  logExecute('setMetaDataCache');

  if ((value || null) == null) {
    return;
  }

  const key = storageKeyCollection.metaData;

  return saveJsonToLocalStorage(key, value);
}

/**
 * Remove metaData cache
 */
export function removeMetaDataCache() {
  logExecute('removeMetaDataCache');

  const key = storageKeyCollection.metaData;

  removeLocalStorage(key);
}
