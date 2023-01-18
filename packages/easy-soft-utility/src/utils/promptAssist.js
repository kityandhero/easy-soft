import { checkStringIsNullOrWhiteSpace, isString } from './checkAssist';

/**
 * Build prompt module info
 */
export function buildPromptModuleInfo(
  moduleName,
  message,
  ...childNameCollection
) {
  const list = [moduleName, ...childNameCollection].filter(
    (o) => isString(o) && !checkStringIsNullOrWhiteSpace(o),
  );

  return `${list.join('::')}::${
    checkStringIsNullOrWhiteSpace(message) ? '' : message
  }`;
}
