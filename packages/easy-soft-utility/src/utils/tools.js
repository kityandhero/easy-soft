import classNames from 'classnames';
import dayjs from 'dayjs';
import assignLodash from 'lodash/assign';
import assignWithLodash from 'lodash/assignWith';
import differenceLodash from 'lodash/difference';
import dropRightLodash from 'lodash/dropRight';
import endsWithLodash from 'lodash/endsWith';
import filterLodash from 'lodash/filter';
import findLodash from 'lodash/find';
import findIndexLodash from 'lodash/findIndex';
import firstLodash from 'lodash/first';
import floorLodash from 'lodash/floor';
import forEachLodash from 'lodash/forEach';
import getLodash from 'lodash/get';
import gteLodash from 'lodash/gte';
import mapLodash from 'lodash/map';
import memoizeLodash from 'lodash/memoize';
import removeLodash from 'lodash/remove';
import reverseLodash from 'lodash/reverse';
import setLodash from 'lodash/set';
import sizeLodash from 'lodash/size';
import sortByLodash from 'lodash/sortBy';
import sortedUniqLodash from 'lodash/sortedUniq';
import splitLodash from 'lodash/split';
import startsWithLodash from 'lodash/startsWith';
import uniqByLodash from 'lodash/uniqBy';
import { parse, stringify } from 'qs';

import {
  checkStringIsNullOrWhiteSpace as checkStringIsNullOrWhiteSpaceCore,
  inCollection as inCollectionCore,
  replace as replaceCore,
  trim as trimCore,
} from './base';
import {
  isArray,
  isEqualBySerialize,
  isFunction,
  isNull,
  isNumber,
  isObject,
  isPromise,
  isString,
  isUndefined,
} from './checkAssist';
import {
  convertCollection,
  datetimeFormat,
  envCollection,
  formatCollection,
  logLevel,
  messageTypeCollection,
  notificationTypeCollection,
  sortOperate,
} from './constants';
import { toDatetime, toMoney, toNumber } from './convertAssist';
import {
  getAppInitConfigData as getAppInitConfigDataCore,
  getDefaultTaroGlobalData as getDefaultTaroGlobalDataCore,
  getTaroGlobalData as getTaroGlobalDataCore,
  setTaroGlobalData as setTaroGlobalDataCore,
} from './core';
import { modulePackageName } from './definition';
import {
  logConfig as recordConfigCore,
  logData as logDataCore,
  logDebug as recordDebugCore,
  logError as logErrorCore,
  logExecute as recordExecuteCore,
  logInfo as recordInfoCore,
  logObject as recordObjectCore,
  logText as recordTextCore,
  logTrace as recordTraceCore,
  logWarn as recordWarnCore,
} from './loggerAssist';
import Tips from './tips';

export const isBrowser = typeof document !== 'undefined' && !!document.scripts;
export const isWechat = process.env.TARO_ENV === 'weapp';
export const isSwan = process.env.TARO_ENV === 'swan';
export const isAlipay = process.env.TARO_ENV === 'alipay';
export const isQQ = process.env.TARO_ENV === 'qq';
export const isToutiao = process.env.TARO_ENV === 'tt';

/**
 * Module Name.
 */
const moduleName = 'tools';

const storageKeyCollection = {
  nearestLocalhostNotify: 'nearestLocalhostNotify',
};

let globalSystemInfo = null;

export function getDefaultTaroGlobalData() {
  return getDefaultTaroGlobalDataCore();
}

export function getTaroGlobalData() {
  return getTaroGlobalDataCore();
}

export function setTaroGlobalData(config) {
  return setTaroGlobalDataCore(config);
}

export function getAppInitConfigData() {
  return getAppInitConfigDataCore();
}

export function showNavigationBarLoading() {
  showNavigationBarLoadingCore();
}

export function hideNavigationBarLoading() {
  if (isWechat) {
    hideNavigationBarLoadingCore();
  }
}

/**
 * get current page instance
 */
export function getCurrentInstance() {
  return getCurrentInstanceCore();
}

export function canIUse(params) {
  return canIUseCore(params);
}

export function getUpdateManager(params) {
  return getUpdateManagerCore(params);
}

export function previewImage(params) {
  return previewImageCore(params);
}

