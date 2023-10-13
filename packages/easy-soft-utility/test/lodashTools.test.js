import { throttle, trim } from '../src';

describe('trim', () => {
  test('trim', () => {
    expect(trim(' 1 ')).toBe('1');
  });
});

function og() {
  // console.log('===============');
}

const aaa = throttle(og, 1000);

describe('trim', () => {
  test('trim', () => {
    aaa();
    aaa();
    aaa();
    aaa();

    expect(true).toBe(true);
  });
});
