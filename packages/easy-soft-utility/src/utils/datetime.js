import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

import {
  canToNumber,
  checkStringIsNullOrWhiteSpace,
  isDate,
  isNull,
  isNumber,
  isString,
} from './checkAssist';
import {
  chineseNumeralCollection,
  chineseZodiacCollection,
  earthlyBranchCollection,
  emptyDatetime,
  heavenlyStemCollection,
  lunarInfoCollection,
  lunarPrefixCollection,
  lunarSuffixCollection,
  solarMonthCollection,
  solarTermCollection,
  termInfoCollection,
} from './constants';
import { toNumber } from './convertAssist';
import { toDatetime } from './convertExtraAssist';
import { logException } from './loggerAssist';
import { promptTextBuilder } from './promptAssist';
import { mergeTextMessage } from './tools';

dayjs.extend(utc);
dayjs.extend(timezone);

/**
 * create dayjs datetime
 * @param {Object} options options
 * @param {string} options.datetime a datetime string, eg "2020-01-02"
 * @param {string} options.format format string, eg "YYYY-MM-DD"
 * @param {string} options.locale locale config, default is dayjs.tz.guess()
 * @param {boolean} options.convertEmptyDatetimeToNull whether convert empty datetime(1970-01-01 00:00:00) to null, default is true
 */
export function createDayJsDatetime({
  datetime,
  format = 'YYYY-MM-DD',
  locale = dayjs.tz.guess(),
  convertEmptyDatetimeToNull = true,
}) {
  if (
    convertEmptyDatetimeToNull &&
    toDatetime(datetime).getTime() == toDatetime(emptyDatetime).getTime()
  ) {
    return null;
  }

  return dayjs(datetime, format, locale);
}

/**
 * Add hour to target time
 * @param {Date|string} datetime target time
 * @param {number} value
 */
export function addHour(datetime, value) {
  const t = toDatetime(datetime);

  t.setHours(t.getHours() + value);

  return t;
}

/**
 * Add minute to target time
 * @param {Date|string} datetime target time
 * @param {number} value
 */
export function addMinute(datetime, value) {
  const t = toDatetime(datetime);

  t.setMinutes(t.getMinutes() + value);

  return t;
}

/**
 * Add second to target time
 * @param {Date|string} datetime target time
 * @param {number} value
 */
export function addSecond(datetime, value) {
  const t = toDatetime(datetime);

  t.setSeconds(t.getSeconds() + value);

  return t;
}

/**
 * Get current time
 */
export function getNow() {
  return new Date();
}

/**
 * Compare time less than target
 * @param {Date|number|string} time the time will compare.
 * @param {Date|number|string} compareTarget compare target.
 */
export function compareTimeLessThan(time, compareTarget) {
  const v = toDatetime(time);
  const target = toDatetime(compareTarget);

  return v < target;
}

/**
 * Compare time greater than target
 * @param {Date|number|string} time the time will compare.
 * @param {Date|number|string} compareTarget compare target.
 */
export function compareTimeGreaterThan(time, compareTarget) {
  const v = toDatetime(time);
  const target = toDatetime(compareTarget);

  return v > target;
}

/**
 * get time stamp
 * @param {Date|string|number|null} time time, if time is null, will use now time.
 */
export function getTimeStamp(time = null) {
  if (isNull(time) || !isDate(time)) {
    const text = mergeTextMessage(
      'getTimeStamp',
      promptTextBuilder.buildMustDate({}),
    );

    throw new Error(text);
  }

  return toDatetime(time).getTime();
}

/**
 * Calculate time interval
 * @param {Date} startTime start time.
 * @param {Date} endTime end time.
 */
export function calculateTimeInterval(startTime, endTime) {
  const timeBegin = startTime.getTime();
  const timeEnd = endTime.getTime();
  const total = (timeEnd - timeBegin) / 1000;

  const day = Number.parseInt(total / (24 * 60 * 60)); //计算整数天数
  const afterDay = total - day * 24 * 60 * 60; //取得算出天数后剩余的秒数
  const hour = Number.parseInt(afterDay / (60 * 60)); //计算整数小时数
  const afterHour = total - day * 24 * 60 * 60 - hour * 60 * 60; //取得算出小时数后剩余的秒数
  const min = Number.parseInt(afterHour / 60); //计算整数分
  const afterMin = total - day * 24 * 60 * 60 - hour * 60 * 60 - min * 60; //取得算出分后剩余的秒数

  return {
    day,
    hour: hour,
    minute: min,
    second: afterMin,
  };
}