export function stopPullDownRefresh() {
  stopPullDownRefreshCore();
}

export function pageScrollTo(params) {
  pageScrollToCore(params);
}

export function getMenuButtonBoundingClientRect() {
  return getMenuButtonBoundingClientRectCore();
}

export function redirectTo(params) {
  if (isString(params)) {
    redirectToCore({
      url: params,
    });

    return;
  }

  if (isObject(params)) {
    redirectToCore(params);

    return;
  }

  const text = '无效的跳转参数';

  showErrorMessage({
    message: text,
  });
}

export function navigateTo(params) {
  if (isString(params)) {
    navigateToCore({
      url: params,
    });

    return;
  }

  if (isObject(params)) {
    navigateToCore(params);

    return;
  }

  const text = '无效的跳转参数';

  showErrorMessage({
    message: text,
  });
}

export function getValue(obj) {
  return Object.keys(obj)
    .map((key) => obj[key])
    .join(',');
}

/**
 * 复制到剪贴板
 * @param {*} text
 * @param {*} showText
 */
export function copyToClipboard({ text, successCallback = null }) {
  setClipboardData({
    data: text,
    success: (res) => {
      if (isFunction(successCallback)) {
        successCallback(text, res);
      }
    },
  });
}

/**
 *替换指定字符串
 *
 * @export
 * @param {*} text
 * @param {*} replaceText
 * @param {*} beforeKeepNumber
 * @param {*} afterKeepNumber
 * @returns
 */
export function replaceTargetText(
  text,
  replaceText,
  beforeKeepNumber,
  afterKeepNumber,
) {
  let result = toString(text);

  const textLength = (text || '').length;
  if (textLength > 0 && (beforeKeepNumber >= 0 || afterKeepNumber >= 0)) {
    if (
      beforeKeepNumber >= textLength ||
      afterKeepNumber >= textLength ||
      (beforeKeepNumber || 0) + (afterKeepNumber || 0) >= textLength
    ) {
      result = text;
    } else {
      const beforeKeep = text.substr(0, beforeKeepNumber);

      const afterKeep = text.substr(
        textLength - afterKeepNumber,
        afterKeepNumber,
      );

      result = beforeKeep + replaceText + afterKeep;
    }
  }

  return result || '';
}

export function checkDevelopment() {
  return process.env.NODE_ENV === 'development';
}

/**
 * corsTarget
 * 跨域域名配置
 * @export
 * @param {*} v
 * @returns
 */
export function corsTarget() {
  const appInit = getAppInitConfigData();
  let corsTargetDomain = '';

  if (appInit.apiPrefix != null) {
    if (appInit.apiPrefix.corsTargetDomain != null) {
      const {
        apiPrefix: { corsTargetDomain: corsTargetDomainRemote },
      } = appInit;

      corsTargetDomain = corsTargetDomainRemote;
    }
  }

  return corsTargetDomain;
}

export function showError(text) {
  showErrorMessage({
    message: text,
  });
}

export function showSuccessMessage({
  duration = 1500,
  message: messageText,
  onClose = () => {},
}) {
  showMessage({
    type: messageTypeCollection.success,
    message: messageText,
    duration,
    onClose,
  });
}

export function showErrorMessage({
  duration = 1500,
  message: messageText,
  onClose = () => {},
}) {
  showMessage({
    type: messageTypeCollection.error,
    message: messageText,
    duration,
    onClose,
  });
}

export function showWarnMessage({
  duration = 1500,
  message: messageText,
  onClose = () => {},
}) {
  showMessage({
    type: messageTypeCollection.warn,
    message: messageText,
    duration,
    onClose,
  });
}

/**
 * 显示警告信息框
 */
export function showWarningMessage({
  duration = 1500,
  message: messageText,
  onClose = () => {},
}) {
  showMessage({
    type: messageTypeCollection.warning,
    message: messageText,
    duration,
    onClose,
  });
}

/**
 * 显示消息信息
 */
export function showInfoMessage({
  duration = 1500,
  message: messageText,
  onClose = () => {},
}) {
  showMessage({
    type: messageTypeCollection.info,
    message: messageText,
    duration,
    onClose,
  });
}

