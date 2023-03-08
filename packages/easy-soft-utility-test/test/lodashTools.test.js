import { trim } from 'easy-soft-utility';

test('trim', () => {
  expect(trim(' 1 ')).toBe('1');
});
