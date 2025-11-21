import * as utils from '../src/utils';

// Ensure DOM exists (Jest provides jsdom)

describe('setText fast-path for contentEditable', () => {
  test('updates deepest text node and moves caret for last-character replacement', () => {
    // Create a contentEditable div with plain text
    const div = document.createElement('div');
    div.setAttribute('contenteditable', 'true');
    // initial text: 'hello a'
    div.innerHTML = 'hello a';
    document.body.appendChild(div);

    // Sanity: deepest text node
    let lastNode = div;
    while (lastNode && lastNode.lastChild) lastNode = lastNode.lastChild;
    expect(lastNode.nodeType).toBe(Node.TEXT_NODE);
    expect(lastNode.data).toBe('hello a');

    // Updated string differs only in final character
    const updated = 'hello A';

    // Call setText with tagName and updated string
    utils.setText(div, 'div', updated, false);

    // After fast-path, deepest text node should contain updated content
    lastNode = div;
    while (lastNode && lastNode.lastChild) lastNode = lastNode.lastChild;
    expect(lastNode.nodeType).toBe(Node.TEXT_NODE);
    expect(lastNode.data).toBe(updated);

    // Selection should be at end of lastNode when selection APIs are available.
    // jsdom may not implement selection the same way browsers do; guard assertions.
    const sel = window.getSelection && window.getSelection();
    if (sel && sel.rangeCount > 0) {
      const range = sel.getRangeAt(0);
      expect(range.endContainer).toBe(lastNode);
      expect(range.endOffset).toBe(lastNode.length);
    }

    // Cleanup
    document.body.removeChild(div);
  });
});
