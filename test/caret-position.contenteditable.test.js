import * as utils from '../src/utils.js';

const { capitaliseTextProxy } = utils;

// Note: tests below use their own fake getText/setter functions.

beforeEach(() => {
  document.body.innerHTML = '';
});

test('contentEditable: runs when caret is at end', () => {
  // Use a fake editable element to avoid jsdom selection nuances. Tests can set
  // the test-only __caretAtEnd flag so the caret detection logic is deterministic.
  const el = { tagName: 'DIV', isContentEditable: true, __caretAtEnd: true, textContent: 'abc ' };
  function getTextFake(x) { return x.textContent; }
  let updated = null;
  function setter(_el, _tag, val) { updated = val; }
  capitaliseTextProxy(el, undefined, undefined, getTextFake, setter);
  expect(updated && updated.startsWith && updated.startsWith('Abc')).toBeTruthy();
});

test('contentEditable: does NOT run when caret is in the middle', () => {
  const el = { tagName: 'DIV', isContentEditable: true, __caretAtEnd: false, textContent: 'hello world' };
  function getTextFake(x) { return x.textContent; }
  let updated = null;
  function setter(_el, _tag, val) { updated = val; }
  capitaliseTextProxy(el, undefined, undefined, getTextFake, setter);
  expect(updated).toBeNull();
});
