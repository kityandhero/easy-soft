import { setCache } from './cacheAssist';
import {
  checkInCollection,
  checkStringIsNullOrWhiteSpace,
  isBoolean,
  isFunction,
  isNumber,
  isObject,
  isString,
  isUndefined,
} from './checkAssist';
import { requestMethod, requestMode } from './constants';
import { toBoolean, toLower, toNumber, toUpper } from './convertAssist';
import { modulePackageName } from './definition';
import { trim } from './lodashTools';
import {
  logDebug,
  logDevelop,
  logError,
  logTrace,
  logWarn,
} from './loggerAssist';
import {
  showSimpleErrorMessage,
  showSimpleInfoMessage,
  showSimpleRuntimeError,
  showSimpleWarningMessage,
  showSimpleWarnMessage,
} from './messagePromptAssist';
import { buildPromptModuleInfo } from './promptAssist';
import { buildQueryStringify } from './queryString';
import {
  getLastRequestExceptionMessage,
  setLastRequestExceptionMessage,
} from './runtimeAssist';
import { getToken } from './tokenAssist';

/**
 * Module Name.
 * @private
 */
const moduleName = 'requestAssist';

/**
 * Simulation Configuration
 */
export const requestConfiguration = {
  successCodeSetComplete: false,
  authenticationFailCodeSetComplete: false,
  successCode: 200,
  authenticationFailCode: 2001,
  promptSimulation: false,
  promptSimulationSetComplete: false,
  urlGlobalPrefix: '',
  displayRequestInfo: false,
  displayRequestInfoSetComplete: false,
  handleSupplementGlobalHeader: () => {
    return {};
  },
  handleSupplementGlobalHeaderSetComplete: false,
  handleRequest: ({
    // eslint-disable-next-line no-unused-vars
    url,
    // eslint-disable-next-line no-unused-vars
    method = requestMethod.post,
    // eslint-disable-next-line no-unused-vars
    data = {},
    // eslint-disable-next-line no-unused-vars
    header = [],
    // eslint-disable-next-line no-unused-vars
    option = {},
  }) => {},
  handleRequestSetComplete: false,
  handleAuthenticationFail: () => {},
  handleAuthenticationFailSetComplete: false,
};

function buildPromptModuleInfoText(text) {
  return buildPromptModuleInfo(modulePackageName, text, moduleName);
}

/**
 * Set request success code
 * @param {number} code success code
 */
export function setSuccessCode(code) {
  if (requestConfiguration.successCodeSetComplete) {
    logDevelop(
      'setSuccessCode',
      'reset is not allowed, it can be set only once',
    );

    return;
  }

  if (isNumber(code)) {
    logDevelop('setSuccessCode', toNumber(code));
  } else {
    logDevelop('setSuccessCode', 'parameter must be number');
  }

  requestConfiguration.successCode = toNumber(code);
  requestConfiguration.successCodeSetComplete = true;
}

/**
 * Set request authentication fail code
 * @param {number} code authentication fail code
 */
export function setAuthenticationFailCode(code) {
  if (requestConfiguration.authenticationFailCodeSetComplete) {
    logDevelop(
      'setAuthenticationFailCode',
      'reset is not allowed, it can be set only once',
    );

    return;
  }

  if (isNumber(code)) {
    logDevelop('setAuthenticationFailCode', toNumber(code));
  } else {
    logDevelop('setAuthenticationFailCode', 'parameter must be number');
  }

  requestConfiguration.authenticationFailCode = toNumber(code);
  requestConfiguration.authenticationFailCodeSetComplete = true;
}

/**
 * Set prompt simulative request
 * @param {boolean} value whether prompt simulative request
 */
export function setPromptSimulation(value) {
  if (requestConfiguration.promptSimulationSetComplete) {
    logDevelop(
      'setPromptSimulation',
      'reset is not allowed, it can be set only once',
    );

    return;
  }

  if (isBoolean(value)) {
    logDevelop('setPromptSimulation', toBoolean(value));
  } else {
    logDevelop('setPromptSimulation', 'parameter must be bool');
  }

  requestConfiguration.promptSimulation = toBoolean(value);
  requestConfiguration.promptSimulationSetComplete = true;
}

