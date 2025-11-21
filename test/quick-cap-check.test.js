import * as utils from '../src/utils';
import {
  shouldCapitaliseI,
  shouldConvertToSentenceCase,
} from '../src/plugin-constants';

describe('quickCapitalisationCheck', () => {
  afterEach(() => {
    // Restore options/dictionaries to avoid cross-test leakage
    if (typeof utils.__resetAllOptionsAndDictionariesForTests === 'function') {
      utils.__resetAllOptionsAndDictionariesForTests();
    }
  });

  test('returns false for empty or non-text tails', () => {
    expect(utils.quickCapitalisationCheck('')).toBe(false);
    expect(utils.quickCapitalisationCheck(null)).toBe(false);
    expect(utils.quickCapitalisationCheck('@@@###')).toBe(false);
  });

  test('returns true when last char is alphabetic or whitespace', () => {
    expect(utils.quickCapitalisationCheck('hello')).toBe(true);
    expect(utils.quickCapitalisationCheck('hello ')).toBe(true);
    expect(utils.quickCapitalisationCheck('word i')).toBe(true);
  });

  test('normalises trailing <br> and returns true for preceding alphabetic', () => {
    expect(utils.quickCapitalisationCheck("I'm the content<br>")).toBe(true);
    expect(utils.quickCapitalisationCheck("Hello<br/>")).toBe(true);
  });

  test("honours sentence-mode (always true when enabled)", () => {
    // enable sentence mode in the shared options dictionary
    utils.optionsDictionary[shouldConvertToSentenceCase] = true;
    expect(utils.quickCapitalisationCheck('')).toBe(true);
  });

  test('detects standalone i when I-option enabled', () => {
    utils.optionsDictionary[shouldCapitaliseI] = true;
    expect(utils.quickCapitalisationCheck(' i')).toBe(true);
    expect(utils.quickCapitalisationCheck('i')).toBe(true);
  });
});
