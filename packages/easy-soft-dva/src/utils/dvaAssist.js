import {
  buildPromptModuleInfo,
  checkInCollection,
  checkObjectIsNullOrEmpty,
  getModelCollection,
  getModelNameList,
  isArray,
  isObject,
  logDebug,
  logDevelop,
  logException,
  mergeTextMessage,
  promptTextBuilder,
  tryDoDvaPrepareWork,
} from 'easy-soft-utility';

import { create, Provider } from '../dva-core';
import { createLoading } from '../dva-loading';

import { modulePackageName } from './definition';

function buildPromptModuleInfoText(text, ancillaryInformation = '') {
  return buildPromptModuleInfo(
    modulePackageName,
    mergeTextMessage(text, ancillaryInformation),
    moduleName,
  );
}

/**
 * Module Name.
 * @private
 */
const moduleName = 'dvaAssist';

/**
 * Application Assist
 */
export const applicationAssist = {
  application: null,
  initialOption: {
    initialState: {},
    models: [],
  },
  initialOptionSetComplete: false,
  applicationInitializeComplete: false,
};

/**
 * Set application external config list
 * @param {Object|Array} configs application initial config list
 */
export function setApplicationInitialOption(o = {}) {
  if (applicationAssist.initialOptionSetComplete) {
    logDevelop(
      buildPromptModuleInfoText('setApplicationInitialOption'),
      'reset is not allowed, it can be set only once',
    );

    return;
  }

  if (!isObject(o)) {
    throw new Error(
      buildPromptModuleInfoText(
        'setApplicationInitialOption',
        promptTextBuilder.buildMustObject({}),
      ),
    );
  }

  const optionAdjust = o || {};

  if (checkObjectIsNullOrEmpty(optionAdjust)) {
    logDevelop('application initial option', 'empty');
  } else {
    logDevelop(optionAdjust, 'application initial option');
  }

  optionAdjust.models = isArray(optionAdjust.models)
    ? [...optionAdjust.models, ...getModelCollection()]
    : getModelCollection();

  applicationAssist.initialOption = optionAdjust;

  applicationAssist.initialOptionSetComplete = true;
}

/**
 * Initialize application
 */
export function initializeApplication() {
  if (!applicationAssist.initialOptionSetComplete) {
    throw new Error(
      buildPromptModuleInfoText(
        'initializeApplication',
        'please exec setApplicationInitialOption to set application initial option',
      ),
    );
  }

  if (
    applicationAssist.application != null &&
    applicationAssist.applicationInitializeComplete
  ) {
    return;
  }

  tryDoDvaPrepareWork();

  applicationAssist.application = create(applicationAssist.initialOption);
  applicationAssist.application.use(createLoading({}));

  const { models = [] } = {
    models: [],
    ...applicationAssist.initialOption,
  };

  for (const model of models) applicationAssist.application.model(model);

  applicationAssist.application.start();

  logDevelop(
    buildPromptModuleInfoText(
      'initializeApplication',
      'dva app start complete',
    ),
  );

  applicationAssist.application.getStore = () =>
    applicationAssist.application._store;

  applicationAssist.application.use({
    onError(error) {
      logException(error);
    },
  });

  applicationAssist.application.dispatch =
    applicationAssist.application._store.dispatch;

  applicationAssist.applicationInitializeComplete = true;
}

function checkApplication() {
  if (!applicationAssist.applicationInitializeComplete) {
    throw new Error(
      buildPromptModuleInfoText(
        'getStore',
        'please exec initializeApplication to start application before get store',
      ),
    );
  }
}

export function getDvaApplication() {
  checkApplication();

  return applicationAssist.application;
}

/**
 * Get store
 */
export function getStore() {
  checkApplication();

  return applicationAssist.application._store;
}

/**
 * Get dispatch
 */
export function getDispatch() {
  checkApplication();

  return applicationAssist.application.dispatch;
}

/**
 * Dispatch model effect with payload and alias
 * @param {Object} option dispatch option
 * @param {String} option.type type
 * @param {Object} option.payload payload params
 * @param {String} option.alias data mount to state with alias key
 */
export function dispatch({ type, payload = {}, alias = 'data' }) {
  if (checkObjectIsNullOrEmpty(type)) {
    throw new Error(
      buildPromptModuleInfoText(
        'dispatch',
        'parameter type must be string and not allow empty',
      ),
    );
  }

  const list = type.split('/');

  if (list.length != 2) {
    throw new Error(
      buildPromptModuleInfoText(
        'dispatch',
        'parameter type must be like "modelName/effect"',
      ),
    );
  }

  const modelName = list[0];

  const modelNameList = getModelNameList();

  if (!checkInCollection(modelNameList.split(','), modelName)) {
    throw new Error(
      buildPromptModuleInfoText(
        'dispatch',
        `model ${modelName} do not exist, current models is "${modelNameList}"`,
      ),
    );
  }

  const dispatchModel = getDispatch();

  logDebug(`model access: ${type}`);

  return dispatchModel({ type, payload, alias });
}

/**
 * Dispatch model effect with payload and alias
 * @param {Object} option dispatch option
 * @param {String} option.model model name
 * @param {String} option.effect model effect name
 * @param {Object} option.payload payload params
 * @param {String} option.alias data mount to state with alias key
 */
export function dispatchModel({ model, effect, payload = {}, alias = 'data' }) {
  if (checkObjectIsNullOrEmpty(model)) {
    throw new Error(
      buildPromptModuleInfoText(
        'dispatch',
        'parameter model must be string and not allow empty',
      ),
    );
  }

  if (checkObjectIsNullOrEmpty(effect)) {
    throw new Error(
      buildPromptModuleInfoText(
        'dispatch',
        'parameter effect must be string and not allow empty',
      ),
    );
  }

  const type = `${model}/${effect}`;

  return dispatch({ type, payload, alias });
}

/**
 * Get all models
 */
export function getAllModel() {
  const app = getDvaApplication();

  return app._models;
}

/**
 * Get the special model
 * @param {String} name model name
 */
export function getModel(name) {
  const models = getAllModel();

  const list = models.filter((o) => o.namespace === name);

  if (list.length > 0) {
    return list[0];
  }

  throw new Error(
    `${name} not in dva models, current models is ${models
      .map((o) => o.namespace)
      .join(',')}`,
  );
}

/**
 * Get the special model state
 * @param {String} name model name
 */
export function getModelState(name) {
  const m = getModel(name);

  return m.state;
}

/**
 * Get the special model state date, eg "model.state.data" value
 * @param {String} name model name
 */
export function getModelRemoteData(name) {
  const { data } = {
    data: {},
    ...getModelState(name),
  };

  return data || {};
}

export { connect, Provider } from '../dva-core';

/**
 * Encapsulation dva Provider with store
 * @param {Object} properties properties
 */
const ApplicationProvider = (properties) => (
  <Provider store={getStore()}>{properties.children}</Provider>
);

export { ApplicationProvider };
