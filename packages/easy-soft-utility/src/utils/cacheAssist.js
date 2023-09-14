import nodeCache from 'node-cache';

import {
  checkStringIsNullOrWhiteSpace,
  isArray,
  isNumber,
  isString,
} from './checkAssist';
import { modulePackageName } from './definition';
import { logWarn } from './loggerAssist';
import { buildPromptModuleInfo } from './promptAssist';
import { getRuntimeDataStorage } from './runtimeAssist';
import { mergeTextMessage } from './tools';

/**
 * Module Name.
 * @private
 */
const moduleName = 'cacheAssist';

function buildPromptModuleInfoText(text, ancillaryInformation = '') {
  return buildPromptModuleInfo(
    modulePackageName,
    mergeTextMessage(text, ancillaryInformation),
    moduleName,
  );
}

/**
 * Check cache key availability.
 */
function checkKey(key) {
  if (checkStringIsNullOrWhiteSpace(key)) {
    logWarn(
      buildPromptModuleInfoText('checkKey', 'cache key is null or empty'),
    );

    return false;
  }

  if (!(isString(key) || isNumber(key))) {
    logWarn(
      buildPromptModuleInfoText(
        'checkKey',
        `cache key must be string or number, current type id ${typeof key}`,
      ),
    );

    return false;
  }

  return true;
}

/**
 * Get the runtime cache pool.
 * @returns {nodeCache}
 */
export function getCachePool() {
  const runtimeDataStorage = getRuntimeDataStorage();

  if (!runtimeDataStorage.localRuntimeCache) {
    runtimeDataStorage.localRuntimeCache = new nodeCache();
  }

  return runtimeDataStorage.localRuntimeCache;
}

/**
 * Returns boolean indicating if the key is cached.
 */
export function hasCache({ key }) {
  const cachePool = getCachePool();

  if (cachePool == null) {
    throw new Error('cache pool not exist');
  }

  return cachePool.has(key);
}

/**
 * Sets a key value pair. It is possible to define a ttl (in seconds). Returns true on success. Expiration time default is 0, it mean never expire
 */
export function setCache({ key, value, expiration = 0 }) {
  if (!checkKey(key)) {
    return;
  }

  const cachePool = getCachePool();

  if (cachePool == null) {
    throw new Error('cache pool not exist');
  }

  return cachePool.set(key, value, expiration);
}

/**
 * Sets multiple key val pairs. It is possible to define a ttl (seconds). Returns true on success.
 */
export function setMultiCache(list) {
  if (!isArray(list)) {
    throw new Error('setMultiCache: list must be array');
  }

  if (list.length <= 0) {
    return true;
  }

  const listData = [];

  for (const o of list) {
    const { key, value, expiration } = {
      key: '',
      value: '',
      expiration: 0,
      ...o,
    };

    if (!checkStringIsNullOrWhiteSpace(key)) {
      if (!checkKey(key)) {
        continue;
      }

      listData.push({
        key,
        value,
        ttl: expiration,
      });
    }
  }

  if (listData.length <= 0) {
    return false;
  }

  const cachePool = getCachePool();

  if (cachePool == null) {
    throw new Error('cache pool not exist');
  }

  return cachePool.mset(listData);
}

/**
 * Timestamp in ms representing the time at which the key will expire.
 */
export function getExpiration({ key }) {
  const cachePool = getCachePool();

  if (cachePool == null) {
    throw new Error('cache pool not exist');
  }

  return cachePool.getTtl(key);
}

/**
 * Redefine the ttl of a key. Returns true if the key has been found and changed. Otherwise returns false. If the ttl-argument isn't passed the default-TTL will be used. The key will be deleted when passing in a ttl < 0. Expiration value 0 mean never expire
 */
export function setExpiration({ key, expiration }) {
  const cachePool = getCachePool();

  if (cachePool == null) {
    throw new Error('cache pool not exist');
  }

  return cachePool.ttl(key, expiration);
}

/**
 * Gets a saved value from the cache. Returns a undefined if not found or expired. If the value was found it returns the value.
 */
export function getCache({ key }) {
  const cachePool = getCachePool();

  if (cachePool == null) {
    throw new Error('cache pool not exist');
  }

  return cachePool.get(key);
}

/**
 * Get all cache keys.
 */
export function keys() {
  const cachePool = getCachePool();

  if (cachePool == null) {
    throw new Error('cache pool not exist');
  }

  return cachePool.keys();
}

/**
 * Gets multiple saved values from the cache. Returns an empty object {} if not found or expired. If the value was found it returns an object with the key value pair.
 */
export function getMultiCache(list) {
  if (!isArray(list)) {
    throw new Error('getMultiCache: list must be array');
  }

  const cachePool = getCachePool();

  if (cachePool == null) {
    throw new Error('cache pool not exist');
  }

  return cachePool.mget(list);
}

/**
 * Get the cached value and remove the key from the cache.
 */
export function takeCache({ key }) {
  const cachePool = getCachePool();

  if (cachePool == null) {
    throw new Error('cache pool not exist');
  }

  return cachePool.take(key);
}

/**
 * Delete a key. Returns the number of deleted entries. A delete will never fail.
 */
export function deleteCache({ key }) {
  if (!checkKey(key)) {
    return;
  }

  const cachePool = getCachePool();

  if (cachePool == null) {
    throw new Error('cache pool not exist');
  }

  return cachePool.del(key);
}

/**
 * Delete multiple keys. Returns the number of deleted entries. A delete will never fail.
 */
export function deleteMultiCache(list) {
  if (!isArray(list)) {
    throw new Error('deleteMultiCache: list must be array');
  }

  const cachePool = getCachePool();

  if (cachePool == null) {
    throw new Error('cache pool not exist');
  }

  return cachePool.del(list);
}

/**
 * Flush all data, it will clear cache pool.
 */
export function flushAllCache() {
  const cachePool = getCachePool();

  if (cachePool == null) {
    throw new Error('cache pool not exist');
  }

  return cachePool.flushAll();
}

/**
 * Returns the statistics.
 */
export function statisticsCache() {
  const cachePool = getCachePool();

  if (cachePool == null) {
    throw new Error('cache pool not exist');
  }

  return cachePool.getStats();
}
