import { isFunction } from './checkAssist';
import { modulePackageName } from './definition';
import { logDevelop } from './loggerAssist';
import { buildPromptModuleInfo } from './promptAssist';
import { mergeTextMessage } from './tools';

/**
 * Module Name.
 * @private
 */
const moduleName = 'progressAssist';

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
export const progressAssist = {
  handleProgressStart: () => {},
  handleProgressStartSetComplete: false,
  handleProgressStop: () => {},
  handleProgressStopSetComplete: false,
};

/**
 * Set the global header handler supplement
 * @param {Function} handler handle global header handler supplement
 */
export function setProgressStartHandler(handler) {
  if (progressAssist.handleProgressStartSetComplete) {
    logDevelop(
      'setProgressStartHandler',
      'reset is not allowed, it can be set only once',
    );

    return;
  }

  if (isFunction(handler)) {
    logDevelop('setProgressStartHandler', typeof handler);
  } else {
    logDevelop('setProgressStartHandler', 'parameter must be function');
  }

  progressAssist.handleProgressStart = handler;
  progressAssist.handleProgressStartSetComplete = true;
}

/**
 * Set the progress start handler supplement
 * @param {Function} handler handle progress start handler supplement
 */
export function setProgressStopHandler(handler) {
  if (progressAssist.handleProgressStopSetComplete) {
    logDevelop(
      'setProgressStopHandler',
      'reset is not allowed, it can be set only once',
    );

    return;
  }

  if (isFunction(handler)) {
    logDevelop('setProgressStopHandler', typeof handler);
  } else {
    logDevelop('setProgressStopHandler', 'parameter must be function');
  }

  progressAssist.handleProgressStop = handler;
  progressAssist.handleProgressStopSetComplete = true;
}

export function startProgress() {
  if (!progressAssist.handleProgressStartSetComplete) {
    throw new Error(
      buildPromptModuleInfoText(
        'startProgress -> handleProgressStart has not set, please use setProgressStartHandler to set it',
      ),
    );
  }

  progressAssist.handleProgressStart();
}

export function stopProgress() {
  if (!progressAssist.handleProgressStopSetComplete) {
    throw new Error(
      buildPromptModuleInfoText(
        'stopProgress -> handleProgressStop has not set, please use setProgressStopHandler to set it',
      ),
    );
  }

  progressAssist.handleProgressStop();
}