/**
 * Set the url global prefix
 * @param {string} globalPrefix url global prefix, eg "V1" like api version
 */
export function setUrlGlobalPrefix(globalPrefix) {
  if (!isString(globalPrefix)) {
    throw new Error(
      buildPromptModuleInfoText(
        `setUrlGlobalPrefix param globalPrefix need string, current is ${typeof globalPrefix}`,
      ),
    );
  }

  requestConfiguration.urlGlobalPrefix = globalPrefix;
}

/**
 * Set the real request handler
 * @param {Function} handler handle real request
 */
export function setRequestHandler(handler) {
  if (requestConfiguration.handleRequestSetComplete) {
    logDevelop(
      'setRequestHandler',
      'reset is not allowed, it can be set only once',
    );

    return;
  }

  if (isFunction(handler)) {
    logDevelop('setRequestHandler', typeof handler);
  } else {
    logDevelop('setRequestHandler', 'parameter must be function');
  }

  requestConfiguration.handleRequest = handler;
  requestConfiguration.handleRequestSetComplete = true;
}

/**
 * Set the authentication fail handler
 * @param {Function} handler handle authentication fail
 */
export function setAuthenticationFailHandler(handler) {
  if (requestConfiguration.handleAuthenticationFailSetComplete) {
    logDevelop(
      'setAuthenticationFailHandler',
      'reset is not allowed, it can be set only once',
    );

    return;
  }

  if (isFunction(handler)) {
    logDevelop('setAuthenticationFailHandler', typeof handler);
  } else {
    logDevelop('setAuthenticationFailHandler', 'parameter must be function');
  }

  requestConfiguration.handleAuthenticationFail = handler;
  requestConfiguration.handleAuthenticationFailSetComplete = true;
}

/**
 * Set the global header handler supplement
 * @param {Function} handler handle global header handler supplement
 */
export function setGlobalHeaderSupplementHandler(handler) {
  if (requestConfiguration.handleSupplementGlobalHeaderSetComplete) {
    logDevelop(
      'setGlobalHeaderSupplementHandler',
      'reset is not allowed, it can be set only once',
    );

    return;
  }

  if (isFunction(handler)) {
    logDevelop('setGlobalHeaderSupplementHandler', typeof handler);
  } else {
    logDevelop(
      'setGlobalHeaderSupplementHandler',
      'parameter must be function',
    );
  }

  requestConfiguration.handleSupplementGlobalHeader = handler;
  requestConfiguration.handleSupplementGlobalHeaderSetComplete = true;
}

/**
 * Set request info display switch
 * @param {boolean} value display switch
 */
export function setRequestInfoDisplaySwitch(value) {
  if (requestConfiguration.displayRequestInfoSetComplete) {
    logDevelop(
      'setRequestInfoDisplaySwitch',
      'reset is not allowed, it can be set only once',
    );

    return;
  }

  if (isBoolean(value)) {
    logDevelop('setRequestInfoDisplaySwitch', toBoolean(value));
  } else {
    logDevelop('setRequestInfoDisplaySwitch', 'parameter must be boolean');
  }

  requestConfiguration.displayRequestInfo = toBoolean(value);
  requestConfiguration.displayRequestInfoSetComplete = true;
}

/**
 * 错误数据模型
 */
function errorCustomData() {
  return {
    code: -1,
    message: '',
    data: null,
    list: [],
    extra: null,
  };
}

/**
 * 数据异常通知
 * @param {*} d 异常数据
 */
