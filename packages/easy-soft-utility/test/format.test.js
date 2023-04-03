import { formatDatetime } from '../src';

test('formatDatetime -> format new Date(2022, 0, 1) will be 2022-01-01', () => {
  const time = new Date(2022, 0, 1);

  const result = formatDatetime({
    data: time,
    format: 'YYYY-MM-DD',
  });

  expect(result).toBe('2022-01-01');
});
