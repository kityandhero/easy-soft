/**
 * Environment Collection
 */
export const envCollection = {
  WEAPP: 'WEAPP',
  WEB: 'WEB',
  RN: 'RN',
  SWAN: 'SWAN',
  ALIPAY: 'ALIPAY',
  TT: 'TT',
  QQ: 'QQ',
  JD: 'JD',
  UNKNOWN: 'UNKNOWN',
};

/**
 * Underlying State
 */
export const underlyingState = {
  loadApiPath: '',
  firstLoadSuccess: false,
  loadSuccess: false,
  registering: false,
  dataLoading: false,
  reloading: false,
  searching: false,
  refreshing: false,
  paging: false,
  processing: false,
  dispatchComplete: true,
  metaData: null,
  metaExtra: null,
  metaListData: [],
  metaOriginalData: null,
  urlParams: null,
  externalData: null,
};

/**
 * Underlying Extension State
 */
export const underlyingExtensionState = {
  dataLoading: true,
};

/**
 * Request Method Collection
 */
export const requestMethod = {
  get: 'GET',
  post: 'POST',
  put: 'PUT',
  delete: 'DELETE',
  trace: 'TRACE',
  connect: 'CONNECT',
};

/**
 * '0'
 */
export const zeroString = '0';

/**
 * 0
 */
export const zeroInt = 0;

/**
 * 1970-01-01 00:00
 */
export const emptyDatetime = '1970-01-01 00:00';

/**
 * Convert Type Collection
 */
export const convertCollection = {
  /**
   * 数字
   */
  number: 'number',

  /**
   * 日期 date
   */
  datetime: 'datetime',

  /**
   * 字符串
   */
  string: 'string',

  /**
   * moment日期
   */
  moment: 'moment',

  /**
   * 金额
   */
  money: 'money',

  /**
   * 数组
   */
  array: 'array',

  /**
   * 布尔
   */
  boolean: 'boolean',
};

/**
 * Format Mode Collection
 */
export const formatCollection = {
  /**
   * Format value to money string like '￥ 0.00'
   */
  money: 'money',

  /**
   * Format value to datetime string like YYYY-MM-DD hh:mm:ss
   */
  datetime: 'datetime',

  /**
   * Format value to chinese money string like '叁仟元整'
   */
  chineseMoney: 'chineseMoney',

  /**
   * Format value to percentage string like '15%'
   */
  percentage: 'percentage',
};

/**
 * Datetime Format Pattern Collection
 */
export const datetimeFormat = {
  /**
   * 'YYYY-MM-DD HH:mm:ss'
   */
  yearMonthDayHourMinuteSecond: 'YYYY-MM-DD HH:mm:ss',

  /**
   * 'YYYY-MM-DD HH:mm'
   */
  yearMonthDayHourMinute: 'YYYY-MM-DD HH:mm',

  /**
   * 'YYYY-MM-DD'
   */
  yearMonthDay: 'YYYY-MM-DD',

  /**
   * 'YYYY-MM'
   */
  yearMonth: 'YYYY-MM',

  /**
   * 'YYYY'
   */
  year: 'YYYY',

  /**
   * 'YYYY-MM-DD HH:mm:ss'
   */
  monthDayHourMinuteSecond: 'YYYY-MM-DD HH:mm:ss',

  /**
   * 'MM-DD HH:mm'
   */
  monthDayHourMinute: 'MM-DD HH:mm',

  /**
   * 'MM-DD'
   */
  monthDay: 'MM-DD',

  /**
   * 'HH:mm'
   */
  hourMinute: 'HH:mm',

  /**
   * 'HH:mm:ss'
   */
  hourMinuteSecond: 'HH:mm:ss',

  /**
   * 'MM'
   */
  month: 'MM',

  /**
   * 'DD'
   */
  day: 'DD',

  /**
   * 'HH'
   */
  hour: 'HH',

  /**
   * 'mm'
   */
  minute: 'mm',

  /**
   * 'ss'
   */
  second: 'ss',
};

/**
 * Sort Operation
 */
export const sortOperate = {
  moveUp: 'moveUp',
  moveDown: 'moveDown',
};

/**
 * string type whether -> '0' / '1'
 */
export const whetherString = {
  no: '0',
  yes: '1',
};

/**
 * number type whether -> 0 / 1
 */
export const whetherNumber = {
  no: 0,
  yes: 1,
};

/**
 * Log Level
 */
export const logLevel = {
  /**
   * Trace Log
   */
  trace: 'trace',

  /**
   * Debug Log
   */
  debug: 'debug',

  /**
   * Warn Log
   */
  warn: 'warn',

  /**
   * Error Log
   */
  error: 'error',

  /**
   * Exception Log
   */
  exception: 'exception',

  /**
   * Info Log
   */
  info: 'info',

  /**
   * Config Log
   */
  config: 'config',

  /**
   * Execute Log
   */
  execute: 'execute',

  /**
   * Stack Log
   */
  stack: 'stack',
};

/**
 * Log Display Mode
 */
export const logDisplay = {
  /**
   * Auto check to display
   */
  auto: 'auto',

  /**
   * Display string log in console
   */
  text: 'text',

  /**
   * Display object log in console
   */
  object: 'object',
};

const tipTypeCollection = {
  success: 'success',
  error: 'error',
  info: 'info',
  warning: 'warning',
  warn: 'warn',
  open: 'open',
};

export const notificationTypeCollection = {
  ...tipTypeCollection,
};

export const messageTypeCollection = {
  ...tipTypeCollection,
};

/**
 * A simple transparent image
 */
export const transparentImage =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABLCAYAAACGGCK3AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAA0SURBVHhe7cExAQAAAMKg9U9tDQ8gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIA3NXV7AAHfw7zWAAAAAElFTkSuQmCC';

/**
 * error transparent Image
 */
export const errorImage = transparentImage;
