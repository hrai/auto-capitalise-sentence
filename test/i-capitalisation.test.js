/**
 * Tests for standalone 'i' capitalization
 * Ensures that 'i' is only capitalized when it's a standalone word,
 * not when it's part of another word like "identify", "interface", etc.
 */

import {
  shouldCapitaliseForI,
  getCapitalisedContentForI,
} from '../src/utils.js';

describe('shouldCapitaliseForI', () => {
  describe('should return TRUE for standalone "i"', () => {
    test('when "i" is after a space', () => {
      expect(shouldCapitaliseForI('hello i ')).toBe(true);
      expect(shouldCapitaliseForI('hello i.')).toBe(true);
      expect(shouldCapitaliseForI('hello i,')).toBe(true);
      expect(shouldCapitaliseForI('hello i!')).toBe(true);
      expect(shouldCapitaliseForI('hello i?')).toBe(true);
    });

    test('when "i" is at the start', () => {
      expect(shouldCapitaliseForI('i ')).toBe(true);
      expect(shouldCapitaliseForI('i.')).toBe(true);
      expect(shouldCapitaliseForI('i,')).toBe(true);
      expect(shouldCapitaliseForI('i!')).toBe(true);
    });

    test('when "i" is at the end of text', () => {
      expect(shouldCapitaliseForI('hello i')).toBe(true);
      expect(shouldCapitaliseForI('well i')).toBe(true);
    });

    test('when "i" is after punctuation', () => {
      expect(shouldCapitaliseForI('hello, i ')).toBe(true);
      expect(shouldCapitaliseForI('hello. i ')).toBe(true);
      expect(shouldCapitaliseForI('hello! i ')).toBe(true);
      expect(shouldCapitaliseForI('hello? i ')).toBe(true);
      expect(shouldCapitaliseForI('hello: i ')).toBe(true);
      expect(shouldCapitaliseForI('hello; i ')).toBe(true);
    });

    test('when "i" is followed by apostrophe (contractions)', () => {
      expect(shouldCapitaliseForI("hello i'")).toBe(true);
      expect(shouldCapitaliseForI(" i'")).toBe(true);
    });
  });

  describe('should return FALSE when "i" is part of a word', () => {
    test('when typing words that start with "i"', () => {
      expect(shouldCapitaliseForI('hello id')).toBe(false);
      expect(shouldCapitaliseForI('hello ide')).toBe(false);
      expect(shouldCapitaliseForI('hello iden')).toBe(false);
      expect(shouldCapitaliseForI('hello ident')).toBe(false);
      expect(shouldCapitaliseForI('hello identi')).toBe(false);
      expect(shouldCapitaliseForI('hello identif')).toBe(false);
      expect(shouldCapitaliseForI('hello identify')).toBe(false);
    });

    test('when typing other words starting with "i"', () => {
      expect(shouldCapitaliseForI('hello in')).toBe(false);
      expect(shouldCapitaliseForI('hello int')).toBe(false);
      expect(shouldCapitaliseForI('hello inte')).toBe(false);
      expect(shouldCapitaliseForI('hello inter')).toBe(false);
      expect(shouldCapitaliseForI('hello interf')).toBe(false);
      expect(shouldCapitaliseForI('hello interfa')).toBe(false);
      expect(shouldCapitaliseForI('hello interfac')).toBe(false);
      expect(shouldCapitaliseForI('hello interface')).toBe(false);
    });

    test('when "i" is part of a word at the start', () => {
      expect(shouldCapitaliseForI('id')).toBe(false);
      expect(shouldCapitaliseForI('if')).toBe(false);
      expect(shouldCapitaliseForI('in')).toBe(false);
      expect(shouldCapitaliseForI('it')).toBe(false);
      expect(shouldCapitaliseForI('iTunes')).toBe(false);
      expect(shouldCapitaliseForI('iPhone')).toBe(false);
    });

    test('when "i" is in the middle of a word', () => {
      expect(shouldCapitaliseForI('skiing')).toBe(false);
      expect(shouldCapitaliseForI('waiting')).toBe(false);
      expect(shouldCapitaliseForI('position')).toBe(false);
    });
  });

  describe('edge cases', () => {
    test('handles multiple spaces', () => {
      expect(shouldCapitaliseForI('hello  i  ')).toBe(true);
    });

    test('handles "i" with quotes', () => {
      expect(shouldCapitaliseForI('hello i"')).toBe(true);
    });

    test('only matches lowercase "i"', () => {
      // Uppercase 'I' doesn't need capitalization
      expect(shouldCapitaliseForI('hello I ')).toBe(false);
      // But lowercase 'i' does
      expect(shouldCapitaliseForI('hello i ')).toBe(true);
    });
  });
});

describe('getCapitalisedContentForI', () => {
  describe('should capitalize standalone "i"', () => {
    test('when "i" is after a space', () => {
      expect(getCapitalisedContentForI('hello i ')).toBe('hello I ');
      expect(getCapitalisedContentForI('hello i.')).toBe('hello I.');
      expect(getCapitalisedContentForI('hello i,')).toBe('hello I,');
    });

    test('when "i" is at the start', () => {
      expect(getCapitalisedContentForI('i ')).toBe('I ');
      expect(getCapitalisedContentForI('i.')).toBe('I.');
      expect(getCapitalisedContentForI('i am')).toBe('I am');
    });

    test('when "i" is at the end', () => {
      expect(getCapitalisedContentForI('hello i')).toBe('hello I');
      expect(getCapitalisedContentForI('well i')).toBe('well I');
    });

    test('when "i" is after punctuation', () => {
      expect(getCapitalisedContentForI('hello, i ')).toBe('hello, I ');
      expect(getCapitalisedContentForI('hello. i ')).toBe('hello. I ');
    });
  });

  describe('should NOT capitalize "i" when part of a word', () => {
    test('when "i" is part of a word being typed', () => {
      expect(getCapitalisedContentForI('hello identify')).toBe(
        'hello identify'
      );
      expect(getCapitalisedContentForI('hello interface')).toBe(
        'hello interface'
      );
      expect(getCapitalisedContentForI('hello in')).toBe('hello in');
    });

    test('when "i" is in the middle of a word', () => {
      expect(getCapitalisedContentForI('skiing')).toBe('skiing');
      expect(getCapitalisedContentForI('waiting')).toBe('waiting');
    });
  });

  describe('edge cases', () => {
    test('handles text with no "i"', () => {
      expect(getCapitalisedContentForI('hello world')).toBe('hello world');
    });

    test('handles multiple "i" instances (should capitalize first match)', () => {
      const result = getCapitalisedContentForI('hello i am');
      expect(result).toContain('I');
    });

    test('preserves other capitalization', () => {
      expect(getCapitalisedContentForI('Hello i ')).toBe('Hello I ');
    });
  });
});
