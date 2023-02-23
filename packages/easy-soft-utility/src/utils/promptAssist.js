import { checkStringIsNullOrWhiteSpace, isString } from './checkAssist';

const promptTextCollection = {
  mustObject: 'must be an object',
  mustString: 'must be a string',
  mustFunction: 'must be function',
  mustArray: 'must be array',
};

function buildPromptOptionalText({ value = null, ancillaryInformation = '' }) {
  return `${(value || null) == null ? '' : `, current is ${typeof value}`}${
    checkStringIsNullOrWhiteSpace(ancillaryInformation)
      ? ''
      : `, ${ancillaryInformation}`
  }`;
}

export const promptTextBuilder = {
  buildMustObject: ({ name, value = null, ancillaryInformation = '' }) => {
    return `${name} ${promptTextCollection.mustObject}${buildPromptOptionalText(
      { value, ancillaryInformation },
    )}`;
  },
  buildMustString: ({ name, value = null, ancillaryInformation = '' }) => {
    return `${name} ${promptTextCollection.mustString}${buildPromptOptionalText(
      { value, ancillaryInformation },
    )}`;
  },
  buildMustFunction: ({ name, value = null, ancillaryInformation = '' }) => {
    return `${name} ${
      promptTextCollection.mustFunction
    }${buildPromptOptionalText({ value, ancillaryInformation })}`;
  },
  buildMustArray: ({ name, value = null, ancillaryInformation = '' }) => {
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
