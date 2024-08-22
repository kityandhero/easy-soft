import { checkObjectIsNullOrEmpty, hasKey, isNumber } from '../src';

test('checkObjectIsNullOrEmpty -> check {} will be true', () => {
  expect(checkObjectIsNullOrEmpty({})).toBe(true);
});

test('hasKey -> check key "a" in object {a:1} will be true', () => {
  expect(hasKey({ a: 1 }, 'a')).toBe(true);
});

test('isNumber -> check 123456 will be true', () => {
  expect(isNumber(123_456)).toBe(true);
});

test('isNumber -> check "123456" will be false', () => {
  expect(isNumber('123456')).toBe(false);
});
