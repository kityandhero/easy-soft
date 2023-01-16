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

  logInfo('test log with ancillary information', 'something');

  logConfig({
    message: 'test config log',
  });
  logInfo({
    message: 'test info log',
  });
  logConfig({
    message: 'test debug log',
  });
  logExecute({
    message: 'test execute log',
  });
  logTrace({
    message: 'test trace log',
  });
  logWarn({
    message: 'test warn log',
  });

  logInfo(
    {
      message: 'test log with ancillary information',
    },
    'something',
  );

  logError('test error log');
}
