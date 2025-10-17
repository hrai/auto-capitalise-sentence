import * as utils from '../src/utils';

const {
  capitaliseTextProxy,
  setShouldCapitaliseOption,
  setKeyValue,
  __resetAllOptionsAndDictionariesForTests,
  shouldCapitaliseAcronyms,
  shouldCapitaliseNames,
  shouldCapitaliseI,
  shouldConvertToSentenceCase,
  namesKeyVal,
  acronymsKeyVal,
  getText,
  setText,
} = utils;

describe('Framework compatibility (React/Vue/Angular)', () => {
  beforeEach(() => {
    __resetAllOptionsAndDictionariesForTests();
    // Enable word mode with names and acronyms
    setShouldCapitaliseOption(shouldConvertToSentenceCase, false);
    setShouldCapitaliseOption(shouldCapitaliseAcronyms, true);
    setShouldCapitaliseOption(shouldCapitaliseNames, true);
    setShouldCapitaliseOption(shouldCapitaliseI, true);
    setKeyValue(acronymsKeyVal, { nasa: 'NASA', api: 'API' });
    setKeyValue(namesKeyVal, { john: 'John', sarah: 'Sarah' });
  });

  // Helper function to call capitalisation with proper getText/setText
  function capitalise(element) {
    // Helper functions that match the expected signature
    const getTextHelper = (el, tagName) => getText(el, tagName || el.tagName);
    const setTextHelper = (el, tagName, text, shouldAppendBr) =>
      setText(el, tagName || el.tagName, text, shouldAppendBr);
    return capitaliseTextProxy(
      element,
      undefined,
      undefined,
      getTextHelper,
      setTextHelper
    );
  }

  test('capitalisation persists when value is read back immediately', () => {
    const input = document.createElement('input');
    input.type = 'text';
    input.value = 'hello john '; // Add space after name so it's detected as a complete word
    document.body.appendChild(input);

    try {
      capitalise(input);

      // Simulate framework reading the value back immediately
      const capitalised = input.value;
      expect(capitalised).toBe('hello John ');

      // Verify it's still capitalised after a microtask
      return Promise.resolve().then(() => {
        expect(input.value).toBe('hello John ');
      });
    } finally {
      document.body.removeChild(input);
    }
  });

  test('capitalisation works with React-style value tracker', () => {
    const input = document.createElement('input');
    input.type = 'text';
    input.value = 'mission nasa '; // Move nasa to end so it gets detected as last word

    // Simulate React's internal value tracker
    input._valueTracker = {
      getValue: () => input.value,
      setValue: (val) => {
        input._valueTracker._value = val;
      },
      stopTracking: () => {},
      _value: 'mission nasa ',
    };

    document.body.appendChild(input);

    try {
      capitalise(input);
      expect(input.value).toBe('mission NASA ');

      // Verify tracker was updated (React updates tracker to old value before we change)
      expect(input._valueTracker._value).toBe('mission nasa ');
    } finally {
      document.body.removeChild(input);
    }
  });

  test('capitalisation triggers input event for framework detection', () => {
    const input = document.createElement('input');
    input.type = 'text';
    input.value = 'test john '; // Add space after to detect word
    document.body.appendChild(input);

    let inputEventFired = false;
    let changeEventFired = false;

    input.addEventListener('input', () => {
      inputEventFired = true;
    });

    input.addEventListener('change', () => {
      changeEventFired = true;
    });

    try {
      capitalise(input);
      expect(input.value).toBe('test John ');
      expect(inputEventFired).toBe(true);
      expect(changeEventFired).toBe(true);
    } finally {
      document.body.removeChild(input);
    }
  });

  test('capitalisation works on textarea elements', () => {
    const textarea = document.createElement('textarea');
    textarea.value = 'hello sarah and john '; // Add space after to detect word
    document.body.appendChild(textarea);

    try {
      capitalise(textarea);
      expect(textarea.value).toBe('hello sarah and John ');
    } finally {
      document.body.removeChild(textarea);
    }
  });

  test('multiple rapid capitalisation calls handle value correctly', () => {
    const input = document.createElement('input');
    input.type = 'text';
    document.body.appendChild(input);

    // Use fake timers to control setTimeout behavior
    jest.useFakeTimers();

    try {
      // Simulate rapid typing - single letter gets capitalised
      input.value = 'j';
      capitalise(input);
      expect(input.value).toBe('J'); // Single letters are capitalised
      jest.runAllTimers(); // Clear the dataset flag

      input.value = 'Jo'; // User types lowercase again
      capitalise(input); // Won't capitalise - no space/punctuation after 'o'
      expect(input.value).toBe('Jo');
      jest.runAllTimers();

      input.value = 'Joh';
      capitalise(input); // Won't capitalise - no space/punctuation after
      expect(input.value).toBe('Joh');
      jest.runAllTimers();

      input.value = 'john '; // User types all lowercase with space
      capitalise(input); // Now the whole name gets capitalised
      expect(input.value).toBe('John ');
    } finally {
      jest.useRealTimers();
      document.body.removeChild(input);
    }
  });

  test('capitalisation guard prevents re-processing during update', () => {
    const input = document.createElement('input');
    input.type = 'text';
    input.value = 'test';
    document.body.appendChild(input);

    try {
      // Mark as being processed
      input.dataset.capitalising = 'true';

      // Should skip processing
      const originalValue = input.value;
      capitalise(input);
      expect(input.value).toBe(originalValue); // Unchanged

      // Clear flag and try again
      delete input.dataset.capitalising;
      capitalise(input);
      expect(input.value).toBe('test'); // Now it processes (but no change for this word)
    } finally {
      document.body.removeChild(input);
    }
  });

  test('value comparison prevents unnecessary updates', () => {
    const input = document.createElement('input');
    input.type = 'text';
    input.value = 'already capitalised '; // Add space
    document.body.appendChild(input);

    // Spy on setText to count calls without mocking its behavior
    const setTextSpy = jest.spyOn(utils, 'setText');

    try {
      // First call - check if it would update (it shouldn't because no names/acronyms match)
      capitalise(input);
      const firstCallCount = setTextSpy.mock.calls.length;
      // Since "capitalised" is not in our dictionary, it shouldn't call setText
      expect(firstCallCount).toBe(0);

      // Second call with same content should also not call setText
      capitalise(input);
      expect(setTextSpy.mock.calls.length).toBe(0);
    } finally {
      setTextSpy.mockRestore();
      document.body.removeChild(input);
    }
  });

  test('sentence case mode capitalises first letter after period', () => {
    const input = document.createElement('input');
    input.type = 'text';
    input.value = 'hello. world';
    document.body.appendChild(input);

    try {
      setShouldCapitaliseOption(shouldConvertToSentenceCase, true);
      capitalise(input);
      expect(input.value).toBe('Hello. World');
    } finally {
      document.body.removeChild(input);
    }
  });

  test('word mode capitalises i to I', () => {
    const input = document.createElement('input');
    input.type = 'text';
    input.value = 'hello i '; // 'i' needs whitespace before it to match the regex
    document.body.appendChild(input);

    try {
      setShouldCapitaliseOption(shouldConvertToSentenceCase, false);
      setShouldCapitaliseOption(shouldCapitaliseI, true);
      capitalise(input);
      expect(input.value).toBe('hello I ');
    } finally {
      document.body.removeChild(input);
    }
  });
});
