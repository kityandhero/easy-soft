import { checkStringIsNullOrWhiteSpace, isFunction } from './checkAssist';
import { modulePackageName } from './definition';
import {
  logError,
  logException,
  logInfo,
  logWarn,
  mergeTextMessage,
} from './loggerAssist';
import { buildPromptModuleInfo } from './promptAssist';

/**
 * Module Name.
 * @private
 */
const moduleName = 'loggerAssist';

export function checkMessagePromptData({ text }) {
  if (checkStringIsNullOrWhiteSpace(text || null)) {
    logWarn(
      buildPromptModuleInfo(
        modulePackageName,
        mergeTextMessage(
          'checkMessagePromptData option text disallow empty',
          '{ text }',
        ),
        moduleName,
      ),
    );
  }

  return true;
}

/**
 * Prompt Assist
 */
export const messagePromptAssist = {
  // eslint-disable-next-line no-unused-vars
  showOpenMessage: ({ text, duration = 1500, onClose = () => {} }) => {
    logInfo(text);
  },
  // eslint-disable-next-line no-unused-vars
  showLoadingMessage: ({ text, duration = 1500, onClose = () => {} }) => {
    logInfo(text);
  },
  // eslint-disable-next-line no-unused-vars
  showInfoMessage: ({ text, duration = 1500, onClose = () => {} }) => {
    logInfo(text);
  },
  // eslint-disable-next-line no-unused-vars
  showSuccessMessage: ({ text, duration = 1500, onClose = () => {} }) => {
    logInfo(text);
  },
  // eslint-disable-next-line no-unused-vars
  showWarnMessage: ({ text, duration = 1500, onClose = () => {} }) => {
    logWarn(text);
  },
  // eslint-disable-next-line no-unused-vars
  showWarningMessage: ({ text, duration = 1500, onClose = () => {} }) => {
    logWarn(text);
  },
  // eslint-disable-next-line no-unused-vars
  showErrorMessage: ({ text, duration = 1500, onClose = () => {} }) => {
    logError(text);
  },

  setErrorMessageDisplayMonitorComplete: false,
};

/**
 * Set the open message display monitor
 * @param {Function} callbackMonitor customize message display
 */
export function setOpenMessageDisplayMonitor(callbackMonitor) {
  messagePromptAssist.showOpenMessage = callbackMonitor;
}

/**
 * Set the loading message display monitor
 * @param {Function} callbackMonitor customize message display
 */
export function setLoadingMessageDisplayMonitor(callbackMonitor) {
  messagePromptAssist.showLoadingMessage = callbackMonitor;
}

/**
 * Set the info message display monitor
 * @param {Function} callbackMonitor customize message display
 */
export function setInfoMessageDisplayMonitor(callbackMonitor) {
  messagePromptAssist.showInfoMessage = callbackMonitor;
}

/**
 * Set the warn message display monitor
 * @param {Function} callbackMonitor customize message display
 */
export function setSuccessMessageDisplayMonitor(callbackMonitor) {
  messagePromptAssist.showSuccessMessage = callbackMonitor;
}

/**
 * Set the warn message display monitor
 * @param {Function} callbackMonitor customize message display
 */
export function setWarnMessageDisplayMonitor(callbackMonitor) {
  messagePromptAssist.showWarnMessage = callbackMonitor;
}

/**
 * Set the warning message display monitor
 * @param {Function} callbackMonitor customize message display
 */
export function setWarningMessageDisplayMonitor(callbackMonitor) {
  messagePromptAssist.showWarningMessage = callbackMonitor;
}

/**
 * Set the error message display monitor
 * @param {Function} callbackMonitor customize message display
 */
export function setErrorMessageDisplayMonitor(callbackMonitor) {
  messagePromptAssist.showErrorMessage = callbackMonitor;

  messagePromptAssist.setErrorMessageDisplayMonitorComplete = true;
}

/**
 * Show simple text open message with display monitor
 * @param {String} text simple text message
 */
export function showSimpleOpenMessage(text) {
  showOpenMessage({ text: text });
}

/**
 * Show open message with display monitor
 * @param {Object} option message option
 * @param {String} option.text message text
 * @param {Number} option.duration message duration time, default is 1500
 * @param {Function} option.onClose onClose callback
 */
export function showOpenMessage({ text, duration = 1500, onClose = () => {} }) {
  if (isFunction(messagePromptAssist.showOpenMessage)) {
    checkMessagePromptData({ text });

    messagePromptAssist.showOpenMessage({ text, duration, onClose });
  }
}

