import { setCache } from './cacheAssist';
import {
  isArray,
  isEmptyArray,
  isFunction,
  isObject,
  isString,
  isUndefined,
} from './checkAssist';
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

function analysisNamespace(action) {
  const { type: actionType } = {
    type: '',
    ...action,
  };

  const list = `${actionType}`.split('/');

  if (list.length === 2) {
    return list[0];
  }

  return '';
}

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
  reducerNormalData: 'reducerNormalData',
  reducerRemoteData: 'reducerRemoteData',
  reducerRemoveKey: 'reducerRemoveKey',
};

export function reducerRemoteDataAssist(state, action) {
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
    };
  } else {
    result = {
      ...state,
    };

    result[alias] = v;
  }

  if (cacheData) {
    const namespace = analysisNamespace(action);

    const key = `${namespace}_${alias || 'data'}`;

    const cacheResult = setCache({
      key,
      value: v,
    });

    logDevelop(
      `modal ${namespace} cache data, key is ${namespace}_${alias || 'data'}`,
      cacheResult ? 'cache success' : 'cache fail',
    );
  }

  return result;
}

export function reducerNormalDataAssist(state, action) {
  tryDoDvaPrepareWork();

  const { payload: v } = {
    payload: {},
    ...action,
  };

  let result = {
    ...state,
    ...(isObject(v) ? v : {}),
  };

  return result;
}

export function reducerRemoveKeyAssist(state, action) {
  const { payload: v } = {
    payload: {},
    ...action,
  };

  const result = {
    ...state,
  };

  if (isString(v)) {
    delete result[v];
  }

  if (isArray(v) && !isEmptyArray(v)) {
    for (const o of v) {
      if (isString(o)) {
        delete result[v];
      }
    }
  }

  return result;
}

export const reducerCollection = {
  reducerRemoteData(state, action) {
    return reducerRemoteDataAssist(state, action);
  },
  reducerNormalData(state, action) {
    return reducerNormalDataAssist(state, action);
  },
  reducerRemoveKey(state, action) {
    return reducerRemoveKeyAssist(state, action);
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
