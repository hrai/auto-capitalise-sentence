import * as utils from '../src/utils';
const {
  capitaliseTextProxy,
  setShouldCapitaliseOption,
  setKeyValue,
  __resetAllOptionsAndDictionariesForTests,
  shouldCapitaliseAcronyms,
  shouldConvertToSentenceCase,
  acronymsKeyVal,
  shouldCapitaliseI,
  fullReprocessElement,
} = utils;

// Minimal mock element
function makeEl(initial) {
  return { tagName: 'INPUT', value: initial };
}
function getText(el) {
  return el.value;
}
function setText(el, _tag, updated) {
  el.value = updated;
}

// Simulate per-character typing (mirrors runtime behaviour more closely)
function typeSequence(el, sequence) {
  for (const ch of sequence) {
    el.value += ch;
    capitaliseTextProxy(el, undefined, undefined, getText, setText);
  }
  return el.value;
}

// Test assumptions:
// - In word mode with acronym flag ON, last token 'nasa ' would be corrected to 'NASA '
// - In sentence case mode, we skip word-level correction path entirely, so text stays as typed except sentence capitalisation.

describe('Sentence case suppresses word-level corrections', () => {
  beforeEach(() => {
    __resetAllOptionsAndDictionariesForTests();
    // Reset options
    setShouldCapitaliseOption(shouldConvertToSentenceCase, false);
    setShouldCapitaliseOption(shouldCapitaliseAcronyms, true);
    // Provide acronym dictionary
    setKeyValue(acronymsKeyVal, { nasa: 'NASA' });
  });

  test('Word mode applies acronym correction', () => {
    const el = makeEl('testing ');
    typeSequence(el, 'nasa '); // incremental typing
    // Ensure any missed dictionary application is enforced
    fullReprocessElement(el);
    expect(/NASA\s$/.test(el.value)).toBe(true);
  });

  test('Sentence case mode does NOT apply acronym correction', () => {
    const el = makeEl('testing nasa ');
    setShouldCapitaliseOption(shouldConvertToSentenceCase, true);
    // even though acronym flag true, should be skipped due to sentence case mode
    capitaliseTextProxy(el, undefined, undefined, getText, setText);
    // Should remain unchanged (except potential first letter capitalisation if logic applied). We focus on acronym not uppercased.
    expect(el.value.includes('NASA')).toBe(false);
  });

  test('Sentence case mode does NOT auto-capitalise standalone i', () => {
    const el = makeEl('');
    setShouldCapitaliseOption(shouldCapitaliseI, true);
    // Simulate typing 'i ' so first character rule triggers
    typeSequence(el, 'i ');
    expect(el.value.startsWith('I ')).toBe(true); // baseline: word mode modifies starting solitary i

    // Now switch to sentence case and reset text to lower-case again to test isolation
    el.value = 'i went home ';
    setShouldCapitaliseOption(shouldConvertToSentenceCase, true);
    // Do NOT re-enable I flag; exclusivity keeps word flags off in sentence case mode.
    capitaliseTextProxy(el, undefined, undefined, getText, setText);
    // Sentence case should only capitalise first char of sentence, which IS the i; to differentiate we move i inside sentence
    el.value = 'today i went home ';
    capitaliseTextProxy(el, undefined, undefined, getText, setText);
    expect(el.value.includes(' i ')).toBe(true); // internal standalone i untouched
  });
});
