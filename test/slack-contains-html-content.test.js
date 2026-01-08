/**
 * @jest-environment jsdom
 * @jest-environment-options {"url":"https://app.slack.com/"}
 */

import * as utils from '../src/utils.js';

describe('Slack: containsHtmlContent', () => {
  test('treats structural wrapper tags as plain text on Slack', () => {
    const element = { innerHTML: '<div><div>hello world</div></div>' };
    expect(utils.containsHtmlContent(element)).toBe(false);
  });

  test('treats Slack token/mention markup as HTML content', () => {
    const element = {
      innerHTML:
        '<span data-stringify-type="mention" data-mention-id="U123">@bob</span>',
    };
    expect(utils.containsHtmlContent(element)).toBe(true);
  });
});
