import dayjs from 'dayjs';

import { checkStringIsNullOrWhiteSpace } from './checkAssist';
import { toDatetime, toNumber } from './convertAssist';

/**
 * create dayjs datetime
 * @param {String} datetime a datetime string, eg "2020-01-02"
 * @param {String} format format string, eg "YYYY-MM-DD"
 * @returns
 */
export function createDayJsDatetime(datetime, format) {
  return dayjs(datetime, format);
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
 * Calculate time interval
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