export function showOpenMessage({
  duration = 1500,
  message: messageText,
  onClose = () => {},
}) {
  showMessage({
    type: messageTypeCollection.open,
    message: messageText,
    duration,
    onClose,
  });
}

export function showMessage({
  type,
  duration = 1500,
  message: messageText,
  onClose = () => {},
}) {
  requestAnimationFrame(() => {
    switch (type) {
      case messageTypeCollection.success:
        Tips.success(messageText, duration, onClose);
        break;

      case messageTypeCollection.error:
        Tips.error(messageText, duration, onClose);
        break;

      case messageTypeCollection.info:
        Tips.info(messageText, duration, onClose);
        break;

      case messageTypeCollection.warning:
        Tips.warning(messageText, duration, onClose);
        break;

      case messageTypeCollection.warn:
        Tips.warn(messageText, duration, onClose);
        break;

      default:
        Tips.toast(messageText, duration, onClose);
        break;
    }
  });
}

/**
 * 记录日志
 *
 * @export
 * @param {*} str
 * @returns
 */
export function logData(
  record,
  showMode,
  level = logLevel.debug,
  objectModeDescription = '',
) {
  logDataCore(record, showMode, level, objectModeDescription);
}

export function recordTrace(record, objectModeDescription = '') {
  recordTraceCore(record, objectModeDescription);
}

export function recordWarn(record, objectModeDescription = '') {
  recordWarnCore(record, objectModeDescription);
}

export function recordInfo(record, objectModeDescription = '') {
  recordInfoCore(record, objectModeDescription);
}

export function recordConfig(record, objectModeDescription = '') {
  recordConfigCore(record, objectModeDescription);
}

export function recordDebug(record, objectModeDescription = '') {
  recordDebugCore(record, objectModeDescription);
}

export function recordExecute(record, objectModeDescription = '') {
  recordExecuteCore(record, objectModeDescription);
}

/**
 * 记录错误信息
 */
export function logError(record, objectModeDescription = '') {
  logErrorCore(record, objectModeDescription);
}

/**
 * 记录日志
 *
 * @export
 * @param {*} str
 * @returns
 */
export function recordText(record, level = logLevel.debug) {
  recordTextCore(record, level);
}

/**
 * 记录日志
 *
 * @export
 * @param {*} str
 * @returns
 */
export function recordObject(
  record,
  level = logLevel.debug,
  objectModeDescription = '',
) {
  recordObjectCore(record, level, objectModeDescription);
}

/**
 * 获取Guid
 *
 * @export
 * @param {*} v
 * @returns
 */
export function getGuid(len = 8, radix = 16) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split(
    '',
  );
  const value = [];
  let i = 0;
  radix = radix || chars.length;

  if (len) {
    // Compact form
    for (i = 0; i < len; i++) value[i] = chars[0 | (Math.random() * radix)];
  } else {
    // rfc4122, version 4 form
    let r;

    // rfc4122 requires these characters
    /* eslint-disable-next-line */
    value[8] = value[13] = value[18] = value[23] = '-';
    value[14] = '4';

    // Fill in random data.  At i==19 set the high bits of clock sequence as
    // per rfc4122, sec. 4.1.5
    for (i = 0; i < 36; i++) {
      if (!value[i]) {
        r = 0 | (Math.random() * 16);
        value[i] = chars[i === 19 ? (r & 0x3) | 0x8 : r];
      }
    }
  }

  return value.join('');
}

/**
 * 检测目标是否在数组址之中
 */
export function inCollection(collection, value) {
  return inCollectionCore(collection, value);
}

export function split(source, separator, limit = 1000) {
  return splitLodash(source, separator, limit);
}

/**
 * 去除重复数据并排序（升序）
 */
export function sortedUnique(array) {
  return sortedUniqLodash(array);
}

export function memoize(fn) {
  return memoizeLodash(fn);
}

export function floor(v, len) {
  return floorLodash(v, len);
}

export function first(array) {
  return firstLodash(array);
}

export function startsWith(source, target) {
  return startsWithLodash(source, target);
}

export function dropRight(array, n = 1) {
  return dropRightLodash(array, n);
}

export function uniqBy(array, iterate) {
  return uniqByLodash(array, iterate);
}