/**
 * Show simple text loading message with display monitor
 * @param {String} text simple text message
 */
export function showSimpleLoadingMessage(text) {
  showLoadingMessage({ text: text });
}

/**
 * Show loading message with display monitor
 * @param {Object} option message option
 * @param {String} option.text message text
 * @param {Number} option.duration message duration time, default is 1500
 * @param {Function} option.onClose onClose callback
 */
export function showLoadingMessage({
  text,
  duration = 1500,
  onClose = () => {},
}) {
  if (isFunction(messagePromptAssist.showLoadingMessage)) {
    checkMessagePromptData({ text });

    messagePromptAssist.showLoadingMessage({ text, duration, onClose });
  }
}

/**
 * Show simple text info message with display monitor
 * @param {String} text simple text message
 */
export function showSimpleInfoMessage(text) {
  showInfoMessage({ text: text });
}

/**
 * Show info message with display monitor
 * @param {Object} option message option
 * @param {String} option.text message text
 * @param {Number} option.duration message duration time, default is 1500
 * @param {Function} option.onClose onClose callback
 */
export function showInfoMessage({ text, duration = 1500, onClose = () => {} }) {
  if (isFunction(messagePromptAssist.showInfoMessage)) {
    checkMessagePromptData({ text });

    messagePromptAssist.showInfoMessage({ text, duration, onClose });
  }
}

/**
 * Show simple text success message with display monitor
 * @param {String} text simple text message
 */
export function showSimpleSuccessMessage(text) {
  showSuccessMessage({ text: text });
}

/**
 * Show success message with display monitor
 * @param {Object} option message option
 * @param {String} option.text message text
 * @param {Number} option.duration message duration time, default is 1500
 * @param {Function} option.onClose onClose callback
 */
export function showSuccessMessage({
  text,
  duration = 1500,
  onClose = () => {},
}) {
  if (isFunction(messagePromptAssist.showSuccessMessage)) {
    checkMessagePromptData({ text });

    messagePromptAssist.showSuccessMessage({ text, duration, onClose });
  }
}

/**
 * Show simple text warn message with display monitor
 * @param {String} text simple text message
 */
export function showSimpleWarnMessage(text) {
  showWarnMessage({ text: text });
}

/**
 * Show warn message with display monitor
 * @param {Object} option message option
 * @param {String} option.text message text
 * @param {Number} option.duration message duration time, default is 1500
 * @param {Function} option.onClose onClose callback
 */
export function showWarnMessage({ text, duration = 1500, onClose = () => {} }) {
  if (isFunction(messagePromptAssist.showWarnMessage)) {
    checkMessagePromptData({ text });

    messagePromptAssist.showWarnMessage({ text, duration, onClose });
  }
}

/**
 * Show simple text warning message with display monitor
 * @param {String} text simple text message
 */
export function showSimpleWarningMessage(text) {
  showWarningMessage({ text: text });
}

/**
 * Show warning message with display monitor
 * @param {Object} option message option
 * @param {String} option.text message text
 * @param {Number} option.duration message duration time, default is 1500
 * @param {Function} option.onClose onClose callback
 */
export function showWarningMessage({
  text,
  duration = 1500,
  onClose = () => {},
}) {
  if (isFunction(messagePromptAssist.showWarningMessage)) {
    checkMessagePromptData({ text });

    messagePromptAssist.showWarningMessage({ text, duration, onClose });
  }
}

/**
 * Show simple text error message with display monitor
 * @param {String} text simple text message
 */
export function showSimpleErrorMessage(text) {
  showErrorMessage({ text: text });
}

/**
 * Show error message with display monitor
 * @param {Object} option message option
 * @param {String} option.text message text
 * @param {Number} option.duration message duration time, default is 1500
 * @param {Function} option.onClose onClose callback
 */
export function showErrorMessage({
  text,
  duration = 1500,
  onClose = () => {},
}) {
  if (isFunction(messagePromptAssist.showErrorMessage)) {
    checkMessagePromptData({ text });

    messagePromptAssist.showErrorMessage({ text, duration, onClose });
  }
}

/**
 * Show simple runtime error message with display monitor
 * @param {String} text simple text message
 */
export function showSimpleRuntimeError(text) {
  showRuntimeError({ text: text });
}

/**
 * Show runtime error
 */
export function showRuntimeError({ text }) {
  if (checkStringIsNullOrWhiteSpace(text || '')) {
    return;
  }

  if (messagePromptAssist.setErrorMessageDisplayMonitorComplete) {
    showErrorMessage({
      text,
    });
  }

  logException({
    text,
  });
}
