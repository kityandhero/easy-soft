import { getGuid } from 'easy-soft-utility';

test('getGuid', () => {
  const guid = getGuid();

  expect(guid).toBe(guid);
});
