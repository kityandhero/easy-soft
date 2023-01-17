import {
  isString,
  isUndefined,
  logDebug,
  logError,
  logExecute,
  setCache,
} from 'easy-soft-utility';

import { connect, create, Provider } from '../dva-core';
import { createLoading } from '../dva-loading';

import { buildPromptModuleInfo } from './packagePrompt';
import { getDefaultCode } from './stateAssist';

/**
 * Module Name.
 */
const moduleName = 'dvaAssist';

let app;
let store;
let dispatch;
let registered;

export function createApp(opt) {
  logExecute(buildPromptModuleInfo(moduleName, 'createApp'));

  app = create(opt);
  app.use(createLoading({}));

  if (!registered) {
    opt.models.forEach((model) => app.model(model));
  }

  registered = true;

  app.start();

  store = app._store;

  app.getStore = () => store;

  app.use({
    onError(err) {
      logError(err);
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
  const {
    payload: v,
    alias,
    cacheData: cacheData,
  } = {
    ...{
      callback: null,
      pretreatment: null,
      alias: null,
      cacheData: false,
    },
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

export const reducerDefaultParams = {
  cacheData: false,
};

export const handleDefaultParams = {
  callback: null,
  pretreatment: null,
};

export { connect, Provider };

export function getDispatchWrapper() {
  return app.dispatch;
}
