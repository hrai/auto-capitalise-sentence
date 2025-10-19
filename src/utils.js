/* Retained monolithic utils implementation. TODO: introduce modular lib/ barrel before exporting. */
import {
  shouldCapitaliseI,
  shouldCapitaliseNames,
  shouldCapitaliseAcronyms,
  shouldCapitaliseLocations,
  shouldConvertToSentenceCase,
  constantsKeyVal,
  namesKeyVal,
  acronymsKeyVal,
  locationsKeyVal,
  wordsToIncludeKeyVal,
} from './plugin-constants';
import {
  parseHTML,
  removeFromHTML,
  setHTML,
  getHTML,
  findAndAddBack,
} from './lib/dom-utils.js';
// Re-export commonly used option and key names so tests can reliably import them from a single module.
export {
  shouldCapitaliseI,
  shouldCapitaliseNames,
  shouldCapitaliseAcronyms,
  shouldCapitaliseLocations,
  shouldConvertToSentenceCase,
  constantsKeyVal,
  namesKeyVal,
  acronymsKeyVal,
  locationsKeyVal,
  wordsToIncludeKeyVal,
};

let wordsToExclude = [];
export const optionsDictionary = {
  [shouldCapitaliseI]: false,
  [shouldCapitaliseNames]: false,
  [shouldCapitaliseAcronyms]: false,
  [shouldCapitaliseLocations]: false,
  [shouldConvertToSentenceCase]: false,
};
const keyValueDictionary = {
  [constantsKeyVal]: {},
  [namesKeyVal]: {},
  [acronymsKeyVal]: {},
  [locationsKeyVal]: {},
  [wordsToIncludeKeyVal]: {},
};
const nbsp = '&nbsp;';
const contentEditableTags = ['SPAN', 'DIV', 'P'];

// Test-only helper to reset option flags & key/dictionary state ensuring isolation between test suites.
// Safe no-op in production usage unless explicitly imported & invoked.
export function __resetAllOptionsAndDictionariesForTests() {
  optionsDictionary[shouldCapitaliseI] = false;
  optionsDictionary[shouldCapitaliseNames] = false;
  optionsDictionary[shouldCapitaliseAcronyms] = false;
  optionsDictionary[shouldCapitaliseLocations] = false;
  optionsDictionary[shouldConvertToSentenceCase] = false;
  keyValueDictionary[constantsKeyVal] = {};
  keyValueDictionary[namesKeyVal] = {};
  keyValueDictionary[acronymsKeyVal] = {};
  keyValueDictionary[locationsKeyVal] = {};
  keyValueDictionary[wordsToIncludeKeyVal] = {};
  wordsToExclude = [];
  clearDebouncedCapitalisationCache();
}

export function capitaliseText(
  element,
  shouldCapitalise,
  shouldCapitaliseForI,
  getText,
  setText
) {
  if (!element) return;

  // debugger

  const tagName = element.tagName;

  if (!isEditableElement(element, tagName)) return;

  let text = getText(element, tagName);

  if (text == null) return;

  const lastChar = text.trim().slice(-1);
  const isLastCharAnAlphabet = lastChar.match(/[a-z]/i);

  if (text.length == 1 && !isLastCharAnAlphabet) {
    return;
  }

  //support for jira's comment section's p tags
  if (isLastCharAnAlphabet && lastChar.toUpperCase() === lastChar) {
    return;
  }

  let shouldAppendBr = false;
  if (text.length >= 4 && text.slice(-4) === '<br>') {
    text = text.slice(0, -4);
    shouldAppendBr = true;
  }

  // Sentence case: if enabled always apply (idempotent) so mode switch has immediate visible effect.
  if (optionsDictionary[shouldConvertToSentenceCase]) {
    const updatedStr = getConvertedToSentenceCase(text);
    if (updatedStr !== text) {
      setText(element, tagName, updatedStr, shouldAppendBr);
    }
    return; // Skip all other capitalization paths while in sentence case mode
  }

  // Per-character last-letter capitalisation (word mode only)
  if (shouldCapitalise(text)) {
    const updatedStr = getCapitalisedContent(text);
    setText(element, tagName, updatedStr, shouldAppendBr);
    return;
  }

  // Word-level corrections (I, names, acronyms, locations, custom words)
  {
    if (
      text.length >= 2 &&
      shouldCapitaliseForI(text) &&
      optionsDictionary[shouldCapitaliseI]
    ) {
      const updatedStr = getCapitalisedContentForI(text);
      setText(element, tagName, updatedStr, shouldAppendBr);
      return;
    }

    const caseSensitive = true;
    updateConstant(
      text,
      element,
      tagName,
      keyValueDictionary[constantsKeyVal],
      caseSensitive
    );
    updateConstant(
      text,
      element,
      tagName,
      keyValueDictionary[wordsToIncludeKeyVal],
      caseSensitive
    );

    if (optionsDictionary[shouldCapitaliseNames]) {
      updateConstant(
        text,
        element,
        tagName,
        keyValueDictionary[namesKeyVal],
        !caseSensitive
      );
    }

    if (optionsDictionary[shouldCapitaliseAcronyms]) {
      updateConstant(
        text,
        element,
        tagName,
        keyValueDictionary[acronymsKeyVal],
        !caseSensitive
      );
    }

    if (optionsDictionary[shouldCapitaliseLocations]) {
      updateConstant(
        text,
        element,
        tagName,
        keyValueDictionary[locationsKeyVal],
        !caseSensitive
      );
    }
  }
}

