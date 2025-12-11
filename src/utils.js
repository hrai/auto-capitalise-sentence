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
import {
  setWordModeOption,
  enforceExclusiveModeInvariant as enforceExclusiveModeInvariantCore,
  getMatchingAndCorrectedWordsCore,
  getCaseInsensitiveMatchingAndCorrectedWordsCore,
  getCaseSensitiveMatchingAndCorrectedWordsCore,
  getUpdatedStringCore,
  getCapitalisedContentForICore,
  getCapitalisedContentCore,
  stringToKeyValuePairsCore,
  arrayToMapCore,
} from './word-mode';
import { createGetDebouncedCapitaliseText } from './word-mode';
import { enableSentenceMode, disableSentenceMode } from './sentence-mode';
import {
  DEFAULT_DEBOUNCE_DELAY as _DEFAULT_DEBOUNCE_DELAY,
  debounce as _debounce,
  __resetDebouncedMapForTests as _resetDebouncedMapForTests,
  clearDebouncedCapitalisationCache as _clearDebouncedCapitalisationCache,
  flushAndClearDebouncedCapitalisations as _flushAndClearDebouncedCapitalisations,
  cancelDebouncedForElement as _cancelDebouncedForElement,
} from './debounce';
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

// Store previous word mode settings before switching to sentence case
let savedWordModeSettings = {
  [shouldCapitaliseI]: false,
  [shouldCapitaliseNames]: false,
  [shouldCapitaliseAcronyms]: false,
  [shouldCapitaliseLocations]: false,
};

// Persist/restore helpers for cached snapshot used when toggling sentence/word modes
export function setCachedWordFlagsSnapshot(snapshot) {
  if (!snapshot || typeof snapshot !== 'object') return;
  // copy known keys to in-memory snapshot
  if (snapshot[shouldCapitaliseI] != null)
    savedWordModeSettings[shouldCapitaliseI] = snapshot[shouldCapitaliseI];
  if (snapshot[shouldCapitaliseNames] != null)
    savedWordModeSettings[shouldCapitaliseNames] =
      snapshot[shouldCapitaliseNames];
  if (snapshot[shouldCapitaliseAcronyms] != null)
    savedWordModeSettings[shouldCapitaliseAcronyms] =
      snapshot[shouldCapitaliseAcronyms];
  if (snapshot[shouldCapitaliseLocations] != null)
    savedWordModeSettings[shouldCapitaliseLocations] =
      snapshot[shouldCapitaliseLocations];
}

export function getCachedWordFlagsSnapshot() {
  return Object.assign({}, savedWordModeSettings);
}

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
  // Reset saved state
  savedWordModeSettings[shouldCapitaliseI] = false;
  savedWordModeSettings[shouldCapitaliseNames] = false;
  savedWordModeSettings[shouldCapitaliseAcronyms] = false;
  savedWordModeSettings[shouldCapitaliseLocations] = false;
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

  // Lightweight pre-check: quickly determine whether deeper capitalization
  // processing is worth running. This avoids expensive dictionary lookups and
  // DOM updates when the user's recent input makes a capitalization unlikely.
  // The heuristic is conservative (it errs on the side of running the full
  // processing when in doubt) to preserve existing behavior while reducing
  // needless work in common non-capitalisation cases.
  if (!quickCapitalisationCheck(text)) return;

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

