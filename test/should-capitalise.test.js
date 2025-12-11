import { shouldCapitalise } from '../src/utils';

describe('shouldCapitalise', () => {
  it('treats &nbsp; as whitespace when evaluating trailing lowercase letters', () => {
    expect(shouldCapitalise('Hello.&nbsp;h')).toBe(true);
  });

  it('treats numeric &#160; entity as whitespace', () => {
    expect(shouldCapitalise('Hello.&#160;h')).toBe(true);
  });
});
