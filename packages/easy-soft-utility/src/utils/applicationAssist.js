import { isArray, isObject } from './checkAssist';
import { modulePackageName } from './definition';
import {
  displayTextMessage,
  logColorCollection,
  logDevelop,
} from './loggerAssist';
import { showSimpleErrorMessage } from './messagePromptAssist';
import { checkWhetherDevelopmentEnvironment } from './meta';
import { buildPromptModuleInfo } from './promptAssist';
import { getRuntimeDataStorage } from './runtimeAssist';
import { mergeTextMessage } from './tools';

/**
 * Module Name.
 * @private
 */
const moduleName = 'applicationAssist';

/**
 * Simulation Configuration
 */
export const applicationConfiguration = {
  externalConfigListSetComplete: false,
  initialConfigSetComplete: false,
};

function buildPromptModuleInfoText(text) {
  return buildPromptModuleInfo(modulePackageName, text, moduleName);
}

function mergeConfig(initialConfig, configs) {
  if (!isArray(configs)) {
    return initialConfig;
  }

  let config = { ...initialConfig };

  for (const o of configs) {
    if (!isObject(o)) {
      continue;
    }

    config = {
      ...config,
      ...o,
    };
  }

  return config;
}

/**
 * Set application initial config
 * @param {number} config application initial config
 */
export function setApplicationInitialConfig(config) {
  logDevelop(
    buildPromptModuleInfoText('setApplicationInitialConfig'),
    typeof config,
  );

  if (!isObject(config)) {
    const text = 'setApplicationInitialConfig -> config must be object';

    if (checkWhetherDevelopmentEnvironment()) {
      displayTextMessage({
        text: buildPromptModuleInfo(modulePackageName, text, moduleName),
        color: logColorCollection.warn,
        dataDescription: 'warn',
        ancillaryInformation: '',
      });
    }

    showSimpleErrorMessage(text);
  }

  const runtimeDataStorage = getRuntimeDataStorage();

  runtimeDataStorage.applicationInitialConfig = config;

  applicationConfiguration.initialConfigSetComplete = true;
}

/**
 * Set application external config list
 * @param {Object|Array} configs application initial config list
 */
export function setApplicationExternalConfigList(configs) {
  if (applicationConfiguration.externalConfigListSetComplete) {
    logDevelop(
      buildPromptModuleInfoText('setApplicationExternalConfigList'),
      'reset is not allowed, it can be set only once',
    );

    showSimpleErrorMessage(
      mergeTextMessage(
        'setApplicationExternalConfigList',
        'reset is not allowed, it can be set only once',
      ),
    );

    return;
  }

  logDevelop(
    buildPromptModuleInfoText('setApplicationExternalConfigList'),
    typeof configs,
  );

  const runtimeDataStorage = getRuntimeDataStorage();

  runtimeDataStorage.externalConfigList = isArray(configs)
    ? configs
    : isObject(configs)
    ? [configs]
    : [];

  applicationConfiguration.externalConfigListSetComplete = true;
}

/**
 * Get application initial config
 */
export function getApplicationInitialConfig() {
  if (!applicationConfiguration.initialConfigSetComplete) {
    throw new Error(
      buildPromptModuleInfo(
        modulePackageName,
        'applicationInitialConfig has not set,use setApplicationInitialConfig to set it',
        moduleName,
      ),
    );
  }

  const runtimeDataStorage = getRuntimeDataStorage();

  return runtimeDataStorage.applicationInitialConfig || {};
}

/**
 * Get application external config list, its will be merged
 */
export function getApplicationExternalConfigList() {
  if (!applicationConfiguration.externalConfigListSetComplete) {
    throw new Error(
      buildPromptModuleInfo(
        modulePackageName,
        'applicationExternalConfigList has not set,use setApplicationExternalConfigList to set it',
        moduleName,
      ),
    );
  }

  const runtimeDataStorage = getRuntimeDataStorage();

  return isArray(runtimeDataStorage.externalConfigList)
    ? runtimeDataStorage.externalConfigList
    : [];
}

/**
 * Get application merged config
 */
export function getApplicationMergeConfig() {
  const runtimeDataStorage = getRuntimeDataStorage();

  if (!runtimeDataStorage.applicationConfigMergeComplete) {
    logDevelop(buildPromptModuleInfoText('merge application configuration'));

    runtimeDataStorage.applicationMergeConfig = mergeConfig(
      getApplicationInitialConfig(),
      runtimeDataStorage.externalConfigList,
    );

    runtimeDataStorage.applicationConfigMergeComplete = true;
  }

  return runtimeDataStorage.applicationMergeConfig || {};
}
