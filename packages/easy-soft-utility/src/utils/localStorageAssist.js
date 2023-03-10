import { checkStringIsNullOrWhiteSpace } from './checkAssist';
import { modulePackageName } from './definition';
import { logException } from './loggerAssist';
import { buildPromptModuleInfo } from './promptAssist';

/**
 * Module Name.
 * @private
 */
const moduleName = 'localStorageAssist';

/**
 * Prompt Assist
 */
export const localStorageAssist = {
  // eslint-disable-next-line no-unused-vars
  getStorage: (key) => {
    logException(
      buildPromptModuleInfo(
        modulePackageName,
        'localStorageGetter need config, use setLocalStorageGetter to set it',
        moduleName,
      ),
    );
  },
  // eslint-disable-next-line no-unused-vars
  setStorage: (key, value) => {
    logException(
      buildPromptModuleInfo(
        modulePackageName,
        'localStorageSetter need config, use setLocalStorageSetter to set it',
        moduleName,
      ),
    );
  },
  // eslint-disable-next-line no-unused-vars
  removeStorage: (key) => {
    logException(
      buildPromptModuleInfo(
        modulePackageName,
        'localStorageRemover need config, use setLocalStorageRemover to set it',
        moduleName,
      ),
    );
  },
  flushStorage: () => {
    logException(
      buildPromptModuleInfo(
        modulePackageName,
        'localStorageFlusher need config, use setLocalStorageFlusher to set it',
        moduleName,
      ),
    );
  },
};

/**
 * Set local storage getter
 */
export function setLocalStorageGetter(handler) {
  localStorageAssist.getStorage = handler;
}

/**
 * Set local storage setter
 */
export function setLocalStorageSetter(handler) {
  localStorageAssist.setStorage = handler;
}

/**
 * Set local storage remover
 */
export function setLocalStorageRemover(handler) {
  localStorageAssist.removeStorage = handler;
}

/**
 * Set local storage remover
 */
export function setLocalStorageFlusher(handler) {
  localStorageAssist.flushStorage = handler;
}

/**
 * Get text to local storage with key
 */
export function getStringFromLocalStorage(key) {
  try {
    const result = localStorageAssist.getStorage(key);

    return result;
  } catch (error_) {
    logException({
      key,
      e: error_,
    });

    throw error_;
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
