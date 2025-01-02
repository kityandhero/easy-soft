import { formatDatetime, formatMoneyToChinese } from '../src';

test('formatDatetime -> format new Date(2022, 0, 1) will be 2022-01-01', () => {
  const time = new Date(2022, 0, 1);

  const result = formatDatetime({
    data: time,
    format: 'YYYY-MM-DD',
  });

  expect(result).toBe('2022-01-01');
});

test('formatMoneyToChinese -> format 110.52 will be 壹佰壹拾元伍角贰分', () => {
  const result = formatMoneyToChinese({
    target: 110.52,
  });

  expect(result).toBe('壹佰壹拾元伍角贰分');
});

test('formatMoneyToChinese -> format 0 will be 零元整', () => {
  const result = formatMoneyToChinese({
    target: 0,
  });

  expect(result).toBe('零元整');
});
