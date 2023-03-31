/**
 * 底层通用数据定义
 */
export const modelGlobalCollection = {
  whetherList: [
    {
      key: 'b24a21cf-a45c-4b6a-9993-f6953d7eb1ee',
      flag: '0',
      name: '否',
      alias: '否',
      description: '',
      availability: 1,
    },
    {
      key: 'ea1b8b1e-7b78-4b29-bbce-57ef0b25e23c',
      flag: '1',
      name: '是',
      alias: '是',
      description: '',
      availability: 1,
    },
  ],
};

/**
 * accessWaySpecialCollection
 */
export const accessWaySpecialCollection = {
  super: {
    permission: 'super',
  },
};

/**
 * Environment Collection
 */
export const environmentCollection = {
  ALIPAY: 'ALIPAY',
  JD: 'JD',
  QQ: 'QQ',
  RN: 'RN',
  SWAN: 'SWAN',
  TT: 'TT',
  UNKNOWN: 'UNKNOWN',
  WEAPP: 'WEAPP',
  WEB: 'WEB',
};

/**
 * Align Horizontal
 */
export const alignHorizontal = {
  center: 'center',
  left: 'left',
  right: 'right',
};

/**
 * Align Vertical
 */
export const alignVertical = {
  bottom: 'bottom',
  middle: 'middle',
  top: 'top',
};

/**
 * Underlying State
 */
export const underlyingState = {
  dataLoading: false,
  dispatchComplete: true,
  externalData: null,
  firstLoadSuccess: false,
  loadApiPath: '',
  loadSuccess: false,
  metaData: null,
  metaExtra: null,
  metaListData: [],
  metaOriginalData: null,
  paging: false,
  processing: false,
  refreshing: false,
  registering: false,
  reloading: false,
  searching: false,
  urlParams: null,
};

/**
 * Underlying Extension State
 */
export const underlyingExtensionState = {
  dataLoading: true,
};

/**
 * Request Mode
 */
export const requestMode = {
  /**
   * Really Request
   */
  real: 'real',

  /**
   * Simulative Request
   */
  simulation: 'simulation',
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

  /**
   * Development Environment Log
   */
  develop: 'develop',

  /**
   * Call Track Log
   */
  callTrack: 'callTrack',

  /**
   * Render Log
   */
  render: 'render',
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

export const notificationTypeCollection = {
  open: 'open',
  loading: 'loading',
  info: 'info',
  warning: 'warning',
  warn: 'warn',
  success: 'success',
  error: 'error',
};

/**
 * Message Type Collection
 */
export const messageTypeCollection = {
  open: 'open',
  loading: 'loading',
  info: 'info',
  warning: 'warning',
  warn: 'warn',
  success: 'success',
  error: 'error',
};

/**
 * A Simple Transparent Image
 */
export const transparentImage =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABLCAYAAACGGCK3AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAA0SURBVHhe7cExAQAAAMKg9U9tDQ8gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIA3NXV7AAHfw7zWAAAAAElFTkSuQmCC';

/**
 * error transparent Image
 */
export const errorImage = transparentImage;
