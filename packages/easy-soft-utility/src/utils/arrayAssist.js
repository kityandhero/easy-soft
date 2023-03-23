import { isArray } from './checkAssist';

/**
 * Shuffle array with random sort
 * @param {Array} array the array will be changed
 */
export function shuffleArray(array) {
  if (!isArray(array)) {
    throw new Error('params need array type');
  }

  return array.sort(() => Math.random() - 0.5);
}
