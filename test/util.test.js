import * as utils from '../src/utils.js';
import {
  constantsKeyValuePairs,
  namesKeyValuePairs,
  abbreviationsKeyValuePairs,
  locationsKeyValuePairs,
} from '../src/constants.js';
const $ = require('jquery');

describe('utilities test', function () {
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

  test('getCaseInsensitiveMatchingAndCorrectedWords_Days', () => {
    let str = 'I\'m the content of html Monday.';
    let matchingAndCorrectWords = (text) =>
      utils.getCaseInsensitiveMatchingAndCorrectedWords(
        text,
        constantsKeyValuePairs
      );

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

  test('getCaseInsensitiveMatchingAndCorrectedWords_Months', () => {
    let str = 'I\'m the content of html january.';
    let matchingAndCorrectWords = (text) =>
      utils.getCaseInsensitiveMatchingAndCorrectedWords(
        text,
        constantsKeyValuePairs
      );

    expect(matchingAndCorrectWords(str)[0]).toBe('january');
    expect(matchingAndCorrectWords(str)[1]).toBe('January');

    str = 'I\'M THE CONTENT OF HTML JANUARY!';
    expect(matchingAndCorrectWords(str)[0]).toBe('JANUARY');
    expect(matchingAndCorrectWords(str)[1]).toBe('January');

    str = 'I\'m the content of html.';
    expect(matchingAndCorrectWords(str)[0]).toBe('');
    expect(matchingAndCorrectWords(str)[1]).toBe('');
  });

  test('getCaseInsensitiveMatchingAndCorrectedWords', () => {
    let str = 'I\'m the content of html James.';
    let matchingAndCorrectWords = (text) =>
      utils.getCaseInsensitiveMatchingAndCorrectedWords(
        text,
        namesKeyValuePairs
      );

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

  test('getCaseInsensitiveMatchingAndCorrectedWords_OtherPunctuation', () => {
    let str = 'I\'m the content of html \'James\'';
    let matchingAndCorrectWords = (text) =>
      utils.getCaseInsensitiveMatchingAndCorrectedWords(
        text,
        namesKeyValuePairs
      );

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

  test('getCaseInsensitiveMatchingAndCorrectedWords_CompanyNames', () => {
    let str = 'I\'m the content of html \'GitHub\'';
    let matchingAndCorrectWords = (text) =>
      utils.getCaseInsensitiveMatchingAndCorrectedWords(
        text,
        namesKeyValuePairs
      );

    expect(matchingAndCorrectWords(str)[0]).toBe('GitHub');
    expect(matchingAndCorrectWords(str)[1]).toBe('GitHub');

    str = 'I\'m the content of html github!';
    expect(matchingAndCorrectWords(str)[0]).toBe('github');
    expect(matchingAndCorrectWords(str)[1]).toBe('GitHub');

    str = 'I\'M THE CONTENT OF HTML "GITHUB"';
    expect(matchingAndCorrectWords(str)[0]).toBe('GITHUB');
    expect(matchingAndCorrectWords(str)[1]).toBe('GitHub');

    str = 'I\'m the content of html.';
    expect(matchingAndCorrectWords(str)[0]).toBe('');
    expect(matchingAndCorrectWords(str)[1]).toBe('');
  });

  test('getCaseInsensitiveMatchingAndCorrectedWords_Abbreviations', () => {
    let str = 'I\'m the content of html.';
    let matchingAndCorrectWords = (text) =>
      utils.getCaseInsensitiveMatchingAndCorrectedWords(
        text,
        abbreviationsKeyValuePairs
      );

    expect(matchingAndCorrectWords(str)[0]).toBe('html');
    expect(matchingAndCorrectWords(str)[1]).toBe('HTML');

    str = 'I\'m the content of html!';
    expect(matchingAndCorrectWords(str)[0]).toBe('html');
    expect(matchingAndCorrectWords(str)[1]).toBe('HTML');

    str = 'I\'M THE CONTENT OF HTML.';
    expect(matchingAndCorrectWords(str)[0]).toBe('HTML');
    expect(matchingAndCorrectWords(str)[1]).toBe('HTML');

    str = 'I\'m the content of ';
    expect(matchingAndCorrectWords(str)[0]).toBe('');
    expect(matchingAndCorrectWords(str)[1]).toBe('');
  });

  test('getCaseInsensitiveMatchingAndCorrectedWords_Locations', () => {
    let str = 'I was built in australia.';
    let matchingAndCorrectWords = (text) =>
      utils.getCaseInsensitiveMatchingAndCorrectedWords(
        text,
        locationsKeyValuePairs
      );

    expect(matchingAndCorrectWords(str)[0]).toBe('australia');
    expect(matchingAndCorrectWords(str)[1]).toBe('Australia');

    str = 'I was built in australia!';
    expect(matchingAndCorrectWords(str)[0]).toBe('australia');
    expect(matchingAndCorrectWords(str)[1]).toBe('Australia');

    str = 'I WAS BUILT IN AUSTRALIA.';
    expect(matchingAndCorrectWords(str)[0]).toBe('AUSTRALIA');
    expect(matchingAndCorrectWords(str)[1]).toBe('Australia');

    str = 'I was built in ';
    expect(matchingAndCorrectWords(str)[0]).toBe('');
    expect(matchingAndCorrectWords(str)[1]).toBe('');
  });

  test('getCaseSensitiveMatchingAndCorrectedWords_ApostropheWords', () => {
    let str = 'I cant.';
    let matchingAndCorrectWords = (text) =>
      utils.getCaseSensitiveMatchingAndCorrectedWords(
        text,
        constantsKeyValuePairs
      );

    expect(matchingAndCorrectWords(str)[0]).toBe('cant');
    expect(matchingAndCorrectWords(str)[1]).toBe('can\'t');

    str = 'I CANT ';
    expect(matchingAndCorrectWords(str)[0]).toBe('');
    expect(matchingAndCorrectWords(str)[1]).toBe('');

    str = 'I wont ';
    expect(matchingAndCorrectWords(str)[0]).toBe('wont');
    expect(matchingAndCorrectWords(str)[1]).toBe('won\'t');
  });

  test('getCaseSensitiveMatchingAndCorrectedWords_ApostropheWords_TitleCase', () => {
    let str = 'Doesnt.';
    let matchingAndCorrectWords = (text) =>
      utils.getCaseSensitiveMatchingAndCorrectedWords(
        text,
        constantsKeyValuePairs
      );

    expect(matchingAndCorrectWords(str)[0]).toBe('Doesnt');
    expect(matchingAndCorrectWords(str)[1]).toBe('Doesn\'t');

    str = 'I Wont.';
    expect(matchingAndCorrectWords(str)[0]).toBe('Wont');
    expect(matchingAndCorrectWords(str)[1]).toBe('Won\'t');
  });

  test('getCaseInsensitiveMatchingAndCorrectedWords_LocalAbbreviations', () => {
    let str = 'I\'m the content of html \'syd\'';
    let matchingAndCorrectWords = (text) =>
      utils.getCaseInsensitiveMatchingAndCorrectedWords(
        text,
        constantsKeyValuePairs
      );

    expect(matchingAndCorrectWords(str)[0]).toBe('syd');
    expect(matchingAndCorrectWords(str)[1]).toBe('Syd');

    str = 'I\'m the content of html SYD!';
    expect(matchingAndCorrectWords(str)[0]).toBe('SYD');
    expect(matchingAndCorrectWords(str)[1]).toBe('Syd');
  });

  test('getMatchingAndCorrectedWords_ExcludedWords', () => {
    let str = 'I\'m the content of html january.';
    let wordsToExclude = ['january'];
    let caseInsensitive = true;

    let matchingAndCorrectWords = (text) =>
      utils.getMatchingAndCorrectedWords(
        text,
        constantsKeyValuePairs,
        wordsToExclude,
        caseInsensitive
      );

    expect(matchingAndCorrectWords(str)[0]).toBe('');
    expect(matchingAndCorrectWords(str)[1]).toBe('');

    str = 'I\'M THE CONTENT OF HTML JANUARY!';
    expect(matchingAndCorrectWords(str)[0]).toBe('');
    expect(matchingAndCorrectWords(str)[1]).toBe('');
  });

  test('getUpdatedString_ChangesSentence', () => {
    expect(
      utils.getUpdatedString('these es indexes are as es ', 'es', 'ES')
    ).toBe('these es indexes are as ES ');
    expect(
      utils.getUpdatedString('these es indexes are as es!', 'es', 'ES')
    ).toBe('these es indexes are as ES!');
    expect(
      utils.getUpdatedString('these es indexes are as es?', 'es', 'ES')
    ).toBe('these es indexes are as ES?');

    expect(
      utils.getUpdatedString('these james and james ', 'james', 'James')
    ).toBe('these james and James ');
    expect(
      utils.getUpdatedString('these james and james.', 'james', 'James')
    ).toBe('these james and James.');
    expect(
      utils.getUpdatedString('these james and james!', 'james', 'James')
    ).toBe('these james and James!');
  });

  test('getUpdatedString_DoesNotChangeSentence', () => {
    expect(utils.getUpdatedString('these james and ', 'james', 'James')).toBe(
      'these james and '
    );
    expect(utils.getUpdatedString('these james and james!', '', '')).toBe(
      'these james and james!'
    );
    expect(utils.getUpdatedString('', '', '')).toBe('');
    expect(
      utils.getUpdatedString('these james and james!', '', undefined)
    ).toBe('these james and james!');
  });
});
