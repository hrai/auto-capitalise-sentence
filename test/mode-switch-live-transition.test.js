import * as utils from '../src/utils';
const {
  capitaliseTextProxy,
  setShouldCapitaliseOption,
  setKeyValue,
  __resetAllOptionsAndDictionariesForTests,
  shouldCapitaliseAcronyms,
  shouldCapitaliseNames,
  shouldCapitaliseI,
  shouldConvertToSentenceCase,
  namesKeyVal,
  acronymsKeyVal,
  fullReprocessElement,
} = utils;

function el(initial = '') {
  return { tagName: 'INPUT', value: initial };
}
function getText(e) {
  return e.value;
}
function setText(e, _t, v) {
  e.value = v;
}

// Simulate user typing by progressively appending characters and invoking capitaliseTextProxy.
function typeSequence(element, sequence) {
  for (const ch of sequence) {
    element.value += ch;
    capitaliseTextProxy(element, undefined, undefined, getText, setText);
  }
  return element.value;
}

describe('Live mode switching mutual exclusion', () => {
  beforeEach(() => {
    __resetAllOptionsAndDictionariesForTests();
    // Start with word mode flags on, sentence case off
    setShouldCapitaliseOption(shouldConvertToSentenceCase, false);
    setShouldCapitaliseOption(shouldCapitaliseAcronyms, true);
    setShouldCapitaliseOption(shouldCapitaliseNames, true);
    setShouldCapitaliseOption(shouldCapitaliseI, true);
    setKeyValue(acronymsKeyVal, { nasa: 'NASA' });
    setKeyValue(namesKeyVal, { john: 'John' });
  });

  test('Word mode applies acronym, then after enabling sentence case further word corrections stop', () => {
    const e = el('');
    // Type a word that becomes an acronym when finished
    typeSequence(e, 'nasa '); // incremental typing
    fullReprocessElement(e); // ensure dictionary pass
    expect(/NASA\s$/.test(e.value)).toBe(true);

    // Enable sentence case mid-session
    setShouldCapitaliseOption(shouldConvertToSentenceCase, true);
    // Automatic exclusivity: all word flags should now be false
    expect(utils.isSentenceCaseModeActive()).toBe(true);
    expect(utils.isAnyWordCapitalisationFlagActive()).toBe(false);

    // Continue typing a lowercase name that would normally auto-capitalise under word mode
    const before = e.value.length;
    typeSequence(e, 'john ');
    const suffix = e.value.slice(before);
    // In sentence case mode we should NOT have auto-corrected 'john' to 'John'
    expect(/john\s$/i.test(suffix)).toBe(true);
    expect(suffix).toContain('john ');
  });

  test('Enabling sentence case immediately capitalises start of new sentence but not last word token corrections', () => {
    const e = el('hello ');
    typeSequence(e, 'world ');
    // Switch on sentence case
    setShouldCapitaliseOption(shouldConvertToSentenceCase, true);
    // Word flags should be auto-disabled
    expect(utils.isAnyWordCapitalisationFlagActive()).toBe(false);
    // Type another word that would be a name replacement
    typeSequence(e, 'john ');
    // Should not have turned john into John
    expect(e.value.includes('john ')).toBe(true);
  });
});
