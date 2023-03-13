import {
  getAccessWayCollectionCache,
  storageKeyCollection,
} from './accessWayAssist';
import { flushAllCache, getCache, hasCache, setCache } from './cacheAssist';
import {
  checkStringIsNullOrWhiteSpace,
  isArray,
  isObject,
  isString,
} from './checkAssist';
import { getValueByKey } from './common';
import {
  getStringFromLocalStorage,
  saveJsonToLocalStorage,
} from './localStorageAssist';
import { logError, logObject, logTrace } from './loggerAssist';
import {
  showSimpleErrorMessage,
  showSimpleWarnMessage,
} from './messagePromptAssist';

const authorityCollectionCache = 'authorityCollectionCache';
const superPermissionCacheKey = 'hasSuperPermission';

/**
 * 缓存用户权限数据体
 * @param {*} authority
 */
export function setAuthority(authority) {
  const authorityCollection =
    typeof authority === 'string' ? [authority] : authority;

  saveJsonToLocalStorage(
    storageKeyCollection.authorityCollection,
    authorityCollection,
  );

  flushAllCache();
}

export function getAuthority(string_) {
  const authorityString =
    string_ === undefined
      ? getStringFromLocalStorage(storageKeyCollection.authorityCollection)
      : string_;

  let authority;

  try {
    if (authorityString) {
      authority = JSON.parse(authorityString);
    }
  } catch {
    authority = authorityString;
  }

  if (typeof authority === 'string') {
    return [authority];
  }

  if (isArray(authority)) {
    return authority;
  }

  return [];
}

function getAllAuthorityCore() {
  let result = [];

  const existCache = hasCache({ key: authorityCollectionCache });

  if (existCache) {
    result = getCache({ key: authorityCollectionCache });

    if (isArray(result)) {
      return result;
    }
  }

  const authorityString = getStringFromLocalStorage(
    storageKeyCollection.authorityCollection,
  );

  let authority;

  try {
    authority = JSON.parse(authorityString);
  } catch {
    authority = authorityString;
  }

  if (typeof authority === 'string') {
    result.push(authority);
  } else {
    result = isArray(authority) ? authority : [];
  }

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

function getAllAuthority() {
  return getAllAuthorityCore();
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

    const text = `no authority on ${this.componentAuthority}`;

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

export function checkHasAuthority(auth) {
  if (isArray(auth)) {
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
