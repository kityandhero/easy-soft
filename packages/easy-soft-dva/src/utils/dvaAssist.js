import {
  buildPromptModuleInfo,
  getModelCollection,
  isArray,
  isObject,
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

  logDevelop(o, 'application initial option');

  o.models = isArray(o.models)
    ? [...o.models, ...getModelCollection()]
    : getModelCollection();

  applicationAssist.initialOption = o;

  applicationAssist.initialOptionSetComplete = true;
}

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

export function getStore() {
  if (!applicationAssist.applicationInitializeComplete) {
    throw new Error(
      buildPromptModuleInfoText(
        'getStore',
        'please exec initializeApplication to start application before get store',
      ),
    );
  }

  return applicationAssist.application._store;
}

export function getDispatch() {
  return applicationAssist.application.dispatch;
}

export { connect, Provider } from '../dva-core';

const ApplicationProvider = (properties) => (
  <Provider store={getStore()}>{properties.children}</Provider>
);

export { ApplicationProvider };
