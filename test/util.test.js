import * as utils from '../src/utils.js';
const $ = require('jquery');

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
});
