import {
  capitaliseText,
  getCleanHtmlForAtlassian,
  getText,
  setText,
  shouldCapitalise,
  shouldCapitaliseForI,
} from '../src/utils';

describe('contenteditable fast-path safety', () => {
  it('preserves structured mention elements when capitalising text after them', () => {
    const editor = document.createElement('p');
    editor.setAttribute('contenteditable', 'true');

    const mention =
      '<ts-mention data-id="U07SWBAQP3Q" data-label="@Jas" spellcheck="false" class="c-member_slug" dir="ltr">@Jas</ts-mention>';

    editor.innerHTML = `${mention} hi. a`;

    setText(editor, 'p', `${mention} hi. A`, false);

    expect(editor.innerHTML).toBe(`${mention} hi. A`);
    expect(editor.innerHTML.includes('&lt;ts-mention')).toBe(false);
  });
});

describe('Atlassian HTML sanitization', () => {
  it('removes assistive spans but keeps structured mention HTML intact', () => {
    const mention =
      '<span data-mention-id="123" data-mention-type="user" contenteditable="false">@Jane Doe</span>';
    const dirtyHtml = `${mention} hi<span class="assistive">accessibility helper</span>`;

    const cleaned = getCleanHtmlForAtlassian(dirtyHtml);

    expect(cleaned).toBe(`${mention} hi`);
  });

  it('writes clean HTML back to Atlassian editors without serializing nodes', () => {
    const previousOverride = window.__autoCapitaliseAtlassianHostOverride;

    try {
      window.__autoCapitaliseAtlassianHostOverride = 'acme.atlassian.net';

      const editor = document.createElement('p');
      editor.setAttribute('contenteditable', 'true');

      const mention =
        '<span data-mention-id="JIRA-1" data-mention-type="user" contenteditable="false">@JiraUser</span>';
      editor.innerHTML = `${mention} hello there`;

      const updatedHtml = `${mention} Hello there<span class="assistive">screen reader helper</span>`;

      setText(editor, 'p', updatedHtml, false);

      expect(editor.innerHTML).toBe(`${mention} Hello there`);
      expect(editor.innerHTML.includes('[object HTMLSpanElement]')).toBe(false);
    } finally {
      if (previousOverride === undefined) {
        delete window.__autoCapitaliseAtlassianHostOverride;
      } else {
        window.__autoCapitaliseAtlassianHostOverride = previousOverride;
      }
    }
  });

  it('capitalises trailing characters even when Atlassian adds multiple nbsp entities', () => {
    const previousOverride = window.__autoCapitaliseAtlassianHostOverride;

    try {
      window.__autoCapitaliseAtlassianHostOverride = 'acme.atlassian.net';

      const editor = document.createElement('p');
      editor.setAttribute('contenteditable', 'true');
      Object.defineProperty(editor, 'isContentEditable', {
        configurable: true,
        value: true,
      });

      const mention =
        '<span data-mention-id="JIRA-2" data-mention-type="user" contenteditable="false">@AnotherUser</span>';
      editor.innerHTML = `${mention}&nbsp;hello.&nbsp;h`;

      const currentText = getText(editor, 'p');
      expect(shouldCapitalise(currentText)).toBe(true);

      capitaliseText(
        editor,
        shouldCapitalise,
        shouldCapitaliseForI,
        getText,
        setText
      );

      const normalizedText = editor.textContent.replace(/\u00a0/g, ' ').trim();
      expect(normalizedText.endsWith('hello. H')).toBe(true);
      expect(editor.innerHTML.includes('@AnotherUser')).toBe(true);
    } finally {
      if (previousOverride === undefined) {
        delete window.__autoCapitaliseAtlassianHostOverride;
      } else {
        window.__autoCapitaliseAtlassianHostOverride = previousOverride;
      }
    }
  });
});
