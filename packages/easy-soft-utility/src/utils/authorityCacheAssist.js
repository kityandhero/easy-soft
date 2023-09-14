import { getAccessWayCollectionCache } from './accessWayAssist';
import { getLocalAuthorityCollection } from './authorityLocalAssist';
import { getCache, hasCache, setCache } from './cacheAssist';
import {
  checkStringIsNullOrWhiteSpace,
  isArray,
  isEmptyArray,
  isFunction,
  isObject,
  isString,
} from './checkAssist';
import { getValueByKey } from './common';
import { modulePackageName } from './definition';
import {
  logDevelop,
  logError,
  logObject,
  logTrace,
  logWarn,
} from './loggerAssist';
import {
  showSimpleErrorMessage,
  showSimpleWarnMessage,
} from './messagePromptAssist';
import { buildPromptModuleInfo } from './promptAssist';
import { mergeTextMessage } from './tools';

const authorityCollectionCache = 'authorityCollectionCache';
const superPermissionCacheKey = 'hasSuperPermission';

/**
 * Module Name.
 * @private
 */
const moduleName = 'authorityAssist';

function buildPromptModuleInfoText(text, ancillaryInformation = '') {
  return buildPromptModuleInfo(
    modulePackageName,
    mergeTextMessage(text, ancillaryInformation),
    moduleName,
  );
}

/**
 * Authority Assist
 */
export const authorityAssist = {
  // eslint-disable-next-line no-unused-vars
  handleAuthorizationFail: (authority) => {},
  handleAuthorizationFailSetComplete: false,
};

/**
 * Set the authorization fail handler
 * @param {Function} handler handle authority request
 */
export function setAuthorizationFailHandler(handler) {
  if (authorityAssist.handleAuthorizationFailSetComplete) {
    logDevelop(
      'setAuthorizationFailHandler',
      'reset is not allowed, it can be set only once',
    );

    return;
  }

  if (isFunction(handler)) {
    logDevelop('setAuthorizationFailHandler', typeof handler);
  } else {
    logDevelop('setAuthorizationFailHandler', 'parameter must be function');
  }

  authorityAssist.handleAuthorizationFail = handler;
  authorityAssist.handleAuthorizationFailSetComplete = true;
}

function getAllAuthority() {
  let result = [];

  const existCache = hasCache({ key: authorityCollectionCache });

  if (existCache) {
    result = getCache({ key: authorityCollectionCache });

    if (isArray(result)) {
      return result;
    }
  }

  const localAuthorityCollection = getLocalAuthorityCollection();

  result = [...localAuthorityCollection];

  setCache({
    key: authorityCollectionCache,
    value: result,
  });

  return result;
}

function getSuperPermission() {
  let result = '';

  const accessWayCollection = getAccessWayCollectionCache();

  if (!isObject(accessWayCollection)) {
    return result;
  }

  const superPermission = getValueByKey({
    data: accessWayCollection,
    key: 'super',
  });

  if (isObject(superPermission)) {
    const superAuth = getValueByKey({
      data: superPermission,
      key: 'permission',
    });

    if (isString(superAuth)) {
      result = superAuth;
    }
  }

  return result;
}

export function checkIsSuper() {
  const existCache = hasCache({ key: superPermissionCacheKey });

  if (existCache) {
    const result = getCache({ key: superPermissionCacheKey });

    if (result !== undefined) {
      return !!result;
    }
  }

  const superPermission = getSuperPermission();

  if (!checkStringIsNullOrWhiteSpace(superPermission)) {
    const list = getAllAuthority();
    const isSuper = (list || []).find((o) => o === superPermission) || '';

    if (isSuper === superPermission) {
      setCache({
        key: superPermissionCacheKey,
        value: true,
      });

      return true;
    }
  }

  setCache({
    key: superPermissionCacheKey,
    value: false,
  });

  return false;
}

function checkHasAuthorityCore(auth) {
  if (checkIsSuper()) {
    return true;
  }

  let result = '0';

  const existCache = hasCache({ key: auth });

  if (existCache) {
    result = getCache({ key: auth });

    if (result !== undefined) {
      return result !== '0';
    }
  }

  const list = getAllAuthority();

  const accessWayCollection = getAccessWayCollectionCache();

  const v = (list || []).find((o) => o === auth);

  result = v === undefined ? '0' : '1';

  setCache({
    key: auth,
    value: result,
  });

  const checkResult = result !== '0';

  if (!checkResult) {
    logTrace(
      {
        checkAuthority: auth,
        listAuthority: list,
        accessWayCollection,
      },
      'check authority fail',
    );

    const text = `no authority on ${auth}`;

    showSimpleWarnMessage(text);
  }

  return checkResult;
}

function checkHasAuthorities(authCollection) {
  let result = false;

  if (isArray(authCollection)) {
    result = authCollection.some((auth) => {
      return checkHasAuthorityCore(auth);
    });

    return result;
  }

  if (isString(authCollection)) {
    result = checkHasAuthorityCore(authCollection);

    return result;
  }

  const text = '无效的待验证权限';

  showSimpleErrorMessage(text);

  logError(`auth fail on "${authCollection.join(',')}"`);

  return result;
}

/**
 * Handle authorization fail
 * @param {string} authority
 */
export function handleAuthorizationFail(authority) {
  if (!authorityAssist.handleAuthorizationFailSetComplete) {
    throw new Error(
      buildPromptModuleInfoText(
        'doWhenAuthorizationFail',
        'handleAuthorizationFail has not set, please use setAuthorizationFailHandler to set it',
      ),
    );
  }

  if (isFunction(authorityAssist.handleAuthorizationFail)) {
    authorityAssist.handleAuthorizationFail(authority);
  }
}

export function checkHasAuthority(auth) {
  if (isArray(auth)) {
    if (isEmptyArray(auth)) {
      logWarn(
        buildPromptModuleInfoText(
          'checkHasAuthority',
          'authority is empty array',
        ),
      );

      return false;
    }

    return checkHasAuthorities(auth);
  }

  if (isString(auth)) {
    return checkHasAuthorityCore(auth);
  }

  logObject({
    auth,
  });

  throw new Error('auth need string or string array, please check in console.');
}
