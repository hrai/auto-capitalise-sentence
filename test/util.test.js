import * as utils from '../src/utils.js';
import { constants_key_val, names_key_val } from '../src/constants.js';
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
    const slackText =
      '<ts-mention data-id="UKTQJ356U" data-label="@Hangjit Rai" spellcheck="false" class="c-member_slug c-member_slug--link ts_tip_texty c-member_slug--mention" dir="ltr">@Hangjit Rai</ts-mention> Monday ';
    expect(utils.shouldCapitalise(slackText)).toBe(false);
    expect(utils.shouldCapitaliseForI(slackText)).toBe(false);
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

  test('getIndexOfMatchingConstantWord_Days', () => {
    let str = 'I\'m the content of html Monday.';
    let matchingAndCorrectWords = text =>
      utils.getMatchingAndCorrectedWords(text, constants_key_val);

    expect(matchingAndCorrectWords(str)[0]).toBe('Monday');
    expect(matchingAndCorrectWords(str)[1]).toBe('Monday');

    str = 'I\'m the content of html monday.';
    expect(matchingAndCorrectWords(str)[0]).toBe('monday');
    expect(matchingAndCorrectWords(str)[1]).toBe('Monday');

    str = 'I\'M THE CONTENT OF HTML MONDAY!';
    expect(matchingAndCorrectWords(str)[0]).toBe('MONDAY');
    expect(matchingAndCorrectWords(str)[1]).toBe('Monday');

    str = 'I\'m the content of html.';
    expect(matchingAndCorrectWords(str)[0]).toBe('');
    expect(matchingAndCorrectWords(str)[1]).toBe('');
  });

  test('getIndexOfMatchingConstantWord_Months', () => {
    let str = 'I\'m the content of html january.';
    let matchingAndCorrectWords = text =>
      utils.getMatchingAndCorrectedWords(text, constants_key_val);

    expect(matchingAndCorrectWords(str)[0]).toBe('january');
    expect(matchingAndCorrectWords(str)[1]).toBe('January');

    str = 'I\'M THE CONTENT OF HTML JANUARY!';
    expect(matchingAndCorrectWords(str)[0]).toBe('JANUARY');
    expect(matchingAndCorrectWords(str)[1]).toBe('January');

    str = 'I\'m the content of html.';
    expect(matchingAndCorrectWords(str)[0]).toBe('');
    expect(matchingAndCorrectWords(str)[1]).toBe('');
  });

  test.only('getIndexOfMatchingConstantWord_ApostropheWords', () => {
    let str = 'I cant.';
    let matchingAndCorrectWords = text =>
      utils.getMatchingAndCorrectedWords(text, constants_key_val);
    // console.log(constants_key_val);

    expect(matchingAndCorrectWords(str)[0]).toBe('cant');
    expect(matchingAndCorrectWords(str)[1]).toBe('can\'t');

    str = 'I CANT ';
    expect(matchingAndCorrectWords(str)[0]).toBe('CANT');
    expect(matchingAndCorrectWords(str)[1]).toBe('');

    str = 'I wont ';
    expect(matchingAndCorrectWords(str)[0]).toBe('wont');
    expect(matchingAndCorrectWords(str)[1]).toBe('won\'t');

    str = 'I Wont.';
    expect(matchingAndCorrectWords(str)[0]).toBe('Wont');
    expect(matchingAndCorrectWords(str)[1]).toBe('');
  });

  test('getIndexOfMatchingNameWords', () => {
    let str = 'I\'m the content of html James.';
    let matchingAndCorrectWords = text =>
      utils.getMatchingAndCorrectedWords(text, names_key_val);

    expect(matchingAndCorrectWords(str)[0]).toBe('James');
    expect(matchingAndCorrectWords(str)[1]).toBe('James');

    str = 'I\'m the content of html james.';
    expect(matchingAndCorrectWords(str)[0]).toBe('james');
    expect(matchingAndCorrectWords(str)[1]).toBe('James');

    str = 'I\'M THE CONTENT OF HTML JAMES!';
    expect(matchingAndCorrectWords(str)[0]).toBe('JAMES');
    expect(matchingAndCorrectWords(str)[1]).toBe('James');

    str = 'I\'m the content of html.';
    expect(matchingAndCorrectWords(str)[0]).toBe('');
    expect(matchingAndCorrectWords(str)[1]).toBe('');
  });

  test('getIndexOfMatchingNameWords_OtherPunctuation', () => {
    let str = 'I\'m the content of html \'James\'';
    let matchingAndCorrectWords = text =>
      utils.getMatchingAndCorrectedWords(text, names_key_val);

    expect(matchingAndCorrectWords(str)[0]).toBe('James');
    expect(matchingAndCorrectWords(str)[1]).toBe('James');

    str = 'I\'m the content of html james!';
    expect(matchingAndCorrectWords(str)[0]).toBe('james');
    expect(matchingAndCorrectWords(str)[1]).toBe('James');

    str = 'I\'M THE CONTENT OF HTML "JAMES"';
    expect(matchingAndCorrectWords(str)[0]).toBe('JAMES');
    expect(matchingAndCorrectWords(str)[1]).toBe('James');

    str = 'I\'m the content of html.';
    expect(matchingAndCorrectWords(str)[0]).toBe('');
    expect(matchingAndCorrectWords(str)[1]).toBe('');
  });
});
