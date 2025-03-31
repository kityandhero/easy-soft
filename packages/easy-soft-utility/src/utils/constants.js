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
   * whetherNumber
   */
  whetherNumber: 'whetherNumber',

  /**
   * whetherString
   */
  whetherString: 'whetherString',

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
   * Call Trace Log
   */
  callTrace: 'callTrace',

  /**
   * Call Result Log
   */
  callResult: 'callResult',

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

/**
 * 农历1900-2100的润大小信息表
 * @return Hex
 */
export const lunarInfoCollection = [
  //1900-1909
  0x0_4b_d8, 0x0_4a_e0, 0x0_a5_70, 0x0_54_d5, 0x0_d2_60, 0x0_d9_50, 0x1_65_54,
  0x0_56_a0, 0x0_9a_d0, 0x0_55_d2,
  //1910-1919
  0x0_4a_e0, 0x0_a5_b6, 0x0_a4_d0, 0x0_d2_50, 0x1_d2_55, 0x0_b5_40, 0x0_d6_a0,
  0x0_ad_a2, 0x0_95_b0, 0x1_49_77,
  //1920-1929
  0x0_49_70, 0x0_a4_b0, 0x0_b4_b5, 0x0_6a_50, 0x0_6d_40, 0x1_ab_54, 0x0_2b_60,
  0x0_95_70, 0x0_52_f2, 0x0_49_70,
  //1930-1939
  0x0_65_66, 0x0_d4_a0, 0x0_ea_50, 0x0_6e_95, 0x0_5a_d0, 0x0_2b_60, 0x1_86_e3,
  0x0_92_e0, 0x1_c8_d7, 0x0_c9_50,
  //1940-1949
  0x0_d4_a0, 0x1_d8_a6, 0x0_b5_50, 0x0_56_a0, 0x1_a5_b4, 0x0_25_d0, 0x0_92_d0,
  0x0_d2_b2, 0x0_a9_50, 0x0_b5_57,
  //1950-1959
  0x0_6c_a0, 0x0_b5_50, 0x1_53_55, 0x0_4d_a0, 0x0_a5_b0, 0x1_45_73, 0x0_52_b0,
  0x0_a9_a8, 0x0_e9_50, 0x0_6a_a0,
  //1960-1969
  0x0_ae_a6, 0x0_ab_50, 0x0_4b_60, 0x0_aa_e4, 0x0_a5_70, 0x0_52_60, 0x0_f2_63,
  0x0_d9_50, 0x0_5b_57, 0x0_56_a0,
  //1970-1979
  0x0_96_d0, 0x0_4d_d5, 0x0_4a_d0, 0x0_a4_d0, 0x0_d4_d4, 0x0_d2_50, 0x0_d5_58,
  0x0_b5_40, 0x0_b6_a0, 0x1_95_a6,
  //1980-1989
  0x0_95_b0, 0x0_49_b0, 0x0_a9_74, 0x0_a4_b0, 0x0_b2_7a, 0x0_6a_50, 0x0_6d_40,
  0x0_af_46, 0x0_ab_60, 0x0_95_70,
  //1990-1999
  0x0_4a_f5, 0x0_49_70, 0x0_64_b0, 0x0_74_a3, 0x0_ea_50, 0x0_6b_58, 0x0_55_c0,
  0x0_ab_60, 0x0_96_d5, 0x0_92_e0,
  //2000-2009
  0x0_c9_60, 0x0_d9_54, 0x0_d4_a0, 0x0_da_50, 0x0_75_52, 0x0_56_a0, 0x0_ab_b7,
  0x0_25_d0, 0x0_92_d0, 0x0_ca_b5,
  //2010-2019
  0x0_a9_50, 0x0_b4_a0, 0x0_ba_a4, 0x0_ad_50, 0x0_55_d9, 0x0_4b_a0, 0x0_a5_b0,
  0x1_51_76, 0x0_52_b0, 0x0_a9_30,
  //2020-2029
  0x0_79_54, 0x0_6a_a0, 0x0_ad_50, 0x0_5b_52, 0x0_4b_60, 0x0_a6_e6, 0x0_a4_e0,
  0x0_d2_60, 0x0_ea_65, 0x0_d5_30,
  //2030-2039
  0x0_5a_a0, 0x0_76_a3, 0x0_96_d0, 0x0_4a_fb, 0x0_4a_d0, 0x0_a4_d0, 0x1_d0_b6,
  0x0_d2_50, 0x0_d5_20, 0x0_dd_45,
  //2040-2049
  0x0_b5_a0, 0x0_56_d0, 0x0_55_b2, 0x0_49_b0, 0x0_a5_77, 0x0_a4_b0, 0x0_aa_50,
  0x1_b2_55, 0x0_6d_20, 0x0_ad_a0,
  //2050-2059
  0x1_4b_63, 0x0_93_70, 0x0_49_f8, 0x0_49_70, 0x0_64_b0, 0x1_68_a6, 0x0_ea_50,
  0x0_6b_20, 0x1_a6_c4, 0x0_aa_e0,
  //2060-2069
  0x0_a2_e0, 0x0_d2_e3, 0x0_c9_60, 0x0_d5_57, 0x0_d4_a0, 0x0_da_50, 0x0_5d_55,
  0x0_56_a0, 0x0_a6_d0, 0x0_55_d4,
  //2070-2079
  0x0_52_d0, 0x0_a9_b8, 0x0_a9_50, 0x0_b4_a0, 0x0_b6_a6, 0x0_ad_50, 0x0_55_a0,
  0x0_ab_a4, 0x0_a5_b0, 0x0_52_b0,
  //2080-2089
  0x0_b2_73, 0x0_69_30, 0x0_73_37, 0x0_6a_a0, 0x0_ad_50, 0x1_4b_55, 0x0_4b_60,
  0x0_a5_70, 0x0_54_e4, 0x0_d1_60,
  //2090-2099
  0x0_e9_68, 0x0_d5_20, 0x0_da_a0, 0x1_6a_a6, 0x0_56_d0, 0x0_4a_e0, 0x0_a9_d4,
  0x0_a2_d0, 0x0_d1_50, 0x0_f2_52,
  //2100
  0x0_d5_20,
];

