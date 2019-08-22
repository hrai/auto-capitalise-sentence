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
            const element=$('#username');
            expect(utils.getText(element[0], 'input')).toBe('Bingo');
            expect(utils.getText(element[0], 'span')).toBe('');
            expect(utils.getText(element[0], '')).toBe('');
            expect(() => {
                utils.getText(element);
            }).toThrow();
        });

        test('getText_TextareaTag', () => {
            const element=$('#about-me');
            element.val('This is my life.');

            expect(utils.getText(element[0], 'textarea')).toBe('This is my life.');
            expect(utils.getText(element[0], 'span')).toBe('');
            expect(utils.getText(element[0], '')).toBe('');
            expect(() => {
                utils.getText(element);
            }).toThrow();
        });

        test('getText_HtmlContent', () => {
            const element=$('#address');
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
            const updatedStr='testing this';

            resetHtml();
            var element=$('#username');
            utils.setText(element[0], 'input', updatedStr, false);
            expect(element.val()).toBe('testing this');

            resetHtml();
            var element=$('#username');
            utils.setText(element[0], 'span', updatedStr, false);
            expect(element.val()).toBe('Bingo');

            resetHtml();
            var element=$('#username');
            utils.setText(element[0], 'p', '', false);
            expect(element.val()).toBe('Bingo');

            expect(() => {
                resetHtml();
                var element=$('#username');
                utils.setText(element[0]);
            }).toThrow();
        });

        test('setText_TextareaTag', () => {
            const updatedStr='This is my life.';

            resetHtml();
            var element=$('#about-me');
            utils.setText(element[0], 'textarea', updatedStr, false);
            expect(element.val()).toBe('This is my life.');

            resetHtml();
            var element=$('#about-me');
            utils.setText(element[0], 'span', updatedStr, false);
            expect(element.val()).toBe('This is my life.');

            resetHtml();
            var element=$('#about-me');
            utils.setText(element[0], 'textarea', '', false);
            expect(element.val()).toBe('');

            expect(() => {
                resetHtml();
                var element=$('#about-me');
                utils.setText(element[0]);
            }).toThrow();
        });

        test('setText_HtmlContent_WithoutBrTags', () => {
            const updatedStr='This is my life.';

            resetHtml();
            var element=$('#address');
            utils.setText(element[0], 'span', updatedStr, false);
            expect(element.html()).toBe('This is my life.');

            resetHtml();
            var element=$('#address');
            utils.setText(element[0], 'p', updatedStr, false);
            expect(element.html()).toBe('This is my life.');

            resetHtml();
            var element=$('#address');
            utils.setText(element[0], 'span', '', false);
            expect(element.html()).toBe('');

            expect(() => {
                resetHtml();
                var element=$('#address');
                utils.setText(element[0]);
            }).toThrow();
        });

        test('setText_HtmlContent_WithBrTags', () => {
            var element=$('#address');
            var updatedStr='This is my life.';
            element.val(updatedStr);

            resetHtml();
            var element=$('#address');
            utils.setText(element[0], 'span', updatedStr, true);
            expect(element.html()).toBe('This is my life.<br>');

            resetHtml();
            var element=$('#address');
            utils.setText(element[0], 'p', updatedStr, true);
            expect(element.html()).toBe('This is my life.<br>');

            resetHtml();
            var element=$('#address');
            utils.setText(element[0], 'span', '', true);
            expect(element.html()).toBe('<br>');

            expect(() => {
                resetHtml();
                var element=$('#address');
                utils.setText(element[0]);
            }).toThrow();
        });
    });

    describe('capitaliseText', () => {
        var editableSpy=sinon.spy();

        test('capitaliseText_HtmlContent', () => {
            const element=sinon.stub({
                isContentEditable: true,
                tagName:'div',
                innerHTML: 'I\'m the content of html tag.',
            });
            const shouldCapitaliseFake=sinon.fake();
            const shouldCapitaliseForIFake=sinon.fake();
            const setTextFake=sinon.fake();

            expect(utils.capitaliseText(element, shouldCapitaliseFake, shouldCapitaliseForIFake, utils.getText,
                setTextFake)).toBe(undefined);
            expect(element.isContentEditable.calledOnce).toBeTruthy;
            expect(element.tagName.calledOnce).toBeTruthy;

            expect(shouldCapitaliseFake.getCall(0).args[0]).toBe('I\'m the content of html tag.');
            expect(shouldCapitaliseForIFake.getCall(0).args[0]).toBe('I\'m the content of html tag.');
        });

        test('capitaliseText_HtmlContent_WithLastLetterCapital', () => {
            const element=sinon.stub({
                isContentEditable: true,
                tagName:'div',
                innerHTML: 'I\'m the content of html taG',
            });
            const shouldCapitaliseFake=sinon.fake();
            const shouldCapitaliseForIFake=sinon.fake();
            const getTextFake=sinon.fake.returns('I\'m the content of html taG');
            const setTextFake=sinon.fake();

            expect(utils.capitaliseText(element, shouldCapitaliseFake, shouldCapitaliseForIFake, getTextFake,
                setTextFake)).toBe(undefined);
            expect(element.isContentEditable.calledOnce).toBeFalsy;
            expect(element.tagName.calledOnce).toBeFalsy;

            expect(shouldCapitaliseFake.getCall(0)).toBeNull();
            expect(shouldCapitaliseForIFake.getCall(0)).toBeNull();
        });

        test('capitaliseText_HtmlContent_WithLastLetterCapital', () => {
            const element=sinon.stub({
                isContentEditable: true,
                tagName:'div',
                innerHTML: 'I\'m the content of html taG',
            });
            const shouldCapitaliseFake=sinon.fake();
            const shouldCapitaliseForIFake=sinon.fake();
            const getTextFake=sinon.fake();
            const setTextFake=sinon.fake();

            expect(utils.capitaliseText(element, shouldCapitaliseFake, shouldCapitaliseForIFake, utils.getText,
                setTextFake)).toBe(undefined);
            expect(element.isContentEditable.calledOnce).toBeFalsy;
            expect(element.tagName.calledOnce).toBeFalsy;

            expect(shouldCapitaliseFake.getCall(0)).toBeNull();
            expect(shouldCapitaliseForIFake.getCall(0)).toBeNull();
        });

        test('capitaliseText_HtmlContent_WithTrailingBrTag', () => {
            const element=sinon.stub({
                isContentEditable: true,
                tagName:'div',
                innerHTML: 'I\'m the content of html tag.<br>',
            });
            const shouldCapitaliseFake=sinon.fake();
            const shouldCapitaliseForIFake=sinon.fake();
            const setTextFake=sinon.fake();

            expect(utils.capitaliseText(element, shouldCapitaliseFake, shouldCapitaliseForIFake, utils.getText,
                setTextFake)).toBe(undefined);
            expect(element.isContentEditable.calledOnce).toBeFalsy;
            expect(element.tagName.calledOnce).toBeFalsy;

            expect(shouldCapitaliseFake.getCall(0).args[0]).toBe('I\'m the content of html tag.');
            expect(shouldCapitaliseForIFake.getCall(0).args[0]).toBe('I\'m the content of html tag.');
        });

        test('capitaliseText_Exceptions', () => {
            expect(() => {
                const element=sinon.stub({
                    isContentEditable: true,
                    innerHTML: 'I\'m the content of html tag.',
                });
                const shouldCapitaliseFake=sinon.fake();
                const shouldCapitaliseForIFake=sinon.fake();
                const getTextFake=sinon.fake();
                const setTextFake=sinon.fake();

                utils.capitaliseText(element, shouldCapitaliseFake, shouldCapitaliseForIFake, getTextFake,
                    setTextFake);
            }).toThrow();

            expect(() => {
                const element=sinon.stub({
                    isContentEditable: true,
                    tagName:'div',
                    innerHTML: 'I\'m the content of html tag.<br>',
                });
                const shouldCapitaliseFake=sinon.fake();
                const shouldCapitaliseForIFake=sinon.fake();
                const setTextFake=sinon.fake();

                utils.capitaliseText(element, shouldCapitaliseFake, shouldCapitaliseForIFake, null,
                    setTextFake);
            }).toThrow();

            expect(() => {
                const element=sinon.stub({
                    isContentEditable: true,
                    tagName:'div',
                    innerHTML: 'I\'m the content of html tag.<br>',
                });
                const shouldCapitaliseFake=sinon.fake();
                const shouldCapitaliseForIFake=sinon.fake();
                const getTextFake=sinon.fake();

                utils.capitaliseText(element, shouldCapitaliseFake, shouldCapitaliseForIFake, getTextFake,
                    null);
            }).toThrow();

            //assert getTextFake and setTextFake
        });

        test('capitaliseText_GetText', () => {
            const dummyElement={
                isContentEditable: true,
                tagName:'div',
                innerHTML: 'I\'m the content of html tag.',
            };

            const element=sinon.stub(dummyElement);
            const shouldCapitaliseFake=sinon.fake();
            const shouldCapitaliseForIFake=sinon.fake();
            const getTextFake=sinon.fake.returns('I\'m the content of html tag.');
            const setTextFake=sinon.fake();

            utils.capitaliseText(element, shouldCapitaliseFake, shouldCapitaliseForIFake, getTextFake, setTextFake);

            expect(shouldCapitaliseFake.getCall(0).args[0]).toBe('I\'m the content of html tag.');
            expect(shouldCapitaliseForIFake.getCall(0).args[0]).toBe('I\'m the content of html tag.');
            expect(getTextFake.getCall(0).args[0]).toBe(dummyElement);
            expect(shouldCapitaliseFake.getCall(0).args[0]).toBe('I\'m the content of html tag.');
        });
    });
});
