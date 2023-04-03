import { logDevelop } from '../src';

test('logDevelop', () => {
  logDevelop('message');

  expect(true).toBe(true);
});