/**
 * 公历每个月份的天数普通表
 * @return Number
 */
export const solarMonthCollection = [
  31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31,
];

/**
 * 天干速查表 ["甲","乙","丙","丁","戊","己","庚","辛","壬","癸"]
 * @return string
 */
export const heavenlyStemCollection = [
  '\u7532',
  '\u4E59',
  '\u4E19',
  '\u4E01',
  '\u620A',
  '\u5DF1',
  '\u5E9A',
  '\u8F9B',
  '\u58EC',
  '\u7678',
];

/**
 * 地支速查表 ["子","丑","寅","卯","辰","巳","午","未","申","酉","戌","亥"]
 * @return string
 */
export const earthlyBranchCollection = [
  '\u5B50',
  '\u4E11',
  '\u5BC5',
  '\u536F',
  '\u8FB0',
  '\u5DF3',
  '\u5348',
  '\u672A',
  '\u7533',
  '\u9149',
  '\u620C',
  '\u4EA5',
];

/**
 * 生肖 ["鼠","牛","虎","兔","龙","蛇","马","羊","猴","鸡","狗","猪"]
 * @return string
 */
export const chineseZodiacCollection = [
  '\u9F20',
  '\u725B',
  '\u864E',
  '\u5154',
  '\u9F99',
  '\u86C7',
  '\u9A6C',
  '\u7F8A',
  '\u7334',
  '\u9E21',
  '\u72D7',
  '\u732A',
];

/**
 * 24节气速查表 ["小寒","大寒","立春","雨水","惊蛰","春分","清明","谷雨","立夏","小满","芒种","夏至","小暑","大暑","立秋","处暑","白露","秋分","寒露","霜降","立冬","小雪","大雪","冬至"]
 * @return string
 */
export const solarTermCollection = [
  '\u5C0F\u5BD2',
  '\u5927\u5BD2',
  '\u7ACB\u6625',
  '\u96E8\u6C34',
  '\u60CA\u86F0',
  '\u6625\u5206',
  '\u6E05\u660E',
  '\u8C37\u96E8',
  '\u7ACB\u590F',
  '\u5C0F\u6EE1',
  '\u8292\u79CD',
  '\u590F\u81F3',
  '\u5C0F\u6691',
  '\u5927\u6691',
  '\u7ACB\u79CB',
  '\u5904\u6691',
  '\u767D\u9732',
  '\u79CB\u5206',
  '\u5BD2\u9732',
  '\u971C\u964D',
  '\u7ACB\u51AC',
  '\u5C0F\u96EA',
  '\u5927\u96EA',
  '\u51AC\u81F3',
];

/**
 * 1900-2100各年的24节气日期速查表
 * @return 0x string For splice
 */
