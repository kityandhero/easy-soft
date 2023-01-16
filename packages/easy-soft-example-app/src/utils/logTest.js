import {
  logConfig,
  logDebug,
  logError,
  logExecute,
  logInfo,
  logTrace,
  logWarn,
  setLoggerDisplaySwitch,
} from 'easy-soft-utility';

export function testLogger() {
  logConfig('test log config');

  setLoggerDisplaySwitch(true);

  logConfig('test config log');
  logInfo('test info log');
  logDebug('test debug log');
  logExecute('test execute log');
  logTrace('test trace log');
  logWarn('test warn log');

  logError('test error log');
}
