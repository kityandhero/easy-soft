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
 * 获取元数据
 *
 * @export
 * @param {*} fn
 * @returns
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
    ...{
      data: null,
    },
    ...o,
  };

  return data || null;
}

/**
 * 设置元数据
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function setLocalMetaData(data) {
  logExecute('setLocalMetaData');

  const key = storageKeyCollection.localMetaData;

  // 信息有效期30分钟
  const nowVersion = parseInt(new Date().getTime() / 1000 / 60 / 30, 10);

  const o = {
    data,
    dataVersion: nowVersion,
  };

  return saveJsonToLocalStorage(key, o);
}

/**
 * 移除元数据
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function removeLocalMetaData() {
  const key = storageKeyCollection.localMetaData;

  removeLocalStorage(key);
}
