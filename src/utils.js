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

  // Handle sentence case conversion (exclusive with other capitalization modes)
  if (optionsDictionary[shouldConvertToSentenceCase]) {
    if (shouldConvertToSentenceCaseText(text)) {
      const updatedStr = getConvertedToSentenceCase(text);
      setText(element, tagName, updatedStr, shouldAppendBr);
      return;
    }
  } else {
    // Only apply other capitalization modes if sentence case is disabled
    if (shouldCapitalise(text)) {
      const updatedStr = getCapitalisedContent(text);

      setText(element, tagName, updatedStr, shouldAppendBr);
      return;
    }
  }

  // Only apply individual word capitalization if sentence case is disabled
  if (!optionsDictionary[shouldConvertToSentenceCase]) {
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
  const regex = /\s+i(\s+|')$/;
  const matches = regex.test(text);

  return matches;
}

export function setShouldCapitaliseOption(optionName, value) {
  if (value != null) {
    optionsDictionary[optionName] = value;
  }
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
    $(htmlControl).html(innerHtml);
  } else {
    $(htmlControl).html(updatedStr);
  }

  setEndOfContenteditable(htmlControl);
}
export function getCleanHtmlForAtlassian(updatedStr) {
  const html = $.parseHTML(updatedStr);
  // console.log(innerHtml);

  const assistiveSpan = $(html).find('span.assistive');
  assistiveSpan.remove();
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
  const lastTwoChars = text.slice(-2);
  const updatedStr =
    text.substr(0, text.length - 2) + lastTwoChars.toUpperCase();
  return updatedStr;
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

  // Only capitalize first letter of sentences and common words, preserve all other casing
  let result = text;

  // Capitalize first letter of text (case-insensitive match, preserve rest)
  result = result.replace(/^\s*([a-z])/i, (match, letter) =>
    match.replace(letter, letter.toUpperCase())
  );

  // Capitalize first letter after sentence endings (preserve other casing)
  result = result.replace(
    /([.!?])\s+([a-z])/gi,
    (match, punctuation, letter) =>
      punctuation + match.slice(1).replace(letter, letter.toUpperCase())
  );

  // Capitalize first letter after line breaks (preserve other casing)
  result = result.replace(
    /(\n)\s*([a-z])/gi,
    (match, linebreak, letter) =>
      linebreak + match.slice(1).replace(letter, letter.toUpperCase())
  );

  // Capitalize "I" when it stands alone
  result = result.replace(/ i /g, ' I ');
  result = result.replace(/^i /g, 'I ');
  result = result.replace(/ i$/g, ' I');
  // Capitalize common abbreviations themselves (Mr., Dr., etc.) followed by a space
  // We only change the abbreviation token and not the following word here.
  result = result.replace(
    /\b(mr|mrs|ms|dr|prof|st)\.(?=\s)/gi,
    (match) => match.charAt(0).toUpperCase() + match.slice(1).toLowerCase()
  );
  // Capitalize the first character of the following word when it is a name/title continuation
  result = result.replace(
    /\b(Mr|Mrs|Ms|Dr|Prof|St)\.\s+([a-z])(\w*)/g,
    (match, title, firstLetter, rest) =>
      `${title}. ${firstLetter.toUpperCase()}${rest}`
  );
  // Capitalize the first letter after an abbreviation sentence boundary IF it starts a new sentence (handled earlier).

  return result;
}

export function isContentEditable(element) {
  return element && element.isContentEditable;
}

export function getFilteredElements(addedNodes, tagName) {
  return $(addedNodes).find(tagName).addBack(tagName); // finds either added alone or as tree
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
  const content = $(element).html();

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
  let timeoutId;

  return function (...args) {
    // Clear the previous timeout if it exists (sliding window)
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    // Set a new timeout
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

// Store debounced functions per element to maintain individual timers
let debouncedCapitalizationMap = new WeakMap();

// TEST-ONLY helper (safe in prod; no reference leakage) to clear debounced map
export function __resetDebouncedMapForTests() {
  debouncedCapitalizationMap = new WeakMap();
}

export function getDebouncedCapitaliseText(
  element,
  delay = DEFAULT_DEBOUNCE_DELAY,
  capitaliserFn = capitaliseTextProxy
) {
  // Check if we already have a debounced function for this element
  if (debouncedCapitalizationMap.has(element)) {
    return debouncedCapitalizationMap.get(element);
  }

  // Create a new debounced function for this element
  const debouncedFn = debounce((targetElement) => {
    capitaliserFn(
      targetElement,
      shouldCapitalise,
      shouldCapitaliseForI,
      getText,
      setText
    );
  }, delay);

  // Store it for future use
  debouncedCapitalizationMap.set(element, debouncedFn);

  return debouncedFn;
}