/**
 * Calculate date interval
 * @param {Date|number|string} date start time.
 * @param {Date|number|string|null} nowDate end time, is endTime is null, will use now time.
 * @param {string|null} unit target unit, if it is not "second,minute,hour,day,week,month,quarter,year", will use millisecond unit.
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
 * Calculate month interval
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

export function getDayOfWeek({ data: date }) {
  return dayjs(date).day();
}

/**
 * Get today in week like '星期日' / '星期一' / '星期二' / '星期三' / '星期四' / '星期五' / '星期六'
 */
export function getTodayOfWeek(transferChinese = true) {
  const day = dayjs().day();

  if (!transferChinese) {
    return day;
  }

  let result = '';

  switch (toNumber(day)) {
    case 0: {
      result = '日';
      break;
    }

    case 1: {
      result = '一';
      break;
    }

    case 2: {
      result = '二';
      break;
    }

    case 3: {
      result = '三';
      break;
    }

    case 4: {
      result = '四';
      break;
    }

    case 5: {
      result = '五';
      break;
    }

    case 6: {
      result = '六';
      break;
    }

    default: {
      result = '';
      break;
    }
  }

  return checkStringIsNullOrWhiteSpace(result) ? '' : `星期${result}`;
}

/**
 * judge year whether leap year
 * @param {number|string} year
 * @returns {boolean}
 */
export function judgeLeapYear(year) {
  if (!isString(year) && !isNumber(year)) {
    logException(
      {
        year,
      },
      'param year must be string or number',
    );

    return false;
  }

  if (isString(year) && !canToNumber(year)) {
    logException(
      {
        year,
      },
      'param year must can convert to number',
    );
  }

  const yearAdjust = isNumber(year) ? year : toNumber(year);

  return (
    (yearAdjust % 4 == 0 && yearAdjust % 100 != 0) || yearAdjust % 400 == 0
  );
}

/**
 * 获取指定月份的第一天是周几。
 * Get the day of the week on the first day of the target month.
 * @param {Object} option parameter object
 * @param {number} option.year target year
 * @param {number} option.month target month
 * @returns {number} result
 */
export function getWeekday({ year, month }) {
  const date = new Date(`${year}/${month}/01 00:00:00`);

  return date.getDay();
}

/**
 * 获取指定月份的天数。
 * Gets the total number of days for the target month.
 * @param {Object} option parameter object
 * @param {number} option.year target year
 * @param {number} option.month target month
 * @returns {number} result
 */
export function getMonthDay({ year, month }) {
  const days = new Date(year, month, 0).getDate();

  return days;
}

/**
 * 返回农历某年闰月是哪个月；若没有闰月 则返回 0
 * @param {number} year 目标年份 (需要介于 1900 ~ 2100)
 * @return {number} result (0-12)
 */
export function getLeapMonth(year) {
  //闰字编码 \u95f0
  return lunarInfoCollection[year - 1900] & 0xf;
}

/**
 * 返回农历某年闰月的天数 若该年没有闰月则返回 0
 * @param {number} year 目标年份 (需要介于 1900 ~ 2100)
 * @return {number} result (0、29、30)
 */
export function getLeapDays(year) {
  if (getLeapMonth(year)) {
    return lunarInfoCollection[year - 1900] & 0x1_00_00 ? 30 : 29;
  }

  return 0;
}

/**
 * 返回农历某年一整年的总天数
 * @param {number} year 目标年份 (需要介于 1900 ~ 2100)
 * @return {number} result
 */
export function getLunarYearDays(year) {
  let index,
    sum = 348;

  for (index = 0x80_00; index > 0x8; index >>= 1) {
    sum += lunarInfoCollection[year - 1900] & index ? 1 : 0;
  }

  return sum + getLeapDays(year);
}

/**
 * 返回农历某年某月（非闰月）的总天数，计算闰月时的天数请使用 leapDays 方法
 * @param {number} year 目标年份 (需要介于 1900 ~ 2100)
 * @param {number} month 目标月份 (需要介于 1900 ~ 2100)
 * @return {number} result (-1、29、30)
 */
export function getMonthDays(year, month) {
  if (month > 12 || month < 1) {
    return -1;
  }

  //月份参数从1至12，参数错误返回-1
  return lunarInfoCollection[year - 1900] & (0x1_00_00 >> month) ? 30 : 29;
}

/**
 * 返回公历某年某月的天数
 * @param solar Year
 * @return {number} result (-1、28、29、30、31)
 */
