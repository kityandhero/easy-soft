import dayjs from 'dayjs';

import { checkStringIsNullOrWhiteSpace, isDate, isNull } from './checkAssist';
import { toDatetime, toNumber } from './convertAssist';
import { promptTextBuilder } from './promptAssist';
import { mergeTextMessage } from './tools';

/**
 * create dayjs datetime
 * @param {string} datetime a datetime string, eg "2020-01-02"
 * @param {string} format format string, eg "YYYY-MM-DD"
 */
export function createDayJsDatetime(datetime, format) {
  return dayjs(datetime, format);
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
