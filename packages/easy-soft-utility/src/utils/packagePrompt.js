import { checkStringIsNullOrWhiteSpace } from './checkAssist';
import { modulePackageName } from './definition';
/**
 * Build prompt module info
 */
export function buildPromptModuleInfo(moduleName, other = '') {
  return `${modulePackageName}::${moduleName}::${
    checkStringIsNullOrWhiteSpace(other) ? '' : other
  }`;
}
