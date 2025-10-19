/**
 * Tests for the 'i' capitalization fix.
 * Ensures that 'i' is only capitalized when confirmed to be standalone
 * (i.e., when followed by a space or punctuation), not prematurely while typing.
 */
import {
  shouldCapitaliseForI,
  getCapitalisedContentForI,
  setShouldCapitaliseOption,
  __resetAllOptionsAndDictionariesForTests,
  shouldCapitaliseI,
} from '../src/utils';

beforeEach(() => {
  __resetAllOptionsAndDictionariesForTests();
  setShouldCapitaliseOption(shouldCapitaliseI, true);
});

describe('shouldCapitaliseForI - only trigger when i is confirmed standalone', () => {
  test('should NOT trigger for i at end of string (could be part of word being typed)', () => {
    expect(shouldCapitaliseForI('hello i')).toBe(false);
    expect(shouldCapitaliseForI('I went to the store i')).toBe(false);
    expect(shouldCapitaliseForI('can i')).toBe(false);
  });

  test('should trigger for i followed by space', () => {
    expect(shouldCapitaliseForI('hello i ')).toBe(true);
    expect(shouldCapitaliseForI('I went to the store i ')).toBe(true);
    expect(shouldCapitaliseForI('can i go')).toBe(true);
  });

  test('should trigger for i followed by punctuation', () => {
    expect(shouldCapitaliseForI('hello i.')).toBe(true);
    expect(shouldCapitaliseForI('hello i,')).toBe(true);
    expect(shouldCapitaliseForI('hello i!')).toBe(true);
    expect(shouldCapitaliseForI('hello i?')).toBe(true);
    expect(shouldCapitaliseForI('hello i;')).toBe(true);
    expect(shouldCapitaliseForI('hello i:')).toBe(true);
  });

  test('should NOT trigger for i as part of a word', () => {
    expect(shouldCapitaliseForI('hello it')).toBe(false);
    expect(shouldCapitaliseForI('hello in')).toBe(false);
    expect(shouldCapitaliseForI('hello if')).toBe(false);
    expect(shouldCapitaliseForI('hello item')).toBe(false);
    expect(shouldCapitaliseForI('hello is')).toBe(false);
  });

  test('should trigger for multiple standalone i instances', () => {
    expect(shouldCapitaliseForI('i said hello and i went')).toBe(true);
    expect(shouldCapitaliseForI('can i, should i, will i')).toBe(true);
  });
});

describe('getCapitalisedContentForI - capitalize only the i, not surrounding characters', () => {
  test('should capitalize i followed by space', () => {
    const result = getCapitalisedContentForI('hello i ');
    expect(result).toBe('hello I ');
  });

  test('should capitalize i followed by punctuation', () => {
    expect(getCapitalisedContentForI('hello i.')).toBe('hello I.');
    expect(getCapitalisedContentForI('hello i,')).toBe('hello I,');
    expect(getCapitalisedContentForI('hello i!')).toBe('hello I!');
    expect(getCapitalisedContentForI('hello i?')).toBe('hello I?');
  });

  test('should capitalize multiple standalone i instances', () => {
    const result = getCapitalisedContentForI('i said i would');
    expect(result).toBe('I said I would');
  });

  test('should NOT capitalize i that is part of a word', () => {
    const result = getCapitalisedContentForI('hello item ');
    expect(result).toBe('hello item ');
  });

  test('should handle text with multiple spaces', () => {
    const result = getCapitalisedContentForI('hello  i  ');
    expect(result).toBe('hello  I  ');
  });
});

describe('Real-world typing scenarios', () => {
  test('typing "item" should not capitalize i prematurely', () => {
    // User types "i"
    expect(shouldCapitaliseForI('hello i')).toBe(false);

    // User types "t" -> "it"
    expect(shouldCapitaliseForI('hello it')).toBe(false);

    // User types "e" -> "ite"
    expect(shouldCapitaliseForI('hello ite')).toBe(false);

    // User types "m" -> "item"
    expect(shouldCapitaliseForI('hello item')).toBe(false);

    // User types space after "item"
    expect(shouldCapitaliseForI('hello item ')).toBe(false);
  });

  test('typing standalone "i" followed by space should capitalize', () => {
    // User types "i"
    expect(shouldCapitaliseForI('hello i')).toBe(false);

    // User types space after "i"
    expect(shouldCapitaliseForI('hello i ')).toBe(true);

    // Now capitalize it
    const result = getCapitalisedContentForI('hello i ');
    expect(result).toBe('hello I ');
  });

  test('typing "i" followed by comma should capitalize', () => {
    // User types "i"
    expect(shouldCapitaliseForI('yes i')).toBe(false);

    // User types comma after "i"
    expect(shouldCapitaliseForI('yes i,')).toBe(true);

    // Now capitalize it
    const result = getCapitalisedContentForI('yes i,');
    expect(result).toBe('yes I,');
  });

  test('typing sentence with multiple i words', () => {
    const text = 'i think i should go';
    const result = getCapitalisedContentForI(text);
    expect(result).toBe('I think I should go');
  });
});
