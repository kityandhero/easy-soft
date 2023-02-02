import { isObject } from './checkAssist';
import { modulePackageName } from './definition';
import { displayTextMessage, logColorCollection } from './loggerAssist';
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
  initialConfigSetComplete: false,
  handleMergeConfiguration: (config) => {
    return config;
  },
  handleMergeConfigurationSetComplete: false,
};

function buildPromptModuleInfoText(text) {
  return buildPromptModuleInfo(modulePackageName, text, moduleName);
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
    displayTextMessage({
      text: buildPromptModuleInfo(
        modulePackageName,
        'setInitialConfig -> config must be object',
        moduleName,
      ),
      color: logColorCollection.warn,
      dataDescription: 'warn',
      ancillaryInformation: '',
    });
  }

  const runtimeDataStorage = getRuntimeDataStorage();

  runtimeDataStorage.applicationInitialConfig = config;

  applicationConfiguration.initialConfigSetComplete = true;
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
 * Set the application merge handler
 * @param {Function} handler handle authentication merge
 */
export function setConfigurationMergeHandler(handler) {
  if (applicationConfiguration.handleMergeConfigurationSetComplete) {
    displayTextMessage({
      text: buildPromptModuleInfoText(
        'setRequestHandler -> reset is not allowed, it can be set only once',
      ),
      color: logColorCollection.warn,
      dataDescription: 'warn',
      ancillaryInformation: '',
    });

    return;
  }

  applicationConfiguration.handleMergeConfiguration = handler;

  applicationConfiguration.handleMergeConfigurationSetComplete = true;
}

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

    runtimeDataStorage.applicationMergeConfig =
      applicationConfiguration.handleMergeConfiguration(
        getApplicationInitialConfig(),
      );

    runtimeDataStorage.applicationConfigMergeComplete = true;
  }

  return runtimeDataStorage.applicationMergeConfig || {};
}