function dataExceptionNotice(d) {
  const { code, message: messageText } = d;
  const c = errorCustomData();

  const lastCustomMessage = getLastRequestExceptionMessage();

  const codeAdjust = toNumber(code);

  if (codeAdjust !== c.code) {
    const currentTime = Date.now();

    if (codeAdjust === requestConfiguration.authenticationFailCode) {
      logDebug(`api call failed, authentication fail`);
    } else {
      logWarn(`api call failed, code: ${codeAdjust}, message: ${messageText}`);

      if (codeAdjust === toNumber(lastCustomMessage.code)) {
        if (currentTime - lastCustomMessage.time > 800) {
          showSimpleErrorMessage(messageText);

          setLastRequestExceptionMessage({
            code: codeAdjust,
            message: messageText,
            time: currentTime,
          });
        }
      } else {
        showSimpleErrorMessage(messageText);

        setLastRequestExceptionMessage({
          code: codeAdjust,
          message: messageText,
          time: currentTime,
        });
      }
    }

    if (codeAdjust === requestConfiguration.authenticationFailCode) {
      handleAuthenticationFail();
    }
  }
}

/**
 * Pretreatment remote object data
 * @param {Object} options request options
 * @param {Object} options.source source object data
 * @param {Function|null} options.pretreatment pretreatment source object data
 * @param {Function|null} options.successCallback success callback handler
 * @param {Function|null} options.failCallback fail callback handler
 */
export function pretreatmentRemoteSingleData({
  source,
  pretreatment = null,
  successCallback = null,
  failCallback = null,
}) {
  const { code, message } = {
    ...errorCustomData(),
    ...source,
  };

  let v = {};

  const codeAdjust = toNumber(code);

  if (codeAdjust === toNumber(requestConfiguration.successCode)) {
    const { data, extra } = source;

    if (isFunction(pretreatment)) {
      v = pretreatment(source);
    }

    v = {
      code: codeAdjust,
      message,
      data: data || {},
      extra: extra || {},
      dataSuccess: true,
    };

    if (isFunction(successCallback)) {
      successCallback(v);
    }
  } else {
    v = {
      code: codeAdjust,
      message: message || '网络异常',
      data: null,
      extra: null,
      dataSuccess: false,
    };

    if (isFunction(failCallback)) {
      failCallback(v);
    }

    dataExceptionNotice(v);
  }

  return v;
}

/**
 * Pretreatment remote list data
 * @param {Object} options handler options
 * @param {Array} options.source source list data
 * @param {Function|null} options.pretreatment pretreatment source list data
 * @param {Function|null} options.itemPretreatment pretreatment source list data item
 * @param {Function|null} options.successCallback success callback handler
 * @param {Function|null} options.failCallback fail callback handler
 */
export function pretreatmentRemoteListData({
  source,
  pretreatment = null,
  itemPretreatment = null,
  successCallback = null,
  failCallback = null,
}) {
  const { code, message } = source || errorCustomData();
  let v = {};

  const codeAdjust = toNumber(code);

  if (codeAdjust === toNumber(requestConfiguration.successCode)) {
    let sourceAdjust = source;

    if (isFunction(pretreatment)) {
      sourceAdjust = pretreatment(source);
    }

    const { list: listData, extra: extraData } = sourceAdjust;
    const list = (listData || []).map((item, index) => {
      let o = item;

      if ((o.key || null) == null) {
        o.key = `list-${index}`;
      }

      if (isFunction(itemPretreatment)) {
        o = itemPretreatment(o);
      }

      return o;
    });

    v = {
      code: codeAdjust,
      message,
      count: (list || []).length,
      list,
      extra: extraData,
      dataSuccess: true,
    };

    if (isFunction(successCallback)) {
      successCallback(v);
    }
  } else {
    v = {
      code: codeAdjust,
      message: message || '网络异常',
      count: 0,
      list: [],
      extra: null,
      dataSuccess: false,
    };

    if (isFunction(failCallback)) {
      failCallback(v);
    }

    dataExceptionNotice(v);
  }

  return v;
}

/**
 * Pretreatment remote page list data
 * @param {Object} options handler options
 * @param {Array} options.source source page list data
 * @param {Function|null} options.pretreatment pretreatment source page list data
 * @param {Function|null} options.itemPretreatment pretreatment source page list data item
 * @param {Function|null} options.successCallback success callback handler
 * @param {Function|null} options.failCallback fail callback handler
 */
