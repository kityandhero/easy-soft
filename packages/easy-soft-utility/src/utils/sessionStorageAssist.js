import { checkStringIsNullOrWhiteSpace } from './checkAssist';
import { modulePackageName } from './definition';
import { logException, mergeTextMessage } from './loggerAssist';
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
  getStorage: (key) => {
    logException(
      buildPromptModuleInfo(
        modulePackageName,
        mergeTextMessage(
          'sessionStorageGetter need config, use setSessionStorageGetter to set it',
          `key ${key}`,
        ),
        moduleName,
      ),
    );
  },
  setStorage: (key, value) => {
    logException(
      buildPromptModuleInfo(
        modulePackageName,
        mergeTextMessage(
          'sessionStorageSetter need config, use setSessionStorageSetter to set it',
          `key ${key}, value type ${typeof value}`,
        ),
        moduleName,
      ),
    );
  },
  removeStorage: (key) => {
    logException(
      buildPromptModuleInfo(
        modulePackageName,
        mergeTextMessage(
          'sessionStorageRemover need config, use setSessionStorageRemover to set it',
          `key ${key}`,
        ),
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
 * @param {Function} handler the cache getter handler
 */
export function setSessionStorageGetter(handler) {
  sessionStorageAssist.getStorage = handler;
}

/**
 * Set session storage setter
 * @param {Function} handler the cache setter handler
 */
export function setSessionStorageSetter(handler) {
  sessionStorageAssist.setStorage = handler;
}

/**
 * Set session storage remover
 * @param {Function} handler the cache remover handler
 */
export function setSessionStorageRemover(handler) {
  sessionStorageAssist.removeStorage = handler;
}

/**
 * Set session storage remover
 * @param {Function} handler the cache flusher handler
 */
export function setSessionStorageFlusher(handler) {
  sessionStorageAssist.flushStorage = handler;
}

/**
 * Get text to session storage with key
 * @param {string} key the cache key
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
 * @param {string} key the cache key
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
 * @param {string} key the cache key
 * @param {string} text the test will be cached
 */
export function saveStringToSessionStorage(key, text) {
  sessionStorageAssist.setStorage(key, text);
}

/**
 * Save json to session storage with key
 * @param {string} key the cache key
 * @param {Object} data the data will be cached
 */
export function saveJsonToSessionStorage(key, data) {
  sessionStorageAssist.setStorage(key, JSON.stringify(data || {}));
}

/**
 * Remove session storage by key
 * @param {string} key the cache key
 */
export function removeSessionStorage(key) {
  sessionStorageAssist.removeStorage(key);
}

/**
 * Flush session storage
 */
export function flushSessionStorage() {
  sessionStorageAssist.flushStorage();
}
