import {
  getJsonFromLocalStorage,
  removeLocalStorage,
  saveJsonToLocalStorage,
} from './localStorageAssist';

/**
 * Remove parameters data cache
 * @param {string} key the cache key
 */
export function removeParametersDataCache(key) {
  removeLocalStorage(key);
}

/**
 * Get parameters data cache
 * @param {string} key the cache key
 */
export function getParametersDataCache(key) {
  const d = getJsonFromLocalStorage(key);

  if ((d || null) == null) {
    removeParametersDataCache(key);
    return null;
  }

  if ((d.dataVersion || '') === '') {
    removeParametersDataCache(key);
    return null;
  }

  const now = Number.parseInt(Date.now() / 1000 / 60 / 30, 10);

  if (d.dataVersion < now) {
    removeParametersDataCache(key);

    return null;
  }

  return d.useParamsData || null;
}

/**
 * Set parameters data cache
 * @param {string} key the cache key
 * @param {Object} data the data will be cached
 */
export function setParametersDataCache(key, data) {
  const now = Number.parseInt(Date.now() / 1000 / 60 / 30, 10);

  const d = {
    useParamsData: data || null,
    dataVersion: now,
  };

  return saveJsonToLocalStorage(key, d);
}
