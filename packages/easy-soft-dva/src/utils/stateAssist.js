import {
  buildPromptModuleInfo,
  displayTextMessage,
  isNumber,
  logWarn,
  toNumber,
} from 'easy-soft-utility';

import { modulePackageName } from './definition';

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
      const text = buildPromptModuleInfo(
        modulePackageName,
        'getDefaultCode -> dva state default value -> state.data.code has not set, default code value is 200, suggest config it with use setStateDefaultCode',
        moduleName,
      );

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
      buildPromptModuleInfo(
        modulePackageName,
        'setStateDefaultCode -> code must be number',
        moduleName,
      ),
    );
  }

  stateConfigure.defaultCode = toNumber(code);

  stateConfigure.defaultCodeSetComplete = true;
}
