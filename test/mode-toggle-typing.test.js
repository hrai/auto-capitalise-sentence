/**
 * Tests for mode toggle followed by typing.
 * This tests the real-world scenario: word mode -> sentence mode -> word mode -> continue typing.
 * Ensures that word capitalization (acronyms, names) works after toggling back to word mode.
 */
import * as utils from '../src/utils';
const {
  capitaliseTextProxy,
  setShouldCapitaliseOption,
  setKeyValue,
  __resetAllOptionsAndDictionariesForTests,
  shouldCapitaliseI,
  shouldCapitaliseNames,
  shouldCapitaliseAcronyms,
  shouldConvertToSentenceCase,
  namesKeyVal,
  acronymsKeyVal,
} = utils;

function makeEl(initial = '', tag = 'INPUT') {
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

// Simulate incremental typing by calling capitaliseTextProxy after each character
function typeText(el, textToType) {
  for (const char of textToType) {
    el.value += char;
    capitaliseTextProxy(el, undefined, undefined, getText, setText);
  }
  return el.value;
}

describe('Mode toggle then continue typing', () => {
  beforeEach(() => {
    __resetAllOptionsAndDictionariesForTests();
    // Set up dictionaries
    setKeyValue(namesKeyVal, { john: 'John', mary: 'Mary', alice: 'Alice' });
    setKeyValue(acronymsKeyVal, { nasa: 'NASA', fbi: 'FBI', usa: 'USA' });
  });

  test('word mode -> sentence mode -> word mode: acronyms should capitalize while typing', () => {
    // Start in word mode
    setShouldCapitaliseOption(shouldCapitaliseI, true);
    setShouldCapitaliseOption(shouldCapitaliseNames, true);
    setShouldCapitaliseOption(shouldCapitaliseAcronyms, true);
    setShouldCapitaliseOption(shouldConvertToSentenceCase, false);

    const el = makeEl('hello ');

    // Type an acronym
    typeText(el, 'nasa');
    expect(el.value).toContain('hello nasa');

    // Add space to complete the word
    typeText(el, ' ');
    // After space, 'nasa' should become 'NASA'
    expect(el.value).toContain('NASA');

    // Now toggle to sentence case
    setShouldCapitaliseOption(shouldConvertToSentenceCase, true);
    // Word flags should be auto-disabled
    expect(utils.optionsDictionary[shouldCapitaliseAcronyms]).toBe(false);

    // Toggle BACK to word mode - flags should be AUTOMATICALLY restored
    setShouldCapitaliseOption(shouldConvertToSentenceCase, false);
    // No manual re-enabling needed! The flag should be automatically restored
    expect(utils.optionsDictionary[shouldCapitaliseAcronyms]).toBe(true);

    // Continue typing - type another acronym
    typeText(el, 'fbi');
    expect(el.value).toContain('fbi'); // lowercase while typing

    typeText(el, ' ');
    // After space, 'fbi' should become 'FBI'
    expect(el.value).toContain('FBI');
  });

  test('word mode -> sentence mode -> word mode: names should capitalize while typing', () => {
    // Start in word mode
    setShouldCapitaliseOption(shouldCapitaliseNames, true);
    setShouldCapitaliseOption(shouldConvertToSentenceCase, false);

    const el = makeEl('hello ');

    // Type a name
    typeText(el, 'john ');
    expect(el.value).toContain('John');

    // Toggle to sentence case and back
    setShouldCapitaliseOption(shouldConvertToSentenceCase, true);
    setShouldCapitaliseOption(shouldConvertToSentenceCase, false);
    setShouldCapitaliseOption(shouldCapitaliseNames, true);

    // Continue typing another name
    typeText(el, 'mary ');
    // Should capitalize Mary
    expect(el.value).toContain('Mary');
  });

  test('word mode -> sentence mode -> word mode: i should capitalize while typing', () => {
    setShouldCapitaliseOption(shouldCapitaliseI, true);
    setShouldCapitaliseOption(shouldConvertToSentenceCase, false);

    const el = makeEl('hello ');

    typeText(el, 'i ');
    expect(el.value).toContain(' I ');

    // Toggle to sentence case and back
    setShouldCapitaliseOption(shouldConvertToSentenceCase, true);
    setShouldCapitaliseOption(shouldConvertToSentenceCase, false);
    setShouldCapitaliseOption(shouldCapitaliseI, true);

    // Continue typing
    typeText(el, 'said i ');
    expect(el.value).toMatch(/ I said I /);
  });

  test('word mode -> sentence mode -> word mode: multiple word types should all work', () => {
    // Enable all word flags
    setShouldCapitaliseOption(shouldCapitaliseI, true);
    setShouldCapitaliseOption(shouldCapitaliseNames, true);
    setShouldCapitaliseOption(shouldCapitaliseAcronyms, true);
    setShouldCapitaliseOption(shouldConvertToSentenceCase, false);

    const el = makeEl('');

    // Type some text
    typeText(el, 'i ');
    expect(el.value).toContain('I ');

    typeText(el, 'told john ');
    expect(el.value).toContain('John');

    // Toggle modes
    setShouldCapitaliseOption(shouldConvertToSentenceCase, true);
    setShouldCapitaliseOption(shouldConvertToSentenceCase, false);
    setShouldCapitaliseOption(shouldCapitaliseI, true);
    setShouldCapitaliseOption(shouldCapitaliseNames, true);
    setShouldCapitaliseOption(shouldCapitaliseAcronyms, true);

    // Continue typing - should capitalize ALL word types
    typeText(el, 'that i ');
    expect(el.value).toMatch(/that I /);

    typeText(el, 'work at nasa ');
    expect(el.value).toContain('NASA');

    typeText(el, 'with mary ');
    expect(el.value).toContain('Mary');
  });

  test('typing incrementally: acronym detection should work character by character', () => {
    setShouldCapitaliseOption(shouldCapitaliseAcronyms, true);
    setShouldCapitaliseOption(shouldConvertToSentenceCase, false);

    const el = makeEl('hello ');

    // Type 'nasa' one character at a time
    typeText(el, 'n');
    expect(el.value).toBe('hello n');

    typeText(el, 'a');
    expect(el.value).toBe('hello na');

    typeText(el, 's');
    expect(el.value).toBe('hello nas');

    typeText(el, 'a');
    expect(el.value).toBe('hello nasa');

    // Now add space - should trigger capitalization
    typeText(el, ' ');
    expect(el.value).toContain('NASA');
  });

  test('after mode toggle, verify option flags are correct', () => {
    // Start in word mode
    setShouldCapitaliseOption(shouldCapitaliseI, true);
    setShouldCapitaliseOption(shouldCapitaliseAcronyms, true);
    setShouldCapitaliseOption(shouldConvertToSentenceCase, false);

    expect(utils.optionsDictionary[shouldCapitaliseI]).toBe(true);
    expect(utils.optionsDictionary[shouldCapitaliseAcronyms]).toBe(true);
    expect(utils.optionsDictionary[shouldConvertToSentenceCase]).toBe(false);

    // Toggle to sentence case
    setShouldCapitaliseOption(shouldConvertToSentenceCase, true);

    expect(utils.optionsDictionary[shouldConvertToSentenceCase]).toBe(true);
    expect(utils.optionsDictionary[shouldCapitaliseI]).toBe(false);
    expect(utils.optionsDictionary[shouldCapitaliseAcronyms]).toBe(false);

    // Toggle back to word mode
    setShouldCapitaliseOption(shouldConvertToSentenceCase, false);
    setShouldCapitaliseOption(shouldCapitaliseI, true);
    setShouldCapitaliseOption(shouldCapitaliseAcronyms, true);

    expect(utils.optionsDictionary[shouldConvertToSentenceCase]).toBe(false);
    expect(utils.optionsDictionary[shouldCapitaliseI]).toBe(true);
    expect(utils.optionsDictionary[shouldCapitaliseAcronyms]).toBe(true);

    // Now typing should work
    const el = makeEl('test ');
    typeText(el, 'i ');
    expect(el.value).toContain('I');
  });

  test('word mode settings are automatically restored when toggling back from sentence case', () => {
    // Start in word mode with specific flags enabled
    setShouldCapitaliseOption(shouldCapitaliseI, true);
    setShouldCapitaliseOption(shouldCapitaliseNames, false); // intentionally off
    setShouldCapitaliseOption(shouldCapitaliseAcronyms, true);
    setShouldCapitaliseOption(shouldConvertToSentenceCase, false);

    // Verify initial state
    expect(utils.optionsDictionary[shouldCapitaliseI]).toBe(true);
    expect(utils.optionsDictionary[shouldCapitaliseNames]).toBe(false);
    expect(utils.optionsDictionary[shouldCapitaliseAcronyms]).toBe(true);

    // Toggle to sentence case - should save current word mode settings
    setShouldCapitaliseOption(shouldConvertToSentenceCase, true);

    // All word flags should be disabled
    expect(utils.optionsDictionary[shouldCapitaliseI]).toBe(false);
    expect(utils.optionsDictionary[shouldCapitaliseNames]).toBe(false);
    expect(utils.optionsDictionary[shouldCapitaliseAcronyms]).toBe(false);

    // Toggle back to word mode - should AUTOMATICALLY restore previous settings
    setShouldCapitaliseOption(shouldConvertToSentenceCase, false);

    // Settings should be restored to what they were before sentence case
    expect(utils.optionsDictionary[shouldCapitaliseI]).toBe(true);
    expect(utils.optionsDictionary[shouldCapitaliseNames]).toBe(false); // still off
    expect(utils.optionsDictionary[shouldCapitaliseAcronyms]).toBe(true);

    // Verify typing works with restored settings
    const el = makeEl('test ');
    typeText(el, 'i ');
    expect(el.value).toContain('I'); // should work (flag was enabled)

    typeText(el, 'nasa ');
    expect(el.value).toContain('NASA'); // should work (flag was enabled)
  });

  test('word mode -> sentence case -> word mode -> sentence case again: should not capitalize words', () => {
    // Start in word mode
    setShouldCapitaliseOption(shouldCapitaliseI, true);
    setShouldCapitaliseOption(shouldCapitaliseAcronyms, true);
    setShouldCapitaliseOption(shouldConvertToSentenceCase, false);

    // Toggle to sentence case (first time)
    setShouldCapitaliseOption(shouldConvertToSentenceCase, true);
    expect(utils.optionsDictionary[shouldCapitaliseAcronyms]).toBe(false);
    expect(utils.optionsDictionary[shouldConvertToSentenceCase]).toBe(true);

    // Toggle back to word mode
    setShouldCapitaliseOption(shouldConvertToSentenceCase, false);
    expect(utils.optionsDictionary[shouldCapitaliseAcronyms]).toBe(true); // restored
    expect(utils.optionsDictionary[shouldConvertToSentenceCase]).toBe(false);

    // Toggle to sentence case AGAIN (second time)
    setShouldCapitaliseOption(shouldConvertToSentenceCase, true);
    expect(utils.optionsDictionary[shouldCapitaliseAcronyms]).toBe(false);
    expect(utils.optionsDictionary[shouldConvertToSentenceCase]).toBe(true);

    // Now type in sentence case mode - acronyms should NOT be capitalized
    const el = makeEl('hello ');
    typeText(el, 'nasa ');
    // In sentence case mode, 'nasa' should stay lowercase
    expect(el.value).toBe('Hello nasa '); // sentence case: first letter only
    expect(el.value).not.toContain('NASA'); // should NOT capitalize acronym
  });
});
