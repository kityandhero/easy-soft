import { averageArray } from '../src';

test('averageArray [1, 2, 3, 4] should be 2.5', () => {
  expect(averageArray([1, 2, 3, 4])).toBe(2.5);
});
