import {
  getJsonFromLocalStorage,
  removeLocalStorage,
  saveJsonToLocalStorage,
} from './localStorageAssist';
import { logData, logText } from './loggerAssist';
import { showInfoNotification } from './notificationPromptAssist';

const storageKeyCollection = {
  nearestLocalhostNotify: 'nearestLocalhostNotify',
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
      const message = `当前接口域名: ${text}. `;

      showInfoNotification({
        title: message,
      });

      logText({
        message,
      });

      setNearestLocalhostNotifyCache();
    }
  } catch (error) {
    logData(error);
  }
}
