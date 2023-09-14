import { flushAllCache } from './cacheAssist';
import { isArray } from './checkAssist';
import { modulePackageName } from './definition';
import {
  getStringFromLocalStorage,
  removeLocalStorage,
  saveJsonToLocalStorage,
} from './localStorageAssist';
import { logExecute } from './loggerAssist';
import { buildPromptModuleInfo } from './promptAssist';
import { mergeTextMessage } from './tools';

/**
 * Module Name.
 * @private
 */
const moduleName = 'authorityLocalAssist';

function buildPromptModuleInfoText(text, ancillaryInformation = '') {
  return buildPromptModuleInfo(
    modulePackageName,
    mergeTextMessage(text, ancillaryInformation),
    moduleName,
  );
}

const storageKeyCollection = {
  authorityCollection: 'ea-authorityCollection',
};

/**
 * set local authority collection
 * @param {string|Array} authority
 */
export function setLocalAuthorityCollection(authority) {
  logExecute(
    { authority },
    buildPromptModuleInfoText('setLocalAuthorityCollection'),
  );

  const authorityCollection =
    typeof authority === 'string' ? [authority] : authority;

  saveJsonToLocalStorage(
    storageKeyCollection.authorityCollection,
    authorityCollection,
  );

  flushAllCache();
}

export function getLocalAuthorityCollection() {
  const authorityString = getStringFromLocalStorage(
    storageKeyCollection.authorityCollection,
  );

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
    return [...authority];
  }

  return [];
}

/**
 * Remove local authority collection
 */
export function removeLocalAuthorityCollection() {
  logExecute('removeLocalAuthorityCollection');

  const key = storageKeyCollection.authorityCollection;

  removeLocalStorage(key);
}