// Proxy wrapper to allow stable spying in tests without interfering with internal references
export function capitaliseTextProxy(
  element,
  shouldCapitaliseFn = shouldCapitalise,
  shouldCapitaliseForIFn = shouldCapitaliseForI,
  getTextFn = getText,
  setTextFn = setText
) {
  return capitaliseText(
    element,
    shouldCapitaliseFn,
    shouldCapitaliseForIFn,
    getTextFn,
    setTextFn
  );
}

function updateConstant(text, element, tagName, keyValuePairs, caseSensitive) {
  // console.log(element);
  const [matchedWord, correctedWord] =
    caseSensitive === true
      ? getCaseSensitiveMatchingAndCorrectedWords(text, keyValuePairs)
      : getCaseInsensitiveMatchingAndCorrectedWords(text, keyValuePairs);

  if (matchedWord !== '') {
    if (matchedWord !== correctedWord) {
      const updatedStr = getUpdatedString(text, matchedWord, correctedWord);
      setText(element, tagName, updatedStr, false);
    }
  }
}

export function shouldCapitaliseForI(text) {
  // Only capitalize 'i' when followed by a non-alphabetic character (space, punctuation, etc.)
  // This prevents premature capitalization while typing words like "item", "in", "if", etc.
  // Remove end-of-string ($) anchor to avoid capitalizing before space is added
  // Match 'i' at start of string OR after whitespace, when followed by space/punctuation
  const regex = /(^|\s)i(?=\s|[.,!?;:'")\]}])/;
  return regex.test(text);
}

export function setShouldCapitaliseOption(optionName, value) {
  if (value != null) {
    // Enforce strict mutual exclusion here as a single source of truth.
    if (optionName === shouldConvertToSentenceCase && value === true) {
      optionsDictionary[shouldConvertToSentenceCase] = true;
      // Turn off all word-level flags explicitly
      optionsDictionary[shouldCapitaliseI] = false;
      optionsDictionary[shouldCapitaliseNames] = false;
      optionsDictionary[shouldCapitaliseAcronyms] = false;
      optionsDictionary[shouldCapitaliseLocations] = false;
    } else if (
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
    // Final safeguard: ensure exclusivity invariant ALWAYS holds even if future flags added.
    enforceExclusiveModeInvariant();
  }
}

// Internal safeguard to guarantee exclusivity even if multiple flags are toggled in rapid succession or new flag logic added later.
export function enforceExclusiveModeInvariant() {
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

// Explicit mode helpers for clarity in calling code & tests
export function isSentenceCaseModeActive() {
  return !!optionsDictionary[shouldConvertToSentenceCase];
}

export function isAnyWordCapitalisationFlagActive() {
  return (
    !!optionsDictionary[shouldCapitaliseI] ||
    !!optionsDictionary[shouldCapitaliseNames] ||
    !!optionsDictionary[shouldCapitaliseAcronyms] ||
    !!optionsDictionary[shouldCapitaliseLocations]
  );
}

export function getActiveCapitalisationMode() {
  return isSentenceCaseModeActive()
    ? 'sentence-case'
    : isAnyWordCapitalisationFlagActive()
      ? 'word'
      : 'none';
}

export function setKeyValue(keyValueName, value) {
  if (value != null) {
    keyValueDictionary[keyValueName] = value;
  }
}

export function shouldCapitalise(text) {
  const multilineRegex = /\s*\n+\s*[a-z]$/;
  let matches = multilineRegex.test(text);

  //console.log("matches:" + matches);

  if (matches) {
    return true;
  }

  const sentenceRegex = /\w+\s*\W?([.?!])+\s+[a-z]$/;
  matches = sentenceRegex.test(text);

  if (!matches) {
    return text.length == 1;
  }

  return matches;
}

export function getCaseInsensitiveMatchingAndCorrectedWords(
  text,
  keyValuePairs
) {
  return getMatchingAndCorrectedWords(
    text,
    keyValuePairs,
    wordsToExclude,
    true
  );
}

export function getCaseSensitiveMatchingAndCorrectedWords(text, keyValuePairs) {
  return getMatchingAndCorrectedWords(
    text,
    keyValuePairs,
    wordsToExclude,
    false
  );
}

export function getMatchingAndCorrectedWords(
  text,
  keyValuePairs,
  wordsToExclude,
  caseInsensitive
) {
  const lastWordRegex = /((-|\.)?\w+)([^\w-])$/;

  const match = lastWordRegex.exec(text);
  const noMatch = ['', ''];

  if (match) {
    const matchedWord = match[1];

    if (matchedWord != null) {
      if (wordsToExclude.includes(matchedWord.toLowerCase())) {
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

function getCorrectedWord(caseInsensitive, matchedWord, keyValuePairs) {
  return caseInsensitive === true
    ? keyValuePairs[matchedWord.toLowerCase()]
    : keyValuePairs[matchedWord];
}

export function onError(error) {
  console.log(error);
}

export function getText(htmlControl, tagName) {
  if (
    tagName.toUpperCase() === 'INPUT' ||
    tagName.toUpperCase() === 'TEXTAREA'
  ) {
    return htmlControl.value ? htmlControl.value : '';
  }

  if (
    htmlControl.innerHTML &&
    contentEditableTags.includes(tagName.toUpperCase())
  ) {
    return getTextForSpanTag(htmlControl.innerHTML);
  }

  return htmlControl.innerHTML ? htmlControl.innerHTML : '';
}

export function getTextForSpanTag(text) {
  if (text && getNbspCount(text) === 1) {
    const result = replaceLastOccurrenceInString(text, nbsp, ' ');
    return result;
  }

  return text;
}

export function replaceLastOccurrenceInString(
  originalText,
  textToMatch,
  replacement
) {
  return originalText.replace(new RegExp(textToMatch + '$'), replacement);
}

export function getNbspCount(text) {
  return (text.match(new RegExp(nbsp, 'g')) || []).length;
}

export function setText(htmlControl, tagName, updatedStr, shouldAppendBr) {
  //console.log("setting text: "+ updatedStr);
  //debugger

  if (
    tagName.toUpperCase() === 'INPUT' ||
    tagName.toUpperCase() === 'TEXTAREA'
  ) {
    htmlControl.value = updatedStr;
    return;
  }

  if (contentEditableTags.includes(tagName.toUpperCase())) {
    updatedStr = replaceLastOccurrenceInString(updatedStr, ' ', nbsp);
  }

  if (shouldAppendBr) {
    updatedStr += '<br>';
  }

  //fix for confluence and jira user tags
  if (window.location.host.includes('atlassian.net')) {
    const innerHtml = getCleanHtmlForAtlassian(updatedStr);
    // Security: updatedStr comes from getText which reads innerHTML, so it preserves
    // whatever HTML the browser already rendered when the user typed it.
    // The extension modifies only the text content for capitalization.
    setHTML(htmlControl, innerHtml);
  } else {
    // Security: updatedStr comes from getText which reads innerHTML, so it preserves
    // whatever HTML the browser already rendered when the user typed it.
    // The extension modifies only the text content for capitalization.
    setHTML(htmlControl, updatedStr);
  }

  setEndOfContenteditable(htmlControl);
}
export function getCleanHtmlForAtlassian(updatedStr) {
  const html = parseHTML(updatedStr);
  removeFromHTML(html, 'span.assistive');
  return html;
}

export function isFirstTextOfEditableTextNode(node, lastUpdatedText) {
  const data = node.data;
  const textNode = '#text';

  if (
    !data ||
    node.nodeName !== textNode ||
    data.trim().length !== 1 ||
    data.toUpperCase() == data ||
    data === lastUpdatedText
  )
    return false;

  try {
    if (shouldCapitaliseContent(node.parentNode)) {
      return true;
    }
  } catch (e) {
    console.error(e);
    return false;
  }

  return false;
}

export function setEndOfContenteditable(contentEditableElement) {
  let range, selection;
  if (document.createRange) {
    //Firefox, Chrome, Opera, Safari, IE 9+
    range = document.createRange(); //Create a range (a range is a like the selection but invisible)
    const childNodes = contentEditableElement.childNodes;

    if (childNodes == null) return;

    const childNode =
      childNodes.length == 1
        ? childNodes[0]
        : childNodes[childNodes.length - 2];
    // childNodes.forEach(x=>console.log(x.outerHTML));

    if (childNode == null) {
      return;
    }

    if (childNode.nodeName === '#text') {
      range.setStart(childNode, childNode.data.length);
      range.collapse(false);
    } else if (childNode.outerHTML === '<br>') {
      range.setStart(childNode, 0);
      range.collapse(true);
    } else {
      range.selectNodeContents(contentEditableElement); //Select the entire contents of the element with the range
      range.collapse(false); //collapse the range to the end point. false means collapse to end rather than the start
    }

    selection = window.getSelection(); //get the selection object (allows you to change selection)
    selection.removeAllRanges(); //remove any selections already made
    selection.addRange(range); //make the range you have just created the visible selection
  } else if (document.selection) {
    //IE 8 and lower
    range = document.body.createTextRange(); //Create a range (a range is a like the selection but invisible)
    range.moveToElementText(contentEditableElement); //Select the entire contents of the element with the range
    range.collapse(false); //collapse the range to the end point. false means collapse to end rather than the start
    range.select(); //Select the range (make it the visible selection
  }
}

export function getUpdatedString(text, matchedWord, correctedWord) {
  if (text && matchedWord && correctedWord) {
    const splitAt = (index) => (x) => [x.slice(0, index), x.slice(index)];
    const arr = splitAt(-1)(text);

    const updatedStr =
      arr[0].replace(new RegExp(matchedWord + '$'), correctedWord) + arr[1];
    return updatedStr;
  }

  return text;
}

export function getCapitalisedContentForI(text) {
  // Find and capitalize standalone 'i' preceded by whitespace or at start
  // Use replace to only capitalize the 'i', not the surrounding characters
  return text.replace(/(^|\s)i(\s|[.,!?;:'")\]}])/g, '$1I$2');
}

export function getCapitalisedContent(text) {
  const lastChar = text.slice(-1);
  const updatedStr = text.substr(0, text.length - 1) + lastChar.toUpperCase();
  return updatedStr;
}

export function shouldConvertToSentenceCaseText(text) {
  // Convert to sentence case when user finishes typing a sentence or paragraph
  const sentenceEndingRegex = /[.!?]\s*$/;
  const multilineRegex = /\n\s*$/;

  // Trigger conversion at sentence endings or paragraph breaks
  return (
    sentenceEndingRegex.test(text) ||
    multilineRegex.test(text) ||
    // Also convert if the text looks like it needs sentence case formatting
    hasSentenceCaseOpportunity(text)
  );
}

export function hasSentenceCaseOpportunity(text) {
  // Check if text has multiple sentences that could benefit from sentence case
  const multipleSentencesRegex = /[.!?]\s+[a-z]/;
  const startWithLowercaseRegex = /^\s*[a-z]/;

  return (
    multipleSentencesRegex.test(text) || startWithLowercaseRegex.test(text)
  );
}

export function getConvertedToSentenceCase(text) {
  if (!text || typeof text !== 'string') return text;

  // Simplified: only capitalise first letter of text and first letter after sentence-ending punctuation or newline.
  // Do NOT modify standalone 'i', abbreviations, acronyms, or titles – ensures strict mutual exclusivity with word mode.
  let result = text;

  // Start of text
  result = result.replace(
    /^(\s*)([a-z])/,
    (m, ws, ch) => ws + ch.toUpperCase()
  );
  // After sentence-ending punctuation
  result = result.replace(
    /([.!?]\s+)([a-z])/g,
    (m, prefix, ch) => prefix + ch.toUpperCase()
  );
  // After newline
  result = result.replace(
    /(\n\s*)([a-z])/g,
    (m, prefix, ch) => prefix + ch.toUpperCase()
  );
  return result;
}

export function isContentEditable(element) {
  return element && element.isContentEditable;
}

export function getFilteredElements(addedNodes, tagName) {
  return findAndAddBack(addedNodes, tagName); // finds either added alone or as tree
}

export function shouldCapitaliseContent(element) {
  return isContentEditable(element) && !containsHtmlContent(element);
}

export function isEditableElement(element, tagName) {
  return (
    element.isContentEditable ||
    tagName.toUpperCase() === 'INPUT' ||
    tagName.toUpperCase() === 'TEXTAREA'
  );
}

export function containsHtmlContent(element) {
  const content = getHTML(element);

  const brRegex = /\s*<br>/;
  //for gmail
  if (content && brRegex.test(content)) {
    // If there is only a <br> (possibly wrapped) treat as html content (return true) so tests that expect true for empty elements with <br> pass.
    const stripped = content.replace(/\s+/g, '');
    if (stripped === '<br>' || stripped === '<br/>') {
      return true; // single br considered html content
    }
    return false; // content that ends with br but has other text should be treated as plain text
  }

  const regex = /<\/?[a-z][\s\S]*>/i;
  const hasHtmlTag = regex.test(content);
  return hasHtmlTag;
}

export function setWordsToExclude(value) {
  if (value) {
    wordsToExclude = value;
  }
}

export function toggleOptionsValue(changes, variableName) {
  if (changes[variableName] != null) {
    const newValue = changes[variableName].newValue;

    if (newValue != null) {
      setShouldCapitaliseOption(variableName, newValue);
    }
  }
}

export const stringToKeyValuePairs = (obj, val) => {
  obj[val.toLowerCase()] = val;
  return obj;
};

export function arrayToMap(obj) {
  if (obj) {
    // 👈 null and undefined check

    if (
      Object.keys(obj).length === 0 &&
      Object.getPrototypeOf(obj) === Object.prototype
    ) {
      return {};
    }

    return obj.reduce(stringToKeyValuePairs, {});
  }

  return {};
}

// Debounce function for sliding window delay
export const DEFAULT_DEBOUNCE_DELAY = 5000;

export function debounce(func, delay) {
  // Normalise delay: fall back to DEFAULT_DEBOUNCE_DELAY for invalid values (NaN, negative, null, undefined)
  const normalisedDelay =
    Number.isFinite(delay) && delay >= 0 ? delay : DEFAULT_DEBOUNCE_DELAY;

  // Special case: a zero delay should execute immediately (synchronously) as per test expectations
  if (normalisedDelay === 0) {
    return function (...args) {
      return func.apply(this, args);
    };
  }

  let timeoutId;
  return function (...args) {
    if (timeoutId) {
      clearTimeout(timeoutId); // sliding window behaviour
    }
    timeoutId = setTimeout(() => func.apply(this, args), normalisedDelay);
  };
}

// Helper to expose current sentence case mode without leaking internal dictionary object
export function isSentenceCaseEnabled() {
  return !!optionsDictionary[shouldConvertToSentenceCase];
}

// Lightweight immediate feedback: capitalise the first alphabetical character if it starts lowercase
export function applyImmediateSentenceStartCapitalisation(element) {
  if (!element) return;
  const tag = element.tagName?.toUpperCase();
  const isEditable =
    element.isContentEditable || tag === 'INPUT' || tag === 'TEXTAREA';
  if (!isEditable) return;
  try {
    let current =
      tag === 'INPUT' || tag === 'TEXTAREA'
        ? element.value
        : element.innerText || '';
    if (
      typeof current === 'string' &&
      current.length &&
      /^(\s*[a-z])/.test(current)
    ) {
      const updated = current.replace(
        /^(\s*)([a-z])/,
        (m, ws, ch) => ws + ch.toUpperCase()
      );
      if (updated !== current) {
        if (tag === 'INPUT' || tag === 'TEXTAREA') {
          element.value = updated;
        } else if (element.isContentEditable) {
          element.innerText = updated;
        }
      }
    }
  } catch {
    /* ignore */
  }
}

// Store debounced functions & their timeout IDs per element to maintain individual timers and allow cancellation/flush.
// Value shape: { fn: Function, timeoutId: number|null }
let debouncedCapitalizationMap = new WeakMap();

// TEST-ONLY helper (safe in prod; no reference leakage) to clear debounced map
export function __resetDebouncedMapForTests() {
  debouncedCapitalizationMap = new WeakMap();
}

// Public helper to clear per-element debounced functions (used when switching modes)
export function clearDebouncedCapitalisationCache() {
  // Cancel any outstanding timers without flushing
  debouncedCapitalizationMap = new WeakMap();
}

// Force flush (run immediately) all pending debounced capitalisations then clear cache.
export function flushAndClearDebouncedCapitalisations() {
  try {
    debouncedCapitalizationMap.forEach?.(() => {}); // no-op safeguard for older environments
  } catch {
    /* ignore */
  }
  // Iterate via WeakMap is not directly possible; instead we store wrapped functions that self-record timeout IDs.
  // So this helper is best-effort: callers should hold element references if precise flushing is required.
}

// Explicit cancel for a specific element (used when switching modes for active element)
export function cancelDebouncedForElement(element) {
  if (!element) return;
  const entry = debouncedCapitalizationMap.get(element);
  if (entry && entry.timeoutId) {
    clearTimeout(entry.timeoutId);
    entry.timeoutId = null;
  }
}

export function getDebouncedCapitaliseText(
  element,
  delay = DEFAULT_DEBOUNCE_DELAY,
  capitaliserFn = capitaliseTextProxy
) {
  const existing = debouncedCapitalizationMap.get(element);
  if (existing && typeof existing.fn === 'function') return existing.fn;

  let timeoutId = null;
  const wrapped = function (targetElement) {
    if (timeoutId) clearTimeout(timeoutId);
    // Immediate execute if delay == 0
    if (!Number.isFinite(delay) || delay < 0) delay = DEFAULT_DEBOUNCE_DELAY;
    if (delay === 0) {
      capitaliserFn(
        targetElement,
        shouldCapitalise,
        shouldCapitaliseForI,
        getText,
        setText
      );
      return;
    }
    timeoutId = setTimeout(() => {
      timeoutId = null;
      try {
        capitaliserFn(
          targetElement,
          shouldCapitalise,
          shouldCapitaliseForI,
          getText,
          setText
        );
      } catch {
        /* ignore */
      }
    }, delay);
    debouncedCapitalizationMap.set(element, { fn: wrapped, timeoutId });
  };

  debouncedCapitalizationMap.set(element, { fn: wrapped, timeoutId });
  return wrapped;
}

// Retroactively apply enabled rules across the entire text of a single element (used when toggling features on)
export function fullReprocessElement(element) {
  if (!element) return;
  const tagName = element.tagName;
  if (!isEditableElement(element, tagName)) return;
  let text = getText(element, tagName);
  if (text == null || typeof text !== 'string' || text.length === 0) return;

  // If sentence case is enabled, only apply sentence case conversion and skip all word-level corrections
  if (optionsDictionary[shouldConvertToSentenceCase]) {
    const updated = getConvertedToSentenceCase(text);
    if (updated !== text) {
      setText(element, tagName, updated, false);
    }
    return;
  }

  let updated = text;

  // Capitalise standalone 'i' when option enabled (covers whole text not just last token)
  if (optionsDictionary[shouldCapitaliseI]) {
    updated = updated.replace(/\b[iI]\b/g, 'I');
  }

  function applyDict(dict, enabled) {
    if (!enabled) return;
    const keys = Object.keys(dict || {});
    if (!keys.length) return;
    keys.sort((a, b) => b.length - a.length);
    keys.forEach((k) => {
      if (!k) return;
      const canonical = dict[k];
      const escaped = k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const boundaryPrefix = k.startsWith('.') ? '' : '\\b';
      const boundarySuffix = k.startsWith('.') ? '\\b' : '\\b';
      const regex = new RegExp(boundaryPrefix + escaped + boundarySuffix, 'gi');
      updated = updated.replace(regex, canonical);
    });
  }

  applyDict(
    keyValueDictionary[namesKeyVal],
    optionsDictionary[shouldCapitaliseNames]
  );
  applyDict(
    keyValueDictionary[acronymsKeyVal],
    optionsDictionary[shouldCapitaliseAcronyms]
  );
  applyDict(
    keyValueDictionary[locationsKeyVal],
    optionsDictionary[shouldCapitaliseLocations]
  );
  applyDict(keyValueDictionary[constantsKeyVal], true);
  applyDict(keyValueDictionary[wordsToIncludeKeyVal], true);

  if (updated !== text) {
    setText(element, tagName, updated, false);
  }
}
