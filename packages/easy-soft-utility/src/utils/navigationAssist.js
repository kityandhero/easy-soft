import { isObject, isString } from './checkAssist';
import { modulePackageName } from './definition';
import { logException } from './loggerAssist';
import { showSimpleErrorMessage } from './messagePromptAssist';
import { buildPromptModuleInfo } from './promptAssist';

/**
 * Module Name
 */
const moduleName = 'navigationAssist';

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
  redirectTo: (key, value) => {
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
  navigationAssist.navigateTo = handler;
}

/**
 * Set redirector
 */
export function setRedirector(handler) {
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
