import { checkStringIsNullOrWhiteSpace } from './checkAssist';
import { modulePackageName } from './definition';
import { logDevelop, logException } from './loggerAssist';
import { stringifyJson } from './meta';
import { buildPromptModuleInfo } from './promptAssist';
import { mergeTextMessage } from './tools';

/**
 * Module Name.
 * @private
 */
const moduleName = 'localStorageAssist';

function buildPromptModuleInfoText(text, ancillaryInformation = '') {
  return buildPromptModuleInfo(
    modulePackageName,
    mergeTextMessage(text, ancillaryInformation),
    moduleName,
  );
}

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
 * @param {Function} handler the cache getter handler
 */
export function setLocalStorageGetter(handler) {
  logDevelop(
    buildPromptModuleInfoText('setLocalStorageGetter'),
    typeof handler,
  );

  localStorageAssist.getStorage = handler;
}

/**
 * Set local storage setter
 * @param {Function} handler the cache setter handler
 */
export function setLocalStorageSetter(handler) {
  logDevelop(
    buildPromptModuleInfoText('setLocalStorageSetter'),
    typeof handler,
  );

  localStorageAssist.setStorage = handler;
}

/**
 * Set local storage remover
 * @param {Function} handler the cache remover handler
 */
export function setLocalStorageRemover(handler) {
  logDevelop(
    buildPromptModuleInfoText('setLocalStorageRemover'),
    typeof handler,
  );

  localStorageAssist.removeStorage = handler;
}

/**
 * Set local storage remover
 * @param {Function} handler the cache flusher handler
 */
export function setLocalStorageFlusher(handler) {
  logDevelop(
    buildPromptModuleInfoText('setLocalStorageFlusher'),
    typeof handler,
  );

  localStorageAssist.flushStorage = handler;
}

/**
 * Get text to local storage with key
 * @param {string} key the cache key
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
 * @param {string} key the cache key
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
 * @param {string} key the cache key
 * @param {string} text the data will cache
 */
export function saveStringToLocalStorage(key, text) {
  localStorageAssist.setStorage(key, text);
}

/**
 * Save json to local storage with key
 * @param {string} key the cache key
 * @param {Object} json the data will cache
 */
export function saveJsonToLocalStorage(key, json) {
  localStorageAssist.setStorage(key, stringifyJson(json || {}));
}

/**
 * Remove local storage by key
 * @param {string} key the cache key
 */
export function removeLocalStorage(key) {
  localStorageAssist.removeStorage(key);
}

/**
 * Flush local storage
 */
export function flushLocalStorage() {
  localStorageAssist.flushStorage();
}
