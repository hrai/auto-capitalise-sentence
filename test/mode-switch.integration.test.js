/**
 * Integration tests for mode switching between word capitalisation and sentence case.
 * These tests focus on logic exported from utils rather than DOM mutation observers.
 */
import * as utils from '../src/utils';
const {
  capitaliseTextProxy,
  setShouldCapitaliseOption,
  __resetAllOptionsAndDictionariesForTests,
  shouldConvertToSentenceCase,
  shouldCapitaliseI,
  shouldCapitaliseNames,
  shouldCapitaliseAcronyms,
  shouldCapitaliseLocations,
  getConvertedToSentenceCase,
} = utils;

// NOTE: We re-import constants through require to avoid circular (use relative path if necessary)

// Simple mock element structure
function makeEl(initial, tag = 'INPUT') {
  return {
    tagName: tag,
    value: initial,
  };
}

function getText(el) {
  return el.value;
}
function setText(el, _tag, updated) {
  el.value = updated;
}

// Helpers to invoke capitaliseTextProxy similarly to runtime
function run(el, text) {
  el.value = text;
  capitaliseTextProxy(el, undefined, undefined, getText, setText);
  return el.value;
}

const wordFlags = [
  shouldCapitaliseI,
  shouldCapitaliseNames,
  shouldCapitaliseAcronyms,
  shouldCapitaliseLocations,
];

describe('Mode switching behaviour', () => {
  beforeEach(() => {
    __resetAllOptionsAndDictionariesForTests();
    // Reset flags: word flags on, sentence case off
    setShouldCapitaliseOption(shouldConvertToSentenceCase, false);
    wordFlags.forEach((f) => setShouldCapitaliseOption(f, true));
  });

  test('Word mode capitalises isolated i only after space/punctuation is added', () => {
    // 'i' at end of string should NOT be capitalized (could be part of a word being typed)
    const el1 = makeEl('I went to the store i');
    const result1 = run(el1, 'I went to the store i');
    expect(result1.endsWith(' i')).toBeTruthy(); // Should remain lowercase until confirmed standalone

    // 'i' followed by space SHOULD be capitalized
    const el2 = makeEl('I went to the store i ');
    const result2 = run(el2, 'I went to the store i ');
    expect(result2).toContain(' I ');
  });

  test('Sentence case mode applies even without trigger punctuation', () => {
    const el = makeEl('hello world');
    setShouldCapitaliseOption(shouldConvertToSentenceCase, true);
    // Word flags should have been auto-disabled by exclusivity logic
    expect(wordFlags.some((f) => utils.optionsDictionary[f])).toBe(false);
    const result = run(el, 'hello world');
    expect(result.startsWith('Hello')).toBeTruthy();
  });

  test('Sentence case preserves internal casing (current behaviour)', () => {
    const el = makeEl('hello NASA test');
    setShouldCapitaliseOption(shouldConvertToSentenceCase, true);
    expect(wordFlags.some((f) => utils.optionsDictionary[f])).toBe(false);
    const result = run(el, 'hello NASA test');
    // Only first letter changed to uppercase if needed, internal acronym preserved
    expect(result).toBe('Hello NASA test');
  });

  test('getConvertedToSentenceCase capitalises first letters after punctuation', () => {
    const src = 'hello. world! test? yes';
    const conv = getConvertedToSentenceCase(src);
    expect(conv).toMatch(/Hello\. World! Test\? Yes/);
  });
});
