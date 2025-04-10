import * as utils from '../src/utils.js';
import {
  constantsKeyValuePairs,
  namesKeyValuePairs,
  acronymsKeyValuePairs,
  locationsKeyValuePairs,
} from '../src/constants.js';
import {
  shouldCapitaliseI,
  shouldCapitaliseNames,
  shouldCapitaliseAcronyms,
  shouldCapitaliseLocations,
} from '../src/plugin-constants.js';

const $ = require('jquery');

describe('util file tests', function () {
  test('getCapitalisedContent', () => {
    expect(utils.getCapitalisedContent('blah')).toBe('blaH');
    expect(utils.getCapitalisedContent('i')).toBe('I');
    expect(utils.getCapitalisedContent("i'm")).toBe("i'M");
    expect(utils.getCapitalisedContent('i. m')).toBe('i. M');
    expect(utils.getCapitalisedContent('i? m')).toBe('i? M');
    expect(utils.getCapitalisedContent('')).toBe('');
    expect(() => {
      utils.getCapitalisedContent();
    }).toThrow();
  });

  test('getCapitalisedContentForI', () => {
    expect(utils.getCapitalisedContentForI('i ')).toBe('I ');
    expect(utils.getCapitalisedContentForI("i'")).toBe("I'");
    expect(utils.getCapitalisedContentForI('Hi this is i ')).toBe(
      'Hi this is I '
    );
  });

  test('shouldCapitaliseForI', () => {
    expect(utils.shouldCapitaliseForI('war i ')).toBe(true);
    expect(utils.shouldCapitaliseForI(' i ')).toBe(true);
    expect(utils.shouldCapitaliseForI('Hi this is i ')).toBe(true);
    expect(utils.shouldCapitaliseForI(" i'")).toBe(true);
    expect(utils.shouldCapitaliseForI("    i'")).toBe(true);
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
      expect(utils.shouldCapitalise('this is (war)? k')).toBe(true);
      expect(utils.shouldCapitalise('this is [war]? k')).toBe(true);
      expect(utils.shouldCapitalise('this is {war}? k')).toBe(true);
      expect(utils.shouldCapitalise('this is <war>? k')).toBe(true);
      expect(utils.shouldCapitalise('k')).toBe(true);

      expect(utils.shouldCapitalise('war? k')).toBe(true);
      expect(utils.shouldCapitalise('war?    k')).toBe(true);

      expect(utils.shouldCapitalise('       k')).toBe(false);
      expect(utils.shouldCapitalise('.       k')).toBe(false);
      expect(utils.shouldCapitalise('?       k')).toBe(false);
      expect(utils.shouldCapitalise('    k ')).toBe(false);
      expect(utils.shouldCapitalise('    k ')).toBe(false);
      expect(utils.shouldCapitalise('    ')).toBe(false);
      expect(utils.shouldCapitalise(' 1')).toBe(false);
      expect(utils.shouldCapitalise('this is <war>? 1')).toBe(false);

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

      expect(utils.shouldCapitalise('war? \n\n   1')).toBe(false);
      expect(utils.shouldCapitalise('war? \n\n   12')).toBe(false);
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
      '  <span id="address">Please enter your address&nbsp;</span> ' +
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
        'Please enter your address '
      );
      expect(utils.getText(element[0], 'input')).toBe('');
      expect(utils.getText(element[0], '')).toBe(
        'Please enter your address&nbsp;'
      );
      expect(() => {
        utils.getText(element);
      }).toThrow();
    });
  });

  describe('getNbspCount', () => {
    test('getNbspCount', () => {
      expect(utils.getNbspCount('test&nbsp;')).toBe(1);
      expect(utils.getNbspCount('test&nbsp;&nbsp;')).toBe(2);
      expect(utils.getNbspCount('test')).toBe(0);
    });
  });

  describe('replaceLastOccurrenceInString', () => {
    test('replaceLastOccurrenceInString_ReplacesText', () => {
      expect(
        utils.replaceLastOccurrenceInString('test&nbsp;&nbsp;', '&nbsp;', 'me')
      ).toBe('test&nbsp;me');
      expect(
        utils.replaceLastOccurrenceInString(
          'test&nbsp;&nbsp;&nbsp;',
          '&nbsp;',
          'me'
        )
      ).toBe('test&nbsp;&nbsp;me');
      expect(
        utils.replaceLastOccurrenceInString('test this this', 'this', 'and')
      ).toBe('test this and');
    });

    test('replaceLastOccurrenceInString_DoesNotReplaceText', () => {
      expect(
        utils.replaceLastOccurrenceInString('test me', 'bro', 'this')
      ).toBe('test me');
      expect(
        utils.replaceLastOccurrenceInString('test me ', 'me', 'this')
      ).toBe('test me ');
    });
  });

  describe('getTextForSpanTag', () => {
    test('getTextForSpanTag_ReplacesTagForSingleOccurrence', () => {
      expect(utils.getTextForSpanTag('test&nbsp;')).toBe('test ');
    });

    test('getTextForSpanTag_DoesNotReplaceTagForMultipleOccurrences', () => {
      expect(utils.getTextForSpanTag('test&nbsp;&nbsp;')).toBe(
        'test&nbsp;&nbsp;'
      );
      expect(utils.getTextForSpanTag('test')).toBe('test');
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

    test('setText_SpanTagWithNbsp', () => {
      const updatedStr = 'testing this ';

      resetHtml();
      let element = $('#address');

      utils.setText(element[0], 'span', updatedStr, false);
      expect(element.html()).toBe('testing this&nbsp;');

      resetHtml();
      element = $('#address');
      utils.setText(element[0], 'p', '', false);
      expect(element.html()).toBe('');

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
      utils.setText(element[0], 'p', 'test space ', false);
      expect(element.html()).toBe('test space&nbsp;');

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
    let str = "I'm the content of html Monday.";
    let matchingAndCorrectWords = (text) =>
      utils.getCaseInsensitiveMatchingAndCorrectedWords(
        text,
        constantsKeyValuePairs
      );

    expect(matchingAndCorrectWords(str)[0]).toBe('Monday');
    expect(matchingAndCorrectWords(str)[1]).toBe('Monday');

    str = "I'm the content of html monday.";
    expect(matchingAndCorrectWords(str)[0]).toBe('monday');
    expect(matchingAndCorrectWords(str)[1]).toBe('Monday');

    str = "I'm the content of html monday-";
    expect(matchingAndCorrectWords(str)[0]).toBe('');
    expect(matchingAndCorrectWords(str)[1]).toBe('');

    str = "I'M THE CONTENT OF HTML MONDAY!";
    expect(matchingAndCorrectWords(str)[0]).toBe('MONDAY');
    expect(matchingAndCorrectWords(str)[1]).toBe('Monday');

    str = "I'm the content of html.";
    expect(matchingAndCorrectWords(str)[0]).toBe('');
    expect(matchingAndCorrectWords(str)[1]).toBe('');
  });

  test('getCaseInsensitiveMatchingAndCorrectedWords_Months', () => {
    let str = "I'm the content of html january.";
    let matchingAndCorrectWords = (text) =>
      utils.getCaseInsensitiveMatchingAndCorrectedWords(
        text,
        constantsKeyValuePairs
      );

    expect(matchingAndCorrectWords(str)[0]).toBe('january');
    expect(matchingAndCorrectWords(str)[1]).toBe('January');

    str = "I'M THE CONTENT OF HTML JANUARY!";
    expect(matchingAndCorrectWords(str)[0]).toBe('JANUARY');
    expect(matchingAndCorrectWords(str)[1]).toBe('January');

    str = "I'm the content of html.";
    expect(matchingAndCorrectWords(str)[0]).toBe('');
    expect(matchingAndCorrectWords(str)[1]).toBe('');
  });

  test('getCaseInsensitiveMatchingAndCorrectedWords', () => {
    let str = "I'm the content of html James.";
    let matchingAndCorrectWords = (text) =>
      utils.getCaseInsensitiveMatchingAndCorrectedWords(
        text,
        namesKeyValuePairs
      );

    expect(matchingAndCorrectWords(str)[0]).toBe('James');
    expect(matchingAndCorrectWords(str)[1]).toBe('James');

    str = "I'm the content of html james.";
    expect(matchingAndCorrectWords(str)[0]).toBe('james');
    expect(matchingAndCorrectWords(str)[1]).toBe('James');

    str = "I'M THE CONTENT OF HTML JAMES!";
    expect(matchingAndCorrectWords(str)[0]).toBe('JAMES');
    expect(matchingAndCorrectWords(str)[1]).toBe('James');

    str = "I'm the content of html.";
    expect(matchingAndCorrectWords(str)[0]).toBe('');
    expect(matchingAndCorrectWords(str)[1]).toBe('');
  });

  test('getCaseInsensitiveMatchingAndCorrectedWords_OtherPunctuation', () => {
    let str = "I'm the content of html 'James'";
    let matchingAndCorrectWords = (text) =>
      utils.getCaseInsensitiveMatchingAndCorrectedWords(
        text,
        namesKeyValuePairs
      );

    expect(matchingAndCorrectWords(str)[0]).toBe('James');
    expect(matchingAndCorrectWords(str)[1]).toBe('James');

    str = "I'm the content of html james!";
    expect(matchingAndCorrectWords(str)[0]).toBe('james');
    expect(matchingAndCorrectWords(str)[1]).toBe('James');

    str = 'I\'M THE CONTENT OF HTML "JAMES"';
    expect(matchingAndCorrectWords(str)[0]).toBe('JAMES');
    expect(matchingAndCorrectWords(str)[1]).toBe('James');

    str = "I'm the content of html.";
    expect(matchingAndCorrectWords(str)[0]).toBe('');
    expect(matchingAndCorrectWords(str)[1]).toBe('');
  });

  test('getCaseInsensitiveMatchingAndCorrectedWords_CompanyNames', () => {
    let str = "I'm the content of html 'GitHub'";
    let matchingAndCorrectWords = (text) =>
      utils.getCaseInsensitiveMatchingAndCorrectedWords(
        text,
        namesKeyValuePairs
      );

    expect(matchingAndCorrectWords(str)[0]).toBe('GitHub');
    expect(matchingAndCorrectWords(str)[1]).toBe('GitHub');

    str = "I'm the content of html github!";
    expect(matchingAndCorrectWords(str)[0]).toBe('github');
    expect(matchingAndCorrectWords(str)[1]).toBe('GitHub');

    str = 'I\'M THE CONTENT OF HTML "GITHUB"';
    expect(matchingAndCorrectWords(str)[0]).toBe('GITHUB');
    expect(matchingAndCorrectWords(str)[1]).toBe('GitHub');

    str = "I'm the content of html.";
    expect(matchingAndCorrectWords(str)[0]).toBe('');
    expect(matchingAndCorrectWords(str)[1]).toBe('');
  });

  test('getCaseInsensitiveMatchingAndCorrectedWords_TechAcronyms', () => {
    let str = "I'm the content of html.";
    let matchingAndCorrectWords = (text) =>
      utils.getCaseInsensitiveMatchingAndCorrectedWords(
        text,
        acronymsKeyValuePairs
      );

    expect(matchingAndCorrectWords(str)[0]).toBe('html');
    expect(matchingAndCorrectWords(str)[1]).toBe('HTML');

    str = "I'm the content of html!";
    expect(matchingAndCorrectWords(str)[0]).toBe('html');
    expect(matchingAndCorrectWords(str)[1]).toBe('HTML');

    str = "I'M THE CONTENT OF HTML.";
    expect(matchingAndCorrectWords(str)[0]).toBe('HTML');
    expect(matchingAndCorrectWords(str)[1]).toBe('HTML');

    str = "I'm the content of ";
    expect(matchingAndCorrectWords(str)[0]).toBe('');
    expect(matchingAndCorrectWords(str)[1]).toBe('');
  });

  /* eg -
   * test.html
   * file.json
   * user-api
   */
  test('getCaseInsensitiveMatchingAndCorrectedWords_Acronyms_DoesNotWorkOnWordsWithNonWordCharacterSeparator', () => {
    let str = "I'm the content of file.json.";
    let matchingAndCorrectWords = (text) =>
      utils.getCaseInsensitiveMatchingAndCorrectedWords(
        text,
        acronymsKeyValuePairs
      );

    expect(matchingAndCorrectWords(str)[0]).toBe('');
    expect(matchingAndCorrectWords(str)[1]).toBe('');

    str = "I'm the content of users-api.";
    expect(matchingAndCorrectWords(str)[0]).toBe('');
    expect(matchingAndCorrectWords(str)[1]).toBe('');
  });

  test('getCaseInsensitiveMatchingAndCorrectedWords_AcronymsWithDotPrefix', () => {
    let str = "I'm the content of .net ";
    let matchingAndCorrectWords = (text) =>
      utils.getCaseInsensitiveMatchingAndCorrectedWords(
        text,
        acronymsKeyValuePairs
      );

    expect(matchingAndCorrectWords(str)[0]).toBe('.net');
    expect(matchingAndCorrectWords(str)[1]).toBe('.NET');

    str = "I'm the content of .Net!";
    expect(matchingAndCorrectWords(str)[0]).toBe('.Net');
    expect(matchingAndCorrectWords(str)[1]).toBe('.NET');
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

    str = 'I WAS BUILT (IN) AUSTRALIA.';
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
    expect(matchingAndCorrectWords(str)[1]).toBe("can't");

    str = 'I CANT ';
    expect(matchingAndCorrectWords(str)[0]).toBe('');
    expect(matchingAndCorrectWords(str)[1]).toBe('');

    str = 'I wont ';
    expect(matchingAndCorrectWords(str)[0]).toBe('wont');
    expect(matchingAndCorrectWords(str)[1]).toBe("won't");
  });

  test('getCaseSensitiveMatchingAndCorrectedWords_ApostropheWords_TitleCase', () => {
    let str = 'Doesnt.';
    let matchingAndCorrectWords = (text) =>
      utils.getCaseSensitiveMatchingAndCorrectedWords(
        text,
        constantsKeyValuePairs
      );

    expect(matchingAndCorrectWords(str)[0]).toBe('Doesnt');
    expect(matchingAndCorrectWords(str)[1]).toBe("Doesn't");

    str = 'I Wont.';
    expect(matchingAndCorrectWords(str)[0]).toBe('Wont');
    expect(matchingAndCorrectWords(str)[1]).toBe("Won't");
  });

  test('getCaseInsensitiveMatchingAndCorrectedWords_LocalAcronyms', () => {
    let str = "I'm the content of html 'syd'";
    let matchingAndCorrectWords = (text) =>
      utils.getCaseInsensitiveMatchingAndCorrectedWords(
        text,
        acronymsKeyValuePairs
      );

    expect(matchingAndCorrectWords(str)[0]).toBe('syd');
    expect(matchingAndCorrectWords(str)[1]).toBe('Syd');

    str = "I'm the content of html SYD!";
    expect(matchingAndCorrectWords(str)[0]).toBe('SYD');
    expect(matchingAndCorrectWords(str)[1]).toBe('Syd');
  });

  test('getCaseInsensitiveMatchingAndCorrectedWords_CommonConstants', () => {
    let str = "I'm the content of html xmas ";
    let matchingAndCorrectWords = (text) =>
      utils.getCaseInsensitiveMatchingAndCorrectedWords(
        text,
        constantsKeyValuePairs
      );

    expect(matchingAndCorrectWords(str)[0]).toBe('xmas');
    expect(matchingAndCorrectWords(str)[1]).toBe('Xmas');

    str = "I'm the content of html XMAS ";
    expect(matchingAndCorrectWords(str)[0]).toBe('XMAS');
    expect(matchingAndCorrectWords(str)[1]).toBe('Xmas');
  });

  test('getCaseSensitiveMatchingAndCorrectedWords_Expansions', () => {
    let str = "I'm the content of html, thx ";
    let matchingAndCorrectWords = (text) =>
      utils.getCaseSensitiveMatchingAndCorrectedWords(
        text,
        constantsKeyValuePairs
      );

    expect(matchingAndCorrectWords(str)[0]).toBe('thx');
    expect(matchingAndCorrectWords(str)[1]).toBe('thanks');

    str = "I'm the content of html Thx!";
    expect(matchingAndCorrectWords(str)[0]).toBe('Thx');
    expect(matchingAndCorrectWords(str)[1]).toBe('Thanks');

    str = "I'm the content of html nw!";
    expect(matchingAndCorrectWords(str)[0]).toBe('nw');
    expect(matchingAndCorrectWords(str)[1]).toBe('no worries');

    str = "I'm the content of html Nw!";
    expect(matchingAndCorrectWords(str)[0]).toBe('Nw');
    expect(matchingAndCorrectWords(str)[1]).toBe('No worries');
  });

  test('getMatchingAndCorrectedWords_ExcludedWords', () => {
    let str = "I'm the content of january.";
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

    str = "I'M THE CONTENT OF HTML JANUARY!";
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

  test('setShouldCapitaliseOption_SetsTheValueToTrue', () => {
    utils.setShouldCapitaliseOption(shouldCapitaliseI, true);
    expect(utils.optionsDictionary[shouldCapitaliseI]).toBe(true);

    utils.setShouldCapitaliseOption(shouldCapitaliseNames, true);
    expect(utils.optionsDictionary[shouldCapitaliseNames]).toBe(true);

    utils.setShouldCapitaliseOption(shouldCapitaliseAcronyms, true);
    expect(utils.optionsDictionary[shouldCapitaliseAcronyms]).toBe(true);

    utils.setShouldCapitaliseOption(shouldCapitaliseLocations, true);
    expect(utils.optionsDictionary[shouldCapitaliseLocations]).toBe(true);
  });

  test('getCleanHtmlForAtlassian_ReturnsHtmlWithoutAssistiveSpanTag', () => {
    let str =
      '<span contenteditable="false" id="5d10383aea7a170c895a4379" text="@Hangjit Rai" accesslevel="CONTAINER" usertype="null" class="mentionView-content-wrap inlineNodeView"><span aria-hidden="true" class="zeroWidthSpaceContainer"><span class="inlineNodeViewAddZeroWidthSpace"></span>​</span><span class="assistive">Tagged user @Hangjit Rai</span><span aria-hidden="true"><span data-mention-id="5d10383aea7a170c895a4379" data-access-level="CONTAINER" spellcheck="false"><span spellcheck="false" class="css-18wbb8r">@Hangjit Rai</span></span></span><span aria-hidden="true" class="inlineNodeViewAddZeroWidthSpace"></span></span> PE&nbsp;';

    expect($(utils.getCleanHtmlForAtlassian(str)).html()).toBe(
      '<span aria-hidden="true" class="zeroWidthSpaceContainer"><span class="inlineNodeViewAddZeroWidthSpace"></span>​</span><span aria-hidden="true"><span data-mention-id="5d10383aea7a170c895a4379" data-access-level="CONTAINER" spellcheck="false"><span spellcheck="false" class="css-18wbb8r">@Hangjit Rai</span></span></span><span aria-hidden="true" class="inlineNodeViewAddZeroWidthSpace"></span>'
    );
  });

  test('setShouldCapitaliseOption_SetsTheValueToTrue', () => {
    utils.setShouldCapitaliseOption(shouldCapitaliseI, false);
    expect(utils.optionsDictionary[shouldCapitaliseI]).toBe(false);

    utils.setShouldCapitaliseOption(shouldCapitaliseNames, false);
    expect(utils.optionsDictionary[shouldCapitaliseNames]).toBe(false);

    utils.setShouldCapitaliseOption(shouldCapitaliseAcronyms, false);
    expect(utils.optionsDictionary[shouldCapitaliseAcronyms]).toBe(false);

    utils.setShouldCapitaliseOption(shouldCapitaliseLocations, false);
    expect(utils.optionsDictionary[shouldCapitaliseLocations]).toBe(false);
  });
});

describe('capitaliseText', () => {
  test('capitaliseText_P', () => {
    const element = $.parseHTML('<p><br data-text="true"></p>');

    expect(utils.containsHtmlContent(element)).toBe(true);
  });

  test('capitaliseText_Span', () => {
    const element = $.parseHTML('<span><br data-text="true"></span>');

    expect(utils.containsHtmlContent(element)).toBe(true);
  });

  test('capitaliseText_Div', () => {
    const element = $.parseHTML('<div><br data-text="true"></div>');

    expect(utils.containsHtmlContent(element)).toBe(true);
  });

  test('capitaliseText_Div', () => {
    const element = $.parseHTML('<div>h<br></div>');

    expect(utils.containsHtmlContent(element)).toBe(false);
  });
});

describe('string manipulation', () => {
  test('stringToKeyValuePairs', () => {
    expect(utils.stringToKeyValuePairs({}, 'blah')).toStrictEqual({
      blah: 'blah',
    });
  });

  test('arrayToMap', () => {
    expect(utils.arrayToMap(['ab', 'test', 'me'])).toStrictEqual({
      ab: 'ab',
      me: 'me',
      test: 'test',
    });

    expect(utils.arrayToMap({})).toStrictEqual({});
    expect(utils.arrayToMap(null)).toStrictEqual({});
    expect(utils.arrayToMap(undefined)).toStrictEqual({});
  });
});
