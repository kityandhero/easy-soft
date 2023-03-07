import { setCache } from './cacheAssist';
import { isFunction, isString, isUndefined } from './checkAssist';
import { modulePackageName } from './definition';
import {
  displayTextMessage,
  logColorCollection,
  logDevelop,
} from './loggerAssist';
import { checkWhetherDevelopmentEnvironment } from './meta';
import { buildPromptModuleInfo } from './promptAssist';

/**
 * Module Name.
 * @private
 */
const moduleName = 'dvaAssist';

/**
 * Logger Switch.
 */
export const preparationWork = {
  prepareCallback: () => {},
  setPrepareComplete: false,
  prepareExecuteComplete: false,
};

export function tryDoDvaPrepareWork() {
  if (preparationWork.prepareExecuteComplete) {
    return;
  }

  logDevelop(
    buildPromptModuleInfo(modulePackageName, 'tryDoDvaPrepareWork', moduleName),
    'try to do dva prepare work',
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

export const reducerNameCollection = {
  reducerData: 'reducerData',
};

export function reducerDataAssist(state, action, namespace) {
  tryDoDvaPrepareWork();

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

    if (checkWhetherDevelopmentEnvironment()) {
      displayTextMessage({
        text: `modal ${namespace} cache data, key is ${namespace}_${
          alias || 'data'
        }, ${cacheResult ? 'cache success' : 'cache fail'}.`,
        color: logColorCollection.debug,
        dataDescription: 'debug',
        ancillaryInformation: '',
      });
    }
  }

  return result;
}

export const reducerCollection = {
  reducerData(state, action, namespace) {
    return reducerDataAssist(state, action, namespace);
  },
};

/**
 * get tacitly state, it is for state initialization.
 */
export function getTacitlyState() {
  tryDoDvaPrepareWork();

  return {
    data: {
      code: 0,
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
