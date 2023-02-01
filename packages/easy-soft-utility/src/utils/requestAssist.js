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
  displayTextMessage,
  logColorCollection,
  logDebug,
  logError,
  logObject,
  logText,
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
import { checkWhetherDevelopmentEnvironment } from './meta';
import { buildPromptModuleInfo } from './promptAssist';
import { buildQueryStringify } from './queryString';
import {
  getLastRequestExceptionMessage,
  setLastRequestExceptionMessage,
} from './runtimeAssist';
import { getToken } from './tokenAssist';

/**
 * Module Name.
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
  }) => {
    logDebug('handleRequest do nothing');
  },
  handleAuthenticationFail: () => {
    logDebug('handleAuthenticationFail do nothing');
  },
};

/**
 * Set request success code
 * @param {Number} code success code
 */
export function setSuccessCode(code) {
  if (checkWhetherDevelopmentEnvironment()) {
    displayTextMessage({
      text: 'setSuccessCode',
      color: logColorCollection.execute,
      dataDescription: 'execute',
      ancillaryInformation: '',
    });
  }

  if (!isNumber(code)) {
    logWarn(
      buildPromptModuleInfo(
        modulePackageName,
        'setSuccessCode -> code must be number',
        moduleName,
      ),
    );
  }

  requestConfiguration.successCode = toNumber(code);

  requestConfiguration.successCodeSetComplete = true;
}

/**
 * Set request authentication fail code
 * @param {Number} code authentication fail code
 */
export function setAuthenticationFailCode(code) {
  if (checkWhetherDevelopmentEnvironment()) {
    displayTextMessage({
      text: 'setAuthenticationFailCode',
      color: logColorCollection.execute,
      dataDescription: 'execute',
      ancillaryInformation: '',
    });
  }

  if (!isNumber(code)) {
    logWarn(
      buildPromptModuleInfo(
        modulePackageName,
        'setAuthenticationFailCode -> code must be number',
        moduleName,
      ),
    );
  }

  requestConfiguration.authenticationFailCode = toNumber(code);

  requestConfiguration.authenticationFailCodeSetComplete = true;
}

/**
 * Set prompt simulative request
 * @param {Boolean} value whether prompt simulative request
 */
export function setPromptSimulation(value) {
  if (checkWhetherDevelopmentEnvironment()) {
    displayTextMessage({
      text: 'setPromptSimulation',
      color: logColorCollection.execute,
      dataDescription: 'execute',
      ancillaryInformation: '',
    });
  }

  if (!isBoolean(value)) {
    logWarn(
      buildPromptModuleInfo(
        modulePackageName,
        'setPromptSimulation -> code must be bool',
        moduleName,
      ),
    );
  }

  requestConfiguration.promptSimulation = toBoolean(value);

  requestConfiguration.promptSimulationSetComplete = true;
}

/**
 * Set the url global prefix
 * @param {String} globalPrefix url global prefix, eg "V1" like api version
 */
