import {
  logConfig,
  logDebug,
  logError,
  logException,
  logExecute,
  logInfo,
  logStack,
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
  logException('test exception log');
  logStack('test stack log');

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
  logError({
    message: 'test error log',
  });
  logException({
    message: 'test exception log',
  });
  logStack({
    message: 'test stack log',
  });

  logInfo(
    {
      message: 'test log with ancillary information',
    },
    'something',
  );

  logError('test error log');
}
