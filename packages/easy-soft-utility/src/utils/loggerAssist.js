import { checkStringIsNullOrWhiteSpace, inCollection } from './base';
import { isString } from './checkAssist';
import { logDisplay, logLevel } from './constants';
import { toBoolean, toString } from './convertAssist';
import { modulePackageName } from './definition';

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

function mergeTextMessage(data, ancillaryInformation) {
  return `${toString(data)}${checkStringIsNullOrWhiteSpace(
    ancillaryInformation ? '' : ` -> ${ancillaryInformation}`,
  )}`;
}

function displayTestMessage({ text, color = '', ancillaryInformation = '' }) {
  const o = { trace: mergeTextMessage(text, ancillaryInformation) };

  console.log('%c%s', `color:${color};`, JSON.stringify(o));
}

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
 * Record log
 * @param {*} data the data will be logged
 * @param {*} displayMode log display mode
 * @param {*} level log level
 * @param {*} ancillaryInformation ancillary information
 */
export function logData(
  data,
  displayMode,
  level = logLevel.debug,
  ancillaryInformation = '',
) {
  const loggerDisplaySwitch = getLoggerDisplaySwitch();

  if (!loggerSwitch.loggerDisplaySwitchSetComplete) {
    if (!loggerSwitch.loggerDisplaySwitchPromptSetInformationComplete) {
      console.log(
        `${modulePackageName}::${moduleName}::logData -> please set logger display switch before first log, use setLoggerDisplaySwitch to set it.`,
      );

      loggerSwitch.loggerDisplaySwitchPromptSetInformationComplete = true;
    }
  }

  if (!loggerDisplaySwitch && level !== logLevel.error) {
    return;
  }

  let showModeModified =
    (displayMode || null) == null || checkStringIsNullOrWhiteSpace(displayMode)
      ? logDisplay.unknown
      : displayMode;

  if (
    !inCollection(
      [logDisplay.unknown, logDisplay.text, logDisplay.object],
      showModeModified,
    )
  ) {
    throw new Error(`Invalid log display mode -> ${showModeModified}`);
  }

  if (showModeModified === logDisplay.unknown) {
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
      displayTestMessage({
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
      displayTestMessage({
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
      displayTestMessage({
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
      displayTestMessage({
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
      displayTestMessage({
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
      displayTestMessage({
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
 * Log warn message
 * @param {*} text the text will be logged
 * @param {*} ancillaryInformation ancillary information
 */
export function logWarn(data, ancillaryInformation = '') {
  if (isString(data)) {
    logText(data, logLevel.warn);
  } else {
    logObject(data, logLevel.warn, ancillaryInformation);
  }
}

/**
 * Log info message
 * @param {*} text the text will be logged
 * @param {*} ancillaryInformation ancillary information
 */
export function logInfo(data, ancillaryInformation = '') {
  if (isString(data)) {
    logText(data, logLevel.info);
  } else {
    logObject(data, logLevel.info, ancillaryInformation);
  }
}

/**
 * Log config message
 * @param {*} text the text will be logged
 * @param {*} ancillaryInformation ancillary information
 */
export function logConfig(data, ancillaryInformation = '') {
  if (isString(data)) {
    logText(data, logLevel.config);
  } else {
    logObject(data, logLevel.config, ancillaryInformation);
  }
}

/**
 * Log trace message
 * @param {*} text the text will be logged
 * @param {*} ancillaryInformation ancillary information
 */
export function logTrace(data, ancillaryInformation = '') {
  if (isString(data)) {
    logText(data, logLevel.trace);
  } else {
    logObject(data, logLevel.trace, ancillaryInformation);
  }
}

/**
 * Log debug message
 * @param {*} text the text will be logged
 * @param {*} ancillaryInformation ancillary information
 */
export function logDebug(data, ancillaryInformation = '') {
  if (isString(data)) {
    logText(data, logLevel.debug);
  } else {
    logObject(data, logLevel.debug, ancillaryInformation);
  }
}

/**
 * Log execute message
 * @param {*} text the text will be logged
 * @param {*} ancillaryInformation ancillary information
 */
export function logExecute(data, ancillaryInformation = '') {
  if (isString(data)) {
    logText(data, logLevel.execute);
  } else {
    logObject(data, logLevel.execute, ancillaryInformation);
  }
}

/**
 * Log error message
 * @param {*} text the text will be logged
 * @param {*} ancillaryInformation ancillary information
 */
export function logError(data, ancillaryInformation = '') {
  if (isString(data)) {
    logText(data, logLevel.error);
  } else {
    logObject(data, logLevel.error, ancillaryInformation);
  }
}

/**
 * 记录日志
 * @param {*} text the text will be logged
 * @param {*} level log level
 */
export function logText(text, level = logLevel.trace) {
  logData(text, logDisplay.text, level);
}

/**
 * Log object
 * @param {*} data the object data will be logged
 * @param {*} level log level
 * @param {*} ancillaryInformation ancillary information
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
 * @param {*} value switch value
 */
export function setLoggerDisplaySwitch(value) {
  loggerSwitch.display = toBoolean(value);
}
