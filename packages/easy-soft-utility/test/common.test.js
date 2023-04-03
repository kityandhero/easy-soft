import { convertCollection, getValueByKey, replaceWithKeep } from '../src';

test("replaceWithKeep -> replaceWithKeep('123456789ABCDEF', '***', 2, 6) to will be 123***ABCDEF", () => {
  const result = replaceWithKeep('123456789ABCDEF', '***', 2, 6);

  expect(result).toBe('123***ABCDEF');
});

test('getValueByKey -> get value and convert to date "{ a: \'2021-08-25 11:13:09\' }" key a value type to will be typeof new Date()', () => {
  const data = { a: '2021-08-25 11:13:09' };

  const result = getValueByKey({
    data: data,
    key: 'a',
    convert: convertCollection.datetime,
  });

  expect(typeof result).toBe(typeof new Date());
});
