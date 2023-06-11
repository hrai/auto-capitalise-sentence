import {
  shouldCapitaliseI,
  shouldCapitaliseNames,
  shouldCapitaliseAcronyms,
  shouldCapitaliseLocations,
  constantsKeyVal,
  namesKeyVal,
  acronymsKeyVal,
  locationsKeyVal,
  wordsToIncludeKeyVal,
} from './plugin-constants';

let wordsToExclude = [];
export let optionsDictionary = {
  [shouldCapitaliseI]: false,
  [shouldCapitaliseNames]: false,
  [shouldCapitaliseAcronyms]: false,
  [shouldCapitaliseLocations]: false,
};
let keyValueDictionary = {
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

  let tagName = element.tagName;

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

  if (shouldCapitalise(text)) {
    const updatedStr = getCapitalisedContent(text);

    setText(element, tagName, updatedStr, shouldAppendBr);
    return;
  }

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
  const multilineRegex = /\s*\n+\s*\w$/;
  let matches = multilineRegex.test(text);

  //console.log("matches:" + matches);

  if (matches) {
    return true;
  }

  const sentenceRegex = /\w+\s*\W?([.?!])+\s+\w$/;
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

  let match = lastWordRegex.exec(text);
  const noMatch = ['', ''];

  if (match) {
    const matchedWord = match[1];

    if (matchedWord != null) {
      if (wordsToExclude.includes(matchedWord.toLowerCase())) {
        return noMatch;
      }

      let correctedWord = getCorrectedWord(
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
    let result = replaceLastOccurrenceInString(text, nbsp, ' ');
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
  if (window.location.origin.includes('atlassian.net')) {
    let innerHtml = $.parseHTML(updatedStr);
    // console.log(innerHtml);

    let assistiveSpan = $(innerHtml).find('span.assistive');
    assistiveSpan.remove();
    $(htmlControl).html(innerHtml);
  } else {
    $(htmlControl).html(updatedStr);
  }

  setEndOfContenteditable(htmlControl);
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
    return false;
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

export let stringToKeyValuePairs = (obj, val) => {
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
