/**
 * @jest-environment jsdom
 * @jest-environment-options {"url":"https://mail.google.com/"}
 */

import * as utils from '../src/utils.js';

// Regression test for Gmail duplication bug: setText's fast path wrote the
// element's ENTIRE text into the deepest last text node. In Gmail the compose
// body is a nested-div structure (one div per line, plus spell-checker spans),
// so the text preceding the last text node got duplicated on every
// capitalisation, doubling the block each time.
describe('Gmail: setText on multi-node contentEditable', () => {
  function deepestLastTextNode(el) {
    let node = el;
    while (node && node.lastChild) node = node.lastChild;
    return node;
  }

  function makeEditable(el) {
    el.setAttribute('contenteditable', 'true');
    // jsdom doesn't implement isContentEditable; force it so setText takes the
    // same fast path a real browser does (the path that caused the bug).
    Object.defineProperty(el, 'isContentEditable', { value: true });
  }

  test('last-character capitalisation does not duplicate preceding lines', () => {
    const editable = document.createElement('div');
    makeEditable(editable);
    editable.innerHTML =
      '<div dir="ltr">Hi,&nbsp;<div><br></div><div>This is me.</div><div>i am here. a</div></div>';
    document.body.appendChild(editable);

    const text = utils.getText(editable, 'DIV');
    expect(text).toBe('Hi, This is me.i am here. a');

    // Simulate the word-mode capitalisation of the final character
    const updated = text.slice(0, -1) + 'A';
    utils.setText(editable, 'DIV', updated, false);

    // The full text must simply have its last character capitalised —
    // nothing duplicated, structure intact.
    expect(utils.getText(editable, 'DIV')).toBe('Hi, This is me.i am here. A');
    const lastLine = editable.querySelector('div[dir="ltr"] > div:last-child');
    expect(lastLine.textContent).toBe('i am here. A');

    document.body.removeChild(editable);
  });

  test('spell-checker span splitting the last line does not cause duplication', () => {
    const editable = document.createElement('div');
    makeEditable(editable);
    // Mirrors Gmail + spellcheck extension markup from the bug report:
    // the last line is split into [text][span][text] nodes.
    editable.innerHTML =
      '<div dir="ltr"><div>Nrse. Anier. <span zeum4c7="PR_6_0" data-ddnwab="PR_6_0" aria-invalid="spelling" class="LI ng">Rnerne</span>. rine. a</div></div>';
    document.body.appendChild(editable);

    const text = utils.getText(editable, 'DIV');
    expect(text).toBe('Nrse. Anier. Rnerne. rine. a');

    const updated = text.slice(0, -1) + 'A';
    utils.setText(editable, 'DIV', updated, false);

    expect(utils.getText(editable, 'DIV')).toBe('Nrse. Anier. Rnerne. rine. A');
    // The spell-checker span must survive and the trailing text node must
    // only have its final character changed.
    const span = editable.querySelector('span[aria-invalid="spelling"]');
    expect(span).not.toBeNull();
    expect(span.textContent).toBe('Rnerne');
    expect(deepestLastTextNode(editable).data).toBe('. rine. A');

    document.body.removeChild(editable);
  });
});
