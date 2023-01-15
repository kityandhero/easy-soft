import {
  checkInCollection,
  checkStringIsNullOrWhiteSpace,
  isString,
} from './checkAssist';
import { logDisplay, logLevel } from './constants';
import { toBoolean, toString } from './convertAssist';
import { buildPromptModuleInfo } from './meta';

/**
 * Module Name.
 */
const moduleName = 'loggerAssist';

export const loggerSwitch = {
  loggerDisplaySwitchPromptSetInformationComplete: false,
  loggerDisplaySwitchSetComplete: false,
  display: false,
};

const colorCollection = {
  config: '#F8C471',
  execute: '#C39BD3',
  info: '#89ca78',
  warn: '#ff4f49',
  debug: '#00768f',
  trace: '#596032',
};

/**
 * Merge text message
 */
function mergeTextMessage(data, ancillaryInformation) {
  return `${toString(data)}${checkStringIsNullOrWhiteSpace(
    ancillaryInformation ? '' : ` -> ${ancillaryInformation}`,
  )}`;
}

/**
 * Display text message
 * @param {*} param0
 */
function displayTextMessage({ text, color = '', ancillaryInformation = '' }) {
  const o = { trace: mergeTextMessage(text, ancillaryInformation) };

  console.log('%c%s', `color:${color};`, JSON.stringify(o));
}

/**
 * Display object message
 * @param {*} param0
 */
function displayObjectMessage({
  data,
  color = '',
  dataDescription = '',
  ancillaryInformation = '',
}) {
  console.log(
    '%c%s',
    `color:${color};`,
    JSON.stringify({
      config: `check the following ${dataDescription} data${
        checkStringIsNullOrWhiteSpace(ancillaryInformation)
          ? ''
          : ` -> ${ancillaryInformation}`
      }.`,
    }),
  );

  console.log(data);
}

/**
 * Log data message, default displayMode is logDisplay.auto, default level is logLevel.debug, default ancillaryInformation is ''
 */
export function logData(
  data,
  displayMode = logDisplay.auto,
  level = logLevel.debug,
  ancillaryInformation = '',
) {
  const loggerDisplaySwitch = getLoggerDisplaySwitch();

  if (!loggerSwitch.loggerDisplaySwitchSetComplete) {
    if (!loggerSwitch.loggerDisplaySwitchPromptSetInformationComplete) {
      console.log(
        `${buildPromptModuleInfo(
          moduleName,
        )}logData -> please set logger display switch before first log, use setLoggerDisplaySwitch to set it.`,
      );

      loggerSwitch.loggerDisplaySwitchPromptSetInformationComplete = true;
    }
  }

  if (!loggerDisplaySwitch && level !== logLevel.error) {
    return;
  }

  let showModeModified =
    (displayMode || null) == null || checkStringIsNullOrWhiteSpace(displayMode)
      ? logDisplay.auto
      : displayMode;

  if (
    !checkInCollection(
      [logDisplay.auto, logDisplay.text, logDisplay.object],
      showModeModified,
    )
  ) {
    throw new Error(`Invalid log display mode -> ${showModeModified}`);
  }

  if (showModeModified === logDisplay.auto) {
    if (isString(data)) {
      showModeModified = logDisplay.text;
    } else {
      showModeModified = logDisplay.object;
    }
  }

  if (level === logLevel.error) {
    if (showModeModified === logDisplay.text) {
      const o = { error: data };

      console.error(JSON.stringify(o));
    }

    if (showModeModified === logDisplay.object) {
      console.error({ error: data });
    }
  }

  if (!loggerDisplaySwitch) {
    return;
  }

  if (level === logLevel.trace) {
    if (showModeModified === logDisplay.text) {
      displayTextMessage({
        text: data,
        color: colorCollection.trace,
        ancillaryInformation: ancillaryInformation,
      });
    }

    if (showModeModified === logDisplay.object) {
      displayObjectMessage({
        data: data,
        color: colorCollection.trace,
        dataDescription: 'trace',
        ancillaryInformation: ancillaryInformation,
      });
    }
  }

  if (level === logLevel.debug) {
    if (showModeModified === logDisplay.text) {
      displayTextMessage({
        text: data,
        color: colorCollection.debug,
        ancillaryInformation: ancillaryInformation,
      });
    }

    if (showModeModified === logDisplay.object) {
      displayObjectMessage({
        data: data,
        color: colorCollection.debug,
        dataDescription: 'debug',
        ancillaryInformation: ancillaryInformation,
      });
    }
  }

  if (level === logLevel.warn) {
    if (showModeModified === logDisplay.text) {
      displayTextMessage({
        text: data,
        color: colorCollection.warn,
        ancillaryInformation: ancillaryInformation,
      });
    }

    if (showModeModified === logDisplay.object) {
      displayObjectMessage({
        data: data,
        color: colorCollection.warn,
        dataDescription: 'warn',
        ancillaryInformation: ancillaryInformation,
      });
    }
  }

  if (level === logLevel.info) {
    if (showModeModified === logDisplay.text) {
      displayTextMessage({
        text: data,
        color: colorCollection.info,
        ancillaryInformation: ancillaryInformation,
      });
    }

    if (showModeModified === logDisplay.object) {
      displayObjectMessage({
        data: data,
        color: colorCollection.info,
        dataDescription: 'info',
        ancillaryInformation: ancillaryInformation,
      });
    }
  }

  if (level === logLevel.execute) {
    if (showModeModified === logDisplay.text) {
      displayTextMessage({
        text: data,
        color: colorCollection.execute,
        ancillaryInformation: ancillaryInformation,
      });
    }

    if (showModeModified === logDisplay.object) {
      displayObjectMessage({
        data: data,
        color: colorCollection.execute,
        dataDescription: 'execute',
        ancillaryInformation: ancillaryInformation,
      });
    }
  }

  if (level === logLevel.config) {
    if (showModeModified === logDisplay.text) {
      displayTextMessage({
        text: data,
        color: colorCollection.config,
        ancillaryInformation: ancillaryInformation,
      });
    }

    if (showModeModified === logDisplay.object) {
      displayObjectMessage({
        data: data,
        color: colorCollection.config,
        dataDescription: 'config',
        ancillaryInformation: ancillaryInformation,
      });
    }
  }
}