export function getSolarDays(year, month) {
  if (month > 12 || month < 1) {
    return -1;
  }

  //若参数错误 返回-1
  let ms = month - 1;

  if (ms == 1) {
    //2月份的闰平规律测算后确认返回28或29
    return (year % 4 == 0 && year % 100 != 0) || year % 400 == 0 ? 29 : 28;
  } else {
    return solarMonthCollection[ms];
  }
}

/**
 * 农历年份转换为干支纪年
 * @param {number} year 农历年的年份数
 * @return string
 */
export function convertLunarYearToSexagenaryCycleYear(year) {
  let heavenlyStemKey = (year - 3) % 10;
  let earthlyBranchKey = (year - 3) % 12;

  //如果余数为0则为最后一个天干
  if (heavenlyStemKey == 0) {
    heavenlyStemKey = 10;
  }

  //如果余数为0则为最后一个地支
  if (earthlyBranchKey == 0) {
    earthlyBranchKey = 12;
  }

  return (
    heavenlyStemCollection[heavenlyStemKey - 1] +
    earthlyBranchCollection[earthlyBranchKey - 1]
  );
}

/**
 * 获取公历月日所属星座
 * @param {number} month 公历月
 * @param {number} day 公历日
 * @return string
 */
export function getConstellation(month, day) {
  let s =
    '\u9B54\u7FAF\u6C34\u74F6\u53CC\u9C7C\u767D\u7F8A\u91D1\u725B\u53CC\u5B50\u5DE8\u87F9\u72EE\u5B50\u5904\u5973\u5929\u79E4\u5929\u874E\u5C04\u624B\u9B54\u7FAF';

  let array = [20, 19, 21, 21, 21, 22, 23, 23, 23, 23, 22, 22];

  return (
    s.slice(
      month * 2 - (day < array[month - 1] ? 2 : 0),
      month * 2 - (day < array[month - 1] ? 2 : 0) + 2,
    ) + '\u5EA7'
  );
}

/**
 * 传入offset偏移量返回干支
 * @param offset 相对甲子的偏移量
 * @return string
 */
export function convertToSexagenaryCycle(offset) {
  return (
    heavenlyStemCollection[offset % 10] + earthlyBranchCollection[offset % 12]
  );
}

/**
 * 传入公历某年获得该年第n个节气的公历日期
 * @param {number} year 目标年份 (需要介于 1900 ~ 2100)
 * @param {number} n 二十四节气中的第几个节气(1~24)；从n=1(小寒)算起
 * @return day Number
 */
export function getTerm(year, n) {
  if (year < 1900 || year > 2100) {
    return -1;
  }

  if (n < 1 || n > 24) {
    return -1;
  }

  let table = termInfoCollection[year - 1900];

  let infoCollection = [
    Number.parseInt('0x' + table.slice(0, 5)).toString(),
    Number.parseInt('0x' + table.slice(5, 10)).toString(),
    Number.parseInt('0x' + table.slice(10, 15)).toString(),
    Number.parseInt('0x' + table.slice(15, 20)).toString(),
    Number.parseInt('0x' + table.slice(20, 25)).toString(),
    Number.parseInt('0x' + table.slice(25, 30)).toString(),
  ];

  let days = [
    infoCollection[0].slice(0, 1),
    infoCollection[0].slice(1, 3),
    infoCollection[0].slice(3, 4),
    infoCollection[0].slice(4, 6),
    infoCollection[1].slice(0, 1),
    infoCollection[1].slice(1, 3),
    infoCollection[1].slice(3, 4),
    infoCollection[1].slice(4, 6),
    infoCollection[2].slice(0, 1),
    infoCollection[2].slice(1, 3),
    infoCollection[2].slice(3, 4),
    infoCollection[2].slice(4, 6),
    infoCollection[3].slice(0, 1),
    infoCollection[3].slice(1, 3),
    infoCollection[3].slice(3, 4),
    infoCollection[3].slice(4, 6),
    infoCollection[4].slice(0, 1),
    infoCollection[4].slice(1, 3),
    infoCollection[4].slice(3, 4),
    infoCollection[4].slice(4, 6),
    infoCollection[5].slice(0, 1),
    infoCollection[5].slice(1, 3),
    infoCollection[5].slice(3, 4),
    infoCollection[5].slice(4, 6),
  ];

  return Number.parseInt(days[n - 1]);
}

/**
 * 传入农历数字月份返回汉语通俗表示法
 * @param {number} month 农历月份
 * @return string
 */
export function toChinaMonth(month) {
  if (month > 12 || month < 1) {
    //若参数错误 返回-1
    return -1;
  }

  let s = lunarSuffixCollection[month - 1];

  //加上月字
  s += '\u6708';

  return s;
}

