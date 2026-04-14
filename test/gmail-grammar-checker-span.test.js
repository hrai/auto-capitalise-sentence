/**
 * @jest-environment jsdom
 * @jest-environment-options {"url":"https://mail.google.com/"}
 */

import * as utils from '../src/utils.js';

describe('Gmail: grammar checker span tags', () => {
  test('getText strips grammar checker span tags on Gmail contentEditable', () => {
    const element = document.createElement('div');
    element.setAttribute('contenteditable', 'true');
    element.innerHTML =
      'The product is already set up <span zeum4c2="PR_8_0" data-ddnwab="PR_8_0" aria-invalid="grammar" class="Lm ng">on my</span> house.';

    const text = utils.getText(element, 'div');

    // Should return plain text without span tags
    expect(text).toBe('The product is already set up on my house.');
    expect(text).not.toContain('<span');
    expect(text).not.toContain('zeum4c2');
  });

  test('getText strips Grammarly spans on Gmail contentEditable', () => {
    const element = document.createElement('div');
    element.setAttribute('contenteditable', 'true');
    element.innerHTML =
      'this is a <span data-gr-id="123" class="gr_">test</span> sentence.';

    const text = utils.getText(element, 'div');

    // Should return plain text without Grammarly spans
    expect(text).toBe('this is a test sentence.');
    expect(text).not.toContain('<span');
  });

  test('getText handles multiple nested grammar checker spans', () => {
    const element = document.createElement('div');
    element.setAttribute('contenteditable', 'true');
    element.innerHTML =
      'i <span class="grammar">am</span> <span data-ddnwab="test">typing</span> here.';

    const text = utils.getText(element, 'div');

    expect(text).toBe('i am typing here.');
    expect(text).not.toContain('<span');
  });
});