export function getDayOfWeek({ data: date }) {
  return dayjs(date).day();
}

export function getNowDayOfWeek(transferChinese = true) {
  const day = dayjs().day();

  if (!transferChinese) {
    return day;
  }

  let result = '';

  switch (toNumber(day)) {
    case 0:
      result = '日';
      break;

    case 1:
      result = '一';
      break;

    case 2:
      result = '二';
      break;

    case 3:
      result = '三';
      break;

    case 4:
      result = '四';
      break;

    case 5:
      result = '五';
      break;

    case 6:
      result = '六';
      break;

    default:
      result = '';
      break;
  }

  return checkStringIsNullOrWhiteSpace(result) ? '' : `星期${result}`;
}

/**
 *计算时间间隔
 * @param {startTime} 起始时间
 * @param {endTime} 结束时间
 */
export function calculateTimeInterval(startTime, endTime) {
  const timeBegin = startTime.getTime();
  const timeEnd = endTime.getTime();
  const total = (timeEnd - timeBegin) / 1000;

  const day = parseInt(total / (24 * 60 * 60)); //计算整数天数
  const afterDay = total - day * 24 * 60 * 60; //取得算出天数后剩余的秒数
  const hour = parseInt(afterDay / (60 * 60)); //计算整数小时数
  const afterHour = total - day * 24 * 60 * 60 - hour * 60 * 60; //取得算出小时数后剩余的秒数
  const min = parseInt(afterHour / 60); //计算整数分
  const afterMin = total - day * 24 * 60 * 60 - hour * 60 * 60 - min * 60; //取得算出分后剩余的秒数

  return {
    day,
    hour: hour,
    minute: min,
    second: afterMin,
  };
}

export function addHour(datetime, value) {
  const t = toDatetime(datetime);

  return t.setHours(t.getHours() + value);
}

export function addMinute(datetime, value) {
  const t = toDatetime(datetime);

  return t.setMinutes(t.getMinutes() + value);
}

export function addSecond(datetime, value) {
  const t = toDatetime(datetime);

  return t.setSeconds(t.getSeconds() + value);
}

export function getNow() {
  return new Date();
}

/**
 * 计算月份差
 */
export const calculateMonthInterval = (startMonth, endMonth) => {
  const start = toDatetime(startMonth);
  const end = toDatetime(endMonth);
  return (
    (start.getFullYear() - end.getFullYear()) * 12 +
    start.getMonth() -
    end.getMonth()
  );
};

/**
 * 计算时间差
 */
export const calculateDateInterval = (date, nowDate, unit) => {
  const start = toDatetime(date);
  const end = nowDate ? toDatetime(nowDate) : new Date();
  const output = end.getTime() - start.getTime();

  return (
    (unit === 'second' && output / 1000) ||
    (unit === 'minute' && output / 1000 / 60) ||
    (unit === 'hour' && output / 1000 / 60 / 60) ||
    (unit === 'day' && output / 1000 / 60 / 60 / 24) ||
    (unit === 'week' && output / 1000 / 60 / 60 / 24 / 7) ||
    (unit === 'month' && calculateMonthInterval(start, end)) ||
    (unit === 'quarter' && calculateMonthInterval(start, end) / 3) ||
    (unit === 'year' && calculateMonthInterval(start, end) / 12) ||
    output
  );
};

/**
 * 格式化指定两时间时间的时间间隔
 * @param    {date} start 起始时间
 * @param    {date} end 结束时间
 * @param    {Object} opts 配置参数
 * @return   {String}      文本内容
 */
