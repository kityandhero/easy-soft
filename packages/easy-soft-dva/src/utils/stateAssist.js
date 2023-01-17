import {
  displayTextMessage,
  isNumber,
  logWarn,
  toNumber,
} from 'easy-soft-utility';

import { buildPromptModuleInfo } from './packagePrompt';

/**
 * Module Name.
 */
const moduleName = 'stateAssist';

/**
 * Get default code
 */
export function getDefaultCode() {
  if (!stateConfigure.defaultCodeSetComplete) {
    if (!stateConfigure.defaultCodePromptSetInformationComplete) {
      const text = `${buildPromptModuleInfo(
        moduleName,
      )}logData -> logger display switch default is false, if want to display log, please set it before first log, use setLoggerDisplaySwitch to set it, this message only show once.`;

      displayTextMessage({
        text: text,
        color: '#08BBEE',
        dataDescription: 'hint',
        ancillaryInformation: '',
      });

      try {
        throw new Error('please set use setStateDefaultCode');
      } catch (error) {
        console.error(error);
      }

      stateConfigure.defaultCodePromptSetInformationComplete = true;
    }
  }

  return stateConfigure.defaultCode;
}

/**
 * state configure
 */
export const stateConfigure = {
  defaultCodePromptSetInformationComplete: false,
  defaultCodeSetComplete: false,
  defaultCode: 200,
};

/**
 * Set state default code
 * @param {Number} code state default code
 */
export function setStateDefaultCode(code) {
  if (!isNumber(code)) {
    logWarn(
      `${buildPromptModuleInfo(
        moduleName,
      )}setStateDefaultCode -> code must be number`,
    );
  }

  stateConfigure.defaultCode = toNumber(code);
}
