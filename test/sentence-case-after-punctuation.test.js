import * as utils from '../src/utils';

const {
  applyImmediateSentenceStartCapitalisation,
  setShouldCapitaliseOption,
  __resetAllOptionsAndDictionariesForTests,
  shouldConvertToSentenceCase,
} = utils;

// Mock element for testing
function makeContentEditableElement(text) {
  return {
    tagName: 'DIV',
    isContentEditable: true,
    innerText: text,
  };
}

function makeInputElement(text) {
  return {
    tagName: 'INPUT',
    value: text,
  };
}

describe('Sentence case capitalises after punctuation', () => {
  beforeEach(() => {
    __resetAllOptionsAndDictionariesForTests();
    setShouldCapitaliseOption(shouldConvertToSentenceCase, true);
  });

  test('Capitalises first character after period', () => {
    const el = makeContentEditableElement('hello. world');
    applyImmediateSentenceStartCapitalisation(el);
    expect(el.innerText).toBe('Hello. World');
  });

  test('Capitalises first character after exclamation mark', () => {
    const el = makeContentEditableElement('wow! amazing');
    applyImmediateSentenceStartCapitalisation(el);
    expect(el.innerText).toBe('Wow! Amazing');
  });

  test('Capitalises first character after question mark', () => {
    const el = makeContentEditableElement('really? yes');
    applyImmediateSentenceStartCapitalisation(el);
    expect(el.innerText).toBe('Really? Yes');
  });

  test('Capitalises multiple sentences', () => {
    const el = makeContentEditableElement('first. second. third');
    applyImmediateSentenceStartCapitalisation(el);
    expect(el.innerText).toBe('First. Second. Third');
  });

  test('Handles multiple spaces after punctuation', () => {
    const el = makeContentEditableElement('hello.  world');
    applyImmediateSentenceStartCapitalisation(el);
    expect(el.innerText).toBe('Hello.  World');
  });

  test('Works with INPUT elements', () => {
    const el = makeInputElement('hello. world');
    applyImmediateSentenceStartCapitalisation(el);
    expect(el.value).toBe('Hello. World');
  });

  test('Capitalises start of text and after punctuation', () => {
    const el = makeContentEditableElement('this is a test. this should work');
    applyImmediateSentenceStartCapitalisation(el);
    expect(el.innerText).toBe('This is a test. This should work');
  });

  test('Handles mixed punctuation', () => {
    const el = makeContentEditableElement(
      'hello! how are you? i am fine. thanks'
    );
    applyImmediateSentenceStartCapitalisation(el);
    expect(el.innerText).toBe('Hello! How are you? I am fine. Thanks');
  });

  test('Does not change already capitalized text', () => {
    const el = makeContentEditableElement('Hello. World');
    applyImmediateSentenceStartCapitalisation(el);
    expect(el.innerText).toBe('Hello. World');
  });

  test('Handles text with no punctuation', () => {
    const el = makeContentEditableElement('just some text');
    applyImmediateSentenceStartCapitalisation(el);
    expect(el.innerText).toBe('Just some text');
  });

  test('Handles empty text', () => {
    const el = makeContentEditableElement('');
    applyImmediateSentenceStartCapitalisation(el);
    expect(el.innerText).toBe('');
  });

  test('Handles text with only spaces', () => {
    const el = makeContentEditableElement('   ');
    applyImmediateSentenceStartCapitalisation(el);
    expect(el.innerText).toBe('   ');
  });
});
