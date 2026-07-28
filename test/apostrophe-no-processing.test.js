/**
 * @jest-environment jsdom
 * @jest-environment-options {"url":"https://mail.google.com/"}
 */

import * as utils from '../src/utils';

describe('Apostrophe should not trigger processing', () => {
  beforeEach(() => {
    utils.__resetAllOptionsAndDictionariesForTests();
    // Enable capitalize I
    utils.setShouldCapitaliseOption('shouldCapitaliseI', true);
  });

  test('quickCapitalisationCheck returns false when text ends with apostrophe', () => {
    // These are the states right after typing an apostrophe, before typing the next character
    const testCases = [
      "I'", // Typing "I'm" - just typed apostrophe
      "don'", // Typing "don't" - just typed apostrophe
      "it'", // Typing "it's" - just typed apostrophe
      "we'", // Typing "we're" - just typed apostrophe
      "they'", // Typing "they've" - just typed apostrophe
      "Hello'", // Just typed apostrophe
      "test'", // Just typed apostrophe
    ];

    testCases.forEach((text) => {
      const result = utils.quickCapitalisationCheck(text);
      if (result !== false) {
        console.log(`FAILED for: "${text}", got: ${result}`);
      }
      expect(result).toBe(false);
    });
  });

  test('quickCapitalisationCheck returns false for other non-capitalizable punctuation', () => {
    const testCases = ['test"', 'test-', 'test,', 'test;', 'test:'];

    testCases.forEach((text) => {
      const result = utils.quickCapitalisationCheck(text);
      expect(result).toBe(false);
    });
  });

  test('capitaliseTextProxy does not modify text ending with apostrophe', () => {
    const div = document.createElement('div');
    div.setAttribute('contenteditable', 'true');
    div.textContent = "I'";
    document.body.appendChild(div);

    // Position cursor at end
    const textNode = div.firstChild;
    const range = document.createRange();
    range.setStart(textNode, 2);
    range.collapse(true);
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);

    const originalText = div.textContent;

    // Call capitaliseText - should return early due to quickCapitalisationCheck
    utils.capitaliseTextProxy(div);

    // Text should remain unchanged
    expect(div.textContent).toBe(originalText);

    // Cursor should still be at position 2
    const finalSelection = window.getSelection();
    const finalRange = finalSelection.getRangeAt(0);
    expect(finalRange.startOffset).toBe(2);

    document.body.removeChild(div);
  });

  test('capitaliseTextProxy works normally after apostrophe when space is added', () => {
    const div = document.createElement('div');
    div.setAttribute('contenteditable', 'true');
    div.textContent = "I'm typing";
    document.body.appendChild(div);

    // Position cursor at end
    const textNode = div.firstChild;
    const range = document.createRange();
    range.setStart(textNode, 10);
    range.collapse(true);
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);

    // This should work normally because it ends with 'g' not apostrophe
    utils.capitaliseTextProxy(div);

    // Text should not change (no sentence ending)
    expect(div.textContent).toBe("I'm typing");

    document.body.removeChild(div);
  });

  test('quickCapitalisationCheck still returns true for valid cases', () => {
    const testCases = [
      'i',
      'test ',
      'Hello.',
      'World?',
      'Test!',
      'typing here',
    ];

    testCases.forEach((text) => {
      const result = utils.quickCapitalisationCheck(text);
      expect(result).toBe(true);
    });
  });
});
