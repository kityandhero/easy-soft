import { getGuid } from '../src';

test('getGuid', () => {
  const guid = getGuid();

  expect(guid).toBe(guid);
});
