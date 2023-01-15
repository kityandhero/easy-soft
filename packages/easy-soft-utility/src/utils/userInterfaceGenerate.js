import { checkStringIsNullOrWhiteSpace, isString } from './checkAssist';
import { logWarn } from './loggerAssist';
import { showRuntimeError } from './messagePromptAssist';

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

  if (!isString(label)) {
    const text = 'label必须为文本';

    logWarn({ label, name, helper });

    showRuntimeError({
      message: text,
    });
  } else {
    labelText = label;
  }

  if (!isString(name)) {
    const text = 'name必须为文本';

    logWarn({ label, name, helper });

    showRuntimeError({
      message: text,
    });
  } else {
    nameText = name;
  }

  if (!isString(helper)) {
    const text = 'helper必须为文本';

    logWarn({ label, name, helper });

    showRuntimeError({
      message: text,
    });
  } else {
    helperText = helper;
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
