import { setText } from '../src/utils';

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
