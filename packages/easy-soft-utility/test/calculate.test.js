import { averageArray } from '../src';

test('averageArray', () => {
  expect(averageArray([1, 2, 3, 4])).toBe(2.5);
});
