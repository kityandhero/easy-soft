import { isArray, isObject } from './checkAssist';
import { modulePackageName } from './definition';
import { displayTextMessage, logColorCollection } from './loggerAssist';
import { showSimpleErrorMessage } from './messagePromptAssist';
import { checkWhetherDevelopmentEnvironment } from './meta';
import { buildPromptModuleInfo } from './promptAssist';
import { getRuntimeDataStorage } from './runtimeAssist';

/**
 * Module Name.
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

  configs.forEach((o) => {
    if (!isObject(o)) {
      return;
    }

    config = {
      ...config,
      ...o,
    };
  });

  return config;
}

/**
 * Set application initial config
 * @param {Number} config application initial config
 */
export function setApplicationInitialConfig(config) {
  if (checkWhetherDevelopmentEnvironment()) {
    displayTextMessage({
      text: 'setInitialConfig',
      color: logColorCollection.execute,
      dataDescription: 'execute',
      ancillaryInformation: '',
    });
  }

  if (!isObject(config)) {
    const text = 'setInitialConfig -> config must be object';

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
    const text =
      'setApplicationExternalConfigList -> reset is not allowed, it can be set only once';

    if (checkWhetherDevelopmentEnvironment()) {
      displayTextMessage({
        text: buildPromptModuleInfoText(text),
        color: logColorCollection.warn,
        dataDescription: 'warn',
        ancillaryInformation: '',
      });
    }

    showSimpleErrorMessage(text);

    return;
  }

  if (checkWhetherDevelopmentEnvironment()) {
    displayTextMessage({
      text: 'setApplicationExternalConfigList',
      color: logColorCollection.execute,
      dataDescription: 'execute',
      ancillaryInformation: '',
    });
  }

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
 * @returns
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
    if (checkWhetherDevelopmentEnvironment()) {
      displayTextMessage({
        text: buildPromptModuleInfoText('merge application configuration'),
        color: logColorCollection.debug,
        dataDescription: 'debug',
        ancillaryInformation: '',
      });
    }

    runtimeDataStorage.applicationMergeConfig = mergeConfig(
      getApplicationInitialConfig(),
      runtimeDataStorage.externalConfigList,
    );

    runtimeDataStorage.applicationConfigMergeComplete = true;
  }

  return runtimeDataStorage.applicationMergeConfig || {};
}
