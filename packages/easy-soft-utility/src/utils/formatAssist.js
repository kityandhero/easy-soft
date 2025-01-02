import dayjs from 'dayjs';

import {
  checkStringIsNullOrWhiteSpace,
  isFunction,
  isString,
} from './checkAssist';
import { datetimeFormat, formatCollection } from './constants';
import { toNumber, toRound } from './convertAssist';
import { calculateDateInterval, getNow } from './datetime';

/**
 * Format to decimal string like '3.25'
 */
export function formatDecimal({
  data,
  places = 2,
  thousand = ',',
  decimal = '.',
}) {
  return formatMoney({
    data,
    places,
    symbol: '',
    thousand,
    decimal,
  });
}

/**
 * Format to money string like '$3.25'
 */
export function formatMoney({
  data: numberSource,
  places: placesSource = 2,
  symbol: symbolSource = '¥',
  thousand: thousandSource = ',',
  decimal: decimalSource = '.',
}) {
  let number = numberSource || 0;
  //保留的小位数 可以写成 formatMoney(542986,3) 后面的是保留的小位数, 否则默 认保留两位
  // eslint-disable-next-line no-restricted-globals
  let places = Number.isNaN((placesSource = Math.abs(placesSource)))
    ? 2
    : placesSource;
  //symbol表示前面表示的标志是￥ 可以写成 formatMoney(542986,2,"$")
  let symbol = symbolSource === undefined ? '￥' : symbolSource;
  //thousand表示每几位用,隔开,是货币标识
  let thousand = thousandSource || ',';
  //decimal表示小数点
  let decimal = decimalSource || '.';
  //negative表示如果钱是负数有就显示“-”如果不是负数 就不显示负号
  //i表示处理过的纯数字
  let negative = number < 0 ? '-' : '';
  let index =
    Number.parseInt((number = Math.abs(+number || 0).toFixed(places)), 10) + '';

  let index_ = index.length;

  index_ = index_ > 3 ? index_ % 3 : 0;

  return (
    symbol +
    negative +
    (index_ ? index.slice(0, Math.max(0, index_)) + thousand : '') +
    index
      .slice(index_)
      .replaceAll(/(\d{3})(?=\d)/g, symbolSource + '1' + thousand) +
    // 第一种方案
    // i.substr(j).replace(/(\d{3})(?=\d)/g, "$" + "1" + thousand) +
    // 第二种方案
    // i.substr(j).replace(/(?=(\B\d{3})+$)/g, thousand) +
    (places
      ? decimal +
        Math.abs(number - toNumber(index))
          .toFixed(places)
          .slice(2)
      : '')
  );
}

/**
 * Format to chinese Yuan like '叁千元整'
 */
