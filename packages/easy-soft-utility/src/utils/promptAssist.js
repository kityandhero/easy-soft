import { checkStringIsNullOrWhiteSpace, isString } from './checkAssist';

const promptTextCollection = {
  mustObject: 'must be an object',
  mustString: 'must be a string',
  mustFunction: 'must be function',
  mustArray: 'must be array',
};

export const promptTextBuilder = {
  buildMustObject: (v, ancillaryInformation = '') => {
    return `${v} ${promptTextCollection.mustObject}${
      checkStringIsNullOrWhiteSpace(ancillaryInformation)
        ? ''
        : `, ${ancillaryInformation}`
    }`;
  },
  buildMustString: (v, ancillaryInformation = '') => {
    return `${v} ${promptTextCollection.mustString}${
      checkStringIsNullOrWhiteSpace(ancillaryInformation)
        ? ''
        : `, ${ancillaryInformation}`
    }`;
  },
  buildMustFunction: (v, ancillaryInformation = '') => {
    return `${v} ${promptTextCollection.mustFunction}${
      checkStringIsNullOrWhiteSpace(ancillaryInformation)
        ? ''
        : `, ${ancillaryInformation}`
    }`;
  },
  buildMustArray: (v, ancillaryInformation = '') => {
    return `${v} ${promptTextCollection.mustArray}${
      checkStringIsNullOrWhiteSpace(ancillaryInformation)
        ? ''
        : `, ${ancillaryInformation}`
    }`;
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
