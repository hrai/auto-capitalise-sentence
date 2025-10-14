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
    const matchingAndCorrectWords = (text) =>
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
    const matchingAndCorrectWords = (text) =>
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
    const matchingAndCorrectWords = (text) =>
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
    const matchingAndCorrectWords = (text) =>
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
    const matchingAndCorrectWords = (text) =>
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
    const matchingAndCorrectWords = (text) =>
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
    const matchingAndCorrectWords = (text) =>
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
    const matchingAndCorrectWords = (text) =>
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
    const matchingAndCorrectWords = (text) =>
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
    const matchingAndCorrectWords = (text) =>
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
    const matchingAndCorrectWords = (text) =>
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
    const matchingAndCorrectWords = (text) =>
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
    const matchingAndCorrectWords = (text) =>
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
    const matchingAndCorrectWords = (text) =>
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
    const wordsToExclude = ['january'];
    const caseInsensitive = true;

    const matchingAndCorrectWords = (text) =>
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
    const str =
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

  describe('Sentence Case Functionality', () => {
    test('shouldConvertToSentenceCaseText - sentence endings', () => {
      expect(utils.shouldConvertToSentenceCaseText('Hello world.')).toBe(true);
      expect(utils.shouldConvertToSentenceCaseText('Are you okay?')).toBe(true);
      expect(utils.shouldConvertToSentenceCaseText('Stop right now!')).toBe(
        true
      );
      expect(utils.shouldConvertToSentenceCaseText('Hello world. ')).toBe(true);
      expect(utils.shouldConvertToSentenceCaseText('Are you okay? ')).toBe(
        true
      );
      expect(utils.shouldConvertToSentenceCaseText('Stop right now! ')).toBe(
        true
      );
    });

    test('shouldConvertToSentenceCaseText - line breaks', () => {
      expect(utils.shouldConvertToSentenceCaseText('Hello world\n')).toBe(true);
      expect(utils.shouldConvertToSentenceCaseText('Hello world\n ')).toBe(
        true
      );
      expect(utils.shouldConvertToSentenceCaseText('Hello\nWorld')).toBe(false);
    });

    test('shouldConvertToSentenceCaseText - sentence case opportunities', () => {
      expect(utils.shouldConvertToSentenceCaseText('hello world')).toBe(true); // starts with lowercase
      expect(utils.shouldConvertToSentenceCaseText('Hello. world')).toBe(true); // multiple sentences
      expect(utils.shouldConvertToSentenceCaseText('Hello? yes')).toBe(true); // multiple sentences
      expect(utils.shouldConvertToSentenceCaseText('Hello! there')).toBe(true); // multiple sentences
      expect(utils.shouldConvertToSentenceCaseText('Hello World')).toBe(false); // proper case
      expect(utils.shouldConvertToSentenceCaseText('HELLO WORLD')).toBe(false); // all caps
    });

    test('hasSentenceCaseOpportunity', () => {
      // Multiple sentences
      expect(utils.hasSentenceCaseOpportunity('Hello. world')).toBe(true);
      expect(utils.hasSentenceCaseOpportunity('Hello? yes')).toBe(true);
      expect(utils.hasSentenceCaseOpportunity('Hello! there')).toBe(true);

      // Starts with lowercase
      expect(utils.hasSentenceCaseOpportunity('hello world')).toBe(true);
      expect(utils.hasSentenceCaseOpportunity('  hello world')).toBe(true);

      // Properly capitalized
      expect(utils.hasSentenceCaseOpportunity('Hello World')).toBe(false);
      expect(utils.hasSentenceCaseOpportunity('Hello. World')).toBe(false);
    });

    test('getConvertedToSentenceCase - basic conversion', () => {
      expect(utils.getConvertedToSentenceCase('hello world')).toBe(
        'Hello world'
      );
      expect(utils.getConvertedToSentenceCase('HELLO WORLD')).toBe(
        'HELLO WORLD'
      );
      expect(utils.getConvertedToSentenceCase('hELLo WoRLD')).toBe(
        'HELLo WoRLD'
      );
    });

    test('getConvertedToSentenceCase - multiple sentences', () => {
      expect(
        utils.getConvertedToSentenceCase('hello world. how are you?')
      ).toBe('Hello world. How are you?');
      expect(
        utils.getConvertedToSentenceCase('great news! we did it. amazing!')
      ).toBe('Great news! We did it. Amazing!');
      expect(utils.getConvertedToSentenceCase('what? really? yes!')).toBe(
        'What? Really? Yes!'
      );
    });

    test('getConvertedToSentenceCase - line breaks', () => {
      expect(
        utils.getConvertedToSentenceCase('hello world\ngood morning')
      ).toBe('Hello world\nGood morning');
      expect(
        utils.getConvertedToSentenceCase('hello world\n  good morning')
      ).toBe('Hello world\n  Good morning');
      expect(utils.getConvertedToSentenceCase('hello\nworld\ntest')).toBe(
        'Hello\nWorld\nTest'
      );
    });

    test('getConvertedToSentenceCase - capitalize I', () => {
      expect(utils.getConvertedToSentenceCase('hello i am here')).toBe(
        'Hello I am here'
      );
      expect(utils.getConvertedToSentenceCase('yes i think so')).toBe(
        'Yes I think so'
      );
      expect(utils.getConvertedToSentenceCase('hello world. i am fine')).toBe(
        'Hello world. I am fine'
      );
    });

    test('getConvertedToSentenceCase - abbreviations', () => {
      expect(utils.getConvertedToSentenceCase('hello mr. smith')).toBe(
        'Hello Mr. Smith'
      );
      expect(utils.getConvertedToSentenceCase('dear dr. jones')).toBe(
        'Dear Dr. Jones'
      );
      expect(utils.getConvertedToSentenceCase('visit st. paul')).toBe(
        'Visit St. Paul'
      );
      expect(utils.getConvertedToSentenceCase('see mrs. wilson')).toBe(
        'See Mrs. Wilson'
      );
      expect(utils.getConvertedToSentenceCase('call prof. brown')).toBe(
        'Call Prof. Brown'
      );
    });

    test('getConvertedToSentenceCase - edge cases', () => {
      expect(utils.getConvertedToSentenceCase('')).toBe('');
      expect(utils.getConvertedToSentenceCase(' ')).toBe(' ');
      expect(utils.getConvertedToSentenceCase(null)).toBe(null);
      expect(utils.getConvertedToSentenceCase(undefined)).toBe(undefined);
      expect(utils.getConvertedToSentenceCase('A')).toBe('A');
      expect(utils.getConvertedToSentenceCase('a')).toBe('A');
    });

    test('getConvertedToSentenceCase - preserve spacing', () => {
      expect(utils.getConvertedToSentenceCase('  hello world  ')).toBe(
        '  Hello world  '
      );
      expect(utils.getConvertedToSentenceCase('hello.  world')).toBe(
        'Hello.  World'
      );
      expect(utils.getConvertedToSentenceCase('hello.    world')).toBe(
        'Hello.    World'
      );
    });

    test('getConvertedToSentenceCase - complex sentences', () => {
      const input =
        'hello world! how are you today? i am fine. thank you for asking.';
      const expected =
        'Hello world! How are you today? I am fine. Thank you for asking.';
      expect(utils.getConvertedToSentenceCase(input)).toBe(expected);

      const input2 = 'this is a test.\n\nhello world!\nwhat do you think?';
      const expected2 = 'This is a test.\n\nHello world!\nWhat do you think?';
      expect(utils.getConvertedToSentenceCase(input2)).toBe(expected2);
    });

    test('sentence case integration with optionsDictionary', () => {
      const {
        shouldConvertToSentenceCase,
      } = require('../src/plugin-constants.js');

      // Test that the sentence case option exists in optionsDictionary
      expect(utils.optionsDictionary).toHaveProperty(
        shouldConvertToSentenceCase
      );
      expect(typeof utils.optionsDictionary[shouldConvertToSentenceCase]).toBe(
        'boolean'
      );

      // Test that the default value is false
      expect(utils.optionsDictionary[shouldConvertToSentenceCase]).toBe(false);

      // Test setShouldCapitaliseOption function works for sentence case
      utils.setShouldCapitaliseOption(shouldConvertToSentenceCase, true);
      expect(utils.optionsDictionary[shouldConvertToSentenceCase]).toBe(true);

      utils.setShouldCapitaliseOption(shouldConvertToSentenceCase, false);
      expect(utils.optionsDictionary[shouldConvertToSentenceCase]).toBe(false);
    });
  });

  describe('Debounce Functionality', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    test('debounce function exists and is exported', () => {
      expect(typeof utils.debounce).toBe('function');
    });

    test('debounce delays function execution', () => {
      const mockFn = jest.fn();
      const debouncedFn = utils.debounce(mockFn, 5000);

      debouncedFn('test');
      expect(mockFn).not.toHaveBeenCalled();

      jest.advanceTimersByTime(4999);
      expect(mockFn).not.toHaveBeenCalled();

      jest.advanceTimersByTime(1);
      expect(mockFn).toHaveBeenCalledWith('test');
    });

    test('debounce implements sliding window - resets timer on new calls', () => {
      const mockFn = jest.fn();
      const debouncedFn = utils.debounce(mockFn, 5000);

      // First call
      debouncedFn('call1');
      expect(mockFn).not.toHaveBeenCalled();

      // Second call after 3 seconds (should reset timer)
      jest.advanceTimersByTime(3000);
      debouncedFn('call2');
      expect(mockFn).not.toHaveBeenCalled();

      // Third call after 4 more seconds (should reset timer again)
      jest.advanceTimersByTime(4000);
      debouncedFn('call3');
      expect(mockFn).not.toHaveBeenCalled();

      // Now wait full 5 seconds - only last call should execute
      jest.advanceTimersByTime(5000);
      expect(mockFn).toHaveBeenCalledTimes(1);
      expect(mockFn).toHaveBeenCalledWith('call3');
    });

    test('debounce preserves function context and arguments', () => {
      const mockFn = jest.fn();
      const debouncedFn = utils.debounce(mockFn, 1000);

      const testContext = { test: true };
      debouncedFn.call(testContext, 'arg1', 'arg2', 'arg3');

      jest.advanceTimersByTime(1000);
      expect(mockFn).toHaveBeenCalledWith('arg1', 'arg2', 'arg3');
    });

    test('getDebouncedCapitaliseText function exists', () => {
      expect(typeof utils.getDebouncedCapitaliseText).toBe('function');
    });

    test('getDebouncedCapitaliseText returns same debounced function for same element', () => {
      const mockElement = { id: 'test' };
      const debouncedFn1 = utils.getDebouncedCapitaliseText(mockElement);
      const debouncedFn2 = utils.getDebouncedCapitaliseText(mockElement);

      expect(debouncedFn1).toBe(debouncedFn2);
    });

    test('getDebouncedCapitaliseText uses default 5000ms delay', () => {
      const mockElement = { id: 'test' };
      const mockCapitaliseText = jest
        .spyOn(utils, 'capitaliseText')
        .mockImplementation(() => {});

      const debouncedFn = utils.getDebouncedCapitaliseText(mockElement);
      debouncedFn(mockElement);

      // Should not execute immediately
      expect(mockCapitaliseText).not.toHaveBeenCalled();

      // Should execute after 5000ms
      jest.advanceTimersByTime(5000);
      expect(mockCapitaliseText).toHaveBeenCalledWith(
        mockElement,
        utils.shouldCapitalise,
        utils.shouldCapitaliseForI,
        utils.getText,
        utils.setText
      );

      mockCapitaliseText.mockRestore();
    });

    test('multiple elements have independent debounce timers', () => {
      const element1 = { id: 'element1' };
      const element2 = { id: 'element2' };
      const mockCapitaliseText = jest
        .spyOn(utils, 'capitaliseText')
        .mockImplementation(() => {});

      const debouncedFn1 = utils.getDebouncedCapitaliseText(element1);
      const debouncedFn2 = utils.getDebouncedCapitaliseText(element2);

      // Trigger both elements
      debouncedFn1(element1);
      debouncedFn2(element2);

      // Advance time partially
      jest.advanceTimersByTime(3000);

      // Trigger element1 again (should reset its timer)
      debouncedFn1(element1);

      // Advance to 5000ms total - only element2 should fire
      jest.advanceTimersByTime(2000);
      expect(mockCapitaliseText).toHaveBeenCalledTimes(1);
      expect(mockCapitaliseText).toHaveBeenCalledWith(
        element2,
        expect.any(Function),
        expect.any(Function),
        expect.any(Function),
        expect.any(Function)
      );

      // Advance another 3000ms - now element1 should fire
      jest.advanceTimersByTime(3000);
      expect(mockCapitaliseText).toHaveBeenCalledTimes(2);
      expect(mockCapitaliseText).toHaveBeenLastCalledWith(
        element1,
        expect.any(Function),
        expect.any(Function),
        expect.any(Function),
        expect.any(Function)
      );

      mockCapitaliseText.mockRestore();
    });
  });
});
