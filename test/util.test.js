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
    expect(utils.shouldCapitalise('       k')).toBe(false);
    expect(utils.shouldCapitalise('.       k')).toBe(false);
    expect(utils.shouldCapitalise('    k ')).toBe(false);
    expect(utils.shouldCapitalise('    ')).toBe(false);
});

describe('shouldCapitalise', () => {
    test('shouldCapitalise_singleLine', () => {
        expect(utils.shouldCapitalise('war. k')).toBe(true);
        expect(utils.shouldCapitalise('war.    k')).toBe(true);
        expect(utils.shouldCapitalise('k')).toBe(true);
        expect(utils.shouldCapitalise('k')).toBe(true);

        expect(utils.shouldCapitalise('war? k')).toBe(true);
        expect(utils.shouldCapitalise('war?    k')).toBe(true);

        expect(utils.shouldCapitalise('       k')).toBe(false);
        expect(utils.shouldCapitalise('.       k')).toBe(false);
        expect(utils.shouldCapitalise('?       k')).toBe(false);
        expect(utils.shouldCapitalise('    k ')).toBe(false);
        expect(utils.shouldCapitalise('    k ')).toBe(false);
        expect(utils.shouldCapitalise('    ')).toBe(false);
    });

    test('shouldCapitalise_multiLine', () => {
        expect(utils.shouldCapitalise('war.\n k')).toBe(true);
        expect(utils.shouldCapitalise('war. \n\n   k')).toBe(true);
        expect(utils.shouldCapitalise('war. lasting \n peace \n\n   k')).toBe(true);
        expect(utils.shouldCapitalise('war? \n\n   k')).toBe(true);
        expect(utils.shouldCapitalise('war? \n\n   k')).toBe(true);
        expect(utils.shouldCapitalise('war? lasting \n peace \n\n   k')).toBe(true);
    });
});
