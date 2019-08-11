import * as utils from '../src/utilities.js';

describe('utilities test', function() {
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

            expect(utils.shouldCapitalise('')).toBe(false);
            expect(() => {
                utils.shouldCapitalise();
            }).toThrow();
        });

        test('shouldCapitalise_multiLine', () => {
            expect(utils.shouldCapitalise('war.\n k')).toBe(true);
            expect(utils.shouldCapitalise('war. \n\n   k')).toBe(true);
            expect(utils.shouldCapitalise('war. lasting \n peace \n\n   k')).toBe(true);
            expect(utils.shouldCapitalise('war? \n\n   k')).toBe(true);
            expect(utils.shouldCapitalise('war? \n\n   k')).toBe(true);
            expect(utils.shouldCapitalise('war? lasting \n peace \n\n   k')).toBe(true);
        });

        test('shouldCapitalise_singleChar', () => {
            expect(utils.shouldCapitalise('w')).toBe(true);
        });
    });

    describe('getText', () => {
        document.body.innerHTML =
            '<div>' +
            '  <input type="text" id="username" value="Bingo" />' +
            '  <textarea id="about-me" rows="8" cols="40"></textarea> ' +
            '  <button id="button" />' +
            '</div>';

        const $ = require('jquery');

        test('getText_InputTag', () => {
            expect(utils.getText($('#username'), 'input')).toBe('Bingo');
            expect(utils.getText($('#username'), 'span')).toBe('');
            expect(utils.getText($('#username'), '')).toBe('');
            expect(() => {
                utils.getText($('#username'));
            }).toThrow();
        });

        test('getText_TextareaTag', () => {
            $('#about-me').val('This is my life.');

            expect(utils.getText($('#about-me'), 'textarea')).toBe('This is my life.');
            expect(utils.getText($('#about-me'), 'span')).toBe('');
            expect(utils.getText($('#about-me'), '')).toBe('');
            expect(() => {
                utils.getText($('#about-me'));
            }).toThrow();
        });
    });
});
