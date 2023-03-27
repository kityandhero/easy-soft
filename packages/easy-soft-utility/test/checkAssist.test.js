import { checkObjectIsNullOrEmpty, isNumber } from '../src';

test('checkObjectIsNullOrEmpty -> check {} will be true', () => {
  expect(checkObjectIsNullOrEmpty({})).toBe(true);
});

test('isNumber -> check 123456 will be true', () => {
  expect(isNumber(123_456)).toBe(true);
});

test('isNumber -> check "123456" will be false', () => {
  expect(isNumber('123456')).toBe(false);
});