export function formatDateInterval(start, end, opts = {}) {
  const options = {
    ...{
      second: ['刚刚', '片刻后'],
      seconds: ['%d 秒前', '%d 秒后'],
      minute: ['大约 1 分钟前', '大约 1 分钟后'],
      minutes: ['%d 分钟前', '%d 分钟后'],
      hour: ['大约 1 小时前', '大约 1 小时后'],
      hours: ['%d 小时前', '%d 小时后'],
      day: ['1 天前', '1 天后'],
      days: ['%d 天前', '%d 天后'],
      month: ['大约 1 个月前', '大约 1 个月后'],
      months: ['%d 月前', '%d 月后'],
      year: ['大约 1 年前', '大约 1 年后'],
      years: ['%d 年前', '%d 年后'],
    },
    ...(opts || {}),
  };

  const diff = calculateDateInterval(start, end);

  const interval = diff < 0 ? 1 : 0;
  const seconds = Math.abs(diff) / 1000;
  const minutes = seconds / 60;
  const hours = minutes / 60;
  const days = hours / 24;
  const years = days / 365;
  const substitute = (string, number) => string.replace(/%d/i, number);

  return (
    (seconds < 10 && substitute(options.second[interval], parseInt(seconds))) ||
    (seconds < 45 &&
      substitute(options.seconds[interval], parseInt(seconds))) ||
    (seconds < 90 && substitute(options.minute[interval], 1)) ||
    (minutes < 45 &&
      substitute(options.minutes[interval], parseInt(minutes))) ||
    (minutes < 90 && substitute(options.hour[interval], 1)) ||
    (hours < 24 && substitute(options.hours[interval], parseInt(hours))) ||
    (hours < 42 && substitute(options.day[interval], 1)) ||
    (days < 30 && substitute(options.days[interval], parseInt(days))) ||
    (days < 45 && substitute(options.month[interval], 1)) ||
    (days < 365 && substitute(options.months[interval], parseInt(days / 30))) ||
    (years < 1.5 && substitute(options.year[interval], 1)) ||
    substitute(options.years[interval], parseInt(years))
  );
}

/**
 * 格式化指定时间与当前时间的时间间隔
 * @param    {time} start 时间
 * @param    {Object} opts 配置参数
 * @return   {String}      文本内容
 */
export function formatDateIntervalWithNow(time, opts = {}) {
  return formatDateInterval(time, getNow(), opts);
}

/**
 * 检查字符串string是否以给定的target字符串结尾
 */
export function endsWith(source, target, position) {
  return endsWithLodash(source, target, position);
}

/**
 * 从源字符串移除最后一个匹配项
 */
export function removeLastMatch(source, target) {
  if (!isString(source)) {
    throw new Error('removeEndMatch only use for string source');
  }

  if (!isString(target)) {
    throw new Error('removeEndMatch only use for string target');
  }

  if (checkStringIsNullOrWhiteSpace(source)) {
    return source;
  }

  if (checkStringIsNullOrWhiteSpace(target)) {
    return source;
  }

  const lastIndex = source.lastIndexOf(target);

  if (lastIndex >= 0) {
    return source.substr(lastIndex, target.length);
  }

  return source;
}

export function seededRandom({ seed, min, max }) {
  const maxValue = max || 1;
  const minValue = min || 0;
  const seedValue = (seed * 9301 + 49297) % 233280;
  const rnd = seedValue / 233280.0;

  return minValue + rnd * (maxValue - minValue);
}

/**
 * 通过种子等配置返回随机颜色值
 *
 * @export
 * @param {*} seed
 * @returns
 */
export function getRandomColor({ seed }) {
  return `#${`00000${((seededRandom({ seed }) * 0x1000000) << 0).toString(
    16,
  )}`.substr(-6)}`;
}

export function getGradient({ progress, startColor, endColor }) {
  const start = colorHexToRGB(startColor, null, true);
  const end = colorHexToRGB(endColor, null, true);

  const [startRed, startBlue, startGreen] = start;

  const [endRed, endBlue, endGreen] = end;

  const result = [
    (startRed + Math.round((endRed - startRed) * progress)).toString(16),
    (startBlue + Math.round((endBlue - startBlue) * progress)).toString(16),
    (startGreen + Math.round((endGreen - startGreen) * progress)).toString(16),
  ];

  return `#${result.join('')}`;
}

function getBrowserInfoCore() {
  const getBrowserVersion = () => {
    const u = navigator.userAgent;
    return {
      // 移动终端浏览器版本信息
      trident: u.indexOf('Trident') > -1, // IE内核
      presto: u.indexOf('Presto') > -1, // opera内核
      webKit: u.indexOf('AppleWebKit') > -1, // 苹果、谷歌内核
      gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') === -1, // 火狐内核
      mobile: !!u.match(/AppleWebKit.*Mobile.*/), // 是否为移动终端
      ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), // ios终端
      android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, // android 终端或uc浏览器
      iPhone: u.indexOf('iPhone') > -1, // 是否为 iPhone 或者 QQHD 浏览器
      iPad: u.indexOf('iPad') > -1, // 是否iPad
      webApp: u.indexOf('Safari') === -1, // 是否web应该程序, 没有头部与底部
    };
  };

  return {
    versions: getBrowserVersion(),
    language: (
      (navigator.browserLanguage || navigator.language) ??
      ''
    ).toLowerCase(),
  };
}

