import { compareTimeGreaterThan, getTimeStamp, toNumber } from '../src';

test('compareTimeGreaterThan -> check new greater then 2023-01-01 will be true', () => {
  const tokenDeadline = toNumber(getTimeStamp(new Date()));

  const result = compareTimeGreaterThan(tokenDeadline, '2023-01-01');

  expect(result).toBe(true);
});