/**
 * 传入农历日期数字返回汉字表示法
 * @param {number} day 农历日期（某天）
 * @return string
 */
export function toChinaDay(day) {
  let s;

  switch (day) {
    case 10: {
      s = '\u521D\u5341';
      break;
    }

    case 20: {
      s = '\u4E8C\u5341';
      break;
    }

    case 30: {
      s = '\u4E09\u5341';
      break;
    }

    default: {
      s = lunarPrefixCollection[Math.floor(day / 10)];
      s += chineseNumeralCollection[day % 10];
    }
  }

  return s;
}

/**
 * 年份转生肖[仅能大致转换] => 精确划分生肖分界线是“立春”
 * @param {number} year 指定年份
 * @return string
 */
export function getChineseZodiac(year) {
  return chineseZodiacCollection[(year - 4) % 12];
}

/**
 * 传入公历年月日获得详细的公历、农历信息（参数区间1900.1.31~2100.12.31）
 * @param {Object} option 参数体
 * @param {number} option.year 公历某年
 * @param {number} option.month 公历某月
 * @param {number} option.day 公历某天
 * @return object
 */
export function convertSolarToLunar({ year, month, day }) {
  if (year < 1900 || year > 2100) {
    logException(
      {
        year: year,
      },
      '年份需要介于 1900 ~ 2100 之间',
    );

    return null;
  }

  //年份限定、上限
  if (year == 1900 && month == 1 && day < 31) {
    logException(
      {
        year: year,
      },
      '可转换的日期下限为 1900.1.31',
    );

    return null;
  }

  const targetDate = year
    ? new Date(year, Number.parseInt(month) - 1, day)
    : new Date();

  let index = 0;
  let leap = 0;
  let temporary = 0;

  //修正参数
  const yearAdjust = targetDate.getFullYear();
  const monthAdjust = targetDate.getMonth() + 1;
  const dayAdjust = targetDate.getDate();

  let offset =
    (Date.UTC(
      targetDate.getFullYear(),
      targetDate.getMonth(),
      targetDate.getDate(),
    ) -
      Date.UTC(1900, 0, 31)) /
    86_400_000;

  for (index = 1900; index < 2101 && offset > 0; index++) {
    temporary = getLunarYearDays(index);

    offset -= temporary;
  }

  if (offset < 0) {
    offset += temporary;
    index--;
  }

  //是否今天
  const todayDate = new Date();
  let whetherToday = false;

  if (
    todayDate.getFullYear() == yearAdjust &&
    todayDate.getMonth() + 1 == monthAdjust &&
    todayDate.getDate() == dayAdjust
  ) {
    whetherToday = true;
  }

  //星期几
  let weekChineseHabit = targetDate.getDay();
  let cWeek = chineseNumeralCollection[weekChineseHabit];

  if (weekChineseHabit == 0) {
    weekChineseHabit = 7;
  } //数字表示周几顺应天朝周一开始的惯例

  //农历年
  const lunarYear = index;

  //闰哪个月
  leap = getLeapMonth(index);

  let whetherLeap = false;

  //效验闰月
  for (index = 1; index < 13 && offset > 0; index++) {
    //闰月
    if (leap > 0 && index == leap + 1 && whetherLeap == false) {
      --index;
      whetherLeap = true;
      temporary = getLeapDays(lunarYear); //计算农历闰月天数
    } else {
      temporary = getMonthDays(lunarYear, index); //计算农历普通月天数
    }
    //解除闰月
    if (whetherLeap == true && index == leap + 1) {
      whetherLeap = false;
    }
    offset -= temporary;
  }
  if (offset == 0 && leap > 0 && index == leap + 1)
    if (whetherLeap) {
      whetherLeap = false;
    } else {
      whetherLeap = true;
      --index;
    }
  if (offset < 0) {
    offset += temporary;
    --index;
  }
  //农历月
  const lunarMonth = index;

  //农历日
  let lunarDay = offset + 1;

  //天干地支处理
  let sm = monthAdjust - 1;
  const sexagenaryCycleYear = convertLunarYearToSexagenaryCycleYear(lunarYear);

  //月柱 1900年1月小寒以前为 丙子月(60进制12)
  let firstNode = getTerm(lunarYear, monthAdjust * 2 - 1); //返回当月「节」为几日开始
  let secondNode = getTerm(lunarYear, monthAdjust * 2); //返回当月「节」为几日开始
  //依据12节气修正干支月
  let sexagenaryCycleMonth = convertToSexagenaryCycle(
    (yearAdjust - 1900) * 12 + monthAdjust + 11,
  );

  if (dayAdjust >= firstNode) {
    sexagenaryCycleMonth = convertToSexagenaryCycle(
      (yearAdjust - 1900) * 12 + monthAdjust + 12,
    );
  }

  //传入的日期的节气与否
  let whetherTerm = false;
  let term = '';

  if (firstNode == dayAdjust) {
    whetherTerm = true;
    term = solarTermCollection[monthAdjust * 2 - 2];
  }

  if (secondNode == dayAdjust) {
    whetherTerm = true;
    term = solarTermCollection[monthAdjust * 2 - 1];
  }

  //日柱 当月一日与 1900/1/1 相差天数
  let dayCyclical =
    Date.UTC(yearAdjust, sm, 1, 0, 0, 0, 0) / 86_400_000 + 25_567 + 10;

  const sexagenaryCycleDay = convertToSexagenaryCycle(
    dayCyclical + dayAdjust - 1,
  );

  //该日期所属的星座
  const constellation = getConstellation(monthAdjust, dayAdjust);

  return {
    lunarYear: lunarYear,
    lunarMonth: lunarMonth,
    lunarMonthName: (whetherLeap ? '\u95F0' : '') + toChinaMonth(lunarMonth),
    lunarDay: lunarDay,
    lunarDayName: toChinaDay(lunarDay),
    chineseZodiac: getChineseZodiac(lunarYear),
    solarYear: yearAdjust,
    solarMonth: monthAdjust,
    solarDay: dayAdjust,
    sexagenaryCycleYear: sexagenaryCycleYear,
    sexagenaryCycleMonth: sexagenaryCycleMonth,
    sexagenaryCycleDay: sexagenaryCycleDay,
    whetherToday: whetherToday,
    whetherLeap: whetherLeap,
    weekChineseHabit: weekChineseHabit,
    weekName: '\u661F\u671F' + cWeek,
    whetherTerm: whetherTerm,
    term: term,
    constellation: constellation,
  };
}

