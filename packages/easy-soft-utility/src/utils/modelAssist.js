import { isFunction, isObject } from './checkAssist';
import { modulePackageName } from './definition';
import {
  getStringFromLocalStorage,
  removeLocalStorage,
  saveStringToLocalStorage,
} from './localStorageAssist';
import { logConfig, logExecute } from './loggerAssist';
import { buildPromptModuleInfo } from './promptAssist';

/**
 * Module Name.
 * @private
 */
const moduleName = 'modelAssist';

const storageKeyCollection = {
  modelNameList: 'modelNameList',
};

export const modelContainer = {
  embedBuilders: [],
  extraBuilders: [],
  buildComplete: false,
  models: [],
};

/**
 * Get all builder total count.
 */
export function getBuilderCount() {
  return (
    modelContainer.embedBuilders.length + modelContainer.extraBuilders.length
  );
}

/**
 * Append embed builder.
 * @param {Function} builder model builder
 */
export function appendEmbedBuilder(builder) {
  if (!isFunction(builder)) {
    throw new Error(
      buildPromptModuleInfo(
        modulePackageName,
        `appendEmbedBuilder -> builder must be none parameter function and return an object, current is ${typeof builder}`,
        moduleName,
      ),
    );
  }

  modelContainer.embedBuilders.push(builder);
}

/**
 * Append extra builder.
 * @param {Function} builder model builder
 */
export function appendExtraBuilder(builder) {
  if (!isFunction(builder)) {
    throw new Error(
      buildPromptModuleInfo(
        modulePackageName,
        `appendExtraBuilder -> builder must be none parameter function and return an object, current is ${typeof builder}`,
        moduleName,
      ),
    );
  }

  modelContainer.extraBuilders.push(builder);
}

/**
 * Build model collection.
 */
export function buildModelCollection() {
  logExecute('buildModelCollection');

  const list = [];

  for (const o of modelContainer.embedBuilders) {
    if (isFunction(o)) {
      const v = o();

      if (isObject(v)) {
        list.push(v);
      }
    }
  }

  for (const o of modelContainer.extraBuilders) {
    if (isFunction(o)) {
      const v = o();

      if (isObject(v)) {
        list.push(v);
      }
    }
  }

  modelContainer.buildComplete = true;

  modelContainer.models = list;
}

/**
 * Get model collection.
 * @returns
 */
export function getModelCollection() {
  if (!modelContainer.buildComplete) {
    buildModelCollection();

    const modelNames = modelContainer.models
      .map((item) => {
        const { namespace: ns } = item;

        return ns;
      })
      .join(',');

    logConfig(`all models -> ${modelNames}`);

    setModelNameList(modelNames);
  }

  return modelContainer.models;
}

/**
 * Get model name list.
 */
export function getModelNameList() {
  const key = storageKeyCollection.modelNameList;

  return getStringFromLocalStorage(key);
}

/**
 * Set model name list.
 * @param {String} modelNameList model name list, eg like "article,product,news"
 * @returns
 */
export function setModelNameList(modelNameList) {
  const key = storageKeyCollection.modelNameList;

  return saveStringToLocalStorage(key, modelNameList || '');
}

/**
 * Remove model name list.
 */
export function removeModelNameList() {
  const key = storageKeyCollection.modelNameList;

  removeLocalStorage(key);
}
