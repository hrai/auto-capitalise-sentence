import * as utils from '../src/utils.js';
import sinon from 'sinon';

describe('capitaliseText', () => {
  test('capitaliseText_HtmlContent', () => {
    const element = {
      isContentEditable: true,
      tagName: 'div',
      innerHTML: "I'm the content of html tag.",
    };
    const shouldCapitaliseFake = sinon.fake();
    const shouldCapitaliseForIFake = sinon.fake();
    const setTextFake = sinon.fake();

    expect(
      utils.capitaliseText(
        element,
        shouldCapitaliseFake,
        shouldCapitaliseForIFake,
        utils.getText,
        setTextFake
      )
    ).toBe(undefined);
    expect(element.isContentEditable.calledOnce).toBeTruthy;
    expect(element.tagName.calledOnce).toBeTruthy;

    expect(shouldCapitaliseFake.getCall(0).args[0]).toBe(
      "I'm the content of html tag."
    );
    expect(shouldCapitaliseForIFake.getCall(0).args[0]).toBe(
      "I'm the content of html tag."
    );
  });

  test('capitaliseText_ShouldNotCallSetText_WhenConstantMatchesExactly', () => {
    const element = {
      isContentEditable: true,
      tagName: 'div',
      innerHTML:
        '<ts-mention data-id="UKTQJ356U" data-label="@Hangjit Rai" spellcheck="false" class="c-member_slug c-member_slug--link ts_tip_texty c-member_slug--mention" dir="ltr">@Hangjit Rai</ts-mention> Monday ',
    };

    const shouldCapitaliseFake = sinon.fake();
    const shouldCapitaliseForIFake = sinon.fake();
    const setTextFake = sinon.fake();

    utils.capitaliseText(
      element,
      shouldCapitaliseFake,
      shouldCapitaliseForIFake,
      utils.getText,
      setTextFake
    );
    expect(element.isContentEditable.calledOnce).toBeTruthy;
    expect(element.tagName.calledOnce).toBeTruthy;

    expect(shouldCapitaliseFake.getCall(0).args[0]).toBe(
      '<ts-mention data-id="UKTQJ356U" data-label="@Hangjit Rai" spellcheck="false" class="c-member_slug c-member_slug--link ts_tip_texty c-member_slug--mention" dir="ltr">@Hangjit Rai</ts-mention> Monday '
    );
    expect(shouldCapitaliseForIFake.getCall(0).args[0]).toBe(
      '<ts-mention data-id="UKTQJ356U" data-label="@Hangjit Rai" spellcheck="false" class="c-member_slug c-member_slug--link ts_tip_texty c-member_slug--mention" dir="ltr">@Hangjit Rai</ts-mention> Monday '
    );
    expect(setTextFake.getCall(0)).toBeNull();
  });

  test('capitaliseText_NoTagName', () => {
    const element = {
      isContentEditable: true,
      innerHTML: "I'm the content of html tag.",
    };
    const shouldCapitaliseFake = sinon.fake();
    const shouldCapitaliseForIFake = sinon.fake();
    const getTextFake = sinon.fake();
    const setTextFake = sinon.fake();

    utils.capitaliseText(
      element,
      shouldCapitaliseFake,
      shouldCapitaliseForIFake,
      getTextFake,
      setTextFake
    );

    expect(shouldCapitaliseFake.getCall(0)).toBeNull();
    expect(shouldCapitaliseForIFake.getCall(0)).toBeNull();
    expect(getTextFake.getCall(0).args[0]).toBe(element);
  });

  test('capitaliseText_GetText_EmptyResponse', () => {
    const element = {
      isContentEditable: true,
      tagName: 'div',
      innerHTML: "I'm the content of html tag.<br>",
    };

    const shouldCapitaliseFake = sinon.fake();
    const shouldCapitaliseForIFake = sinon.fake();
    const getTextFake = sinon.fake();

    utils.capitaliseText(
      element,
      shouldCapitaliseFake,
      shouldCapitaliseForIFake,
      getTextFake,
      null
    );

    expect(shouldCapitaliseFake.getCall(0)).toBeNull();
    expect(shouldCapitaliseForIFake.getCall(0)).toBeNull();
    expect(getTextFake.getCall(0).args[0]).toBe(element);
  });

  test('capitaliseText_Symbol_@', () => {
    const element = {
      isContentEditable: true,
      tagName: 'div',
      innerHTML: '@',
    };
    const shouldCapitaliseFake = sinon.fake();
    const shouldCapitaliseForIFake = sinon.fake();
    const getTextFake = sinon.fake.returns('@');
    const setTextFake = sinon.fake();

    expect(
      utils.capitaliseText(
        element,
        shouldCapitaliseFake,
        shouldCapitaliseForIFake,
        getTextFake,
        setTextFake
      )
    ).toBe(undefined);
    expect(element.isContentEditable.calledOnce).toBeFalsy;
    expect(element.tagName.calledOnce).toBeFalsy;

    expect(shouldCapitaliseFake.getCall(0)).toBeNull();
    expect(shouldCapitaliseForIFake.getCall(0)).toBeNull();
  });

  test('capitaliseText_Symbol_Period', () => {
    const element = {
      isContentEditable: true,
      tagName: 'div',
      innerHTML: '.',
    };
    const shouldCapitaliseFake = sinon.fake();
    const shouldCapitaliseForIFake = sinon.fake();
    const getTextFake = sinon.fake.returns('.');
    const setTextFake = sinon.fake();

    expect(
      utils.capitaliseText(
        element,
        shouldCapitaliseFake,
        shouldCapitaliseForIFake,
        getTextFake,
        setTextFake
      )
    ).toBe(undefined);
    expect(element.isContentEditable.calledOnce).toBeFalsy;
    expect(element.tagName.calledOnce).toBeFalsy;

    expect(shouldCapitaliseFake.getCall(0)).toBeNull();
    expect(shouldCapitaliseForIFake.getCall(0)).toBeNull();
  });

  test('capitaliseText_Symbol_Slash', () => {
    const element = {
      isContentEditable: true,
      tagName: 'div',
      innerHTML: '/',
    };
    const shouldCapitaliseFake = sinon.fake();
    const shouldCapitaliseForIFake = sinon.fake();
    const getTextFake = sinon.fake.returns('/');
    const setTextFake = sinon.fake();

    expect(
      utils.capitaliseText(
        element,
        shouldCapitaliseFake,
        shouldCapitaliseForIFake,
        getTextFake,
        setTextFake
      )
    ).toBe(undefined);
    expect(element.isContentEditable.calledOnce).toBeFalsy;
    expect(element.tagName.calledOnce).toBeFalsy;

    expect(shouldCapitaliseFake.getCall(0)).toBeNull();
    expect(shouldCapitaliseForIFake.getCall(0)).toBeNull();
  });

  test('capitaliseText_HtmlContent_WithLastLetterCapital', () => {
    const element = {
      isContentEditable: true,
      tagName: 'div',
      innerHTML: "I'm the content of html taG",
    };
    const shouldCapitaliseFake = sinon.fake();
    const shouldCapitaliseForIFake = sinon.fake();
    const getTextFake = sinon.fake.returns("I'm the content of html taG");
    const setTextFake = sinon.fake();

    expect(
      utils.capitaliseText(
        element,
        shouldCapitaliseFake,
        shouldCapitaliseForIFake,
        getTextFake,
        setTextFake
      )
    ).toBe(undefined);
    expect(element.isContentEditable.calledOnce).toBeFalsy;
    expect(element.tagName.calledOnce).toBeFalsy;

    expect(shouldCapitaliseFake.getCall(0)).toBeNull();
    expect(shouldCapitaliseForIFake.getCall(0)).toBeNull();
  });

  test('capitaliseText_HtmlContent_WithLastLetterCapital', () => {
    const element = {
      isContentEditable: true,
      tagName: 'div',
      innerHTML: "I'm the content of html taG",
    };
    const shouldCapitaliseFake = sinon.fake();
    const shouldCapitaliseForIFake = sinon.fake();
    const setTextFake = sinon.fake();

    expect(
      utils.capitaliseText(
        element,
        shouldCapitaliseFake,
        shouldCapitaliseForIFake,
        utils.getText,
        setTextFake
      )
    ).toBe(undefined);
    expect(element.isContentEditable.calledOnce).toBeFalsy;
    expect(element.tagName.calledOnce).toBeFalsy;

    expect(shouldCapitaliseFake.getCall(0)).toBeNull();
    expect(shouldCapitaliseForIFake.getCall(0)).toBeNull();
  });

  test('capitaliseText_HtmlContent_WithTrailingBrTag', () => {
    const element = {
      isContentEditable: true,
      tagName: 'div',
      innerHTML: "I'm the content of html tag.<br>",
    };
    const shouldCapitaliseFake = sinon.fake();
    const shouldCapitaliseForIFake = sinon.fake();
    const setTextFake = sinon.fake();

    expect(
      utils.capitaliseText(
        element,
        shouldCapitaliseFake,
        shouldCapitaliseForIFake,
        utils.getText,
        setTextFake
      )
    ).toBe(undefined);
    expect(element.isContentEditable.calledOnce).toBeFalsy;
    expect(element.tagName.calledOnce).toBeFalsy;

    expect(shouldCapitaliseFake.getCall(0).args[0]).toBe(
      "I'm the content of html tag."
    );
    expect(shouldCapitaliseForIFake.getCall(0).args[0]).toBe(
      "I'm the content of html tag."
    );
  });

  test('capitaliseText_Exceptions', () => {
    expect(() => {
      const element = {
        isContentEditable: true,
        tagName: 'div',
        innerHTML: "I'm the content of html tag.<br>",
      };
      const shouldCapitaliseFake = sinon.fake();
      const shouldCapitaliseForIFake = sinon.fake();
      const setTextFake = sinon.fake();

      utils.capitaliseText(
        element,
        shouldCapitaliseFake,
        shouldCapitaliseForIFake,
        null,
        setTextFake
      );
    }).toThrow();

    //assert getTextFake and setTextFake
  });

  test('capitaliseText_GetText', () => {
    const element = {
      isContentEditable: true,
      tagName: 'div',
      innerHTML: "I'm the content of html tag.",
    };

    const shouldCapitaliseFake = sinon.fake();
    const shouldCapitaliseForIFake = sinon.fake();
    const getTextFake = sinon.fake.returns("I'm the content of html tag.");
    const setTextFake = sinon.fake();

    utils.capitaliseText(
      element,
      shouldCapitaliseFake,
      shouldCapitaliseForIFake,
      getTextFake,
      setTextFake
    );

    expect(shouldCapitaliseFake.getCall(0).args[0]).toBe(
      "I'm the content of html tag."
    );
    expect(shouldCapitaliseForIFake.getCall(0).args[0]).toBe(
      "I'm the content of html tag."
    );
    expect(getTextFake.getCall(0).args[0]).toBe(element);
    expect(shouldCapitaliseFake.getCall(0).args[0]).toBe(
      "I'm the content of html tag."
    );
  });

  test('capitaliseText_SetText_ShouldCapitaliseTrue', () => {
    const element = {
      isContentEditable: true,
      tagName: 'div',
      innerHTML: "I'm the content of html tag.",
    };

    const shouldCapitaliseFake = sinon.fake.returns(true);
    const shouldCapitaliseForIFake = sinon.fake();
    const getTextFake = sinon.fake.returns("I'm the content of html tag.");
    const setTextFake = sinon.fake();

    utils.capitaliseText(
      element,
      shouldCapitaliseFake,
      shouldCapitaliseForIFake,
      getTextFake,
      setTextFake
    );

    expect(shouldCapitaliseFake.getCall(0).args[0]).toBe(
      "I'm the content of html tag."
    );
    expect(shouldCapitaliseForIFake.getCall(0)).toBeNull();
    expect(getTextFake.getCall(0).args[0]).toBe(element);
    expect(shouldCapitaliseFake.getCall(0).args[0]).toBe(
      "I'm the content of html tag."
    );
  });

  test('capitaliseText_SetText_ShouldCapitaliseFalse', () => {
    const element = {
      isContentEditable: true,
      tagName: 'div',
      innerHTML: "I'm the content of html tag.",
    };

    const shouldCapitaliseFake = sinon.fake.returns(false);
    const shouldCapitaliseForIFake = sinon.fake();
    const getTextFake = sinon.fake.returns("I'm the content of html tag.");
    const setTextFake = sinon.fake();

    utils.capitaliseText(
      element,
      shouldCapitaliseFake,
      shouldCapitaliseForIFake,
      getTextFake,
      setTextFake
    );

    expect(shouldCapitaliseFake.getCall(0).args[0]).toBe(
      "I'm the content of html tag."
    );
    expect(shouldCapitaliseForIFake.getCall(0).args[0]).toBe(
      "I'm the content of html tag."
    );
    expect(getTextFake.getCall(0).args[0]).toBe(element);
    expect(shouldCapitaliseFake.getCall(0).args[0]).toBe(
      "I'm the content of html tag."
    );
  });
});

