/**
 * @jest-environment jsdom
 * @jest-environment-options {"url":"https://mail.google.com/"}
 */

import * as utils from '../src/utils.js';

describe('Gmail: containsHtmlContent', () => {
  test('treats structural wrapper tags as plain text on Gmail', () => {
    const element = { innerHTML: '<div><div>hello world</div></div>' };
    expect(utils.containsHtmlContent(element)).toBe(false);
  });

  test('still considers real rich tags as HTML on Gmail', () => {
    const element = { innerHTML: '<div>hello <b>world</b></div>' };
    expect(utils.containsHtmlContent(element)).toBe(true);
  });

  test('treats a lone <br> as HTML content (existing behavior)', () => {
    const element = { innerHTML: '<br>' };
    expect(utils.containsHtmlContent(element)).toBe(true);
  });
});
