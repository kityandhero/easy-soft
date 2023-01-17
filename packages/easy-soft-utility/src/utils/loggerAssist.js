import {
  checkInCollection,
  checkStringIsNullOrWhiteSpace,
  isString,
} from './checkAssist';
import { logDisplay, logLevel } from './constants';
import { toBoolean, toString, toUpper } from './convertAssist';
import { buildPromptModuleInfo } from './meta';

/**
 * Module Name.
 */
const moduleName = 'loggerAssist';

/**
 * Logger Switch.
 */
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
 * @param {String} text the string will be merged
 * @param {String} ancillaryInformation when ancillary Information not empty, it will be merged
 */
function mergeTextMessage(text, ancillaryInformation) {
  return `${toString(text)}${
    checkStringIsNullOrWhiteSpace(ancillaryInformation)
      ? ''
      : ` -> ${ancillaryInformation}`
  }`;
}

/**
 * Display text message
 * @param {Object} option log option
 * @param {String} option.data the string will be display
 * @param {String} option.color use this color to display
 * @param {String} option.dataDescription log prefix, when it not empty, it will be display
 * @param {String} option.ancillaryInformation when ancillary Information not empty, it will be display
 */
export function displayTextMessage({
  text,
  color = '',
  dataDescription = '',
  ancillaryInformation = '',
}) {
  const v = isString(text) ? text : JSON.stringify(text);

  const textAdjust = mergeTextMessage(v, ancillaryInformation);

  console.log(
    '%c%s',
    `color:${color};`,
    `${
      checkStringIsNullOrWhiteSpace(dataDescription)
        ? ''
        : `[${toUpper(dataDescription)}] `
    }${textAdjust}`,
  );
}

/**
 * Display object message
 * @param {Object} option log option
 * @param {String} option.data the string will be display
 * @param {String} option.color use this color to display
 * @param {String} option.dataDescription log prefix, when it not empty, it will be display
 * @param {String} option.ancillaryInformation when ancillary Information not empty, it will be display
 */
export function displayObjectMessage({
  data,
  color = '',
  dataDescription = '',
  ancillaryInformation = '',
}) {
  displayTextMessage({
    text: `check the following object data`,
    color: color,
    dataDescription: dataDescription,
    ancillaryInformation: ancillaryInformation,
  });

  console.log(data);
}

/**
 * Log data message, default displayMode is logDisplay.auto, default level is logLevel.debug, default ancillaryInformation is empty string
 * @param {String} data the data will be display
 * @param {String} displayMode display mode, use logDisplay enum
 * @param {String} level log level, use logLevel enum
 * @param {String} ancillaryInformation when ancillary Information not empty, it will be display
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
      const text = `${buildPromptModuleInfo(
        moduleName,
      )}logData -> logger display switch default is false, if want to display log, please set it before first log, use setLoggerDisplaySwitch to set it, this message only show once.`;

      displayTextMessage({
        text: text,
        color: '#08BBEE',
        dataDescription: 'hint',
        ancillaryInformation: '',
      });

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
      const o = `error -> ${data}${
        checkStringIsNullOrWhiteSpace(ancillaryInformation)
          ? ''
          : `, ${toUpper(ancillaryInformation)}`
      }.`;

      console.error(o);
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
        dataDescription: 'trace',
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
        dataDescription: 'debug',
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
        dataDescription: 'warn',
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
        dataDescription: 'info',
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
        dataDescription: 'execute',
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
        dataDescription: 'config',
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
 * Log warn message, default ancillaryInformation is empty string
 * @param {String|Object} data the data will be display
 * @param {String} ancillaryInformation when ancillary Information not empty, it will be display
 */
export function logWarn(data, ancillaryInformation = '') {
  if (isString(data)) {
    logText(data, logLevel.warn, ancillaryInformation);
  } else {
    logObject(data, logLevel.warn, ancillaryInformation);
  }
}

/**
 * Log info message, default ancillaryInformation is empty string
 * @param {String|Object} data the data will be display
 * @param {String} ancillaryInformation when ancillary Information not empty, it will be display
 */
export function logInfo(data, ancillaryInformation = '') {
  if (isString(data)) {
    logText(data, logLevel.info, ancillaryInformation);
  } else {
    logObject(data, logLevel.info, ancillaryInformation);
  }
}

/**
 * Log config message, default ancillaryInformation is empty string
 * @param {String|Object} data the data will be display
 * @param {String} ancillaryInformation when ancillary Information not empty, it will be display
 */
export function logConfig(data, ancillaryInformation = '') {
  if (isString(data)) {
    logText(data, logLevel.config, ancillaryInformation);
  } else {
    logObject(data, logLevel.config, ancillaryInformation);
  }
}

/**
 * Log trace message, default ancillaryInformation is empty string
 * @param {String|Object} data the data will be display
 * @param {String} ancillaryInformation when ancillary Information not empty, it will be display
 */
export function logTrace(data, ancillaryInformation = '') {
  if (isString(data)) {
    logText(data, logLevel.trace, ancillaryInformation);
  } else {
    logObject(data, logLevel.trace, ancillaryInformation);
  }
}

/**
 * Log debug message, default ancillaryInformation is empty string
 * @param {String|Object} data the data will be display
 * @param {String} ancillaryInformation when ancillary Information not empty, it will be display
 */
export function logDebug(data, ancillaryInformation = '') {
  if (isString(data)) {
    logText(data, logLevel.debug, ancillaryInformation);
  } else {
    logObject(data, logLevel.debug, ancillaryInformation);
  }
}

/**
 * Log execute message, default ancillaryInformation is empty string
 * @param {String|Object} data the data will be display
 * @param {String} ancillaryInformation when ancillary Information not empty, it will be display
 */
export function logExecute(data, ancillaryInformation = '') {
  if (isString(data)) {
    logText(data, logLevel.execute, ancillaryInformation);
  } else {
    logObject(data, logLevel.execute, ancillaryInformation);
  }
}

/**
 * Log error message, default ancillaryInformation is empty string
 * @param {String|Object} data the data will be display
 * @param {String} ancillaryInformation when ancillary Information not empty, it will be display
 */
export function logError(data, ancillaryInformation = '') {
  if (isString(data)) {
    logText(data, logLevel.error, ancillaryInformation);
  } else {
    logObject(data, logLevel.error, ancillaryInformation);
  }
}

/**
 * Log text message, default level is logLevel.trace, default ancillaryInformation is empty string
 * @param {String} text the text will be display
 * @param {String} level log level, use logLevel enum
 * @param {String} ancillaryInformation when ancillary Information not empty, it will be display
 */
export function logText(
  text,
  level = logLevel.trace,
  ancillaryInformation = '',
) {
  logData(text, logDisplay.text, level, ancillaryInformation);
}

/**
 * Log object message, default level is logLevel.trace, default ancillaryInformation is empty string
 * @param {String} data the data will be display
 * @param {String} level log level, use logLevel enum
 * @param {String} ancillaryInformation when ancillary Information not empty, it will be display
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
 * @param {Boolean} value display switch
 */
export function setLoggerDisplaySwitch(value) {
  loggerSwitch.display = toBoolean(value);
}
