import { checkObjectIsNullOrEmpty } from '../src';

test('checkObjectIsNullOrEmpty -> check {} will be true', () => {
  expect(checkObjectIsNullOrEmpty({})).toBe(true);
});
