import { checkStringIsNullOrWhiteSpace, isString } from './checkAssist';

const promptTextCollection = {
  mustObject: 'must be an object',
  mustString: 'must be a string',
  mustDate: 'must be a date',
  mustFunction: 'must be function',
  mustArray: 'must be array',
  disallowEmpty: 'disallow empty',
};

function buildPromptOptionalText({ value = null, ancillaryInformation = '' }) {
  return `${(value || null) == null ? '' : `, current is ${typeof value}`}${
    checkStringIsNullOrWhiteSpace(ancillaryInformation)
      ? ''
      : `, ${ancillaryInformation}`
  }`;
}

export const promptTextBuilder = {
  buildDisallowEmpty: ({ name = 'parameter', ancillaryInformation = '' }) => {
    return `${name} ${
      promptTextCollection.disallowEmpty
    }${buildPromptOptionalText({ value: null, ancillaryInformation })}`;
  },
  buildMustObject: ({
    name = 'parameter',
    value = null,
    ancillaryInformation = '',
  }) => {
    return `${name} ${promptTextCollection.mustObject}${buildPromptOptionalText(
      { value, ancillaryInformation },
    )}`;
  },
  buildMustString: ({
    name = 'parameter',
    value = null,
    ancillaryInformation = '',
  }) => {
    return `${name} ${promptTextCollection.mustString}${buildPromptOptionalText(
      { value, ancillaryInformation },
    )}`;
  },
  buildMustDate: ({
    name = 'parameter',
    value = null,
    ancillaryInformation = '',
  }) => {
    return `${name} ${promptTextCollection.mustDate}${buildPromptOptionalText({
      value,
      ancillaryInformation,
    })}`;
  },
  buildMustFunction: ({
    name = 'parameter',
    value = null,
    ancillaryInformation = '',
  }) => {
    return `${name} ${
      promptTextCollection.mustFunction
    }${buildPromptOptionalText({ value, ancillaryInformation })}`;
  },
  buildMustArray: ({
    name = 'parameter',
    value = null,
    ancillaryInformation = '',
  }) => {
    return `${name} ${promptTextCollection.mustArray}${buildPromptOptionalText({
      value,
      ancillaryInformation,
    })}`;
  },
};

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
