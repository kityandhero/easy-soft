import { buildRGBColorFromHexColor } from '../src';

test('buildRGBColorFromHexColor -> "#000" will be "RGB(0,0,0)"', () => {
  expect(buildRGBColorFromHexColor('#000')).toBe('RGB(0,0,0)');
});
