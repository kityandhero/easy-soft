import { adjustUrl } from '../src';

describe('group http assist', () => {
  test("adjustUrl('//account/user//add') -> /account/user/add", () => {
    const result = adjustUrl('//account/user//add');

    expect(result).toBe('/account/user/add');
  });

  test("adjustUrl('http://www.a.com//account/user//add') -> http://www.a.com/account/user/add", () => {
    const result = adjustUrl('http://www.a.com//account/user//add');

    expect(result).toBe('http://www.a.com/account/user/add');
  });

  test("adjustUrl('/account/user//add','http://www.a.com/') -> http://www.a.com/account/user/add", () => {
    const result = adjustUrl('/account/user//add', 'http://www.a.com/');

    expect(result).toBe('http://www.a.com/account/user/add');
  });
});
