import { convertToTitleCase, convertToSentenceCase } from '../src/constants.js';

describe('constants file tests', function () {
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