function setInnerHtmlForContentEditableElement() {
  document.body.innerHTML =
    '<div id="text_block">' +
    '<p>test block that is hidden</p>' +
    'Item is not. K<br>kryptonite. M<br>e and mine<br> ' +
    '</div>' +
    // '<div id="text_block_without_br"><p></p>' +
    '<div id="text_block_without_br">' +
    'Item is not Kryptonite.' +
    '</div>';
}

describe('setEndOfContenteditable', () => {
  test('setEndOfContenteditable_WithBr', () => {
    setInnerHtmlForContentEditableElement();

    const range = {
      setStart: sinon.fake(),
      collapse: sinon.fake(),
    };
    const windowObj = {
      removeAllRanges: sinon.fake(),
      addRange: sinon.fake(),
    };

    delete document.createRange;
    delete window.getSelection;

    Object.defineProperty(document, 'createRange', {
      value: sinon.fake.returns(range),
      configurable: true,
    });
    Object.defineProperty(window, 'getSelection', {
      value: sinon.fake.returns(windowObj),
      configurable: true,
    });

    const element = document.querySelector('#text_block');
    utils.setEndOfContenteditable(element);

    // Updated: The new implementation finds the deepest last text node
    // instead of positioning at <br>, which is better for Slack/Quill.js
    const expectedArg = ' ';
    var args = range.setStart.getCall(0).args;

    expect(args[0].data).toBe(expectedArg);
    expect(args[1]).toBe(expectedArg.length);
  });

  test('setEndOfContenteditable_WithoutBr', () => {
    setInnerHtmlForContentEditableElement();

    const range = {
      setStart: sinon.fake(),
      collapse: sinon.fake(),
    };
    const windowObj = {
      removeAllRanges: sinon.fake(),
      addRange: sinon.fake(),
    };

    delete document.createRange;
    delete window.getSelection;

    Object.defineProperty(document, 'createRange', {
      value: sinon.fake.returns(range),
      configurable: true,
    });
    Object.defineProperty(window, 'getSelection', {
      value: sinon.fake.returns(windowObj),
      configurable: true,
    });

    const element = document.querySelector('#text_block_without_br');
    utils.setEndOfContenteditable(element);
    const expectedArg = 'Item is not Kryptonite.';
    var args = range.setStart.getCall(0).args;

    expect(args[0].data).toBe(expectedArg);
    expect(args[1]).toBe(expectedArg.length);
  });
});
