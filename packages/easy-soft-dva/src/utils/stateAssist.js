import {
  displayTextMessage,
  isNumber,
  logWarn,
  toNumber,
} from 'easy-soft-utility';

import { buildPromptModuleInfo } from './meta';

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

      try {
        throw new Error('please set use setStateDefaultCode');
      } catch (error) {
        console.error(error);
      }

      displayTextMessage({
        text: text,
        color: '#08BBEE',
        dataDescription: 'hint',
        ancillaryInformation: '',
      });

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
