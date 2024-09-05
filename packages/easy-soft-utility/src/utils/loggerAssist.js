import {
  checkInCollection,
  checkStringIsNullOrWhiteSpace,
  isArray,
  isEmptyArray,
  isEmptyObject,
  isObject,
  isString,
} from './checkAssist';
import { logDisplay, logLevel } from './constants';
import { toBoolean, toUpper } from './convertAssist';
import { modulePackageName } from './definition';
import { checkWhetherDevelopmentEnvironment, stringifyJson } from './meta';
import { buildPromptModuleInfo } from './promptAssist';
import { mergeArrowText } from './tools';

/**
 * Module Name.
 * @private
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

export const logColorCollection = {
  config: '#F8C471',
  execute: '#C39BD3',
  info: '#89CA78',
  warn: '#F16F17',
  debug: '#00768F',
  trace: '#596032',
  error: '#E33F3E',
  exception: '#DC428E',
  stack: '#81977c',
  develop: '#9f6027',
  callTrack: '#889a14',
  callTrace: '#596032',
  render: '#7093f4',
};

function buildPromptModuleInfoText(text) {
  return buildPromptModuleInfo(modulePackageName, text, moduleName);
}

/**
 * Display text message
 * @param {Object} option log option
 * @param {string} option.text the string will be display
 * @param {string} option.color use this color to display
 * @param {string} option.dataDescription log prefix, when it not empty, it will be display
 * @param {string|Array} option.ancillaryInformation when ancillary Information not empty, it will be display
 */
