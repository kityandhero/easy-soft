import {
  getJsonFromLocalStorage,
  removeLocalStorage,
  saveJsonToLocalStorage,
} from './localStorageAssist';
import { logData, logDevelop } from './loggerAssist';
import { showOpenNotification } from './notificationPromptAssist';

const storageKeyCollection = {
  nearestLocalhostNotify: 'ea-nearestLocalhostNotify',
};

export function getNearestLocalhostNotifyCache() {
  const key = storageKeyCollection.nearestLocalhostNotify;

  const d = getJsonFromLocalStorage(key);

  if ((d || null) == null) {
    return null;
  }

  if ((d.nearestTime || null) == null) {
    return null;
  }

  return d || null;
}

export function setNearestLocalhostNotifyCache() {
  const key = storageKeyCollection.nearestLocalhostNotify;

  const now = Number.parseInt(Date.now() / 1000, 10);

  const d = {
    nearestTime: now,
  };

  return saveJsonToLocalStorage(key, d);
}

export function removeNearestLocalhostNotifyCache() {
  const key = storageKeyCollection.nearestLocalhostNotify;
  removeLocalStorage(key);
}

/**
 * 尝试发送最近一次本地调用通知（一般用于开发阶段, 提示调用的接口域）
 */
export function trySendNearestLocalhostNotify({ text }) {
  let needSend = false;
  let nearestTime = 0;

  const nearestLocalhostNotify = getNearestLocalhostNotifyCache() || null;

  if (nearestLocalhostNotify == null) {
    needSend = true;
  } else {
    nearestTime = nearestLocalhostNotify.nearestTime || 0;
  }

  const now = Number.parseInt(Date.now() / 1000, 10);

  try {
    if (nearestTime + 30 < now) {
      needSend = true;
    }

    if (needSend) {
      showOpenNotification({
        title: 'Current Request Host',
        description: text,
      });

      logDevelop('current request host', `"${text}"`);

      setNearestLocalhostNotifyCache();
    }
  } catch (error) {
    logData(error);
  }
}
