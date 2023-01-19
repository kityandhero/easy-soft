import { checkStringIsNullOrWhiteSpace, isFunction } from './checkAssist';
import { toString } from './convertAssist';
import { modulePackageName } from './definition';
import { logError, logInfo, logWarn } from './loggerAssist';
import { buildPromptModuleInfo } from './promptAssist';

/**
 * Module Name.
 */
const moduleName = 'loggerAssist';

export function checkMessagePromptData({ text }) {
  if (checkStringIsNullOrWhiteSpace(text || null)) {
    logWarn(
      buildPromptModuleInfo(
        modulePackageName,
        'checkMessagePromptData option text disallow empty',
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
    logInfo({ text });
  },
  // eslint-disable-next-line no-unused-vars
  showInfoMessage: ({ text, duration = 1500, onClose = () => {} }) => {
    logInfo({ text });
  },
  // eslint-disable-next-line no-unused-vars
  showSuccessMessage: ({ text, duration = 1500, onClose = () => {} }) => {
    logInfo({ text });
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
};

/**
 * Set the open message display monitor
 */
export function setOpenMessageDisplayMonitor(callbackMonitor) {
  messagePromptAssist.showOpenMessage = callbackMonitor;
}

/**
 * Set the info message display monitor
 */
export function setInfoMessageDisplayMonitor(callbackMonitor) {
  messagePromptAssist.showInfoMessage = callbackMonitor;
}

/**
 * Set the warn message display monitor
 */
export function setSuccessMessageDisplayMonitor(callbackMonitor) {
  messagePromptAssist.showSuccessMessage = callbackMonitor;
}

/**
 * Set the warn message display monitor
 */
export function setWarnMessageDisplayMonitor(callbackMonitor) {
  messagePromptAssist.showWarnMessage = callbackMonitor;
}

/**
 * Set the warning message display monitor
 */
export function setWarningMessageDisplayMonitor(callbackMonitor) {
  messagePromptAssist.showWarningMessage = callbackMonitor;
}

/**
 * Set the error message display monitor
 */
export function setErrorMessageDisplayMonitor(callbackMonitor) {
  messagePromptAssist.showErrorMessage = callbackMonitor;
}

/**
 * Show open message with display monitor
 */
export function showOpenMessage({ text, duration = 1500, onClose = () => {} }) {
  if (isFunction(messagePromptAssist.showOpenMessage)) {
    checkMessagePromptData({ text });

    messagePromptAssist.showOpenMessage({ text, duration, onClose });
  }
}

/**
 * Show info message with display monitor
 */
export function showInfoMessage({ text, duration = 1500, onClose = () => {} }) {
  if (isFunction(messagePromptAssist.showInfoMessage)) {
    checkMessagePromptData({ text });

    messagePromptAssist.showInfoMessage({ text, duration, onClose });
  }
}

/**
 * Show success message with display monitor
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
 * Show warn message with display monitor
 */
export function showWarnMessage({ text, duration = 1500, onClose = () => {} }) {
  if (isFunction(messagePromptAssist.showWarnMessage)) {
    checkMessagePromptData({ text });

    messagePromptAssist.showWarnMessage({ text, duration, onClose });
  }
}

/**
 * Show warning message with display monitor
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
 * Show error message with display monitor
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

export function showError(text) {
  showErrorMessage({
    text,
  });
}

/**
 * Show runtime error
 */
export function showRuntimeError({ text, showStack = true }) {
  try {
    if (!checkStringIsNullOrWhiteSpace(text || '')) {
      showErrorMessage({
        text,
      });

      logError({
        text,
      });
    }

    if (showStack) {
      throw new Error(
        `${
          checkStringIsNullOrWhiteSpace(text || '') ? '' : `${toString(text)}, `
        }call stack:`,
      );
    }
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e.stack);
  }
}