export function setUrlGlobalPrefix(globalPrefix) {
  if (!isString(globalPrefix)) {
    throw new Error(
      buildPromptModuleInfo(
        modulePackageName,
        `setUrlGlobalPrefix param globalPrefix need string, current is ${typeof globalPrefix}`,
        moduleName,
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
  requestConfiguration.handleRequest = handler;
}

/**
 * Set the authentication fail handler
 * @param {Function} handler handle authentication fail
 */
export function setAuthenticationFailHandler(handler) {
  requestConfiguration.handleAuthenticationFail = handler;
}

/**
 * Set the global header handler supplement
 * @param {Function} handler handle global header handler supplement
 */
export function setGlobalHeaderSupplementHandler(handler) {
  requestConfiguration.handleSupplementGlobalHeader = handler;
}

/**
 * Set request info display switch
 * @param {Boolean} value display switch
 */
export function setRequestInfoDisplaySwitch(value) {
  if (checkWhetherDevelopmentEnvironment()) {
    displayTextMessage({
      text: 'setRequestInfoDisplaySwitch',
      color: logColorCollection.execute,
      dataDescription: 'execute',
      ancillaryInformation: '',
    });
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
    const currentTime = new Date().getTime();

    if (codeAdjust !== requestConfiguration.authenticationFailCode) {
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
    } else {
      logDebug(`api call failed, authentication fail`);
    }

    if (codeAdjust === requestConfiguration.authenticationFailCode) {
      requestConfiguration.handleAuthenticationFail();
    }
  }
}

/**
 * 预处理单项数据返回
 *
 * @export
 * @param {*} source 源数据
 * @param {*} pretreatment 源数据预处理
 * @param {*} successCallback 请求成功后的可回调函数
 * @param {*} failCallback 请求失败后的可回调函数
 * @returns
 */
export function pretreatmentRemoteSingleData({
  source,
  pretreatment = null,
  successCallback = null,
  failCallback = null,
}) {
  const { code, message } = source || errorCustomData();
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
 * 预处理集合数据返回
 *
 * @export
 * @param {*} source
 * @param {*} pretreatment 源数据预处理
 * @param {*} itemPretreatment 源数据项预处理
 * @param {*} successCallback 请求成功后的可回调函数
 * @param {*} failCallback 请求失败后的可回调函数
 * @returns
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
 * 预处理分页数据返回
 *
 * @export
 * @param {*} source
 * @param {*} pretreatment 源数据预处理
 * @param {*} itemPretreatment 源数据项预处理
 * @param {*} successCallback 请求成功后的可回调函数
 * @param {*} failCallback 请求失败后的可回调函数
 * @returns
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
    const { pageNo } = extraData;
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
        total: extraData.total,
        pageSize: extraData.pageSize,
        current: parseInt(pageNo || 1, 10) || 1,
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
 * 预处理数据请求
 *
 * @export
 * @param {*} d
 * @returns
 */
export function pretreatmentRequestParams(params, customHandle) {
  let submitData = params || {};

  if (typeof customHandle === 'function') {
    submitData = customHandle(submitData);
  }

  return submitData;
}

/**
 * handleListDataAssist
 * @param {*} state
 * @param {*} action
 * @param {*} pretreatment
 * @param {*} callback
 * @returns
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

function realRequest(
  url,
  method = requestMethod.post,
  data = {},
  header = [],
  option = {},
) {
  let headerAdjust = header;

  if (isFunction(requestConfiguration.handleSupplementGlobalHeader)) {
    const supplementData = requestConfiguration.handleSupplementGlobalHeader();

    if (isObject(supplementData)) {
      headerAdjust = { ...header, ...supplementData };
    }
  }

  requestConfiguration.handleRequest({
    url,
    method,
    data,
    header: headerAdjust,
    option,
  });
}

/**
 * Begin request（remote request / local simulate requests）
 * @param {Object} option request option
 * @param {string} option.api request address
 * @param {Object} option.params request params
 * @param {Object} option.header request header
 * @param {String} option.method "GET"/"POST"/"PUT"/"DELETE", default is requestMethod.post
 * @param {String} option.mode request mode, default is requestMode.real
 * @param {Boolean} option.promptSimulation whether display simulate request message prompt
 * @param {Object} option.simulativeSuccessResponse simulate request success response
 * @param {Object} option.simulativeFailResponse simulate request fail response
 * @param {Boolean} option.simulateRequestResult specifies whether the result is successful, generally used to debug
 * @param {Boolean} option.simulativeAuthorize set simulate request whether check token, only check mull or empty, generally used to debug
 */
export async function request({
  api,
  urlParams = null,
  params = {},
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
    logText(globalPrefix);

    throw new Error('apiVersion is not string');
  }

  if (!isString(api)) {
    logText(api);

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

  if ((urlParams || null) != null) {
    if (isString(urlParams)) {
      url = `${url}?${urlParams}`;
    }

    if (isObject(urlParams)) {
      url = `${url}?${buildQueryStringify(urlParams)}`;
    }
  }

  const showRequestInfo = requestConfiguration.displayRequestInfo;

  if (mode === requestMode.real) {
    logTrace(
      `api request is virtual: simulation start,${
        simulateRequestDelay > 0 ? ` delay ${simulateRequestDelay}ms,` : ''
      } api is ${api}.`,
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
      requestConfiguration.handleAuthenticationFail();
    } else {
      result = await simulateRequest({
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
      logObject({
        url,
        mode,
        response: result,
        params,
      });
    }

    return result;
  }

  if (showRequestInfo) {
    logObject({
      api,
      apiVersion: globalPrefix,
      apiChange: url,
      params,
    });
  }

  const methodAdjust = trim(toUpper(method));

  if (
    checkInCollection([requestMethod.get, requestMethod.post], methodAdjust)
  ) {
    return realRequest({
      url,
      data: params,
      header: {
        ...(header || {}),
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
 * @returns
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
    .catch((res) => {
      logError(res);
    });

  const { code } = result;

  if (code === requestConfiguration.authenticationFailCode) {
    requestConfiguration.handleAuthenticationFail();
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
    .catch((res) => {
      logError(res);
    });

  const { code, message: messageText } = result;

  if (code === requestConfiguration.authenticationFailCode) {
    requestConfiguration.handleAuthenticationFail();
  } else if (code !== requestConfiguration.successCode) {
    showSimpleWarnMessage(messageText);
  }

  return result;
}

/**
 * 封装模拟访问
 */
export async function simulateRequest({
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
      logTrace(`api request is virtual: simulation completed.`);

      result = data;

      return data;
    })
    .catch((res) => {
      logError(res);
    });

  const { code, message: messageText } = result;

  if (code !== requestConfiguration.successCode) {
    showSimpleWarningMessage(messageText);
  }

  return result;
}
