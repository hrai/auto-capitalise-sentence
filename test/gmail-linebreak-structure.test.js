/**
 * @jest-environment jsdom
 * @jest-environment-options {"url":"https://mail.google.com/"}
 */

import * as utils from '../src/utils.js';

// Regression tests for Gmail multi-line emails (content after the first Enter).
//
// setText's fast path used to find the deepest lastChild — but after Enter,
// Gmail's last child is <div><br></div>, so the descent landed on the <br>
// and fell through to the setHTML fallback. On Gmail getText returns flattened
// textContent, so that fallback replaced the entire multi-line structure with
// one flat line. The same happened for length-changing word corrections
// (e.g. dont -> don't) triggered on the root of a multi-line email.
describe('Gmail: setText must preserve line structure in multi-line emails', () => {
  function makeEditable(html) {
    const el = document.createElement('div');
    el.setAttribute('contenteditable', 'true');
    Object.defineProperty(el, 'isContentEditable', { value: true });
    el.innerHTML = html;
    document.body.appendChild(el);
    return el;
  }

  afterEach(() => {
    document.body.innerHTML = '';
  });

  test('capitalisation works with a trailing empty line (<div><br></div>)', () => {
    // User typed "Hi there. a" then pressed Enter: Gmail appends an empty line.
    const editable = makeEditable(
      '<div dir="ltr"><div>Hi there. a</div><div><br></div></div>'
    );

    const text = utils.getText(editable, 'DIV');
    expect(text).toBe('Hi there. a');

    const updated = text.slice(0, -1) + 'A';
    utils.setText(editable, 'DIV', updated, false);

    // The last character must be capitalised in place...
    const firstLine = editable.querySelector('div[dir="ltr"] > div');
    expect(firstLine.textContent).toBe('Hi there. A');
    // ...and the line structure (including the trailing empty line) preserved.
    expect(
      editable.querySelector('div[dir="ltr"] > div:last-child br')
    ).not.toBeNull();
  });

  test('length-changing word correction does not flatten a multi-line email', () => {
    const editable = makeEditable(
      '<div dir="ltr"><div>First line.</div><div>i dont </div></div>'
    );

    const text = utils.getText(editable, 'DIV');
    expect(text).toBe('First line.i dont ');

    // Simulate the dictionary correction dont -> don't (length changes).
    const updated = "First line.i don't ";
    utils.setText(editable, 'DIV', updated, false);

    // Both lines must still exist.
    const lines = editable.querySelectorAll('div[dir="ltr"] > div');
    expect(lines.length).toBe(2);
    expect(lines[0].textContent).toBe('First line.');
    expect(lines[1].textContent).toBe("i don't ");
  });

  test('never rewrites earlier lines even when the change is not tail-confined', () => {
    const editable = makeEditable(
      '<div dir="ltr"><div>line one.</div><div>line two. a</div></div>'
    );

    // A change touching text outside the last text node cannot be applied
    // safely to a multi-line Gmail editable; it must be skipped, not flattened.
    const updated = 'LINE ONE.line two. a';
    utils.setText(editable, 'DIV', updated, false);

    const lines = editable.querySelectorAll('div[dir="ltr"] > div');
    expect(lines.length).toBe(2);
    expect(lines[0].textContent).toBe('line one.');
  });
});
