import { isEmptyArray, isFunction, isObject } from './checkAssist';
import { modulePackageName } from './definition';
import {
  getStringFromLocalStorage,
  removeLocalStorage,
  saveStringToLocalStorage,
} from './localStorageAssist';
import { logDevelop } from './loggerAssist';
import { buildPromptModuleInfo } from './promptAssist';
import { mergeTextMessage } from './tools';

function buildPromptModuleInfoText(text, ancillaryInformation = '') {
  return buildPromptModuleInfo(
    modulePackageName,
    mergeTextMessage(text, ancillaryInformation),
    moduleName,
  );
}

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
  const list = [];
  const embedModelNameList = [];
  const extraModelNameList = [];

  for (const o of modelContainer.embedBuilders) {
    if (isFunction(o)) {
      const v = o();

      if (isObject(v)) {
        const { namespace: ns } = v;

        list.push(v);
        embedModelNameList.push(ns);
      }
    }
  }

  logDevelop(
    'append embed builder',
    isEmptyArray(embedModelNameList)
      ? 'no embed model builder has set, ignore'
      : embedModelNameList.join(','),
  );

  for (const o of modelContainer.extraBuilders) {
    if (isFunction(o)) {
      const v = o();

      if (isObject(v)) {
        const { namespace: ns } = v;

        list.push(v);
        extraModelNameList.push(ns);
      }
    }
  }

  logDevelop(
    'append extra builder',
    isEmptyArray(extraModelNameList)
      ? 'no extra model builder has set yet, ignore'
      : extraModelNameList.join(','),
  );

  modelContainer.buildComplete = true;

  modelContainer.models = list;

  logDevelop(
    buildPromptModuleInfoText('buildModelCollection'),
    'models build complete',
  );
}

/**
 * Get model collection.
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

    logDevelop(`all models -> ${modelNames}`);

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
 * @param {string} modelNameList model name list, eg like "article,product,news"
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
