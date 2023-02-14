import {
  buildPromptModuleInfo,
  logDebug,
  logException,
  tryDoDvaPrepareWork,
} from 'easy-soft-utility';

import { create } from '../dva-core';
import { createLoading } from '../dva-loading';

import { modulePackageName } from './definition';

/**
 * Module Name.
 * @private
 */
const moduleName = 'dvaAssist';

let app;
let store;
let dispatch;
let registered;

export function createApp(opt) {
  tryDoDvaPrepareWork();

  logDebug(
    buildPromptModuleInfo(
      modulePackageName,
      'createApp -> create a dva app',
      moduleName,
    ),
  );

  app = create(opt);
  app.use(createLoading({}));

  if (!registered) {
    for (const model of opt.models) app.model(model);
  }

  registered = true;

  app.start();

  logDebug(
    buildPromptModuleInfo(
      modulePackageName,
      'createApp -> dva app start complete',
      moduleName,
    ),
  );

  store = app._store;

  app.getStore = () => store;

  app.use({
    onError(error) {
      logException(error);
    },
  });

  dispatch = store.dispatch;

  app.dispatch = dispatch;

  return app;
}

export function getStore(models) {
  tryDoDvaPrepareWork();

  const dvaApp = createApp({
    initialState: {},
    models: models,
  });

  const result = dvaApp.getStore();

  return result;
}

export function getDispatchWrapper() {
  tryDoDvaPrepareWork();

  return app.dispatch;
}

export { connect, Provider } from '../dva-core';