export function pretreatmentRemotePageListData({
  source,
  pretreatment = null,
  itemPretreatment = null,
  successCallback = null,
  failCallback = null,
}) {
  const { code, message: messageText } = source || errorCustomData();
  let v = {};

  const codeAdjust = toNumber(code);

  if (codeAdjust === toNumber(requestConfiguration.successCode)) {
    let sourceAdjust = source;

    if (isFunction(pretreatment)) {
      sourceAdjust = pretreatment(source);
    }

    const { list: listData, extra: extraData } = sourceAdjust;
    const { pageNo, total, pageSize } = extraData;
    const list = (listData || []).map((item, index) => {
      let o = item;

      if ((o.key || null) == null) {
        o.key = `${pageNo}-${index}`;
      }

      if (isFunction(itemPretreatment)) {
        o = itemPretreatment(o);
      }

      return o;
    });

    v = {
      code: codeAdjust,
      message: messageText,
      count: (list || []).length,
      list,
      pagination: {
        total: total,
        pageSize: pageSize,
        current: Number.parseInt(pageNo || 1, 10) || 1,
      },
      extra: extraData,
      dataSuccess: true,
    };

    if (isFunction(successCallback)) {
      successCallback(v);
    }
  } else {
    v = {
      code: codeAdjust,
      message: messageText || '网络异常',
      count: 0,
      list: [],
      extra: null,
      pagination: {
        total: 0,
        pageSize: 10,
        current: 1,
      },
      dataSuccess: false,
    };

    if (isFunction(failCallback)) {
      failCallback(v);
    }

    dataExceptionNotice(v);
  }
  return v;
}

/**
 * Pretreatment request parameters
 * @param {Object} parameters the parameters will pretreatment
 * @param {Function} customHandle custom handler
 */
export function pretreatmentRequestParameters(parameters, customHandle) {
  let submitData = { ...parameters };

  if (typeof customHandle === 'function') {
    submitData = customHandle(submitData);
  }

  return submitData;
}

/**
 * handle list data assist
 * @param {Object} state state
 * @param {Object} action action
 * @param {string} namespace model namespace
 */
