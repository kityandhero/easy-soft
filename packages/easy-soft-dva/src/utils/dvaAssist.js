import {
  buildPromptModuleInfo,
  checkWhetherDevelopmentEnvironment,
  displayTextMessage,
  isFunction,
  isString,
  isUndefined,
  logColorCollection,
  logDebug,
  logException,
  setCache,
} from 'easy-soft-utility';

import { create } from '../dva-core';
import { createLoading } from '../dva-loading';

import { modulePackageName } from './definition';
import { getDefaultCode } from './stateAssist';

/**
 * Module Name.
 * @private
 */
const moduleName = 'dvaAssist';

let app;
let store;
let dispatch;
let registered;

/**
 * Logger Switch.
 */
export const preparationWork = {
  prepareCallback: () => {},
  setPrepareComplete: false,
  prepareExecuteComplete: false,
};

function tryDoPrepare() {
  if (preparationWork.prepareExecuteComplete) {
    return;
  }

  logDebug(
    buildPromptModuleInfo(
      modulePackageName,
      'tryDoPrepare -> try to do dva prepare work',
      moduleName,
    ),
  );

  if (isFunction(preparationWork.prepareCallback)) {
    preparationWork.prepareCallback();
  }

  preparationWork.prepareExecuteComplete = true;
}

/**
 * Set the open message display monitor
 */
export function setPrepareCallback(callback) {
  if (checkWhetherDevelopmentEnvironment()) {
    displayTextMessage({
      text: 'setPrepareCallback',
      color: logColorCollection.execute,
      dataDescription: 'execute',
      ancillaryInformation: '',
    });
  }

  preparationWork.prepareCallback = callback;

  preparationWork.setPrepareComplete = true;
}

export function createApp(opt) {
  tryDoPrepare();

  logDebug(
    buildPromptModuleInfo(
      modulePackageName,
      'createApp -> create a dva app',
      moduleName,
    ),
  );

  app = create(opt);
  app.use(createLoading({}));

  if (!registered) {
    for (const model of opt.models) app.model(model);
  }

  registered = true;

  app.start();

  store = app._store;

  app.getStore = () => store;

  app.use({
    onError(error_) {
      logException(error_);
    },
  });

  dispatch = store.dispatch;

  app.dispatch = dispatch;

  return app;
}

export const reducerNameCollection = {
  reducerData: 'reducerData',
};

export function reducerDataAssist(state, action, namespace) {
  tryDoPrepare();

  const {
    payload: v,
    alias,
    cacheData: cacheData,
  } = {
    callback: null,
    pretreatment: null,
    alias: null,
    cacheData: false,
    ...action,
  };

  let result = null;

  if (isUndefined(alias) || !isString(alias)) {
    result = {
      ...state,
      data: v,
      fromRemote: true,
    };
  } else {
    result = {
      ...state,
      fromRemote: true,
    };

    result[alias] = v;
  }

  if (cacheData) {
    const key = `${namespace}_${alias || 'data'}`;

    const cacheResult = setCache({
      key,
      value: v,
    });

    logDebug(
      `modal ${namespace} cache data, key is ${namespace}_${alias || 'data'}, ${
        cacheResult ? 'cache success' : 'cache fail'
      }.`,
    );
  }

  return result;
}

export const reducerCollection = {
  reducerData(state, action, namespace) {
    return reducerDataAssist(state, action, namespace);
  },
};

export function getStore(models) {
  tryDoPrepare();

  const dvaApp = createApp({
    initialState: {},
    models: models,
  });

  const result = dvaApp.getStore();

  return result;
}

/**
 * get tacitly state, it is for state initialization.
 */
export function getTacitlyState() {
  tryDoPrepare();

  return {
    data: {
      code: getDefaultCode(),
      message: 'success',
      dataSuccess: true,
      data: {},
      list: [],
      extra: {},
    },
  };
}

export const reducerDefaultParameters = {
  cacheData: false,
};

export const handleDefaultParameters = {
  callback: null,
  pretreatment: null,
};

export function getDispatchWrapper() {
  tryDoPrepare();

  return app.dispatch;
}

export { connect, Provider } from '../dva-core';
