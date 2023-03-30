import { replaceWithKeep } from '../src';

test("replaceWithKeep -> replaceWithKeep('123456789ABCDEF', '***', 2, 6) to will be 123***ABCDEF", () => {
  const result = replaceWithKeep('123456789ABCDEF', '***', 2, 6);

  expect(result).toBe('123***ABCDEF');
});
