import { trim } from '../src';

describe('trim', () => {
  test('trim', () => {
    expect(trim(' 1 ')).toBe('1');
  });
});