export function formatMoneyToChinese({ target }) {
  //汉字的数字
  let cnNumbers = new Array(
    '零',
    '壹',
    '贰',
    '叁',
    '肆',
    '伍',
    '陆',
    '柒',
    '捌',
    '玖',
  );
  //基本单位
  let cnIntRadicle = new Array('', '拾', '佰', '仟');
  //对应整数部分扩展单位
  let cnIntUnits = new Array('', '万', '亿', '兆');
  //对应小数部分单位
  let cnDecUnits = new Array('角', '分', '毫', '厘');
  //整数金额时后面跟的字符
  let cnInteger = '整';
  //整型完以后的单位
  let cnIntLast = '元';
  //最大处理的数字
  let maxNumber = 9_999_999_999_999.99;
  //金额整数部分
  let integerNumber;
  //金额小数部分
  let decimalNumber;
  //输出的中文金额字符串
  let chineseString = '';
  //分离金额后用的数组，预定义
  let parts;

  let targetAdjust = target;

  // 传入的参数为空情况
  if (isString(targetAdjust) && checkStringIsNullOrWhiteSpace(targetAdjust)) {
    return '';
  }

  targetAdjust = Number.parseFloat(targetAdjust);

  if (targetAdjust >= maxNumber) {
    return '';
  }

  // 传入的参数为0情况
  if (targetAdjust == 0) {
    chineseString = cnNumbers[0] + cnIntLast + cnInteger;

    return chineseString;
  }

  // 转为字符串
  targetAdjust = targetAdjust.toString();

  // indexOf 检测某字符在字符串中首次出现的位置 返回索引值（从0 开始） -1 代表无
  if (targetAdjust.includes('.')) {
    parts = targetAdjust.split('.');
    integerNumber = parts[0];
    decimalNumber = parts[1].slice(0, 4);
  } else {
    integerNumber = targetAdjust;
    decimalNumber = '';
  }

  //转换整数部分
  if (Number.parseInt(integerNumber, 10) > 0) {
    let zeroCount = 0;
    let IntLength = integerNumber.length;

    for (let index = 0; index < IntLength; index++) {
      let n = integerNumber.slice(index, index + 1);
      let p = IntLength - index - 1;
      let q = p / 4;
      let m = p % 4;

      if (n == '0') {
        zeroCount++;
      } else {
        if (zeroCount > 0) {
          chineseString += cnNumbers[0];
        }

        zeroCount = 0;
        chineseString += cnNumbers[Number.parseInt(n)] + cnIntRadicle[m];
      }

      if (m == 0 && zeroCount < 4) {
        chineseString += cnIntUnits[q];
      }
    }

    // 最后+ 元
    chineseString += cnIntLast;
  }
  // 转换小数部分
  if (decimalNumber != '') {
    let decLength = decimalNumber.length;

    for (let index = 0; index < decLength; index++) {
      let n = decimalNumber.slice(index, index + 1);

      if (n != '0') {
        chineseString += cnNumbers[Number(n)] + cnDecUnits[index];
      }
    }
  }
  if (chineseString == '') {
    chineseString += cnNumbers[0] + cnIntLast + cnInteger;
  } else if (decimalNumber == '') {
    chineseString += cnInteger;
  }

  return chineseString;
}

export function formatDatetime({
  data: date,
  format = datetimeFormat.yearMonthDayHourMinuteSecond,
}) {
  if ((date || null) == null) {
    return '';
  }

  return dayjs(date).format(format);
}

export function formatTarget({ target, format, option = {} }) {
  if (isFunction(format)) {
    return format(target);
  }

  if (isString(format)) {
    switch (format) {
      case formatCollection.money: {
        return formatMoney({
          ...option,
          data: target,
        });
      }

      case formatCollection.datetime: {
        return formatDatetime({
          data: target,
        });
      }

      case formatCollection.chineseMoney: {
        return formatMoneyToChinese({ target, option });
      }

      case formatCollection.percentage: {
        return `${toRound(target * 100, 1)}%`;
      }

      default: {
        return target;
      }
    }
  }

  return target;
}

function substitute(string, number) {
  return string.replace(/%d/i, number);
}

/**
 * Format date interval
 */
export function formatDateInterval(startTime, endTime, options = {}) {
  const setting = {
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
    ...options,
  };

  const diff = calculateDateInterval(startTime, endTime);

  const interval = diff < 0 ? 1 : 0;
  const seconds = Math.abs(diff) / 1000;
  const minutes = seconds / 60;
  const hours = minutes / 60;
  const days = hours / 24;
  const years = days / 365;

  return (
    (seconds < 10 &&
      substitute(setting.second[interval], Number.parseInt(seconds))) ||
    (seconds < 45 &&
      substitute(setting.seconds[interval], Number.parseInt(seconds))) ||
    (seconds < 90 && substitute(setting.minute[interval], 1)) ||
    (minutes < 45 &&
      substitute(setting.minutes[interval], Number.parseInt(minutes))) ||
    (minutes < 90 && substitute(setting.hour[interval], 1)) ||
    (hours < 24 &&
      substitute(setting.hours[interval], Number.parseInt(hours))) ||
    (hours < 42 && substitute(setting.day[interval], 1)) ||
    (days < 30 && substitute(setting.days[interval], Number.parseInt(days))) ||
    (days < 45 && substitute(setting.month[interval], 1)) ||
    (days < 365 &&
      substitute(setting.months[interval], Number.parseInt(days / 30))) ||
    (years < 1.5 && substitute(setting.year[interval], 1)) ||
    substitute(setting.years[interval], Number.parseInt(years))
  );
}

/**
 * 格式化指定时间与当前时间的时间间隔
 * @param {Date} time 时间
 * @param {Object} options 配置参数
 */
export function formatDateIntervalWithNow(time, options = {}) {
  return formatDateInterval(time, getNow(), options);
}