export const termInfoCollection = [
  '9778397bd097c36b0b6fc9274c91aa',
  '97b6b97bd19801ec9210c965cc920e',
  '97bcf97c3598082c95f8c965cc920f',
  '97bd0b06bdb0722c965ce1cfcc920f',
  'b027097bd097c36b0b6fc9274c91aa',
  '97b6b97bd19801ec9210c965cc920e',
  '97bcf97c359801ec95f8c965cc920f',
  '97bd0b06bdb0722c965ce1cfcc920f',
  'b027097bd097c36b0b6fc9274c91aa',
  '97b6b97bd19801ec9210c965cc920e',
  '97bcf97c359801ec95f8c965cc920f',
  '97bd0b06bdb0722c965ce1cfcc920f',
  'b027097bd097c36b0b6fc9274c91aa',
  '9778397bd19801ec9210c965cc920e',
  '97b6b97bd19801ec95f8c965cc920f',
  '97bd09801d98082c95f8e1cfcc920f',
  '97bd097bd097c36b0b6fc9210c8dc2',
  '9778397bd197c36c9210c9274c91aa',
  '97b6b97bd19801ec95f8c965cc920e',
  '97bd09801d98082c95f8e1cfcc920f',
  '97bd097bd097c36b0b6fc9210c8dc2',
  '9778397bd097c36c9210c9274c91aa',
  '97b6b97bd19801ec95f8c965cc920e',
  '97bcf97c3598082c95f8e1cfcc920f',
  '97bd097bd097c36b0b6fc9210c8dc2',
  '9778397bd097c36c9210c9274c91aa',
  '97b6b97bd19801ec9210c965cc920e',
  '97bcf97c3598082c95f8c965cc920f',
  '97bd097bd097c35b0b6fc920fb0722',
  '9778397bd097c36b0b6fc9274c91aa',
  '97b6b97bd19801ec9210c965cc920e',
  '97bcf97c3598082c95f8c965cc920f',
  '97bd097bd097c35b0b6fc920fb0722',
  '9778397bd097c36b0b6fc9274c91aa',
  '97b6b97bd19801ec9210c965cc920e',
  '97bcf97c359801ec95f8c965cc920f',
  '97bd097bd097c35b0b6fc920fb0722',
  '9778397bd097c36b0b6fc9274c91aa',
  '97b6b97bd19801ec9210c965cc920e',
  '97bcf97c359801ec95f8c965cc920f',
  '97bd097bd097c35b0b6fc920fb0722',
  '9778397bd097c36b0b6fc9274c91aa',
  '97b6b97bd19801ec9210c965cc920e',
  '97bcf97c359801ec95f8c965cc920f',
  '97bd097bd07f595b0b6fc920fb0722',
  '9778397bd097c36b0b6fc9210c8dc2',
  '9778397bd19801ec9210c9274c920e',
  '97b6b97bd19801ec95f8c965cc920f',
  '97bd07f5307f595b0b0bc920fb0722',
  '7f0e397bd097c36b0b6fc9210c8dc2',
  '9778397bd097c36c9210c9274c920e',
  '97b6b97bd19801ec95f8c965cc920f',
  '97bd07f5307f595b0b0bc920fb0722',
  '7f0e397bd097c36b0b6fc9210c8dc2',
  '9778397bd097c36c9210c9274c91aa',
  '97b6b97bd19801ec9210c965cc920e',
  '97bd07f1487f595b0b0bc920fb0722',
  '7f0e397bd097c36b0b6fc9210c8dc2',
  '9778397bd097c36b0b6fc9274c91aa',
  '97b6b97bd19801ec9210c965cc920e',
  '97bcf7f1487f595b0b0bb0b6fb0722',
  '7f0e397bd097c35b0b6fc920fb0722',
  '9778397bd097c36b0b6fc9274c91aa',
  '97b6b97bd19801ec9210c965cc920e',
  '97bcf7f1487f595b0b0bb0b6fb0722',
  '7f0e397bd097c35b0b6fc920fb0722',
  '9778397bd097c36b0b6fc9274c91aa',
  '97b6b97bd19801ec9210c965cc920e',
  '97bcf7f1487f531b0b0bb0b6fb0722',
  '7f0e397bd097c35b0b6fc920fb0722',
  '9778397bd097c36b0b6fc9274c91aa',
  '97b6b97bd19801ec9210c965cc920e',
  '97bcf7f1487f531b0b0bb0b6fb0722',
  '7f0e397bd07f595b0b6fc920fb0722',
  '9778397bd097c36b0b6fc9274c91aa',
  '97b6b97bd19801ec9210c9274c920e',
  '97bcf7f0e47f531b0b0bb0b6fb0722',
  '7f0e397bd07f595b0b0bc920fb0722',
  '9778397bd097c36b0b6fc9210c91aa',
  '97b6b97bd197c36c9210c9274c920e',
  '97bcf7f0e47f531b0b0bb0b6fb0722',
  '7f0e397bd07f595b0b0bc920fb0722',
  '9778397bd097c36b0b6fc9210c8dc2',
  '9778397bd097c36c9210c9274c920e',
  '97b6b7f0e47f531b0723b0b6fb0722',
  '7f0e37f5307f595b0b0bc920fb0722',
  '7f0e397bd097c36b0b6fc9210c8dc2',
  '9778397bd097c36b0b70c9274c91aa',
  '97b6b7f0e47f531b0723b0b6fb0721',
  '7f0e37f1487f595b0b0bb0b6fb0722',
  '7f0e397bd097c35b0b6fc9210c8dc2',
  '9778397bd097c36b0b6fc9274c91aa',
  '97b6b7f0e47f531b0723b0b6fb0721',
  '7f0e27f1487f595b0b0bb0b6fb0722',
  '7f0e397bd097c35b0b6fc920fb0722',
  '9778397bd097c36b0b6fc9274c91aa',
  '97b6b7f0e47f531b0723b0b6fb0721',
  '7f0e27f1487f531b0b0bb0b6fb0722',
  '7f0e397bd097c35b0b6fc920fb0722',
  '9778397bd097c36b0b6fc9274c91aa',
  '97b6b7f0e47f531b0723b0b6fb0721',
  '7f0e27f1487f531b0b0bb0b6fb0722',
  '7f0e397bd097c35b0b6fc920fb0722',
  '9778397bd097c36b0b6fc9274c91aa',
  '97b6b7f0e47f531b0723b0b6fb0721',
  '7f0e27f1487f531b0b0bb0b6fb0722',
  '7f0e397bd07f595b0b0bc920fb0722',
  '9778397bd097c36b0b6fc9274c91aa',
  '97b6b7f0e47f531b0723b0787b0721',
  '7f0e27f0e47f531b0b0bb0b6fb0722',
  '7f0e397bd07f595b0b0bc920fb0722',
  '9778397bd097c36b0b6fc9210c91aa',
  '97b6b7f0e47f149b0723b0787b0721',
  '7f0e27f0e47f531b0723b0b6fb0722',
  '7f0e397bd07f595b0b0bc920fb0722',
  '9778397bd097c36b0b6fc9210c8dc2',
  '977837f0e37f149b0723b0787b0721',
  '7f07e7f0e47f531b0723b0b6fb0722',
  '7f0e37f5307f595b0b0bc920fb0722',
  '7f0e397bd097c35b0b6fc9210c8dc2',
  '977837f0e37f14998082b0787b0721',
  '7f07e7f0e47f531b0723b0b6fb0721',
  '7f0e37f1487f595b0b0bb0b6fb0722',
  '7f0e397bd097c35b0b6fc9210c8dc2',
  '977837f0e37f14998082b0787b06bd',
  '7f07e7f0e47f531b0723b0b6fb0721',
  '7f0e27f1487f531b0b0bb0b6fb0722',
  '7f0e397bd097c35b0b6fc920fb0722',
  '977837f0e37f14998082b0787b06bd',
  '7f07e7f0e47f531b0723b0b6fb0721',
  '7f0e27f1487f531b0b0bb0b6fb0722',
  '7f0e397bd097c35b0b6fc920fb0722',
  '977837f0e37f14998082b0787b06bd',
  '7f07e7f0e47f531b0723b0b6fb0721',
  '7f0e27f1487f531b0b0bb0b6fb0722',
  '7f0e397bd07f595b0b0bc920fb0722',
  '977837f0e37f14998082b0787b06bd',
  '7f07e7f0e47f531b0723b0b6fb0721',
  '7f0e27f1487f531b0b0bb0b6fb0722',
  '7f0e397bd07f595b0b0bc920fb0722',
  '977837f0e37f14998082b0787b06bd',
  '7f07e7f0e47f149b0723b0787b0721',
  '7f0e27f0e47f531b0b0bb0b6fb0722',
  '7f0e397bd07f595b0b0bc920fb0722',
  '977837f0e37f14998082b0723b06bd',
  '7f07e7f0e37f149b0723b0787b0721',
  '7f0e27f0e47f531b0723b0b6fb0722',
  '7f0e397bd07f595b0b0bc920fb0722',
  '977837f0e37f14898082b0723b02d5',
  '7ec967f0e37f14998082b0787b0721',
  '7f07e7f0e47f531b0723b0b6fb0722',
  '7f0e37f1487f595b0b0bb0b6fb0722',
  '7f0e37f0e37f14898082b0723b02d5',
  '7ec967f0e37f14998082b0787b0721',
  '7f07e7f0e47f531b0723b0b6fb0722',
  '7f0e37f1487f531b0b0bb0b6fb0722',
  '7f0e37f0e37f14898082b0723b02d5',
  '7ec967f0e37f14998082b0787b06bd',
  '7f07e7f0e47f531b0723b0b6fb0721',
  '7f0e37f1487f531b0b0bb0b6fb0722',
  '7f0e37f0e37f14898082b072297c35',
  '7ec967f0e37f14998082b0787b06bd',
  '7f07e7f0e47f531b0723b0b6fb0721',
  '7f0e27f1487f531b0b0bb0b6fb0722',
  '7f0e37f0e37f14898082b072297c35',
  '7ec967f0e37f14998082b0787b06bd',
  '7f07e7f0e47f531b0723b0b6fb0721',
  '7f0e27f1487f531b0b0bb0b6fb0722',
  '7f0e37f0e366aa89801eb072297c35',
  '7ec967f0e37f14998082b0787b06bd',
  '7f07e7f0e47f149b0723b0787b0721',
  '7f0e27f1487f531b0b0bb0b6fb0722',
  '7f0e37f0e366aa89801eb072297c35',
  '7ec967f0e37f14998082b0723b06bd',
  '7f07e7f0e47f149b0723b0787b0721',
  '7f0e27f0e47f531b0723b0b6fb0722',
  '7f0e37f0e366aa89801eb072297c35',
  '7ec967f0e37f14998082b0723b06bd',
  '7f07e7f0e37f14998083b0787b0721',
  '7f0e27f0e47f531b0723b0b6fb0722',
  '7f0e37f0e366aa89801eb072297c35',
  '7ec967f0e37f14898082b0723b02d5',
  '7f07e7f0e37f14998082b0787b0721',
  '7f07e7f0e47f531b0723b0b6fb0722',
  '7f0e36665b66aa89801e9808297c35',
  '665f67f0e37f14898082b0723b02d5',
  '7ec967f0e37f14998082b0787b0721',
  '7f07e7f0e47f531b0723b0b6fb0722',
  '7f0e36665b66a449801e9808297c35',
  '665f67f0e37f14898082b0723b02d5',
  '7ec967f0e37f14998082b0787b06bd',
  '7f07e7f0e47f531b0723b0b6fb0721',
  '7f0e36665b66a449801e9808297c35',
  '665f67f0e37f14898082b072297c35',
  '7ec967f0e37f14998082b0787b06bd',
  '7f07e7f0e47f531b0723b0b6fb0721',
  '7f0e26665b66a449801e9808297c35',
  '665f67f0e37f1489801eb072297c35',
  '7ec967f0e37f14998082b0787b06bd',
  '7f07e7f0e47f531b0723b0b6fb0721',
  '7f0e27f1487f531b0b0bb0b6fb0722',
];

/**
 * 数字转中文速查表 ['日','一','二','三','四','五','六','七','八','九','十']
 * @return string
 */
export const chineseNumeralCollection = [
  '\u65E5',
  '\u4E00',
  '\u4E8C',
  '\u4E09',
  '\u56DB',
  '\u4E94',
  '\u516D',
  '\u4E03',
  '\u516B',
  '\u4E5D',
  '\u5341',
];

/**
 * 日期转农历称呼速查表 ['初','十','廿','卅']
 * @return Cn string
 */
export const lunarPrefixCollection = ['\u521D', '\u5341', '\u5EFF', '\u5345'];

/**
 * 月份转农历称呼速查表 ['正','一','二','三','四','五','六','七','八','九','十','冬','腊']
 * @return string
 */
export const lunarSuffixCollection = [
  '\u6B63',
  '\u4E8C',
  '\u4E09',
  '\u56DB',
  '\u4E94',
  '\u516D',
  '\u4E03',
  '\u516B',
  '\u4E5D',
  '\u5341',
  '\u51AC',
  '\u814A',
];