export function transformListData({
  list = [],
  convert = null,
  recursiveKey = 'children',
}) {
  const listData = isArray(list) ? list : [list];

  const l = listData.map((one) => {
    return transformData({ data: one, convert, target: recursiveKey });
  });

  return l;
}

export function transformData({
  data,
  convert = null,
  recursiveKey = 'children',
}) {
  if (!isFunction(convert)) {
    return data;
  }

  const d = convert(data);

  const children = data[recursiveKey];

  let listData = [];

  if (isArray(children)) {
    listData = children.map((one) => {
      return transformData({ data: one, convert, target: recursiveKey });
    });
  }

  d[recursiveKey] = listData;

  return d;
}

/**
 * 获取浏览器信息
 *
 * @export
 * @returns
 */
export function getBrowserInfo() {
  return getBrowserInfoCore();
}

/**
 * 封装表单项配置
 *
 * @export
 * @param {*} v
 * @param {*} justice
 * @param {*} defaultValue
 * @param {*} originalOption
 * @param {*} convertCallback
 */
export function refitFieldDecoratorOption(
  v,
  justice,
  defaultValue,
  originalOption,
  convertCallback,
) {
  const result = originalOption;
  const justiceV = typeof justice !== 'undefined' && justice !== null;
  const defaultV = typeof defaultValue === 'undefined' ? null : defaultValue;

  if (justiceV) {
    if (typeof convertValue === 'function') {
      result.initialValue = convertCallback(v) || defaultV;
    } else {
      result.initialValue = v || defaultV;
    }
  }

  return result;
}

/**
 * 封装公共数据
 *
 * @export 数据集合
 * @param {*} listData 源数据集合
 * @param {*} empty 要添加的首个数据
 * @param {*} otherListData 要添加的其他数据集合
 * @returns 封装后的数据集合
 */
export function refitCommonData(listData, empty, otherListData) {
  let result = [];

  if (typeof listData !== 'undefined') {
    if (listData !== null) {
      result = [...listData];
    }
  }

  if (typeof otherListData !== 'undefined') {
    if (otherListData !== null) {
      result = [...result, ...otherListData];
    }
  }

  if (typeof empty !== 'undefined') {
    if (empty !== null) {
      result = [empty, ...result];
    }
  }

  return result;
}

/**
 * 计算表达式的值
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function evil(fn) {
  // 一个变量指向Function, 防止有些前端编译工具报错
  const Fn = Function;
  return new Fn(`return ${fn}`)();
}

/**
 * 搜索集合中的匹配项
 *
 * @export
 * @param {*} itemKey
 * @param {*} itemValue
 * @param {*} sourceData
 * @returns
 */
export function searchFromList(itemKey, itemValue, sourceData) {
  const d = sourceData || [];
  let result = null;

  if (itemValue == null) {
    return result;
  }

  d.forEach((o) => {
    if (o[itemKey] === itemValue) {
      result = o;
    }
  });

  return result;
}

/**
 * 构建描述文本
 * @param {*} v
 * @param {*} op
 * @param {*} other
 */
export function buildFieldDescription(v, op, other) {
  const o = (other || '') === '' ? '' : `,${other}`;
  return `请${op || '输入'}${v}${o}`;
}

/**
 * 获取LocalStorage数据
 * @export
 * @param {*} key
 * @param {*} value
 */
export function getStringFromLocalStorage(key) {
  try {
    const result = getStorageSync(key);

    return result;
  } catch (e) {
    logError({
      key,
      e,
    });

    throw e;
  }
}

/**
 * 获取LocalStorage数据
 * @export
 * @param {*} key
 * @param {*} value
 */
