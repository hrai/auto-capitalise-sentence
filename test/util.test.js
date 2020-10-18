import sinon from 'sinon';
import * as utils from '../src/utils.js';

describe('utilities test', function() {
  test('getCapitalisedContent', () => {
    expect(utils.getCapitalisedContent('blah')).toBe('blaH');
    expect(utils.getCapitalisedContent('i')).toBe('I');
    expect(utils.getCapitalisedContent('i\'m')).toBe('i\'M');
    expect(utils.getCapitalisedContent('i. m')).toBe('i. M');
    expect(utils.getCapitalisedContent('i? m')).toBe('i? M');
    expect(utils.getCapitalisedContent('')).toBe('');
    expect(() => {
      utils.getCapitalisedContent();
    }).toThrow();
  });

  test('shouldCapitaliseForI', () => {
    expect(utils.shouldCapitaliseForI('war i ')).toBe(true);
    expect(utils.shouldCapitaliseForI(' i ')).toBe(true);
    expect(utils.shouldCapitaliseForI('Hi this is i ')).toBe(true);
    expect(utils.shouldCapitaliseForI(' i\'')).toBe(true);
    expect(utils.shouldCapitaliseForI('    i\'')).toBe(true);
    expect(utils.shouldCapitaliseForI('    i ')).toBe(true);
    expect(utils.shouldCapitalise('       k')).toBe(false);
    expect(utils.shouldCapitalise('.       k')).toBe(false);
    expect(utils.shouldCapitalise('    k ')).toBe(false);
    expect(utils.shouldCapitalise('    ')).toBe(false);
    expect(utils.shouldCapitalise(' !   ')).toBe(false);
  });

  describe('shouldCapitalise', () => {
    test('shouldCapitalise_singleLine', () => {
      expect(utils.shouldCapitalise('war. k')).toBe(true);
      expect(utils.shouldCapitalise('war? k')).toBe(true);
      expect(utils.shouldCapitalise('war! k')).toBe(true);
      expect(utils.shouldCapitalise('war.    k')).toBe(true);
      expect(utils.shouldCapitalise('war!    k')).toBe(true);
      expect(utils.shouldCapitalise('war?    k')).toBe(true);
      expect(utils.shouldCapitalise('k')).toBe(true);

      expect(utils.shouldCapitalise('war? k')).toBe(true);
      expect(utils.shouldCapitalise('war?    k')).toBe(true);

      expect(utils.shouldCapitalise('       k')).toBe(false);
      expect(utils.shouldCapitalise('.       k')).toBe(false);
      expect(utils.shouldCapitalise('?       k')).toBe(false);
      expect(utils.shouldCapitalise('    k ')).toBe(false);
      expect(utils.shouldCapitalise('    k ')).toBe(false);
      expect(utils.shouldCapitalise('    ')).toBe(false);

      expect(utils.shouldCapitalise('?')).toBe(true);
      expect(utils.shouldCapitalise('!')).toBe(true);
      expect(utils.shouldCapitalise('.')).toBe(true);
      expect(utils.shouldCapitalise('')).toBe(false);
      expect(() => {
        utils.shouldCapitalise();
      }).toThrow();
    });

    test('shouldCapitalise_multiLine', () => {
      expect(utils.shouldCapitalise('war.\n k')).toBe(true);
      expect(utils.shouldCapitalise('war. \n\n   k')).toBe(true);
      expect(utils.shouldCapitalise('war. lasting \n peace \n\n   k')).toBe(
        true
      );
      expect(utils.shouldCapitalise('war? \n\n   k')).toBe(true);
      expect(utils.shouldCapitalise('war? \n\n   k')).toBe(true);
      expect(utils.shouldCapitalise('war? lasting \n peace \n\n   k')).toBe(
        true
      );
    });

    test('shouldCapitalise_singleChar', () => {
      expect(utils.shouldCapitalise('w')).toBe(true);
    });
  });

  function setInnerHtml() {
    document.body.innerHTML =
      '<div>' +
      '  <input type="text" id="username" value="Bingo" />' +
      '  <textarea id="about-me" rows="8" cols="40"></textarea> ' +
      '  <span id="address">Please enter your address.</span> ' +
      '  <button id="button" />' +
      '</div>';
  }

  describe('getText', () => {
    test('getText_InputTag', () => {
      setInnerHtml();
      const element = $('#username');
      expect(utils.getText(element[0], 'input')).toBe('Bingo');
      expect(utils.getText(element[0], 'span')).toBe('');
      expect(utils.getText(element[0], '')).toBe('');
      expect(() => {
        utils.getText(element);
      }).toThrow();
    });

    test('getText_TextareaTag', () => {
      setInnerHtml();
      const element = $('#about-me');
      element.val('This is my life.');

      expect(utils.getText(element[0], 'textarea')).toBe('This is my life.');
      expect(utils.getText(element[0], 'span')).toBe('');
      expect(utils.getText(element[0], '')).toBe('');
      expect(() => {
        utils.getText(element);
      }).toThrow();
    });

    test('getText_HtmlContent', () => {
      setInnerHtml();
      const element = $('#address');
      expect(utils.getText(element[0], 'span')).toBe(
        'Please enter your address.'
      );
      expect(utils.getText(element[0], 'input')).toBe('');
      expect(utils.getText(element[0], '')).toBe('Please enter your address.');
      expect(() => {
        utils.getText(element);
      }).toThrow();
    });
  });

  describe('setText', () => {
    function resetHtml() {
      document.body.innerHTML =
        '<div>' +
        '  <input type="text" id="username" value="Bingo" />' +
        '  <textarea id="about-me" rows="8" cols="40"></textarea> ' +
        '  <span id="address">Please enter your address.</span> ' +
        '  <button id="button" />' +
        '</div>';
    }

    test('setText_InputTag', () => {
      const updatedStr = 'testing this';

      resetHtml();
      let element = $('#username');
      utils.setText(element[0], 'input', updatedStr, false);
      expect(element.val()).toBe('testing this');

      resetHtml();
      element = $('#username');
      utils.setText(element[0], 'span', updatedStr, false);
      expect(element.val()).toBe('Bingo');

      resetHtml();
      element = $('#username');
      utils.setText(element[0], 'p', '', false);
      expect(element.val()).toBe('Bingo');

      expect(() => {
        resetHtml();
        element = $('#username');
        utils.setText(element[0]);
      }).toThrow();
    });

    test('setText_TextareaTag', () => {
      const updatedStr = 'This is my life.';

      resetHtml();
      let element = $('#about-me');
      utils.setText(element[0], 'textarea', updatedStr, false);
      expect(element.val()).toBe('This is my life.');

      resetHtml();
      element = $('#about-me');
      utils.setText(element[0], 'span', updatedStr, false);
      expect(element.val()).toBe('This is my life.');

      resetHtml();
      element = $('#about-me');
      utils.setText(element[0], 'textarea', '', false);
      expect(element.val()).toBe('');

      expect(() => {
        resetHtml();
        element = $('#about-me');
        utils.setText(element[0]);
      }).toThrow();
    });

    test('setText_HtmlContent_WithoutBrTags', () => {
      const updatedStr = 'This is my life.';

      resetHtml();
      let element = $('#address');
      utils.setText(element[0], 'span', updatedStr, false);
      expect(element.html()).toBe('This is my life.');

      resetHtml();
      element = $('#address');
      utils.setText(element[0], 'p', updatedStr, false);
      expect(element.html()).toBe('This is my life.');

      resetHtml();
      element = $('#address');
      utils.setText(element[0], 'span', '', false);
      expect(element.html()).toBe('');

      expect(() => {
        resetHtml();
        element = $('#address');
        utils.setText(element[0]);
      }).toThrow();
    });

    test('setText_HtmlContent_WithBrTags', () => {
      let element = $('#address');
      const updatedStr = 'This is my life.';
      element.val(updatedStr);

      resetHtml();
      element = $('#address');
      utils.setText(element[0], 'span', updatedStr, true);
      expect(element.html()).toBe('This is my life.<br>');

      resetHtml();
      element = $('#address');
      utils.setText(element[0], 'p', updatedStr, true);
      expect(element.html()).toBe('This is my life.<br>');

      resetHtml();
      element = $('#address');
      utils.setText(element[0], 'span', '', true);
      expect(element.html()).toBe('<br>');

      expect(() => {
        resetHtml();
        element = $('#address');
        utils.setText(element[0]);
      }).toThrow();
    });
  });

  describe('capitaliseText', () => {
    test('capitaliseText_HtmlContent', () => {
      const element = sinon.stub({
        isContentEditable: true,
        tagName: 'div',
        innerHTML: 'I\'m the content of html tag.',
      });
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
        'I\'m the content of html tag.'
      );
      expect(shouldCapitaliseForIFake.getCall(0).args[0]).toBe(
        'I\'m the content of html tag.'
      );
    });

    test('capitaliseText_Symbol_@', () => {
      const element = sinon.stub({
        isContentEditable: true,
        tagName: 'div',
        innerHTML: '@',
      });
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
      const element = sinon.stub({
        isContentEditable: true,
        tagName: 'div',
        innerHTML: '.',
      });
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
      const element = sinon.stub({
        isContentEditable: true,
        tagName: 'div',
        innerHTML: '/',
      });
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
      const element = sinon.stub({
        isContentEditable: true,
        tagName: 'div',
        innerHTML: 'I\'m the content of html taG',
      });
      const shouldCapitaliseFake = sinon.fake();
      const shouldCapitaliseForIFake = sinon.fake();
      const getTextFake = sinon.fake.returns('I\'m the content of html taG');
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
      const element = sinon.stub({
        isContentEditable: true,
        tagName: 'div',
        innerHTML: 'I\'m the content of html taG',
      });
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
      const element = sinon.stub({
        isContentEditable: true,
        tagName: 'div',
        innerHTML: 'I\'m the content of html tag.<br>',
      });
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
        'I\'m the content of html tag.'
      );
      expect(shouldCapitaliseForIFake.getCall(0).args[0]).toBe(
        'I\'m the content of html tag.'
      );
    });

    test('capitaliseText_Exceptions', () => {
      expect(() => {
        const element = sinon.stub({
          isContentEditable: true,
          innerHTML: 'I\'m the content of html tag.',
        });
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
      }).toThrow();

      expect(() => {
        const element = sinon.stub({
          isContentEditable: true,
          tagName: 'div',
          innerHTML: 'I\'m the content of html tag.<br>',
        });
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

      expect(() => {
        const element = sinon.stub({
          isContentEditable: true,
          tagName: 'div',
          innerHTML: 'I\'m the content of html tag.<br>',
        });
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
      }).toThrow();

      //assert getTextFake and setTextFake
    });

    test('capitaliseText_GetText', () => {
      const dummyElement = {
        isContentEditable: true,
        tagName: 'div',
        innerHTML: 'I\'m the content of html tag.',
      };

      const element = sinon.stub(dummyElement);
      const shouldCapitaliseFake = sinon.fake();
      const shouldCapitaliseForIFake = sinon.fake();
      const getTextFake = sinon.fake.returns('I\'m the content of html tag.');
      const setTextFake = sinon.fake();

      utils.capitaliseText(
        element,
        shouldCapitaliseFake,
        shouldCapitaliseForIFake,
        getTextFake,
        setTextFake
      );

      expect(shouldCapitaliseFake.getCall(0).args[0]).toBe(
        'I\'m the content of html tag.'
      );
      expect(shouldCapitaliseForIFake.getCall(0).args[0]).toBe(
        'I\'m the content of html tag.'
      );
      expect(getTextFake.getCall(0).args[0]).toBe(dummyElement);
      expect(shouldCapitaliseFake.getCall(0).args[0]).toBe(
        'I\'m the content of html tag.'
      );
    });

    test('capitaliseText_SetText_ShouldCapitaliseTrue', () => {
      const dummyElement = {
        isContentEditable: true,
        tagName: 'div',
        innerHTML: 'I\'m the content of html tag.',
      };

      const element = sinon.stub(dummyElement);
      const shouldCapitaliseFake = sinon.fake.returns(true);
      const shouldCapitaliseForIFake = sinon.fake();
      const getTextFake = sinon.fake.returns('I\'m the content of html tag.');
      const setTextFake = sinon.fake();

      utils.capitaliseText(
        element,
        shouldCapitaliseFake,
        shouldCapitaliseForIFake,
        getTextFake,
        setTextFake
      );

      expect(shouldCapitaliseFake.getCall(0).args[0]).toBe(
        'I\'m the content of html tag.'
      );
      expect(shouldCapitaliseForIFake.getCall(0)).toBeNull();
      expect(getTextFake.getCall(0).args[0]).toBe(dummyElement);
      expect(shouldCapitaliseFake.getCall(0).args[0]).toBe(
        'I\'m the content of html tag.'
      );
    });

    test('capitaliseText_SetText_ShouldCapitaliseFalse', () => {
      const dummyElement = {
        isContentEditable: true,
        tagName: 'div',
        innerHTML: 'I\'m the content of html tag.',
      };

      const element = sinon.stub(dummyElement);
      const shouldCapitaliseFake = sinon.fake.returns(false);
      const shouldCapitaliseForIFake = sinon.fake();
      const getTextFake = sinon.fake.returns('I\'m the content of html tag.');
      const setTextFake = sinon.fake();

      utils.capitaliseText(
        element,
        shouldCapitaliseFake,
        shouldCapitaliseForIFake,
        getTextFake,
        setTextFake
      );

      expect(shouldCapitaliseFake.getCall(0).args[0]).toBe(
        'I\'m the content of html tag.'
      );
      expect(shouldCapitaliseForIFake.getCall(0).args[0]).toBe(
        'I\'m the content of html tag.'
      );
      expect(getTextFake.getCall(0).args[0]).toBe(dummyElement);
      expect(shouldCapitaliseFake.getCall(0).args[0]).toBe(
        'I\'m the content of html tag.'
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

      const element = $('#text_block')[0];
      utils.setEndOfContenteditable(element);
      const expectedArg = '<br>';
      var args = range.setStart.getCall(0).args;

      expect(args[0].outerHTML).toBe(expectedArg);
      expect(args[1]).toBe(0);
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

      const element = $('#text_block_without_br')[0];
      utils.setEndOfContenteditable(element);
      const expectedArg = 'Item is not Kryptonite.';
      var args = range.setStart.getCall(0).args;

      expect(args[0].data).toBe(expectedArg);
      expect(args[1]).toBe(expectedArg.length);
    });

    test('getIndexOfMatchingConstantWord', () => {
      let str = 'I\'m the content of html monday.';
      expect(utils.getIndexOfMatchingConstantWord(str)[0]).toBe(0);
      expect(utils.getIndexOfMatchingConstantWord(str)[1]).toBe('monday');

      str = 'I\'M THE CONTENT OF HTML MONDAY!';
      expect(utils.getIndexOfMatchingConstantWord(str)[0]).toBe(0);
      expect(utils.getIndexOfMatchingConstantWord(str)[1]).toBe('MONDAY');

      str = 'I\'m the content of html.';
      expect(utils.getIndexOfMatchingConstantWord(str)[0]).toBe(-1);
      expect(utils.getIndexOfMatchingConstantWord(str)[1]).toBe('html');
    });
  });
});
