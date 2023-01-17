import { checkStringIsNullOrWhiteSpace } from './checkAssist';
import { logError } from './loggerAssist';
import { buildPromptModuleInfo } from './packagePrompt';

/**
 * Module Name
 */
const moduleName = 'localStorageAssist';

/**
 * Prompt Assist
 */
export const localStorageAssist = {
  // eslint-disable-next-line no-unused-vars
  getStorage: (key) => {
    logError(
      `${buildPromptModuleInfo(
        moduleName,
      )}setStorageGetter need config, use setStorageGetter to set it`,
    );
  },
  // eslint-disable-next-line no-unused-vars
  setStorage: (key, value) => {
    logError(
      `${buildPromptModuleInfo(
        moduleName,
      )}setStorageSetter need config, use setStorageSetter to set it`,
    );
  },
  // eslint-disable-next-line no-unused-vars
  removeStorage: (key) => {
    logError(
      `${buildPromptModuleInfo(
        moduleName,
      )}setStorageRemover need config, use setStorageRemover to set it`,
    );
  },
  // eslint-disable-next-line no-unused-vars
  removeStorage: (key) => {
    logError(
      `${buildPromptModuleInfo(
        moduleName,
      )}setStorageRemover need config, use setStorageRemover to set it`,
    );
  },
  flushStorage: () => {
    logError(
      `${buildPromptModuleInfo(
        moduleName,
      )}setStorageFlusher need config, use setStorageFlusher to set it`,
    );
  },
};

/**
 * Set local storage getter
 */
export function setStorageGetter(handler) {
  localStorageAssist.getStorage = handler;
}

/**
 * Set local storage setter
 */
export function setStorageSetter(handler) {
  localStorageAssist.setStorage = handler;
}

/**
 * Set local storage remover
 */
export function setStorageRemover(handler) {
  localStorageAssist.removeStorage = handler;
}

/**
 * Set local storage remover
 */
export function setStorageFlusher(handler) {
  localStorageAssist.flushStorage = handler;
}

/**
 * Get text to local storage with key
 */
export function getStringFromLocalStorage(key) {
  try {
    const result = localStorageAssist.getStorage(key);

    return result;
  } catch (e) {
    logError({
      key,
      e,
    });

    throw e;
  }
}

/**
 * Get json to local storage with key
 */
export function getJsonFromLocalStorage(key) {
  const jsonString = getStringFromLocalStorage(key);

  if (!checkStringIsNullOrWhiteSpace(jsonString)) {
    return JSON.parse(jsonString || '{}');
  }

  return null;
}

/**
 * Save text to local storage with key
 */
export function saveStringToLocalStorage(key, text) {
  localStorageAssist.setStorage(key, text);
}

/**
 * Save json to local storage with key
 */
export function saveJsonToLocalStorage(key, json) {
  localStorageAssist.setStorage(key, JSON.stringify(json || {}));
}

/**
 * Remove local storage by key
 */
export function removeLocalStorage(key) {
  localStorageAssist.removeStorage(key);
}

/**
 * Flush local storage
 * @export
 * @param {*} key
 */
export function flushLocalStorage() {
  localStorageAssist.flushStorage();
}
