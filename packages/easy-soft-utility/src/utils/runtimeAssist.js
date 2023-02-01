import nodeCache from 'node-cache';

import { isNull, isObject } from './checkAssist';
import { modulePackageName } from './definition';
import {
  displayTextMessage,
  logColorCollection,
  logDebug,
} from './loggerAssist';
import { checkWhetherDevelopmentEnvironment } from './meta';
import { buildPromptModuleInfo } from './promptAssist';

/**
 * Module Name.
 */
const moduleName = 'runtimeAssist';

/**
 * Cache Mount Target.
 */
export const runtimeConfiguration = {
  runtimeDataStorage: null,
  runtimeDataStorageSetComplete: false,
};

function initRuntimeDataStorage(runtimeDataStorage) {
  if ((runtimeDataStorage || null) == null) {
    throw new Error('runtimeDataStorage has not set complete');
  }

  runtimeDataStorage.localRuntimeCache = new nodeCache();
  runtimeDataStorage.applicationInitialConfig = {};
  runtimeDataStorage.applicationConfigMergeComplete = false;
  runtimeDataStorage.applicationMergeConfig = {};
  runtimeDataStorage.lastRequestExceptionMessage = {
    code: -1,
    message: '',
    time: new Date().getTime(),
  };
}

/**
 * Set cache mount target.
 */
export function setRuntimeDataStorage(mountTarget) {
  if (checkWhetherDevelopmentEnvironment()) {
    displayTextMessage({
      text: 'setDataStorage',
      color: logColorCollection.execute,
      dataDescription: 'execute',
      ancillaryInformation: '',
    });
  }

  if (!isObject(mountTarget)) {
    logDebug(mountTarget);

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
        'runtimeDataStorage has not set,use setDataStorage to set it',
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
      time: new Date().getTime(),
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
