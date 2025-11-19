import * as utils from '../src/utils.js';

const { capitaliseTextProxy } = utils;

function getText(el) {
  return el.value;
}
function setText(el, _tag, updated) {
  el.value = updated;
}

test('INPUT: runs when caret is at end', () => {
  const el = { tagName: 'INPUT', value: 'abc ', selectionStart: 4, selectionEnd: 4 };
  capitaliseTextProxy(el, undefined, undefined, getText, setText);
  expect(el.value.startsWith('Abc')).toBeTruthy();
});

test('INPUT: does NOT run when caret is not at end', () => {
  const el = { tagName: 'INPUT', value: 'hello world', selectionStart: 6, selectionEnd: 6 };
  let updated = null;
  function setter(_el, _tag, val) { updated = val; }
  capitaliseTextProxy(el, undefined, undefined, getText, setter);
  expect(updated).toBeNull();
});
