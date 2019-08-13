import sinon from 'sinon';
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
            '  <span id="address">Please enter your address.</span> ' +
            '  <button id="button" />' +
            '</div>';

        test('getText_InputTag', () => {
            var element=$('#username');
            expect(utils.getText(element[0], 'input')).toBe('Bingo');
            expect(utils.getText(element[0], 'span')).toBe('');
            expect(utils.getText(element[0], '')).toBe('');
            expect(() => {
                utils.getText(element);
            }).toThrow();
        });

        test('getText_TextareaTag', () => {
            var element=$('#about-me');
            element.val('This is my life.');

            expect(utils.getText(element[0], 'textarea')).toBe('This is my life.');
            expect(utils.getText(element[0], 'span')).toBe('');
            expect(utils.getText(element[0], '')).toBe('');
            expect(() => {
                utils.getText(element);
            }).toThrow();
        });

        test('getText_HtmlContent', () => {
            var element=$('#address');
            expect(utils.getText(element[0], 'span')).toBe('Please enter your address.');
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
            var updatedStr='testing this';

            resetHtml();
            var element=$('#username');
            utils.setText(element, 'input', updatedStr, false);
            expect(element.val()).toBe('testing this');

            resetHtml();
            var element=$('#username');
            utils.setText(element, 'span', updatedStr, false);
            expect(element.val()).toBe('Bingo');

            resetHtml();
            var element=$('#username');
            utils.setText(element, 'p', '', false);
            expect(element.val()).toBe('Bingo');

            expect(() => {
                resetHtml();
                var element=$('#username');
                utils.setText(element);
            }).toThrow();
        });

        test('setText_TextareaTag', () => {
            var element=$('#about-me');
            var updatedStr='This is my life.';
            element.val(updatedStr);

            resetHtml();
            var element=$('#about-me');
            utils.setText(element, 'textarea', updatedStr, false);
            expect(element.val()).toBe('This is my life.');

            resetHtml();
            var element=$('#about-me');
            utils.setText(element, 'span', updatedStr, false);
            expect(element.val()).toBe('This is my life.');

            resetHtml();
            var element=$('#about-me');
            utils.setText(element, 'textarea', '', false);
            expect(element.val()).toBe('');

            expect(() => {
                resetHtml();
                var element=$('#about-me');
                utils.setText(element);
            }).toThrow();
        });

        test('setText_HtmlContent_WithoutBrTags', () => {
            var element=$('#address');
            var updatedStr='This is my life.';
            element.val(updatedStr);

            resetHtml();
            var element=$('#address');
            utils.setText(element, 'span', updatedStr, false);
            expect(element.html()).toBe('This is my life.');

            resetHtml();
            var element=$('#address');
            utils.setText(element, 'p', updatedStr, false);
            expect(element.html()).toBe('This is my life.');

            resetHtml();
            var element=$('#address');
            utils.setText(element, 'span', '', false);
            expect(element.html()).toBe('');

            expect(() => {
                resetHtml();
                var element=$('#address');
                utils.setText(element);
            }).toThrow();
        });

        test('setText_HtmlContent_WithBrTags', () => {
            var element=$('#address');
            var updatedStr='This is my life.';
            element.val(updatedStr);

            resetHtml();
            var element=$('#address');
            utils.setText(element, 'span', updatedStr, true);
            expect(element.html()).toBe('This is my life.<br>');

            resetHtml();
            var element=$('#address');
            utils.setText(element, 'p', updatedStr, true);
            expect(element.html()).toBe('This is my life.<br>');

            resetHtml();
            var element=$('#address');
            utils.setText(element, 'span', '', true);
            expect(element.html()).toBe('<br>');

            expect(() => {
                resetHtml();
                var element=$('#address');
                utils.setText(element);
            }).toThrow();
        });
    });

    // afterEach(() => {
    //     sinon.restore();
    // });

    describe('capitaliseText', () => {
        var element=sinon.stub({
            isContentEditable: true,
            tagName:'div',
            innerHTML: 'I\'m the content of html tag.',
        });

        test('capitaliseText_HtmlContent', () => {
            expect(utils.capitaliseText()).toBe(undefined);
            expect(utils.capitaliseText(element)).toBe(undefined);
        });
    });
});
