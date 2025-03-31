import {
  compareTimeGreaterThan,
  createDayJsDatetime,
  emptyDatetime,
  getTimeStamp,
  getWeekday,
  toNumber,
} from '../src';

test('compareTimeGreaterThan -> check new greater then 2023-01-01 will be true', () => {
  const tokenDeadline = toNumber(getTimeStamp(new Date()));

  const result = compareTimeGreaterThan(tokenDeadline, '2023-01-01');

  expect(result).toBe(true);
});

test('createDayJsDatetime -> emptyDatetime will be null', () => {
  const data = createDayJsDatetime({
    datetime: emptyDatetime,
    convertEmptyDatetimeToNull: true,
  });

  expect(data).toBe(null);
});

test('getWeekday -> 2025/4/1 will be 2', () => {
  const o = getWeekday({ year: 2025, month: 4 });

  expect(o).toBe(2);
});
