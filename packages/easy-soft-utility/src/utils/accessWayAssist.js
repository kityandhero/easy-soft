import { getCache, hasCache, setCache } from './cacheAssist';
import { isArray } from './checkAssist';
import { accessWaySpecialCollection } from './constants';
import {
  getJsonFromLocalStorage,
  saveJsonToLocalStorage,
} from './localStorageAssist';

export const storageKeyCollection = {
  accessWayCollection: 'accessWayCollection',
};

/**
 * Get access way collection cache
 * @returns
 */
export function getAccessWayCollectionCache() {
  let result = {};

  const key = storageKeyCollection.accessWayCollection;

  const existCache = hasCache({ key });

  if (existCache) {
    result = getCache({ key });

    if (isArray(result)) {
      return result;
    }
  }

  const d = getJsonFromLocalStorage(key);

  if ((d || null) == null) {
    return { ...(accessWaySpecialCollection || {}) };
  }

  result = { ...(d || null), ...(accessWaySpecialCollection || {}) };

  setCache({
    key,
    value: result,
  });

  return result;
}

export function setAccessWayCollectionCache(o) {
  const key = storageKeyCollection.accessWayCollection;

  saveJsonToLocalStorage(key, o || {});
}
