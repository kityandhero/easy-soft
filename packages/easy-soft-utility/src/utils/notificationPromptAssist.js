import { isFunction } from './checkAssist';
import { logError, logInfo, logWarn } from './loggerAssist';
import { mergeTextMessage } from './tools';

/**
 * Prompt Assist
 */
export const notificationPromptAssist = {
  showOpenNotification: ({
    title,
    description = '',
    // eslint-disable-next-line no-unused-vars
    placement = '',
    // eslint-disable-next-line no-unused-vars
    duration = 3000,
    // eslint-disable-next-line no-unused-vars
    onClose = () => {},
  }) => {
    logInfo(mergeTextMessage(title, description));
  },

  showLoadingNotification: ({
    title,
    description = '',
    // eslint-disable-next-line no-unused-vars
    placement = '',
    // eslint-disable-next-line no-unused-vars
    duration = 3000,
    // eslint-disable-next-line no-unused-vars
    onClose = () => {},
  }) => {
    logInfo(mergeTextMessage(title, description));
  },

  showInfoNotification: ({
    title,
    description = '',
    // eslint-disable-next-line no-unused-vars
    placement = '',
    // eslint-disable-next-line no-unused-vars
    duration = 3000,
    // eslint-disable-next-line no-unused-vars
    onClose = () => {},
  }) => {
    logInfo(mergeTextMessage(title, description));
  },

  showSuccessNotification: ({
    title,
    description = '',
    // eslint-disable-next-line no-unused-vars
    placement = '',
    // eslint-disable-next-line no-unused-vars
    duration = 3000,
    // eslint-disable-next-line no-unused-vars
    onClose = () => {},
  }) => {
    logInfo(mergeTextMessage(title, description));
  },

  showWarnNotification: ({
    title,
    description = '',
    // eslint-disable-next-line no-unused-vars
    placement = '',
    // eslint-disable-next-line no-unused-vars
    duration = 3000,
    // eslint-disable-next-line no-unused-vars
    onClose = () => {},
  }) => {
    logWarn(mergeTextMessage(title, description));
  },

  showWarningNotification: ({
    title,
    description = '',
    // eslint-disable-next-line no-unused-vars
    placement = '',
    // eslint-disable-next-line no-unused-vars
    duration = 3000,
    // eslint-disable-next-line no-unused-vars
    onClose = () => {},
  }) => {
    logWarn(mergeTextMessage(title, description));
  },

  showErrorNotification: ({
    title,
    description = '',
    // eslint-disable-next-line no-unused-vars
    placement = '',
    // eslint-disable-next-line no-unused-vars
    duration = 3000,
    // eslint-disable-next-line no-unused-vars
    onClose = () => {},
  }) => {
    logError(mergeTextMessage(title, description));
  },
};

/**
 * Set the open notification display monitor
 */
export function setOpenNotificationDisplayMonitor(callbackMonitor) {
  notificationPromptAssist.showOpenNotification = callbackMonitor;
}

/**
 * Set the loading notification display monitor
 */
export function setLoadingNotificationDisplayMonitor(callbackMonitor) {
  notificationPromptAssist.showLoadingNotification = callbackMonitor;
}

/**
 * Set the info notification display monitor
 */
export function setInfoNotificationDisplayMonitor(callbackMonitor) {
  notificationPromptAssist.showInfoNotification = callbackMonitor;
}

/**
 * Set the success notification display monitor
 */
export function setSuccessNotificationDisplayMonitor(callbackMonitor) {
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
 * Show simple title open notification with display monitor
 */
export function showSimpleOpenNotification(text) {
  showOpenNotification({ description: text });
}

/**
 * Show open notification with display monitor
 */
export function showOpenNotification({
  title,
  description = '',
  placement = '',
  duration = 3000,
  onClose = () => {},
}) {
  if (isFunction(notificationPromptAssist.showOpenNotification)) {
    notificationPromptAssist.showOpenNotification({
      title,
      description,
      placement,
      duration,
      onClose,
    });
  }
}

/**
 * Show simple title loading notification with display monitor
 */
export function showSimpleLoadingNotification(text) {
  showLoadingNotification({ description: text });
}

/**
 * Show loading notification with display monitor
 */
export function showLoadingNotification({
  title,
  description = '',
  placement = '',
  duration = 3000,
  onClose = () => {},
}) {
  if (isFunction(notificationPromptAssist.showLoadingNotification)) {
    notificationPromptAssist.showLoadingNotification({
      title,
      description,
      placement,
      duration,
      onClose,
    });
  }
}

/**
 * Show simple title info notification with display monitor
 */
export function showSimpleInfoNotification(text) {
  showInfoNotification({ description: text });
}

/**
 * Show info notification with display monitor
 */
export function showInfoNotification({
  title,
  description = '',
  placement = '',
  duration = 3000,
  onClose = () => {},
}) {
  if (isFunction(notificationPromptAssist.showInfoNotification)) {
    notificationPromptAssist.showInfoNotification({
      title,
      description,
      placement,
      duration,
      onClose,
    });
  }
}

/**
 * Show simple title warn notification with display monitor
 */
export function showSimpleWarnNotification(text) {
  showWarnNotification({ description: text });
}

/**
 * Show warn notification with display monitor
 */
export function showWarnNotification({
  title,
  description = '',
  placement = '',
  duration = 3000,
  onClose = () => {},
}) {
  if (isFunction(notificationPromptAssist.showWarnNotification)) {
    notificationPromptAssist.showWarnNotification({
      title,
      description,
      placement,
      duration,
      onClose,
    });
  }
}

/**
 * Show simple title warning notification with display monitor
 */
export function showSimpleWarningNotification(text) {
  showWarningNotification({ description: text });
}

/**
 * Show warning notification with display monitor
 */
export function showWarningNotification({
  title,
  description = '',
  placement = '',
  duration = 3000,
  onClose = () => {},
}) {
  if (isFunction(notificationPromptAssist.showWarningNotification)) {
    notificationPromptAssist.showWarningNotification({
      title,
      description,
      placement,
      duration,
      onClose,
    });
  }
}

/**
 * Show simple title success notification with display monitor
 */
export function showSimpleSuccessNotification(text) {
  showSuccessNotification({ description: text });
}

/**
 * Show success notification with display monitor
 */
export function showSuccessNotification({
  title,
  description = '',
  placement = '',
  duration = 3000,
  onClose = () => {},
}) {
  if (isFunction(notificationPromptAssist.showSuccessNotification)) {
    notificationPromptAssist.showSuccessNotification({
      title,
      description,
      placement,
      duration,
      onClose,
    });
  }
}

/**
 * Show simple title error notification with display monitor
 */
export function showSimpleErrorNotification(text) {
  showErrorNotification({ description: text });
}

/**
 * Show error notification with display monitor
 */
export function showErrorNotification({
  title,
  description = '',
  placement = '',
  duration = 3000,
  onClose = () => {},
}) {
  if (isFunction(notificationPromptAssist.showErrorNotification)) {
    notificationPromptAssist.showErrorNotification({
      title,
      description,
      placement,
      duration,
      onClose,
    });
  }
}
