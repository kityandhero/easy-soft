import { checkStringIsNullOrWhiteSpace, isString } from './checkAssist';
import { logError } from './loggerAssist';
import { showSimpleErrorMessage } from './messagePromptAssist';
import { promptTextBuilder } from './promptAssist';

/**
 * Build field description like '请输入名称,以字母开头'
 */
export function buildFieldDescription(
  title,
  operation,
  ancillaryInformation = '',
) {
  return `请${operation || '输入'}${title}${
    checkStringIsNullOrWhiteSpace(ancillaryInformation)
      ? ''
      : `,${ancillaryInformation}`
  }`;
}

export function checkFromConfig({ label, name, helper }) {
  let labelText = '';
  let nameText = '';
  let helperText = '';

  if (isString(label)) {
    labelText = label;
  } else {
    const text = promptTextBuilder.buildMustString('label');

    logError({ label, name, helper }, text);

    showSimpleErrorMessage(text);
  }

  if (isString(name)) {
    nameText = name;
  } else {
    const text = promptTextBuilder.buildMustString('name');

    logError({ label, name, helper }, text);

    showSimpleErrorMessage(text);
  }

  if (isString(helper)) {
    helperText = helper;
  } else {
    const text = promptTextBuilder.buildMustString('helper');

    logError({ label, name, helper }, text);

    showSimpleErrorMessage(text);
  }

  return {
    label: labelText,
    name: nameText,
    helper: helperText,
  };
}

/**
 * Build field helper message
 */
export function buildFieldHelper(v, prefix = '注: ') {
  return `${prefix}${v}. `;
}
