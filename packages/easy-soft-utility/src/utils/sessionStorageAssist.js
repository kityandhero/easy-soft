import { checkStringIsNullOrWhiteSpace } from './checkAssist';
import { modulePackageName } from './definition';
import { logException } from './loggerAssist';
import { buildPromptModuleInfo } from './promptAssist';

/**
 * Module Name.
 * @private
 */
const moduleName = 'sessionStorageAssist';

/**
 * Prompt Assist
 */
export const sessionStorageAssist = {
  // eslint-disable-next-line no-unused-vars
  getStorage: (key) => {
    logException(
      buildPromptModuleInfo(
        modulePackageName,
        'sessionStorageGetter need config, use setSessionStorageGetter to set it',
        moduleName,
      ),
    );
  },
  // eslint-disable-next-line no-unused-vars
  setStorage: (key, value) => {
    logException(
      buildPromptModuleInfo(
        modulePackageName,
        'sessionStorageSetter need config, use setSessionStorageSetter to set it',
        moduleName,
      ),
    );
  },
  // eslint-disable-next-line no-unused-vars
  removeStorage: (key) => {
    logException(
      buildPromptModuleInfo(
        modulePackageName,
        'sessionStorageRemover need config, use setSessionStorageRemover to set it',
        moduleName,
      ),
    );
  },
  flushStorage: () => {
    logException(
      buildPromptModuleInfo(
        modulePackageName,
        'sessionStorageFlusher need config, use setSessionStorageFlusher to set it',
        moduleName,
      ),
    );
  },
};

/**
 * Set session storage getter
 */
export function setSessionStorageGetter(handler) {
  sessionStorageAssist.getStorage = handler;
}

/**
 * Set session storage setter
 */
export function setSessionStorageSetter(handler) {
  sessionStorageAssist.setStorage = handler;
}

/**
 * Set session storage remover
 */
export function setSessionStorageRemover(handler) {
  sessionStorageAssist.removeStorage = handler;
}

/**
 * Set session storage remover
 */
export function setSessionStorageFlusher(handler) {
  sessionStorageAssist.flushStorage = handler;
}

/**
 * Get text to session storage with key
 */
export function getStringFromSessionStorage(key) {
  try {
    const result = sessionStorageAssist.getStorage(key);

    return result;
  } catch (error) {
    logException({
      key,
      e: error,
    });

    throw error;
  }
}

/**
 * Get json to session storage with key
 */
export function getJsonFromSessionStorage(key) {
  const jsonString = getStringFromSessionStorage(key);

  if (!checkStringIsNullOrWhiteSpace(jsonString)) {
    return JSON.parse(jsonString || '{}');
  }

  return null;
}

/**
 * Save text to session storage with key
 */
export function saveStringToSessionStorage(key, text) {
  sessionStorageAssist.setStorage(key, text);
}

/**
 * Save json to session storage with key
 */
export function saveJsonToSessionStorage(key, json) {
  sessionStorageAssist.setStorage(key, JSON.stringify(json || {}));
}

/**
 * Remove session storage by key
 */
export function removeSessionStorage(key) {
  sessionStorageAssist.removeStorage(key);
}

/**
 * Flush session storage
 * @export
 * @param {*} key
 */
export function flushSessionStorage() {
  sessionStorageAssist.flushStorage();
}
