import {
  getJsonFromLocalStorage,
  removeLocalStorage,
  saveJsonToLocalStorage,
} from './localStorageAssist';
import { logExecute } from './loggerAssist';

const storageKeyCollection = {
  localMetaData: 'localMetaData',
};

/**
 * Get local meta data
 */
export function getLocalMetaData() {
  logExecute('getLocalMetaData');

  const key = storageKeyCollection.localMetaData;

  const o = getJsonFromLocalStorage(key);

  if ((o || null) == null) {
    return null;
  }

  const { dataVersion } = o;

  if ((dataVersion || null) == null) {
    return null;
  }

  const { data } = {
    data: null,
    ...o,
  };

  return data || null;
}

/**
 * Set local meta data
 * @param {Object} data the date will save to local storage.
 */
export function setLocalMetaData(data) {
  logExecute('setLocalMetaData');

  const key = storageKeyCollection.localMetaData;

  // 信息有效期30分钟
  const nowVersion = Number.parseInt(Date.now() / 1000 / 60 / 30, 10);

  const o = {
    data,
    dataVersion: nowVersion,
  };

  return saveJsonToLocalStorage(key, o);
}

/**
 * Remove local meta data
 */
export function removeLocalMetaData() {
  const key = storageKeyCollection.localMetaData;

  removeLocalStorage(key);
}
