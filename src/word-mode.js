import {
  shouldCapitaliseI,
  shouldCapitaliseNames,
  shouldCapitaliseAcronyms,
  shouldCapitaliseLocations,
  shouldConvertToSentenceCase,
} from './plugin-constants';

// Set a word-mode option; turning any word-level flag on disables sentence case
export function setWordModeOption(optionsDictionary, optionName, value) {
  if (
    value === true &&
    (optionName === shouldCapitaliseI ||
      optionName === shouldCapitaliseNames ||
      optionName === shouldCapitaliseAcronyms ||
      optionName === shouldCapitaliseLocations)
  ) {
    // Turning on any word-level flag disables sentence case.
    optionsDictionary[shouldConvertToSentenceCase] = false;
    optionsDictionary[optionName] = true;
  } else {
    optionsDictionary[optionName] = value;
  }
}

// Ensure exclusivity invariant: if sentence case is active clear word flags
export function enforceExclusiveModeInvariant(optionsDictionary) {
  if (optionsDictionary[shouldConvertToSentenceCase]) {
    // Sentence case trumps word flags: clear any stray word flags that might have been set directly.
    if (
      optionsDictionary[shouldCapitaliseI] ||
      optionsDictionary[shouldCapitaliseNames] ||
      optionsDictionary[shouldCapitaliseAcronyms] ||
      optionsDictionary[shouldCapitaliseLocations]
    ) {
      optionsDictionary[shouldCapitaliseI] = false;
      optionsDictionary[shouldCapitaliseNames] = false;
      optionsDictionary[shouldCapitaliseAcronyms] = false;
      optionsDictionary[shouldCapitaliseLocations] = false;
    }
  } else {
    // If sentence case off but NO word flags on, remain as-is (neutral mode). If sentence case off and any word flag on, valid word mode.
  }
}

// ------------------ Pure word-mode helpers ------------------
const nbspLocal = '&nbsp;';

function isGmailLocal() {
  return (
    typeof window !== 'undefined' &&
    window.location &&
    window.location.host === 'mail.google.com'
  );
}

export function getCorrectedWord(caseInsensitive, matchedWord, keyValuePairs) {
  if (caseInsensitive === true) {
    return keyValuePairs[matchedWord.toLowerCase()];
  }

  // Case-sensitive lookup first
  const direct = keyValuePairs[matchedWord];
  if (direct != null) return direct;

  // Fallback: try capitalised key (e.g. dict has 'Two' but matchedWord is 'two')
  if (matchedWord && matchedWord.length > 0) {
    const cap = matchedWord[0].toUpperCase() + matchedWord.slice(1);
    return keyValuePairs[cap];
  }

  return undefined;
}

// Core matching function: accepts wordsToExclude so callers can pass shared state
export function getMatchingAndCorrectedWordsCore(
  text,
  keyValuePairs,
  wordsToExclude,
  caseInsensitive
) {
  // Gmail-specific: temporarily replace &nbsp; with regular space for word matching
  let processedText = text;
  if (isGmailLocal() && text && text.includes(nbspLocal)) {
    processedText = text.replace(new RegExp(nbspLocal, 'g'), ' ');
  }

  const lastWordRegex = /((-|\.)?\w+)([^\w-])$/;

  const match = lastWordRegex.exec(processedText);
  const noMatch = ['', ''];

  if (match) {
    const matchedWord = match[1];

    if (matchedWord != null) {
      if ((wordsToExclude || []).includes(matchedWord.toLowerCase())) {
        return noMatch;
      }

      const correctedWord = getCorrectedWord(
        caseInsensitive,
        matchedWord,
        keyValuePairs
      );

      if (correctedWord != null) {
        return [matchedWord, correctedWord];
      }
    }
  }

  return noMatch;
}

export function getCaseInsensitiveMatchingAndCorrectedWordsCore(
  text,
  keyValuePairs,
  wordsToExclude
) {
  return getMatchingAndCorrectedWordsCore(
    text,
    keyValuePairs,
    wordsToExclude,
    true
  );
}

export function getCaseSensitiveMatchingAndCorrectedWordsCore(
  text,
  keyValuePairs,
  wordsToExclude
) {
  return getMatchingAndCorrectedWordsCore(
    text,
    keyValuePairs,
    wordsToExclude,
    false
  );
}

export function getUpdatedStringCore(text, matchedWord, correctedWord) {
  if (text && matchedWord && correctedWord) {
    const splitAt = (index) => (x) => [x.slice(0, index), x.slice(index)];
    const arr = splitAt(-1)(text);

    const updatedStr =
      arr[0].replace(new RegExp(matchedWord + '$'), correctedWord) + arr[1];
    return updatedStr;
  }

  return text;
}

export function getCapitalisedContentForICore(text) {
  return text.replace(/(^|\s)i(\s|[.,!?;:'")\]}])/g, '$1I$2');
}

export function getCapitalisedContentCore(text) {
  const lastChar = text.slice(-1);
  const updatedStr = text.substr(0, text.length - 1) + lastChar.toUpperCase();
  return updatedStr;
}

export const stringToKeyValuePairsCore = (obj, val) => {
  obj[val.toLowerCase()] = val;
  return obj;
};

export function arrayToMapCore(obj) {
  if (obj) {
    if (
      Object.keys(obj).length === 0 &&
      Object.getPrototypeOf(obj) === Object.prototype
    ) {
      return {};
    }

    return obj.reduce(stringToKeyValuePairsCore, {});
  }

  return {};
}

// Compatibility wrapper for per-element debounced capitalisation.
// Adapts the debounce core to the higher-level capitaliser used by the rest of the app.
// Factory to create a compatibility wrapper for debounced capitalisation.
// Accepts the portal functions from utils to avoid circular imports.
import { DEFAULT_DEBOUNCE_DELAY } from './debounce';
import { getDebouncedCapitaliseText as _getDebouncedCapitaliseTextCore } from './debounce';

export function createGetDebouncedCapitaliseText({
  getTextFn,
  setTextFn,
  shouldCapitaliseFn,
  shouldCapitaliseForIFn,
  capitaliseTextProxyFn,
}) {
  return function getDebouncedCapitaliseText(
    element,
    delay = DEFAULT_DEBOUNCE_DELAY,
    capitaliserFn = capitaliseTextProxyFn
  ) {
    const wrappedCapitaliser = (el) => {
      capitaliserFn(
        el,
        shouldCapitaliseFn,
        shouldCapitaliseForIFn,
        getTextFn,
        setTextFn
      );
    };
    return _getDebouncedCapitaliseTextCore(element, delay, wrappedCapitaliser);
  };
}