export function getJsonFromLocalStorage(key) {
  const jsonString = getStringFromLocalStorage(key);

  if (!checkStringIsNullOrWhiteSpace(jsonString)) {
    return JSON.parse(jsonString || '{}');
  }

  return null;
}

/**
 * 存储本地数据
 * @export
 * @param {*} key
 * @param {*} value
 */
export function saveStringToLocalStorage(key, value) {
  setStorageSync(key, value);
}

/**
 * 存储本地数据
 * @export
 * @param {*} key
 * @param {*} value
 */
export function saveJsonToLocalStorage(key, json) {
  setStorageSync(key, JSON.stringify(json || {}));
}

/**
 * 移除LocalStorage数据
 * @export
 * @param {*} key
 */
export function removeLocalStorage(key) {
  removeStorageSync(key);
}

/**
 * 清空LocalStorage数据
 * @export
 * @param {*} key
 */
export function clearLocalStorage() {
  clearStorage();
}

/**
 * Reacts生命周期getDerivedStateFromProps 辅助函数用于将url参数解析到返回值中用于设定state,
 * @export
 */
export function getDerivedStateFromPropsForUrlParamsCore(nextProps) {
  const { match } = nextProps;

  if ((match || null) != null) {
    const { params } = match;

    if ((params || null) != null) {
      return { urlParams: params };
    }
  }

  return null;
}

/**
 * Reacts生命周期getDerivedStateFromProps 辅助函数用于将url参数解析到返回值中用于设定state,如果值重复, 则返回null,
 * @export
 */
export function getDerivedStateFromPropsForUrlParams(
  nextProps,
  prevState,
  defaultUrlParams = { id: '' },
  parseUrlParamsForSetState = null,
) {
  let stateUrlParams = getDerivedStateFromPropsForUrlParamsCore(
    nextProps,
    prevState,
  );

  stateUrlParams = stateUrlParams || { urlParams: defaultUrlParams };

  const { urlParams: urlParamsPrev } = prevState;

  const { urlParams } = stateUrlParams;

  if (
    isEqualBySerialize(
      { ...(urlParamsPrev || {}), ...{} },
      { ...(urlParams || {}), ...{} },
    )
  ) {
    return prevState;
  }

  if (isFunction(parseUrlParamsForSetState)) {
    const data = parseUrlParamsForSetState(stateUrlParams);

    return { ...prevState, ...stateUrlParams, ...data };
  }

  return { ...prevState, ...stateUrlParams };
}

export function cloneWithoutMethod(value) {
  if (value == null) {
    return null;
  }

  return JSON.parse(JSON.stringify(value));
}

export function difference(array, values) {
  return differenceLodash(array, values);
}

export function map(collection, iteratee) {
  return mapLodash(collection, iteratee);
}

export function set(object, path, value) {
  return setLodash(object, path, value);
}

export function size(collection) {
  return sizeLodash(collection);
}

/**
 * 筛选需要的集合
 * @param {collection} 可筛选的对象, 例如数组
 * @param {predicateFunction} 每次迭代调用的筛选函数
 */
export function filter(collection, predicateFunction) {
  return filterLodash(collection, predicateFunction);
}

/**
 * 创建一个元素数组.  以 iteratee 处理的结果升序排序.  这个方法执行稳定排序, 也就是说相同元素会保持原始排序.  iteratees 调用1个参数:  (value).
 * @param {collection}  (Array|Object), 用来迭代的集合.
 * @param {predicateFunction} 这个函数决定排序
 */
export function sortBy(collection, predicateFunction) {
  return sortByLodash(collection, predicateFunction);
}

/**
 * 该方法返回第一个通过 predicateFunction 判断为真值的元素的索引值（index）, 而不是元素本身.
 * @param {array} (Array): 要搜索的数组.
 * @param {predicateFunction} 这个函数会在每一次迭代调用
 * @param {fromIndex} (number): The index to search from.
 */
export function findIndex(array, predicateFunction, fromIndex = 0) {
  return findIndexLodash(array, predicateFunction, fromIndex);
}

/**
 * 该方法返回第一个通过 predicateFunction 判断为真值的元素的索引值（index）, 而不是元素本身,返回匹配元素, 否则返回 undefined. .
 * @param {array} (Array): 要搜索的数组.
 * @param {predicateFunction} 这个函数会在每一次迭代调用
 * @param {fromIndex} (number): The index to search from.
 */