/**
 * 传入农历年月日以及传入的月份是否闰月获得详细的公历、农历信息 （参数区间1900.1.31~2100.12.1）
 * @param {Object} option 参数体
 * @param {number} option.year 农历某年
 * @param {number} option.month 农历某月
 * @param {number} option.day 农历某天
 * @param {boolean} option.whetherLeapMonth 是否为闰月
 * @return object
 */
export function convertLunarToSolar({
  year,
  month,
  day,
  whetherLeapMonth = false,
}) {
  const whetherLeapMonthAdjust = !!whetherLeapMonth;

  let getLeapMonth = getLeapMonth(year);

  if (whetherLeapMonthAdjust && getLeapMonth != month) {
    //传参要求计算该闰月公历 但该年得出的闰月与传参的月份并不同
    return -1;
  }

  if (
    (year == 2100 && month == 12 && day > 1) ||
    (year == 1900 && month == 1 && day < 31)
  ) {
    //超出了最大极限值
    return -1;
  }

  let monthDays = getMonthDays(year, month);
  let _day = monthDays;

  //if month is leap, _day use getLeapDays method
  if (whetherLeapMonthAdjust) {
    _day = getLeapDays(year, month);
  }

  if (year < 1900 || year > 2100 || day > _day) {
    //参数合法性效验
    return -1;
  }

  //计算农历的时间差
  let offset = 0;

  for (let index = 1900; index < year; index++) {
    offset += getLunarYearDays(index);
  }

  let leap = 0;
  let isAdd = false;

  for (let index = 1; index < month; index++) {
    leap = getLeapMonth(year);

    if (
      !isAdd && //处理闰月
      leap <= index &&
      leap > 0
    ) {
      offset += getLeapDays(year);
      isAdd = true;
    }

    offset += getMonthDays(year, index);
  }

  //转换闰月农历 需补充该年闰月的前一个月的时差
  if (whetherLeapMonthAdjust) {
    offset += monthDays;
  }

  //1900年农历正月一日的公历时间为1900年1月30日0时0分0秒(该时间也是本农历的最开始起始点)
  let stamp = Date.UTC(1900, 1, 30, 0, 0, 0);
  let calObject = new Date((offset + day - 31) * 86_400_000 + stamp);
  let y = calObject.getUTCFullYear();
  let m = calObject.getUTCMonth() + 1;
  let d = calObject.getUTCDate();

  return convertSolarToLunar({
    year: y,
    month: m,
    day: d,
  });
}
