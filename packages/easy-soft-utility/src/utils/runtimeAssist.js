import nodeCache from 'node-cache';

import { isNull, isObject } from './checkAssist';
import { modulePackageName } from './definition';
import { logDevelop } from './loggerAssist';
import { buildPromptModuleInfo } from './promptAssist';

/**
 * Module Name.
 * @private
 */
const moduleName = 'runtimeAssist';

/**
 * Cache Mount Target.
 */
export const runtimeConfiguration = {
  runtimeDataStorage: null,
  runtimeDataStorageSetComplete: false,
};

function buildPromptModuleInfoText(text) {
  return buildPromptModuleInfo(modulePackageName, text, moduleName);
}

function initRuntimeDataStorage(runtimeDataStorage) {
  if ((runtimeDataStorage || null) == null) {
    throw new Error('runtimeDataStorage has not set complete');
  }

  runtimeDataStorage.localRuntimeCache = new nodeCache();
  runtimeDataStorage.applicationInitialConfig = {};
  runtimeDataStorage.externalConfigList = [];
  runtimeDataStorage.applicationConfigMergeComplete = false;
  runtimeDataStorage.applicationMergeConfig = {};
  runtimeDataStorage.lastRequestExceptionMessage = {
    code: -1,
    message: '',
    time: Date.now(),
  };
}

/**
 * Set cache mount target.
 */
export function setRuntimeDataStorage(mountTarget) {
  if (isObject(mountTarget)) {
    logDevelop(buildPromptModuleInfoText('setDataStorage'), typeof mountTarget);
  } else {
    logDevelop(
      buildPromptModuleInfoText('setDataStorage'),
      'parameter must be object',
    );

    throw new Error(
      buildPromptModuleInfo(
        modulePackageName,
        `setDataStorage -> data storage mount target must be a object, current type is ${typeof target}`,
        moduleName,
      ),
    );
  }

  mountTarget.runtimeDataStorage = {};

  runtimeConfiguration.runtimeDataStorage = mountTarget.runtimeDataStorage;

  runtimeConfiguration.runtimeDataStorageSetComplete = true;

  initRuntimeDataStorage(runtimeConfiguration.runtimeDataStorage);
}

export function getRuntimeDataStorage() {
  if (
    isNull(runtimeConfiguration.runtimeDataStorage) ||
    !runtimeConfiguration.runtimeDataStorageSetComplete
  ) {
    throw new Error(
      buildPromptModuleInfo(
        modulePackageName,
        'runtimeDataStorage has not set,use setRuntimeDataStorage to set it',
        moduleName,
      ),
    );
  }

  return runtimeConfiguration.runtimeDataStorage;
}

export function getLastRequestExceptionMessage() {
  return (
    runtimeConfiguration.runtimeDataStorage.lastRequestExceptionMessage || {
      code: -1,
      message: '',
      time: Date.now(),
    }
  );
}

export function setLastRequestExceptionMessage({ code, message, time }) {
  runtimeConfiguration.runtimeDataStorage.lastRequestExceptionMessage = {
    code,
    message,
    time,
  };
}
