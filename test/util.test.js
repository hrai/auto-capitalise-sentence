// Legacy mega-test file replaced by focused test suites.
// This remains as a minimal smoke test to ensure primary exports still exist.
import * as utils from '../src/utils.js';

describe('utils smoke test', () => {
  test('exports core functions', () => {
    const expectedFunctions = [
      'capitaliseText',
      'getCapitalisedContent',
      'debounce',
      'getDebouncedCapitaliseText',
      'getConvertedToSentenceCase',
    ];
    expectedFunctions.forEach((fn) => {
      expect(typeof utils[fn]).toBe('function');
    });
  });
});
