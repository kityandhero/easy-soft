import dayjs from 'dayjs';

import { isFunction, isString } from './checkAssist';
import { datetimeFormat, formatCollection } from './constants';
import { toNumber, toRound } from './convertAssist';

/**
 * 格式化货币
 *
 * @export
 * @param {*} str
 * @returns
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
 * 格式化货币
 *
 * @export
 * @param {*} str
 * @returns
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
  let places = !isNaN((placesSource = Math.abs(placesSource)))
    ? placesSource
    : 2;
  //symbol表示前面表示的标志是￥ 可以写成 formatMoney(542986,2,"$")
  let symbol = symbolSource !== undefined ? symbolSource : '￥';
  //thousand表示每几位用,隔开,是货币标识
  let thousand = thousandSource || ',';
  //decimal表示小数点
  let decimal = decimalSource || '.';
  //negative表示如果钱是负数有就显示“-”如果不是负数 就不显示负号
  //i表示处理过的纯数字
  let negative = number < 0 ? '-' : '';
  let i = parseInt((number = Math.abs(+number || 0).toFixed(places)), 10) + '';

  let j = i.length;

  j = j > 3 ? j % 3 : 0;

  return (
    symbol +
    negative +
    (j ? i.substr(0, j) + thousand : '') +
    i.substr(j).replace(/(\d{3})(?=\d)/g, symbolSource + '1' + thousand) +
    // 第一种方案
    // i.substr(j).replace(/(\d{3})(?=\d)/g, "$" + "1" + thousand) +
    // 第二种方案
    // i.substr(j).replace(/(?=(\B\d{3})+$)/g, thousand) +
    (places
      ? decimal +
        Math.abs(number - toNumber(i))
          .toFixed(places)
          .slice(2)
      : '')
  );
}

/**
 * 转换金额为人民币大写
 *
 * @export
 * @param {*} target 转换的目标
 * @returns
 */
export function formatMoneyToChinese({ target }) {
  let money = target;

  const cnNumber = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖']; // 汉字的数字
  const cnIntBasic = ['', '拾', '佰', '仟']; // 基本单位
  const cnIntUnits = ['', '万', '亿', '兆']; // 对应整数部分扩展单位
  const cnDecUnits = ['角', '分', '毫', '厘']; // 对应小数部分单位
  // const cnInteger = "整"; // 整数金额时后面跟的字符
  const cnIntLast = '元'; // 整型完以后的单位
  const maxNum = 999999999999999.9999; // 最大处理的数字

  let IntegerNum; // 金额整数部分
  let DecimalNum; // 金额小数部分
  let ChineseString = ''; // 输出的中文金额字符串
  let parts; // 分离金额后用的数组, 预定义
  if (money === '') {
    return '';
  }
  money = parseFloat(money);
  if (money >= maxNum) {
    return '超出最大处理数字';
  }
  if (money === 0) {
    ChineseString = cnNumber[0] + cnIntLast;

    return ChineseString;
  }
  money = money.toString(); // 转换为字符串
  if (money.indexOf('.') === -1) {
    IntegerNum = money;
    DecimalNum = '';
  } else {
    parts = money.split('.');

    [IntegerNum, DecimalNum] = parts;
    DecimalNum = parts[1].substr(0, 4);
  }
  if (parseInt(IntegerNum, 10) > 0) {
    // 获取整型部分转换
    let zeroCount = 0;
    const IntLen = IntegerNum.length;
    for (let i = 0; i < IntLen; i += 1) {
      const n = IntegerNum.substr(i, 1);
      const p = IntLen - i - 1;
      const q = p / 4;
      const m = p % 4;
      if (n === '0') {
        zeroCount += 1;
      } else {
        if (zeroCount > 0) {
          ChineseString += cnNumber[0];
        }
        zeroCount = 0; // 归零
        ChineseString += cnNumber[parseInt(n, 10)] + cnIntBasic[m];
      }
      if (m === 0 && zeroCount < 4) {
        ChineseString += cnIntUnits[q];
      }
    }
    ChineseString += cnIntLast;
    // 整型部分处理完毕
  }
  if (DecimalNum !== '') {
    // 小数部分
    const decLen = DecimalNum.length;
    for (let i = 0; i < decLen; i += 1) {
      const n = DecimalNum.substr(i, 1);
      if (n !== '0') {
        ChineseString += cnNumber[Number(n)] + cnDecUnits[i];
      }
    }
  }
  if (ChineseString === '') {
    ChineseString += cnNumber[0] + cnIntLast;
  }

  return ChineseString;
}

export function formatDatetime({
  data: date,
  fmt = datetimeFormat.yearMonthDayHourMinuteSecond,
}) {
  if ((date || null) == null) {
    return '';
  }

  return dayjs(date).format(fmt);
}

export function formatTarget({ target, format, option = {} }) {
  if (isFunction(format)) {
    return format(target);
  }

  if (isString(format)) {
    switch (format) {
      case formatCollection.money:
        return formatMoney({
          data: target,
        });

      case formatCollection.datetime:
        return formatDatetime({
          data: target,
        });

      case formatCollection.chineseMoney:
        return formatMoneyToChinese({ target, option });

      case formatCollection.percentage:
        return `${toRound(target * 100, 1)}%`;

      default:
        return target;
    }
  }

  return target;
}
