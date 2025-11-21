import {
  getCaseInsensitiveMatchingAndCorrectedWordsCore,
  getCaseSensitiveMatchingAndCorrectedWordsCore,
  getMatchingAndCorrectedWordsCore,
  getUpdatedStringCore,
  getCapitalisedContentForICore,
  getCapitalisedContentCore,
  arrayToMapCore,
  setWordModeOption,
  enforceExclusiveModeInvariant,
} from '../src/word-mode';

import {
  shouldCapitaliseI,
  shouldCapitaliseNames,
  shouldCapitaliseAcronyms,
  shouldCapitaliseLocations,
  shouldConvertToSentenceCase,
} from '../src/plugin-constants';

import * as utils from '../src/utils.js';
import sinon from 'sinon';

describe('word-mode core helpers', () => {
  test('case-insensitive matching finds and returns corrected word', () => {
    const text = 'hello world ';
    const dict = { world: 'World' };
    const res = getCaseInsensitiveMatchingAndCorrectedWordsCore(
      text,
      dict,
      []
    );
    expect(res).toEqual(['world', 'World']);
  });

  test('case-sensitive matching respects exact case', () => {
    const text = 'hello WORLD ';
    const dict = { WORLD: 'WORLD' };
    const res = getCaseSensitiveMatchingAndCorrectedWordsCore(
      text,
      dict,
      []
    );
    expect(res).toEqual(['WORLD', 'WORLD']);
  });

  test('getMatchingAndCorrectedWordsCore uses caseInsensitive flag', () => {
    const text = 'one two ';
    const dict = { two: 'Two' };
    expect(
      getMatchingAndCorrectedWordsCore(text, dict, [], true)
    ).toEqual(['two', 'Two']);
    expect(
      getMatchingAndCorrectedWordsCore(text, { Two: 'Two' }, [], false)
    ).toEqual(['two', 'Two']);
  });

  test('getUpdatedStringCore replaces matched word with corrected one', () => {
    const text = 'hello test ';
    const updated = getUpdatedStringCore(text, 'test', 'Test');
    expect(updated).toBe('hello Test ');
  });

  test('capitalise content helpers', () => {
    expect(getCapitalisedContentForICore(' i ')).toBe(' I ');
    expect(getCapitalisedContentCore('abz')).toBe('abZ');
  });

  test('arrayToMapCore converts arrays into key-value map', () => {
    const arr = ['One', 'Two'];
    const map = arrayToMapCore(arr);
    expect(map).toEqual({ one: 'One', two: 'Two' });
  });

  test('setWordModeOption disables sentence-case when enabling a word flag', () => {
    const opts = {
      [shouldCapitaliseI]: false,
      [shouldCapitaliseNames]: false,
      [shouldCapitaliseAcronyms]: false,
      [shouldCapitaliseLocations]: false,
      [shouldConvertToSentenceCase]: true,
    };
    setWordModeOption(opts, shouldCapitaliseI, true);
    expect(opts[shouldCapitaliseI]).toBe(true);
    expect(opts[shouldConvertToSentenceCase]).toBe(false);
  });

  test('enforceExclusiveModeInvariant clears word flags when sentence-case active', () => {
    const opts = {
      [shouldCapitaliseI]: true,
      [shouldCapitaliseNames]: true,
      [shouldCapitaliseAcronyms]: true,
      [shouldCapitaliseLocations]: true,
      [shouldConvertToSentenceCase]: true,
    };
    enforceExclusiveModeInvariant(opts);
    expect(opts[shouldCapitaliseI]).toBe(false);
    expect(opts[shouldCapitaliseNames]).toBe(false);
    expect(opts[shouldCapitaliseAcronyms]).toBe(false);
    expect(opts[shouldCapitaliseLocations]).toBe(false);
  });
});

describe('integration: utils -> word-mode', () => {
  test('capitaliseText calls word-mode shouldCapitalise helper with content', () => {
    const element = {
      isContentEditable: true,
      tagName: 'div',
      innerHTML: "I'm the content of html tag.",
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

    expect(shouldCapitaliseFake.getCall(0).args[0]).toBe("I'm the content of html tag.");
  });
});