export function displayTextMessage({
  text,
  color = '',
  dataDescription = '',
  ancillaryInformation = '',
}) {
  const v = isString(text) ? text : stringifyJson(text);

  let textAdjust = '';

  textAdjust = isArray(ancillaryInformation)
    ? mergeArrowText(v, ...ancillaryInformation)
    : mergeArrowText(v, ancillaryInformation);

  if (checkStringIsNullOrWhiteSpace(displayTextMessage)) {
    return;
  }

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
 * @param {string} option.data the string will be display
 * @param {string} option.color use this color to display
 * @param {string} option.dataDescription log prefix, when it not empty, it will be display
 * @param {string|Array} option.ancillaryInformation when ancillary Information not empty, it will be display
 */
export function displayObjectMessage({
  data,
  color = '',
  dataDescription = '',
  ancillaryInformation = '',
}) {
  if (isArray(data)) {
    displayTextMessage({
      text: isEmptyArray(data) ? '' : `check the following array data`,
      color: color,
      dataDescription: dataDescription,
      ancillaryInformation: ancillaryInformation,
    });

    if (!isEmptyArray(data)) {
      console.log(data);
    }

    return;
  }

  if (isObject(data)) {
    displayTextMessage({
      text: isEmptyObject(data) ? '' : `check the following object data`,
      color: color,
      dataDescription: dataDescription,
      ancillaryInformation: ancillaryInformation,
    });

    if (!isEmptyObject(data)) {
      console.log(data);
    }

    return;
  }

  displayTextMessage({
    text: `check the following data`,
    color: color,
    dataDescription: dataDescription,
    ancillaryInformation: ancillaryInformation,
  });

  console.log(data);
}

/**
 * Log data message, default displayMode is logDisplay.auto, default level is logLevel.debug, default ancillaryInformation is empty string
 * @param {string} data the data will be display
 * @param {string} displayMode display mode, use logDisplay enum
 * @param {string} level log level, use logLevel enum
 * @param {string|Array} ancillaryInformation when ancillary Information not empty, it will be display
 * @param {Object} option cover config, eg { color: '#565242' }
 */
export function logData(
  data,
  displayMode = logDisplay.auto,
  level = logLevel.debug,
  ancillaryInformation = '',
  option = {},
) {
  const loggerDisplaySwitch = getLoggerDisplaySwitch();

  const { color: colorAdjust = '', prefix: prefixAdjust = '' } = {
    color: '',
    prefix: '',
    ...option,
  };

  if (
    level != logLevel.develop &&
    !loggerSwitch.loggerDisplaySwitchSetComplete &&
    !loggerSwitch.loggerDisplaySwitchPromptSetInformationComplete
  ) {
    const text = buildPromptModuleInfo(
      modulePackageName,
      mergeArrowText(
        'logData',
        'logger display switch default is false, if want to display log, please set it before first log, use setLoggerDisplaySwitch to set it, this message only show once',
      ),
      moduleName,
    );

    displayTextMessage({
      text: text,
      color: colorAdjust || logColorCollection.develop,
      dataDescription: prefixAdjust || logLevel.develop,
      ancillaryInformation: '',
    });

    try {
      throw new Error('please set use setLoggerDisplaySwitch');
    } catch (error) {
      console.error(error);
    }

    loggerSwitch.loggerDisplaySwitchPromptSetInformationComplete = true;
  }

  if (
    !loggerDisplaySwitch &&
    !checkInCollection([logLevel.exception, logLevel.develop], level)
  ) {
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
    showModeModified = isString(data) ? logDisplay.text : logDisplay.object;
  }

  if (level === logLevel.exception) {
    if (showModeModified === logDisplay.text) {
      displayTextMessage({
        text: data,
        color: colorAdjust || logColorCollection.exception,
        dataDescription: prefixAdjust || 'exception',
        ancillaryInformation: ancillaryInformation,
      });
    }

    if (showModeModified === logDisplay.object) {
      displayObjectMessage({
        data: data,
        color: colorAdjust || logColorCollection.exception,
        dataDescription: prefixAdjust || 'exception',
        ancillaryInformation: ancillaryInformation,
      });
    }

    try {
      throw new Error(
        `an error occur, check the above error message, the stack information is as follows`,
      );
    } catch (error_) {
      console.error(error_);
    }

    return;
  }

  if (level === logLevel.develop && checkWhetherDevelopmentEnvironment()) {
    if (showModeModified === logDisplay.text) {
      displayTextMessage({
        text: data,
        color: colorAdjust || logColorCollection.develop,
        dataDescription: prefixAdjust || 'develop',
        ancillaryInformation: ancillaryInformation,
      });
    }

    if (showModeModified === logDisplay.object) {
      displayObjectMessage({
        data: data,
        color: colorAdjust || logColorCollection.develop,
        dataDescription: prefixAdjust || 'develop',
        ancillaryInformation: ancillaryInformation,
      });
    }
  }

  if (!loggerDisplaySwitch) {
    return;
  }

  if (level === logLevel.render) {
    if (showModeModified === logDisplay.text) {
      displayTextMessage({
        text: data,
        color: colorAdjust || logColorCollection.render,
        dataDescription: prefixAdjust || 'render',
        ancillaryInformation: ancillaryInformation,
      });
    }

    if (showModeModified === logDisplay.object) {
      displayObjectMessage({
        data: data,
        color: colorAdjust || logColorCollection.render,
        dataDescription: prefixAdjust || 'render',
        ancillaryInformation: ancillaryInformation,
      });
    }
  }

  if (level === logLevel.trace) {
    if (showModeModified === logDisplay.text) {
      displayTextMessage({
        text: data,
        color: colorAdjust || logColorCollection.trace,
        dataDescription: prefixAdjust || 'trace',
        ancillaryInformation: ancillaryInformation,
      });
    }

    if (showModeModified === logDisplay.object) {
      displayObjectMessage({
        data: data,
        color: colorAdjust || logColorCollection.trace,
        dataDescription: prefixAdjust || 'trace',
        ancillaryInformation: ancillaryInformation,
      });
    }
  }

  if (level === logLevel.callTrack) {
    if (showModeModified === logDisplay.text) {
      displayTextMessage({
        text: data,
        color: colorAdjust || logColorCollection.callTrack,
        dataDescription: prefixAdjust || 'callTrack',
        ancillaryInformation: ancillaryInformation,
      });
    }

    if (showModeModified === logDisplay.object) {
      displayObjectMessage({
        data: data,
        color: colorAdjust || logColorCollection.callTrack,
        dataDescription: prefixAdjust || 'callTrack',
        ancillaryInformation: ancillaryInformation,
      });
    }
  }

  if (level === logLevel.callTrace) {
    if (showModeModified === logDisplay.text) {
      displayTextMessage({
        text: data,
        color: colorAdjust || logColorCollection.callTrace,
        dataDescription: prefixAdjust || 'callTrace',
        ancillaryInformation: ancillaryInformation,
      });
    }

    if (showModeModified === logDisplay.object) {
      displayObjectMessage({
        data: data,
        color: colorAdjust || logColorCollection.callTrace,
        dataDescription: prefixAdjust || 'callTrace',
        ancillaryInformation: ancillaryInformation,
      });
    }
  }

  if (level === logLevel.debug) {
    if (showModeModified === logDisplay.text) {
      displayTextMessage({
        text: data,
        color: colorAdjust || logColorCollection.debug,
        dataDescription: prefixAdjust || 'debug',
        ancillaryInformation: ancillaryInformation,
      });
    }

    if (showModeModified === logDisplay.object) {
      displayObjectMessage({
        data: data,
        color: colorAdjust || logColorCollection.debug,
        dataDescription: prefixAdjust || 'debug',
        ancillaryInformation: ancillaryInformation,
      });
    }
  }

  if (level === logLevel.warn) {
    if (showModeModified === logDisplay.text) {
      displayTextMessage({
        text: data,
        color: colorAdjust || logColorCollection.warn,
        dataDescription: prefixAdjust || 'warn',
        ancillaryInformation: ancillaryInformation,
      });
    }

    if (showModeModified === logDisplay.object) {
      displayObjectMessage({
        data: data,
        color: colorAdjust || logColorCollection.warn,
        dataDescription: prefixAdjust || 'warn',
        ancillaryInformation: ancillaryInformation,
      });
    }
  }

  if (level === logLevel.info) {
    if (showModeModified === logDisplay.text) {
      displayTextMessage({
        text: data,
        color: colorAdjust || logColorCollection.info,
        dataDescription: prefixAdjust || 'info',
        ancillaryInformation: ancillaryInformation,
      });
    }

    if (showModeModified === logDisplay.object) {
      displayObjectMessage({
        data: data,
        color: colorAdjust || logColorCollection.info,
        dataDescription: prefixAdjust || 'info',
        ancillaryInformation: ancillaryInformation,
      });
    }
  }

  if (level === logLevel.execute) {
    if (showModeModified === logDisplay.text) {
      displayTextMessage({
        text: data,
        color: colorAdjust || logColorCollection.execute,
        dataDescription: prefixAdjust || 'execute',
        ancillaryInformation: ancillaryInformation,
      });
    }

    if (showModeModified === logDisplay.object) {
      displayObjectMessage({
        data: data,
        color: colorAdjust || logColorCollection.execute,
        dataDescription: prefixAdjust || 'execute',
        ancillaryInformation: ancillaryInformation,
      });
    }
  }

  if (level === logLevel.config) {
    if (showModeModified === logDisplay.text) {
      displayTextMessage({
        text: data,
        color: colorAdjust || logColorCollection.config,
        dataDescription: prefixAdjust || 'config',
        ancillaryInformation: ancillaryInformation,
      });
    }

    if (showModeModified === logDisplay.object) {
      displayObjectMessage({
        data: data,
        color: colorAdjust || logColorCollection.config,
        dataDescription: prefixAdjust || 'config',
        ancillaryInformation: ancillaryInformation,
      });
    }
  }

  if (level === logLevel.stack) {
    if (showModeModified === logDisplay.text) {
      displayTextMessage({
        text: data,
        color: colorAdjust || logColorCollection.stack,
        dataDescription: prefixAdjust || 'stack',
        ancillaryInformation: ancillaryInformation,
      });
    }

    if (showModeModified === logDisplay.object) {
      displayObjectMessage({
        data: data,
        color: colorAdjust || logColorCollection.stack,
        dataDescription: prefixAdjust || 'stack',
        ancillaryInformation: ancillaryInformation,
      });
    }

    console.trace('stack call trace as bellow');
  }

  if (level === logLevel.error) {
    if (showModeModified === logDisplay.text) {
      displayTextMessage({
        text: data,
        color: colorAdjust || logColorCollection.error,
        dataDescription: prefixAdjust || 'error',
        ancillaryInformation: ancillaryInformation,
      });
    }

    if (showModeModified === logDisplay.object) {
      displayObjectMessage({
        data: data,
        color: colorAdjust || logColorCollection.error,
        dataDescription: prefixAdjust || 'error',
        ancillaryInformation: ancillaryInformation,
      });
    }
  }
}

/**
 * Log warn message, default ancillaryInformation is empty string
 * @param {string|Object} data the data will be display
 * @param {string|Array} ancillaryInformation when ancillary Information not empty, it will be display
 * @param {Object} option cover config, eg { color: '#565242' }
 */
export function logWarn(data, ancillaryInformation = '', option = {}) {
  if (isString(data)) {
    logText(data, logLevel.warn, ancillaryInformation, option);
  } else {
    logObject(data, logLevel.warn, ancillaryInformation, option);
  }
}

/**
 * Log info message, default ancillaryInformation is empty string
 * @param {string|Object} data the data will be display
 * @param {string|Array} ancillaryInformation when ancillary Information not empty, it will be display
 * @param {Object} option cover config, eg { color: '#565242' }
 */
export function logInfo(data, ancillaryInformation = '', option = {}) {
  if (isString(data)) {
    logText(data, logLevel.info, ancillaryInformation, option);
  } else {
    logObject(data, logLevel.info, ancillaryInformation, option);
  }
}

/**
 * Log config message, default ancillaryInformation is empty string
 * @param {string|Object} data the data will be display
 * @param {string|Array} ancillaryInformation when ancillary Information not empty, it will be display
 * @param {Object} option cover config, eg { color: '#565242' }
 */
export function logConfig(data, ancillaryInformation = '', option = {}) {
  if (isString(data)) {
    logText(data, logLevel.config, ancillaryInformation, option);
  } else {
    logObject(data, logLevel.config, ancillaryInformation, option);
  }
}

/**
 * Log development environment message, default ancillaryInformation is empty string
 * @param {string|Object} data the data will be display
 * @param {string|Array} ancillaryInformation when ancillary Information not empty, it will be display
 * @param {Object} option cover config, eg { color: '#565242' }
 */
export function logDevelop(data, ancillaryInformation = '', option = {}) {
  if (isString(data)) {
    logText(data, logLevel.develop, ancillaryInformation, option);
  } else {
    logObject(data, logLevel.develop, ancillaryInformation, option);
  }
}

/**
 * Log stack message, default ancillaryInformation is empty string
 * @param {string|Object} data the data will be display
 * @param {string|Array} ancillaryInformation when ancillary Information not empty, it will be display
 * @param {Object} option cover config, eg { color: '#565242' }
 */
export function logStack(data, ancillaryInformation = '', option = {}) {
  if (isString(data)) {
    logText(data, logLevel.stack, ancillaryInformation, option);
  } else {
    logObject(data, logLevel.stack, ancillaryInformation, option);
  }
}

/**
 * Log trace message, default ancillaryInformation is empty string
 * @param {string|Object} data the data will be display
 * @param {string|Array} ancillaryInformation when ancillary Information not empty, it will be display
 * @param {Object} option cover config, eg { color: '#565242' }
 */
export function logTrace(data, ancillaryInformation = '', option = {}) {
  if (isString(data)) {
    logText(data, logLevel.trace, ancillaryInformation, option);
  } else {
    logObject(data, logLevel.trace, ancillaryInformation, option);
  }
}

/**
 * Log call track message, default ancillaryInformation is empty string
 * @param {string|Object} data the data will be display
 * @param {string|Array} ancillaryInformation when ancillary Information not empty, it will be display
 * @param {Object} option cover config, eg { color: '#565242' }
 */
export function logCallTrack(data, ancillaryInformation = '', option = {}) {
  if (isString(data)) {
    logText(data, logLevel.callTrack, ancillaryInformation, option);
  } else {
    logObject(data, logLevel.callTrack, ancillaryInformation, option);
  }
}

/**
 * Log call trace message, default ancillaryInformation is empty string
 * @param {string|Object} data the data will be display
 * @param {string|Array} ancillaryInformation when ancillary Information not empty, it will be display
 * @param {Object} option cover config, eg { color: '#565242' }
 */
export function logCallTrace(data, ancillaryInformation = '', option = {}) {
  if (isString(data)) {
    logText(data, logLevel.callTrace, ancillaryInformation, option);
  } else {
    logObject(data, logLevel.callTrace, ancillaryInformation, option);
  }
}

/**
 * Log call result message, default ancillaryInformation is empty string
 * @param {string|Object} data the data will be display
 * @param {string|Array} ancillaryInformation when ancillary Information not empty, it will be display
 * @param {Object} option cover config, eg { color: '#565242' }
 */
export function logCallResult(data, ancillaryInformation = '', option = {}) {
  if (isString(data)) {
    logText(data, logLevel.callResult, ancillaryInformation, option);
  } else {
    logObject(data, logLevel.callResult, ancillaryInformation, option);
  }
}

/**
 * Log render message, default ancillaryInformation is empty string
 * @param {string|Object} data the data will be display
 * @param {string|Array} ancillaryInformation when ancillary Information not empty, it will be display
 * @param {Object} option cover config, eg { color: '#565242' }
 */
export function logRender(data, ancillaryInformation = '', option = {}) {
  if (isString(data)) {
    logText(data, logLevel.render, ancillaryInformation, option);
  } else {
    logObject(data, logLevel.render, ancillaryInformation, option);
  }
}

/**
 * Log debug message, default ancillaryInformation is empty string
 * @param {string|Object} data the data will be display
 * @param {string|Array} ancillaryInformation when ancillary Information not empty, it will be display
 * @param {Object} option cover config, eg { color: '#565242' }
 */
export function logDebug(data, ancillaryInformation = '', option = {}) {
  if (isString(data)) {
    logText(data, logLevel.debug, ancillaryInformation, option);
  } else {
    logObject(data, logLevel.debug, ancillaryInformation, option);
  }
}

/**
 * Log execute message, default ancillaryInformation is empty string
 * @param {string|Object} data the data will be display
 * @param {string|Array} ancillaryInformation when ancillary Information not empty, it will be display
 * @param {Object} option cover config, eg { color: '#565242' }
 */
export function logExecute(data, ancillaryInformation = '', option = {}) {
  if (isString(data)) {
    logText(data, logLevel.execute, ancillaryInformation, option);
  } else {
    logObject(data, logLevel.execute, ancillaryInformation, option);
  }
}

/**
 * Log error message, default ancillaryInformation is empty string
 * @param {string|Object} data the data will be display
 * @param {string|Array} ancillaryInformation when ancillary Information not empty, it will be display
 * @param {Object} option cover config, eg { color: '#565242' }
 */
export function logError(data, ancillaryInformation = '', option = {}) {
  if (isString(data)) {
    logText(data, logLevel.error, ancillaryInformation, option);
  } else {
    logObject(data, logLevel.error, ancillaryInformation, option);
  }
}

/**
 * Log error message, default ancillaryInformation is empty string
 * @param {string|Object} data the data will be display
 * @param {string|Array} ancillaryInformation when ancillary Information not empty, it will be display
 * @param {Object} option cover config, eg { color: '#565242' }
 */
export function logException(data, ancillaryInformation = '', option = {}) {
  if (isString(data)) {
    logText(data, logLevel.exception, ancillaryInformation, option);
  } else {
    logObject(data, logLevel.exception, ancillaryInformation, option);
  }
}

/**
 * Log text message, default level is logLevel.trace, default ancillaryInformation is empty string
 * @param {string} text the text will be display
 * @param {string} level log level, use logLevel enum
 * @param {string|Array} ancillaryInformation when ancillary Information not empty, it will be display
 * @param {Object} option cover config, eg { color: '#565242' }
 */
export function logText(
  text,
  level = logLevel.trace,
  ancillaryInformation = '',
  option = {},
) {
  logData(text, logDisplay.text, level, ancillaryInformation, option);
}

/**
 * Log object message, default level is logLevel.trace, default ancillaryInformation is empty string
 * @param {Object} data the data will be display
 * @param {string} level log level, use logLevel enum
 * @param {string|Array} ancillaryInformation when ancillary Information not empty, it will be display
 * @param {Object} option cover config, eg { color: '#565242' }
 */
export function logObject(
  data,
  level = logLevel.trace,
  ancillaryInformation = '',
  option = {},
) {
  logData(data, logDisplay.object, level, ancillaryInformation, option);
}

/**
 * Get logger display switch
 */
export function getLoggerDisplaySwitch() {
  return toBoolean(loggerSwitch.display);
}

/**
 * Set logger display switch
 * @param {boolean} value display switch
 */
export function setLoggerDisplaySwitch(value) {
  logDevelop(
    buildPromptModuleInfoText('setLoggerDisplaySwitch'),
    toBoolean(value),
  );

  loggerSwitch.display = toBoolean(value);

  loggerSwitch.loggerDisplaySwitchSetComplete = true;
}

export function logConsole(
  o,
  description = '',
  division = '=================================',
) {
  const line = `${division}${checkStringIsNullOrWhiteSpace(console) ? '' : ` ${description} `}${division}`;

  console.log(line);

  console.log(o);
}
