import * as utils from '../src/utilities.js';

test('getCapitalisedContent', () => {
    expect(utils.getCapitalisedContent('blah')).toBe('blaH');
    expect(utils.getCapitalisedContent('i')).toBe('I');
    expect(utils.getCapitalisedContent('i\'m')).toBe('i\'M');
    expect(utils.getCapitalisedContent('i. m')).toBe('i. M');
    expect(utils.getCapitalisedContent('')).toBe('');
    expect(() => {
        utils.getCapitalisedContent();
    }).toThrow();
});

test('shouldCapitaliseForI', () => {
    expect(utils.shouldCapitaliseForI('war i ')).toBe(true);
    expect(utils.shouldCapitaliseForI(' i ')).toBe(true);
    expect(utils.shouldCapitaliseForI(' i\'')).toBe(true);
    expect(utils.shouldCapitaliseForI('    i\'')).toBe(true);
    expect(utils.shouldCapitaliseForI('    i ')).toBe(true);
});
