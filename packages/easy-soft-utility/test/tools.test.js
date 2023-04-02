import { mergeArrowText, mergeTextCollection, mergeTextMessage } from '../src';

test("mergeTextMessage -> mergeTextMessage('a', 'b') to will be 'a -> b'", () => {
  const result = mergeTextMessage('a', 'b');

  expect(result).toBe('a -> b');
});

test("mergeTextCollection -> mergeTextCollection({textCollection:['a', 'b', '', 'c'],separator:' <> '}) to will be 'a <> b <> c'", () => {
  const result = mergeTextCollection({
    textCollection: ['a', 'b', '', 'c'],
    separator: ' <> ',
  });

  expect(result).toBe('a <> b <> c');
});

test("mergeArrowText -> mergeArrowText('a', 'b', '', 'c') to will be 'a -> b -> c'", () => {
  const result = mergeArrowText('a', 'b', '', 'c');

  expect(result).toBe('a -> b -> c');
});
