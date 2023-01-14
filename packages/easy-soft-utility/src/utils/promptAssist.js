import { checkStringIsNullOrWhiteSpace, isFunction } from './checkAssist';
import { toString } from './convertAssist';
import { logError } from './loggerAssist';

export const promptAssist = {
  // eslint-disable-next-line no-unused-vars
  showErrorMessage: ({ message }) => {},
  // eslint-disable-next-line no-unused-vars
  showWarnMessage: ({ message }) => {},
};

export function showWarnMessage({ message }) {
  if (isFunction(promptAssist.showWarnMessage)) {
    promptAssist.showWarnMessage({ message });
  }
}

export function showErrorMessage({ message }) {
  if (isFunction(promptAssist.showErrorMessage)) {
    promptAssist.showErrorMessage({ message });
  }
}

export function showRuntimeError({ message: messageText, showStack = true }) {
  try {
    if (!checkStringIsNullOrWhiteSpace(messageText || '')) {
      showErrorMessage({
        message: messageText,
      });

      logError({
        message: messageText,
      });
    }

    if (showStack) {
      throw new Error(
        `${
          checkStringIsNullOrWhiteSpace(messageText || '')
            ? ''
            : `${toString(messageText)}, `
        }call stack:`,
      );
    }
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e.stack);
  }
}
