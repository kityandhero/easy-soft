import {
  distinctAdjacent,
  mergeArrowText,
  mergeTextCollection,
  mergeTextMessage,
} from '../src';

test("mergeTextMessage -> mergeTextMessage('a', 'b') to will be 'a -> b'", () => {
  const result = mergeTextMessage('a', 'b');

  expect(result).toBe('a -> b');
});

test("mergeTextCollection -> mergeTextCollection({textCollection:['', 'a', 'b', '', 'c'],separator:' <> '}) to will be 'a <> b <> c'", () => {
  const result = mergeTextCollection({
    textCollection: ['', 'a', 'b', '', 'c'],
    separator: ' <> ',
  });

  expect(result).toBe('a <> b <> c');
});

test("mergeArrowText -> mergeArrowText('', 'a', 'b', '', 'c') to will be 'a -> b -> c'", () => {
  const result = mergeArrowText('', 'a', 'b', '', 'c');

  expect(result).toBe('a -> b -> c');
});

test("distinctAdjacent -> distinctAdjacent(['1', '1', '2', '2', '1', '3', '1', '1', '4'], (o) => o === '1') to will be ['1', '2', '2', '1', '3', '1', '4']", () => {
  const list = ['1', '1', '2', '2', '1', '3', '1', '1', '4'];

  const listResult = distinctAdjacent(list, (o) => o === '1');

  expect(listResult.length).toBe(7);
});
