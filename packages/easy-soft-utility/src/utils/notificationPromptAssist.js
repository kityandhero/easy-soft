import { isFunction } from './checkAssist';
import { logError, logInfo, logWarn } from './loggerAssist';

/**
 * Prompt Assist
 */
export const notificationPromptAssist = {
  // eslint-disable-next-line no-unused-vars
  showOpenNotification: ({ text, duration = 1500, onClose = () => {} }) => {
    logInfo({ text });
  },
  // eslint-disable-next-line no-unused-vars
  showInfoNotification: ({ text, duration = 1500, onClose = () => {} }) => {
    logInfo({ text });
  },
  // eslint-disable-next-line no-unused-vars
  showSuccessNotification: ({ text, duration = 1500, onClose = () => {} }) => {
    logInfo({ text });
  },
  // eslint-disable-next-line no-unused-vars
  showWarnNotification: ({ text, duration = 1500, onClose = () => {} }) => {
    logWarn(text);
  },
  // eslint-disable-next-line no-unused-vars
  showWarningNotification: ({ text, duration = 1500, onClose = () => {} }) => {
    logWarn(text);
  },
  // eslint-disable-next-line no-unused-vars
  showErrorNotification: ({ text, duration = 1500, onClose = () => {} }) => {
    logError(text);
  },
};

/**
 * Set the open notification display monitor
 */
export function setOpenNotificationDisplayMonitor(callbackMonitor) {
  notificationPromptAssist.showOpenNotification = callbackMonitor;
}

/**
 * Set the info notification display monitor
 */
export function setInfoNotificationDisplayMonitor(callbackMonitor) {
  notificationPromptAssist.showInfoNotification = callbackMonitor;
}

/**
 * Set the warn notification display monitor
 */
export function seSuccessNotificationDisplayMonitor(callbackMonitor) {
  notificationPromptAssist.showSuccessNotification = callbackMonitor;
}

/**
 * Set the warn notification display monitor
 */
export function setWarnNotificationDisplayMonitor(callbackMonitor) {
  notificationPromptAssist.showWarnNotification = callbackMonitor;
}

/**
 * Set the warning notification display monitor
 */
export function setWarningNotificationDisplayMonitor(callbackMonitor) {
  notificationPromptAssist.showWarningNotification = callbackMonitor;
}

/**
 * Set the error notification display monitor
 */
export function setErrorNotificationDisplayMonitor(callbackMonitor) {
  notificationPromptAssist.showErrorNotification = callbackMonitor;
}

/**
 * Show simple text info notification with display monitor
 */
export function showSimpleOpenNotification(text) {
  showOpenNotification({ text: text });
}

/**
 * Show open notification with display monitor
 */
export function showOpenNotification({
  text,
  duration = 1500,
  onClose = () => {},
}) {
  if (isFunction(notificationPromptAssist.showOpenNotification)) {
    notificationPromptAssist.showOpenNotification({
      text,
      duration,
      onClose,
    });
  }
}

/**
 * Show simple text info notification with display monitor
 */
export function showSimpleInfoNotification(text) {
  showInfoNotification({ text: text });
}

/**
 * Show info notification with display monitor
 */
export function showInfoNotification({
  text,
  duration = 1500,
  onClose = () => {},
}) {
  if (isFunction(notificationPromptAssist.showInfoNotification)) {
    notificationPromptAssist.showInfoNotification({
      text,
      duration,
      onClose,
    });
  }
}

/**
 * Show simple text success notification with display monitor
 */
export function showSimpleSuccessNotification(text) {
  showSuccessNotification({ text: text });
}

/**
 * Show success notification with display monitor
 */
export function showSuccessNotification({
  text,
  duration = 1500,
  onClose = () => {},
}) {
  if (isFunction(notificationPromptAssist.showSuccessNotification)) {
    notificationPromptAssist.showSuccessNotification({
      text,
      duration,
      onClose,
    });
  }
}

/**
 * Show simple text warn notification with display monitor
 */
export function showSimpleWarnNotification(text) {
  showWarnNotification({ text: text });
}

/**
 * Show warn notification with display monitor
 */
export function showWarnNotification({
  text,
  duration = 1500,
  onClose = () => {},
}) {
  if (isFunction(notificationPromptAssist.showWarnNotification)) {
    notificationPromptAssist.showWarnNotification({
      text,
      duration,
      onClose,
    });
  }
}

/**
 * Show simple text warning notification with display monitor
 */
export function showSimpleWarningNotification(text) {
  showWarningNotification({ text: text });
}

/**
 * Show warning notification with display monitor
 */
export function showWarningNotification({
  text,
  duration = 1500,
  onClose = () => {},
}) {
  if (isFunction(notificationPromptAssist.showWarningNotification)) {
    notificationPromptAssist.showWarningNotification({
      text,
      duration,
      onClose,
    });
  }
}

/**
 * Show simple text error notification with display monitor
 */
export function showSimpleErrorNotification(text) {
  showErrorNotification({ text: text });
}

/**
 * Show error notification with display monitor
 */
export function showErrorNotification({
  text,
  duration = 1500,
  onClose = () => {},
}) {
  if (isFunction(notificationPromptAssist.showErrorNotification)) {
    notificationPromptAssist.showErrorNotification({
      text,
      duration,
      onClose,
    });
  }
}