export function find(array, predicateFunction, fromIndex = 0) {
  return findLodash(array, predicateFunction, fromIndex);
}

export function checkExist(array, predicateFunction, fromIndex = 0) {
  const result = find(array, predicateFunction, fromIndex);

  return !isUndefined(result);
}

/**
 * 移除数组中predicate（断言）返回为真值的所有元素, 并返回移除元素组成的数组. predicate（断言） 会传入3个参数:  (value, index, array).
 * @param {*} array
 * @param {*} predicate (Array|Function|Object|string): 每次迭代调用的函数
 */
export function removeFromArray(array, predicate) {
  return removeLodash(array, predicate);
}

export function checkStringIsNullOrWhiteSpace(value) {
  return checkStringIsNullOrWhiteSpaceCore(value);
}

/**
 * base64解码
 */
export function decodeBase64(target) {
  let commonContent = (target || '').replace(/\s/g, '+');
  commonContent = Buffer.from(commonContent, 'base64').toString();
  return commonContent;
}

/**
 * base64编码
 */
export function encodeBase64(target) {
  const base64Content = Buffer.from(target).toString('base64');
  return base64Content;
}

export function fixedZero(val) {
  return val * 1 < 10 ? `0${val}` : val;
}

/**
 * 构建描述文本
 * @param {*} v
 * @param {*} op
 * @param {*} other
 */
export function buildFieldHelper(v, prefix = '注: ') {
  return `${prefix}${v}. `;
}

export function getNearestLocalhostNotifyCache() {
  const key = storageKeyCollection.nearestLocalhostNotify;

  const d = getJsonFromLocalStorage(key);

  if ((d || null) == null) {
    return null;
  }

  if ((d.nearestTime || null) == null) {
    return null;
  }

  return d || null;
}

export function setNearestLocalhostNotifyCache() {
  const key = storageKeyCollection.nearestLocalhostNotify;

  const now = parseInt(new Date().getTime() / 1000, 10);

  const d = {
    nearestTime: now,
  };

  return saveJsonToLocalStorage(key, d);
}

export function removeNearestLocalhostNotifyCache() {
  const key = storageKeyCollection.nearestLocalhostNotify;
  removeLocalStorage(key);
}

/**
 * 尝试发送最近一次本地调用通知（一般用于开发阶段, 提示调用的接口域）
 */
export function trySendNearestLocalhostNotify({ text }) {
  let needSend = false;
  let nearestTime = 0;

  const nearestLocalhostNotify = getNearestLocalhostNotifyCache() || null;

  if (nearestLocalhostNotify == null) {
    needSend = true;
  } else {
    nearestTime = nearestLocalhostNotify.nearestTime || 0;
  }

  const now = parseInt(new Date().getTime() / 1000, 10);

  try {
    if (nearestTime + 30 < now) {
      needSend = true;
    }

    if (needSend) {
      const message = `当前接口域名: ${text}. `;

      notify({
        type: notificationTypeCollection.info,
        message,
      });

      recordText({
        message,
      });

      setNearestLocalhostNotifyCache();
    }
  } catch (error) {
    logData(error);
  }
}

/**
 * 文本缩略
 */
export function ellipsis(value, length, symbol = '...') {
  if (value && value.length > length) {
    return `${toString(value).substr(0, length)}${symbol}`;
  }

  return toString(value);
}

export function checkFromConfig({ label, name, helper }) {
  let labelText = 'object';
  let nameText = 'object';
  let helperText = 'object';

  if (isObject(label)) {
    const text = 'label必须为文本';

    showRuntimeError({
      message: text,
    });

    recordObject(label);
  } else {
    labelText = label;
  }

  if (isObject(name)) {
    const text = 'name必须为文本';

    showRuntimeError({
      message: text,
    });

    recordObject(name);
  } else {
    nameText = name;
  }

  if (isObject(helper)) {
    const text = 'helper必须为文本';

    showRuntimeError({
      message: text,
    });

    recordObject(helper);
  } else {
    helperText = helper;
  }

  return {
    label: labelText,
    name: nameText,
    helper: helperText,
  };
}