// Cheap heuristic to decide whether deeper capitalization logic should run.
// Returns true when it's plausible that a capitalization or word-correction
// might be needed given the current text tail and enabled options.
export function quickCapitalisationCheck(text) {
  // Treat null/undefined as no-work; allow empty string through so sentence-mode
  // enablement can still force processing (useful when toggling modes).
  if (text == null || typeof text !== 'string') return false;

  // If sentence-case mode is enabled, always allow processing so the UI can
  // reflect the mode immediately (even for empty strings).
  if (optionsDictionary[shouldConvertToSentenceCase]) return true;

  // Work only on a short tail to keep this fast. Normalize common HTML
  // trailing markers like '<br>' so tests and real inputs that use innerHTML
  // behave like plain text for this heuristic.
  let normalized = text;
  if (normalized.length >= 4 && normalized.slice(-4) === '<br>') {
    normalized = normalized.slice(0, -4);
  }
  if (normalized.length >= 5 && normalized.slice(-5) === '<br/>') {
    normalized = normalized.slice(0, -5);
  }

  const tail = normalized.slice(-40);

  // If last character is alphabetical, whitespace (user just typed a space),
  // or punctuation commonly used to terminate sentences, further processing
  // may be useful. Including whitespace ensures we handle cases where the
  // user has just finished typing a word and the logic should inspect the
  // preceding token (many tests rely on this behaviour).
  const lastChar = tail.slice(-1);
  if (/[a-zA-Z\s.!?]/.test(lastChar)) return true;

  // Cheap check for standalone 'i' at the end (common small-case correction).
  if (optionsDictionary[shouldCapitaliseI] && /\b[iI]$/.test(tail)) return true;

  // If enabled, names/acronyms/locations corrections are plausible when the
  // tail contains any lower-case letter (likely a typed word).
  if (
    (optionsDictionary[shouldCapitaliseNames] ||
      optionsDictionary[shouldCapitaliseAcronyms] ||
      optionsDictionary[shouldCapitaliseLocations]) &&
    /[a-z]/.test(tail)
  )
    return true;

  // Conservative fallback: if none of the above matched, assume no need to
  // capitalise. This keeps behaviour unchanged for most non-text inputs.
  return false;
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
  // Gmail-specific: temporarily replace &nbsp; with regular space for matching
  let processedText = text;
  if (isGmail() && text.includes(nbsp)) {
    processedText = text.replace(new RegExp(nbsp, 'g'), ' ');
  }

  // Only capitalize 'i' when followed by a non-alphabetic character (space, punctuation, etc.)
  // This prevents premature capitalization while typing words like "item", "in", "if", etc.
  // Remove end-of-string ($) anchor to avoid capitalizing before space is added
  // Match 'i' at start of string OR after whitespace, when followed by space/punctuation
  const regex = /(^|\s)i(?=\s|[.,!?;:'")\]}])/;
  return regex.test(processedText);
}

export function setShouldCapitaliseOption(optionName, value) {
  if (value == null) return;

  // Branch: sentence-mode enable/disable handled by sentence-mode module
  if (optionName === shouldConvertToSentenceCase && value === true) {
    enableSentenceMode(optionsDictionary, savedWordModeSettings);
  } else if (
    optionName === shouldConvertToSentenceCase &&
    value === false &&
    optionsDictionary[shouldConvertToSentenceCase] === true
  ) {
    disableSentenceMode(optionsDictionary, savedWordModeSettings);
  } else {
    // Word-mode handling (this will also clear sentence-case when a word flag is enabled)
    setWordModeOption(optionsDictionary, optionName, value);
  }

  // Final safeguard: ensure exclusivity invariant ALWAYS holds even if multiple flags are toggled in rapid succession or new flag logic added later.
  enforceExclusiveModeInvariantCore(optionsDictionary);
}

// Internal safeguard to guarantee exclusivity even if multiple flags are toggled in rapid succession or new flag logic added later.
export function enforceExclusiveModeInvariant() {
  // Delegate to word-mode module implementation which accepts the options dictionary
  enforceExclusiveModeInvariantCore(optionsDictionary);
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
  return getCaseInsensitiveMatchingAndCorrectedWordsCore(
    text,
    keyValuePairs,
    wordsToExclude
  );
}

export function getCaseSensitiveMatchingAndCorrectedWords(text, keyValuePairs) {
  return getCaseSensitiveMatchingAndCorrectedWordsCore(
    text,
    keyValuePairs,
    wordsToExclude
  );
}

export function getMatchingAndCorrectedWords(
  text,
  keyValuePairs,
  wordsToExclude,
  caseInsensitive
) {
  return getMatchingAndCorrectedWordsCore(
    text,
    keyValuePairs,
    wordsToExclude,
    caseInsensitive
  );
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

// Returns true if we're on Gmail
export function isGmail() {
  return (
    typeof window !== 'undefined' &&
    window.location &&
    window.location.host === 'mail.google.com'
  );
}

// Returns true if host is exactly 'atlassian.net' or is a direct subdomain like 'foo.atlassian.net'
function isAtlassianCloudHost(host) {
  // Only accept hosts that are exactly 'atlassian.net' or end with '.atlassian.net', but are not like 'foo.bar.atlassian.net.evil.com'
  return (
    host === 'atlassian.net' || /^[a-zA-Z0-9-]+\.atlassian\.net$/i.test(host)
  );
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

  // Optimization for contentEditable: when the change is a simple last-character
  // replacement (common in word-mode capitalization), update the deepest text node
  // directly and adjust the selection synchronously. This avoids resetting innerHTML
  // and a requestAnimationFrame-based cursor reset which can race with fast typing
  // and cause characters to appear out-of-order.
  try {
    if (
      contentEditableTags.includes(tagName.toUpperCase()) &&
      htmlControl &&
      htmlControl.isContentEditable &&
      typeof updatedStr === 'string' &&
      !containsHtmlContent(htmlControl)
    ) {
      const currentText = getText(htmlControl, tagName);
      if (
        typeof currentText === 'string' &&
        updatedStr.length === currentText.length &&
        updatedStr.slice(0, -1) === currentText.slice(0, -1)
      ) {
        // Simple last-character change: apply to deepest text node
        let lastNode = htmlControl;
        while (lastNode && lastNode.lastChild) {
          lastNode = lastNode.lastChild;
        }

        if (lastNode && lastNode.nodeType === Node.TEXT_NODE) {
          // Replace node data with updated text (use plain text to avoid injecting HTML)
          lastNode.data = updatedStr.replace(new RegExp(nbsp, 'g'), ' ');

          // Position caret at end of last node synchronously
          try {
            const range = document.createRange();
            range.setStart(lastNode, lastNode.length);
            range.collapse(true);
            const selection = window.getSelection();
            selection.removeAllRanges();
            selection.addRange(range);
          } catch {
            // Fall back to the existing rAF-based approach if selection APIs fail
          }

          return;
        }
      }
    }
  } catch {
    // If any error occurs in the fast-path, fall back to the original safe behaviour below
  }

  //fix for confluence and jira user tags
  if (isAtlassianCloudHost(window.location.host)) {
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

  // Use requestAnimationFrame to ensure DOM has updated before setting cursor position
  // This fixes cursor positioning issues in editors like Slack/Quill that may update asynchronously
  requestAnimationFrame(() => {
    setEndOfContenteditable(htmlControl);
  });
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

    // Find the deepest last text node to position cursor correctly
    let lastNode = contentEditableElement;
    while (lastNode.lastChild) {
      lastNode = lastNode.lastChild;
    }

    // If we found a text node, position at the end of it
    if (lastNode.nodeType === Node.TEXT_NODE) {
      range.setStart(lastNode, lastNode.length);
      range.collapse(true);
    } else {
      // Fallback: position at the end of the contenteditable element
      range.selectNodeContents(contentEditableElement);
      range.collapse(false);
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
  return getUpdatedStringCore(text, matchedWord, correctedWord);
}

export function getCapitalisedContentForI(text) {
  return getCapitalisedContentForICore(text);
}

export function getCapitalisedContent(text) {
  return getCapitalisedContentCore(text);
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
  return stringToKeyValuePairsCore(obj, val);
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

    return arrayToMapCore(obj);
  }

  return {};
}

// Re-export debounce helpers from dedicated module
export const DEFAULT_DEBOUNCE_DELAY = _DEFAULT_DEBOUNCE_DELAY;
export const debounce = _debounce;

// Helper to expose current sentence case mode without leaking internal dictionary object
export function isSentenceCaseEnabled() {
  return !!optionsDictionary[shouldConvertToSentenceCase];
}

// TEST-ONLY helper (safe in prod; no reference leakage) to clear debounced map
export const __resetDebouncedMapForTests = _resetDebouncedMapForTests;
export const clearDebouncedCapitalisationCache =
  _clearDebouncedCapitalisationCache;
export const flushAndClearDebouncedCapitalisations =
  _flushAndClearDebouncedCapitalisations;
export const cancelDebouncedForElement = _cancelDebouncedForElement;

// Compatibility wrapper: adapt existing capitaliser signature to the debounce core's expectation
// Create the compat wrapper via factory to avoid circular imports
export const getDebouncedCapitaliseText = createGetDebouncedCapitaliseText({
  getTextFn: getText,
  setTextFn: setText,
  shouldCapitaliseFn: shouldCapitalise,
  shouldCapitaliseForIFn: shouldCapitaliseForI,
  capitaliseTextProxyFn: capitaliseTextProxy,
});

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
