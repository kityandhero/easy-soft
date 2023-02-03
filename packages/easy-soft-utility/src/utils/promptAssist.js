import { checkStringIsNullOrWhiteSpace, isString } from './checkAssist';

const promptTextCollection = {
  mustObject: 'must be an object',
  mustString: 'must be a string',
  mustFunction: 'must be function',
  mustArray: 'must be array',
};

export const promptTextBuilder = {
  buildMustObject: (v) => {
    return `${v} ${promptTextCollection.mustObject}`;
  },
  buildMustString: (v) => {
    return `${v} ${promptTextCollection.mustString}`;
  },
  buildMustFunction: (v) => {
    return `${v} ${promptTextCollection.mustFunction}`;
  },
  buildMustArray: (v) => {
    return `${v} ${promptTextCollection.mustArray}`;
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
