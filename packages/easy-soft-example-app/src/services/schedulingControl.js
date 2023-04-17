import {
  addMinute,
  checkStringIsNullOrWhiteSpace,
  datetimeFormat,
  formatDatetime,
  getGuid,
  getNow,
  logDebug,
  request,
  requestMode,
  stringifyJson,
} from 'easy-soft-utility';

export async function getWeatherData(parameters) {
  const weatherApi = '';

  if (checkStringIsNullOrWhiteSpace(weatherApi)) {
    throw new Error('weatherApi is null, please check it in app config');
  }

  return request({
    api: weatherApi,
    urlParams: parameters,
    method: 'GET',
  });
}

export async function refreshSessionData(parameters) {
  const { code } = parameters;

  const simulation = {
    sessionId: getGuid(),
    code: code || '',
  };

  logDebug(
    `refreshSessionData simulation session data: ${stringifyJson(simulation)}`,
  );

  return request({
    api: `/schedulingControl/refreshSession`,
    params: parameters,
    mode: requestMode.simulation,
    simulativeAuthorize: false,
    simulativeSuccessResponse: {
      data: simulation,
      list: [],
      extra: {},
    },
  });
}

export async function checkTicketValidityData(parameters) {
  const simulation = {
    needRefresh: true,
    nextCheckLoginUnixTime: Math.round(addMinute(getNow(), 30) / 1000),
  };

  logDebug(
    `checkTicketValidityData simulation ticket validity data: ${stringifyJson(
      simulation,
    )}`,
  );

  return request({
    api: `/schedulingControl/checkTicketValidity`,
    params: parameters,
    mode: requestMode.simulation,
    simulativeAuthorize: false,
    simulativeSuccessResponse: {
      data: simulation,
      list: [],
      extra: {},
    },
  });
}

export async function exchangePhoneData(parameters) {
  const simulation = {
    key: getGuid(),
  };

  logDebug(
    `exchangePhoneData simulation phone key data: ${stringifyJson(simulation)}`,
  );

  return request({
    api: `/schedulingControl/exchangePhone`,
    params: parameters,
    mode: requestMode.simulation,
    simulativeAuthorize: false,
    simulativeSuccessResponse: {
      data: simulation,
      list: [],
      extra: {},
    },
  });
}

export async function signInSilentData(parameters) {
  const simulation = {};

  logDebug(
    `signInSilentData simulation sign in silent data: ${stringifyJson(
      simulation,
    )}`,
  );

  return request({
    api: `/schedulingControl/signInSilent`,
    params: parameters,
    mode: requestMode.simulation,
    simulativeAuthorize: false,
    simulativeSuccessResponse: {
      data: simulation,
      list: [],
      extra: {},
    },
  });
}

export async function registerWithWeChatData(parameters) {
  const simulation = {};

  logDebug(
    `registerWithWeChatData simulation sign in silent data: ${stringifyJson(
      simulation,
    )}`,
  );

  return request({
    api: `/schedulingControl/registerWithWeChat`,
    params: parameters,
    mode: requestMode.simulation,
    simulativeAuthorize: false,
    simulativeSuccessResponse: {
      data: simulation,
      list: [],
      extra: {},
    },
  });
}

export async function registerData(parameters) {
  const simulation = {};

  logDebug(
    `registerData simulation sign in silent data: ${stringifyJson(simulation)}`,
  );

  return request({
    api: `/schedulingControl/register`,
    params: parameters,
    mode: requestMode.simulation,
    simulativeAuthorize: false,
    simulativeSuccessResponse: {
      data: simulation,
      list: [],
      extra: {},
    },
  });
}

export async function getMetaDataData(parameters) {
  const simulation = {
    time: formatDatetime(getNow(), datetimeFormat.monthDayHourMinuteSecond),
  };

  logDebug(
    `getMetaDataData simulation meta data silent data: ${stringifyJson(
      simulation,
    )}`,
  );

  return request({
    api: `/schedulingControl/getMetaData`,
    params: parameters,
    mode: requestMode.simulation,
    simulativeAuthorize: false,
    simulativeSuccessResponse: {
      data: simulation,
      list: [],
      extra: {},
    },
  });
}

export async function getCustomerData(parameters) {
  const simulation = {};

  logDebug(
    `getCustomerData simulation customer silent data: ${stringifyJson(
      simulation,
    )}`,
  );

  return request({
    api: `/schedulingControl/getCustomer`,
    params: parameters,
    mode: requestMode.simulation,
    simulativeAuthorize: false,
    simulativeSuccessResponse: {
      data: simulation,
      list: [],
      extra: {},
    },
  });
}

export async function getAdministrativeDivisionFullData(parameters) {
  const simulation = [];

  logDebug(
    `getAdministrativeDivisionFullData simulation administrative division full data silent data: ${stringifyJson(
      simulation,
    )}`,
  );

  return request({
    api: `/schedulingControl/getAdministrativeDivisionFullData`,
    params: parameters,
    mode: requestMode.simulation,
    simulativeAuthorize: false,
    simulativeSuccessResponse: {
      data: {},
      list: simulation,
      extra: {},
    },
  });
}
