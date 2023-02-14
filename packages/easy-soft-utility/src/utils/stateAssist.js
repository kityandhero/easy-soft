import { isNumber } from './checkAssist';
import { toNumber } from './convertAssist';
import { modulePackageName } from './definition';
import {
  displayTextMessage,
  logColorCollection,
  logWarn,
} from './loggerAssist';
import { checkWhetherDevelopmentEnvironment } from './meta';
import { buildPromptModuleInfo } from './promptAssist';

/**
 * Module Name.
 * @private
 */
const moduleName = 'stateAssist';

/**
 * Get default code
 */
export function getDefaultCode() {
  if (
    !stateConfigure.defaultCodeSetComplete &&
    !stateConfigure.defaultCodePromptSetInformationComplete
  ) {
    const text = buildPromptModuleInfo(
      modulePackageName,
      'getDefaultCode -> api state default value -> state.data.code has not set, default code value is 200, suggest config it with use setStateDefaultCode',
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
  if (checkWhetherDevelopmentEnvironment()) {
    displayTextMessage({
      text: 'setPrepareCallback',
      color: logColorCollection.execute,
      dataDescription: 'execute',
      ancillaryInformation: '',
    });
  }

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
