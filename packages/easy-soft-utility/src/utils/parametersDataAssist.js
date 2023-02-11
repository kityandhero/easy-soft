import {
  getJsonFromLocalStorage,
  removeLocalStorage,
  saveJsonToLocalStorage,
} from './localStorageAssist';

/**
 * 移除信息
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function removeParametersDataCache(key) {
  removeLocalStorage(key);
}

/**
 * 获取useParamsData缓存
 *
 * @export
 * @param {*} fn
 * @returns
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
 * 设置useParamsData缓存
 *
 * @export
 * @param {o} useParamsData数据
 * @returns
 */
export function setParametersDataCache(key, o) {
  const now = Number.parseInt(Date.now() / 1000 / 60 / 30, 10);

  const d = {
    useParamsData: o || null,
    dataVersion: now,
  };

  return saveJsonToLocalStorage(key, d);
}
