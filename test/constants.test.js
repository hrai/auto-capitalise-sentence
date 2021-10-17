import {
  constantsKeyValuePairs,
  namesKeyValuePairs,
  abbreviationsKeyValuePairs,
  locationsKeyValuePairs,
  stringToKeyValuePairs,
  convertToTitleCase,
  convertToSentenceCase,
} from '../src/constants.js';

const $ = require('jquery');

describe('constants file tests', function () {
  test('stringToKeyValuePairs', () => {
    expect(stringToKeyValuePairs({}, 'blah')).toStrictEqual({ blah: 'blah' });
  });

  test('convertToTitleCase', () => {
    expect(convertToTitleCase({ whats: "what's" })).toStrictEqual({
      Whats: "What's",
    });
  });

  test('convertToSentenceCase', () => {
    expect(convertToSentenceCase({ np: 'no problem' })).toStrictEqual({
      Np: 'No problem',
    });
  });
});