/**
 * Log warn message, default ancillaryInformation is ''
 */
export function logWarn(data, ancillaryInformation = '') {
  if (isString(data)) {
    logText(data, logLevel.warn);
  } else {
    logObject(data, logLevel.warn, ancillaryInformation);
  }
}

/**
 * Log info message, default ancillaryInformation is ''
 */
export function logInfo(data, ancillaryInformation = '') {
  if (isString(data)) {
    logText(data, logLevel.info);
  } else {
    logObject(data, logLevel.info, ancillaryInformation);
  }
}

/**
 * Log config message, default ancillaryInformation is ''
 */
export function logConfig(data, ancillaryInformation = '') {
  if (isString(data)) {
    logText(data, logLevel.config);
  } else {
    logObject(data, logLevel.config, ancillaryInformation);
  }
}

/**
 * Log trace message, default ancillaryInformation is ''
 */
export function logTrace(data, ancillaryInformation = '') {
  if (isString(data)) {
    logText(data, logLevel.trace);
  } else {
    logObject(data, logLevel.trace, ancillaryInformation);
  }
}

/**
 * Log debug message, default ancillaryInformation is ''
 */
export function logDebug(data, ancillaryInformation = '') {
  if (isString(data)) {
    logText(data, logLevel.debug);
  } else {
    logObject(data, logLevel.debug, ancillaryInformation);
  }
}

/**
 * Log execute message, default ancillaryInformation is ''
 */
export function logExecute(data, ancillaryInformation = '') {
  if (isString(data)) {
    logText(data, logLevel.execute);
  } else {
    logObject(data, logLevel.execute, ancillaryInformation);
  }
}

/**
 * Log error message, default ancillaryInformation is ''
 */
export function logError(data, ancillaryInformation = '') {
  if (isString(data)) {
    logText(data, logLevel.error);
  } else {
    logObject(data, logLevel.error, ancillaryInformation);
  }
}

/**
 * Log text message, default level is logLevel.trace, default ancillaryInformation is ''
 */
export function logText(
  text,
  level = logLevel.trace,
  ancillaryInformation = '',
) {
  logData(text, logDisplay.text, level, ancillaryInformation);
}

/**
 * Log object message, default level is logLevel.trace, default ancillaryInformation is ''
 */
export function logObject(
  data,
  level = logLevel.trace,
  ancillaryInformation = '',
) {
  logData(data, logDisplay.object, level, ancillaryInformation);
}

/**
 * Get logger display switch
 */
export function getLoggerDisplaySwitch() {
  return toBoolean(loggerSwitch.display);
}

/**
 * Set logger display switch
 */
export function setLoggerDisplaySwitch(value) {
  loggerSwitch.display = toBoolean(value);
}
