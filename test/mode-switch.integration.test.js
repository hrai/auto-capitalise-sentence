/**
 * Integration tests for mode switching between word capitalisation and sentence case.
 * These tests focus on logic exported from utils rather than DOM mutation observers.
 */
import {
  capitaliseTextProxy,
  setShouldCapitaliseOption,
  __resetAllOptionsAndDictionariesForTests,
  shouldConvertToSentenceCase,
  shouldCapitaliseI,
  shouldCapitaliseNames,
  shouldCapitaliseAcronyms,
  shouldCapitaliseLocations,
  getConvertedToSentenceCase,
} from '../src/utils';

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

  test('Word mode capitalises isolated i at end of input', () => {
    const el = makeEl('I went to the store i');
    const result = run(el, 'I went to the store i');
    expect(result.endsWith(' I')).toBeTruthy();
  });

  test('Sentence case mode applies even without trigger punctuation', () => {
    const el = makeEl('hello world');
    setShouldCapitaliseOption(shouldConvertToSentenceCase, true);
    // Disable word flags implicitly
    wordFlags.forEach((f) => setShouldCapitaliseOption(f, false));
    const result = run(el, 'hello world');
    expect(result.startsWith('Hello')).toBeTruthy();
  });

  test('Sentence case preserves internal casing (current behaviour)', () => {
    const el = makeEl('hello NASA test');
    setShouldCapitaliseOption(shouldConvertToSentenceCase, true);
    wordFlags.forEach((f) => setShouldCapitaliseOption(f, false));
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
