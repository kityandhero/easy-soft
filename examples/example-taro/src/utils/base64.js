import { decodeBase64, encodeBase64, logInfo } from 'easy-soft-utility';

export function testBase64() {
  const text = '123456';

  const encodeText = encodeBase64(text);
  const decodeText = decodeBase64(encodeText);

  logInfo(
    {
      text,
      encodeText,
      decodeText,
    },
    'base64 test',
  );
}
