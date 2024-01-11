import { isObject, isString } from './checkAssist';
import { modulePackageName } from './definition';
import { logDevelop, logException } from './loggerAssist';
import { showSimpleErrorMessage } from './messagePromptAssist';
import { buildPromptModuleInfo } from './promptAssist';
import { mergeTextMessage } from './tools';

/**
 * Module Name.
 * @private
 */
const moduleName = 'navigationAssist';

function buildPromptModuleInfoText(text, ancillaryInformation = '') {
  return buildPromptModuleInfo(
    modulePackageName,
    mergeTextMessage(text, ancillaryInformation),
    moduleName,
  );
}

/**
 * Prompt Assist
 */
export const navigationAssist = {
  // eslint-disable-next-line no-unused-vars
  navigateTo: (o) => {
    logException(
      buildPromptModuleInfo(
        modulePackageName,
        'setNavigator need config, use setNavigator to set it',
        moduleName,
      ),
    );
  },
  // eslint-disable-next-line no-unused-vars
  redirectTo: (o) => {
    logException(
      buildPromptModuleInfo(
        modulePackageName,
        'setRedirector need config, use setRedirector to set it',
        moduleName,
      ),
    );
  },
};

/**
 * Set navigator
 */
export function setNavigator(handler) {
  logDevelop(buildPromptModuleInfoText('setNavigator'), typeof handler);

  navigationAssist.navigateTo = handler;
}

/**
 * Set redirector
 */
export function setRedirector(handler) {
  logDevelop(buildPromptModuleInfoText('setRedirector'), typeof handler);

  navigationAssist.redirectTo = handler;
}

export function redirectTo(o) {
  if (!(isString(o) || isObject(o))) {
    const text = 'invalid parameter, params need string or object';

    showSimpleErrorMessage(text);

    return;
  }

  navigationAssist.redirectTo(o);
}

export function navigateTo(o) {
  if (!(isString(o) || isObject(o))) {
    const text = 'invalid parameter, params need string or object';

    showSimpleErrorMessage(text);

    return;
  }

  navigationAssist.navigateTo(o);
}