export function handleListDataAssist(state, action, namespace) {
  const { payload: d, callback, pretreatment, alias, cacheData } = action;

  let v = pretreatmentRemoteListData(d, pretreatment);

  if (isFunction(callback)) {
    v = callback(v);
  }

  let result = null;

  if (isUndefined(alias) || !isString(alias)) {
    return {
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

export function handlePageListDataAssist(state, action, namespace) {
  const { payload: d, callback, pretreatment, alias, cacheData } = action;

  let v = pretreatmentRemotePageListData(d, pretreatment);

  if (isFunction(callback)) {
    v = callback(v);
  }

  let result = null;

  if (isUndefined(alias) || !isString(alias)) {
    return {
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
    const key = `${namespace}_${alias || 'data'}`;

    const cacheResult = setCache({
      key,
      value: v,
    });

    logDevelop(
      `modal ${namespace} cache data, key is ${namespace}_${alias || 'data'}, ${
        cacheResult ? 'cache success' : 'cache fail'
      }.`,
    );
  }

  return result;
}

async function realRequest({
  url,
  method = requestMethod.post,
  data = {},
  header = [],
  option = {},
}) {
  let headerAdjust = header;

  if (
    requestConfiguration.handleSupplementGlobalHeaderSetComplete &&
    isFunction(requestConfiguration.handleSupplementGlobalHeader)
  ) {
    const supplementData = requestConfiguration.handleSupplementGlobalHeader();

    if (isObject(supplementData)) {
      headerAdjust = { ...header, ...supplementData };
    }
  }

  if (!requestConfiguration.handleRequestSetComplete) {
    throw new Error(
      buildPromptModuleInfoText(
        'realRequest -> handleRequest has not set, please use setRequestHandler to set it',
      ),
    );
  }

  return await requestConfiguration.handleRequest({
    url,
    method,
    data,
    header: headerAdjust,
    option,
  });
}

export function handleAuthenticationFail() {
  if (!requestConfiguration.handleAuthenticationFailSetComplete) {
    throw new Error(
      buildPromptModuleInfo(
        'handleAuthenticationFail -> handleAuthenticationFail has not set, please use setAuthenticationFailHandler to set it',
      ),
    );
  }

  requestConfiguration.handleAuthenticationFail();
}

/**
 * Begin request（remote request / local simulate requests）
 * @param {Object} option request option
 * @param {string} option.api request address
 * @param {Object} option.params request params
 * @param {Object} option.header request header
 * @param {string} option.method "GET"/"POST"/"PUT"/"DELETE", default is requestMethod.post
 * @param {string} option.mode request mode, default is requestMode.real
 * @param {boolean} option.promptSimulation whether display simulate request message prompt
 * @param {number} option.promptSimulationDelay display simulate request message prompt delay time, default is 500
 * @param {number} option.simulateRequestDelay simulate request delay time, default is 0
 * @param {Object} option.simulativeSuccessResponse simulate request success response
 * @param {Object} option.simulativeFailResponse simulate request fail response
 * @param {boolean} option.simulateRequestResult specifies whether the result is successful, generally used to debug
 * @param {boolean} option.simulativeAuthorize set simulate request whether check token, only check mull or empty, generally used to debug
 */
export async function request({
  api,
  urlParams: urlParameters = null,
  params: parameters = {},
  header = {},
  method = requestMethod.post,
  mode = requestMode.real,
  promptSimulation = requestConfiguration.promptSimulation,
  promptSimulationDelay = 500,
  simulateRequestDelay = 0,
  simulativeSuccessResponse = {},
  simulativeFailResponse = {
    code: 1001,
    message: '虚拟未知错误',
  },
  simulateRequestResult = true,
  simulativeAuthorize = false,
}) {
  let globalPrefix = requestConfiguration.urlGlobalPrefix;

  if (!isString(globalPrefix)) {
    logWarn(globalPrefix, `error globalPrefix`);

    throw new Error('url global prefix is not string');
  }

  if (!isString(api)) {
    logWarn(api, `error api`);

    throw new Error('api is not string');
  }

  let url = api;

  if (
    toLower(url).startsWith('http://') ||
    toLower(url).startsWith('https://')
  ) {
    url = api;
  } else {
    if (!checkStringIsNullOrWhiteSpace(globalPrefix)) {
      globalPrefix = `/${globalPrefix}/`;
    }

    url = `${globalPrefix}${api}`.replace('//', '/');
  }

  if ((urlParameters || null) != null) {
    if (isString(urlParameters)) {
      url = `${url}?${urlParameters}`;
    }

    if (isObject(urlParameters)) {
      url = `${url}?${buildQueryStringify(urlParameters)}`;
    }
  }

  const showRequestInfo = requestConfiguration.displayRequestInfo;

  if (mode === requestMode.simulation) {
    logTrace(
      `api request is simulation mode, simulate start,${
        simulateRequestDelay > 0 ? ` delay ${simulateRequestDelay}ms,` : ''
      } api is "${api}".`,
    );

    if (promptSimulation) {
      setTimeout(
        () => {
          const text = '由虚拟访问返回';

          showSimpleInfoMessage(text);
        },
        promptSimulationDelay > 0 ? promptSimulationDelay : 0,
      );
    }

    let result = {};
    let verifyToken = false;

    if (simulativeAuthorize) {
      const token = getToken();

      if (!checkStringIsNullOrWhiteSpace(token)) {
        verifyToken = true;
      }
    }

    if (simulativeAuthorize && !verifyToken) {
      handleAuthenticationFail();
    } else {
      result = await simulateRequest({
        api: api,
        simulateRequestDelay,
        dataBuild: (resolve) => {
          if (simulateRequestResult) {
            resolve(
              buildSimulateRequestSuccessResponse({
                response: simulativeSuccessResponse,
                needAuthorize: simulativeAuthorize,
              }),
            );
          } else {
            resolve(
              buildSimulateRequestFailResponse({
                response: simulativeFailResponse,
                needAuthorize: simulativeAuthorize,
              }),
            );
          }
        },
      });
    }

    if (showRequestInfo) {
      logTrace(
        {
          mode,
          api,
          apiVersion: globalPrefix,
          response: result,
          params: parameters,
        },
        `request address: "${url}"`,
      );
    }

    return result;
  }

  if (showRequestInfo) {
    logTrace(
      {
        mode,
        api,
        apiVersion: globalPrefix,
        params: parameters,
      },
      `request address: "${url}"`,
    );
  }

  const methodAdjust = trim(toUpper(method));

  if (
    checkInCollection([requestMethod.get, requestMethod.post], methodAdjust)
  ) {
    return await realRequest({
      url,
      data: parameters,
      header: {
        ...header,
      },
      option: {},
      method: requestMethod.post,
    });
  }

  throw new Error(`unsupported method:${method}`);
}

/**
 * 封装模拟的登录验证
 *
 */
function hasToken() {
  const token = getToken();
  return checkStringIsNullOrWhiteSpace(token);
}

/**
 * 封装模拟的错误返回
 */
export function buildSimulateRequestFailResponse({
  response,
  code,
  message,
  needAuthorize = true,
}) {
  if (needAuthorize) {
    if (hasToken()) {
      showSimpleRuntimeError(message);

      return {
        code,
        message,
        success: false,
        ...response,
      };
    }

    return {
      code: requestConfiguration.authenticationFailCode,
      message: '登录失效, 请重新登录',
      success: false,
    };
  }

  showSimpleRuntimeError(message);

  return {
    code,
    message,
    success: false,
    ...response,
  };
}

/**
 * 封装模拟的正确返回
 */
export function buildSimulateRequestSuccessResponse({
  response,
  needAuthorize = true,
}) {
  if (needAuthorize) {
    if (hasToken()) {
      return {
        code: requestConfiguration.successCode,
        message: 'success',
        success: true,
        ...response,
      };
    }

    return {
      code: requestConfiguration.authenticationFailCode,
      message: '登录失效, 请重新登录',
      success: false,
    };
  }

  return {
    code: requestConfiguration.successCode,
    message: 'success',
    success: true,
    ...response,
  };
}

/**
 * 封装正确的虚拟访问
 */
export async function simulateSuccessRequest({
  remoteResponse,
  needAuthorize = true,
}) {
  let result = {};

  await new Promise((resolve) => {
    setTimeout(() => {
      resolve(
        buildSimulateRequestSuccessResponse({
          remoteResponse,
          needAuthorize,
        }),
      );
    }, 300);
  })
    .then((data) => {
      result = data;

      return data;
    })
    .catch((error) => {
      logError(error);
    });

  const { code } = result;

  if (code === requestConfiguration.authenticationFailCode) {
    handleAuthenticationFail();
  }

  return result;
}

/**
 * 封装失败的虚拟访问
 */
export async function simulateFailRequest({
  remoteResponse,
  needAuthorize = true,
}) {
  let result = {};

  await new Promise((resolve) => {
    setTimeout(() => {
      resolve(buildSimulateRequestFailResponse(remoteResponse, needAuthorize));
    }, 300);
  })
    .then((data) => {
      result = data;

      return data;
    })
    .catch((error) => {
      logError(error);
    });

  const { code, message: messageText } = result;

  if (code === requestConfiguration.authenticationFailCode) {
    handleAuthenticationFail();
  } else if (code !== requestConfiguration.successCode) {
    showSimpleWarnMessage(messageText);
  }

  return result;
}

/**
 * 封装模拟访问
 */
export async function simulateRequest({
  api = '',
  simulateRequestDelay = 200,
  dataBuild,
}) {
  let result = {};

  await new Promise((resolve) => {
    if (isFunction(dataBuild)) {
      setTimeout(
        () => {
          dataBuild(resolve);
        },
        simulateRequestDelay > 0 ? simulateRequestDelay : 0,
      );
    }
  })
    .then((data) => {
      logTrace(`api request simulate completed`, `"${api}"`);

      result = data;

      return data;
    })
    .catch((error) => {
      logError(error);
    });

  const { code, message: messageText } = result;

  if (code !== requestConfiguration.successCode) {
    showSimpleWarningMessage(messageText);
  }

  return result;
}
