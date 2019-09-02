(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

var utils = _interopRequireWildcard(require("./utils"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

$(document).ready(function () {
  var errorMsg = 'breaking loop';
  browser.storage.local.get('sites_to_ignore').then(processResponse, utils.onError);

  function hookupEventHandlers() {
    observeInputTags();
    observeHtmlBody();
  }

  function observeInputTags() {
    $(':text,textarea').on('input', function (event) {
      capitaliseText(event.target);
    });
  }

  function processResponse(item) {
    var sitesToExclude = item.sites_to_ignore;

    if (item && sitesToExclude) {
      //https://stackoverflow.com/questions/406192/get-current-url-with-jquery
      var currentUrlDomain = window.location.origin;

      try {
        var shouldEnableCapitalisingOnCurrentSite = true;
        $.each(sitesToExclude, function (i, siteToExclude) {
          if (currentUrlDomain.includes(siteToExclude)) {
            shouldEnableCapitalisingOnCurrentSite = false;
          }
        });

        if (shouldEnableCapitalisingOnCurrentSite) {
          hookupEventHandlers();
          throw new Error(errorMsg);
        }
      } catch (e) {
        if (e.message !== errorMsg) {
          throw e;
        }
      }
    } else {
      hookupEventHandlers();
    }
  }
  /*eslint no-debugger: "error"*/


  function observeHtmlBody() {
    var target = document.querySelector('body'); // var tags = ['p', 'span', 'div'];

    var tags = ['p', 'span'];
    var inputTags = ['input[type=\'text\']', 'textarea'];
    var observer = new MutationObserver(function (mutations) {
      // console.log(mutations);
      $.each(mutations, function (i, mutation) {
        try {
          if (mutation.type === 'childList') {
            // add support for div block in gmail and outlook
            // if (['P','DIV'].includes(mutation.target.nodeName )) {
            if (['P'].includes(mutation.target.nodeName)) {
              capitaliseText(mutation.target);
              throw new Error(errorMsg);
            }

            var addedNodes = mutation.addedNodes;

            if (addedNodes && addedNodes.length > 0) {
              addedNodes.forEach(function (node) {
                if (utils.isFirstTextOfEditableTextNode(node)) {
                  capitaliseText(node.parentNode);
                  addedNodes = addedNodes.filter(function (addedNode) {
                    addedNode != node;
                  });
                }
              });
              $.each(tags, function (i, tagName) {
                var filteredEls = utils.getFilteredElements(addedNodes, tagName);
                filteredEls.each(function (index, element) {
                  if (utils.shouldCapitaliseContent(element)) {
                    capitaliseText(element);
                  }
                });
              });
              $.each(inputTags, function (i, tagName) {
                var filteredEls = utils.getFilteredElements(addedNodes, tagName);
                filteredEls.each(function (index, element) {
                  $(element).on('input', function (event) {
                    capitaliseText(event.target);
                  });
                });
              });
            }
          } else if (mutation.type === 'characterData') {
            capitaliseText(mutation.target.parentNode);
          }
        } catch (err) {
          if (err.message !== errorMsg) {
            console.log(err);
          }
        }
      });
    });
    var config = {
      subtree: true,
      childList: true,
      characterData: true
    };
    observer.observe(target, config);
  }

  function capitaliseText(element) {
    utils.capitaliseText(element, utils.shouldCapitalise, utils.shouldCapitaliseForI, utils.getText, utils.setText);
  }
});

},{"./utils":2}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.shouldCapitaliseForI = shouldCapitaliseForI;
exports.shouldCapitalise = shouldCapitalise;
exports.onError = onError;
exports.getText = getText;
exports.setText = setText;
exports.isFirstTextOfEditableTextNode = isFirstTextOfEditableTextNode;
exports.setEndOfContenteditable = setEndOfContenteditable;
exports.capitaliseText = capitaliseText;
exports.getCapitalisedContentForI = getCapitalisedContentForI;
exports.getCapitalisedContent = getCapitalisedContent;
exports.containsHtmlContent = containsHtmlContent;
exports.isContentEditable = isContentEditable;
exports.getFilteredElements = getFilteredElements;
exports.shouldCapitaliseContent = shouldCapitaliseContent;
exports.isEditableElement = isEditableElement;

function shouldCapitaliseForI(text) {
  var regex = /\s+i(\s+|')$/;
  var matches = regex.test(text);
  return matches;
}

function shouldCapitalise(text) {
  var multilineRegex = /\s*\n+\s*\w$/;
  var matches = multilineRegex.test(text);
  if (matches) return true;
  var sentenceRegex = /\w+\s*(\.|\?)+\s+\w$/;
  matches = sentenceRegex.test(text);

  if (!matches) {
    return text.length == 1;
  }

  return matches;
}

function onError(error) {
  console.log(error);
}

function getText(htmlControl, tagName) {
  if (tagName.toUpperCase() === 'INPUT' || tagName.toUpperCase() === 'TEXTAREA') {
    return htmlControl.value ? htmlControl.value : '';
  }

  return htmlControl.innerHTML ? htmlControl.innerHTML : '';
}

function setText(htmlControl, tagName, updatedStr, shouldAppendBr) {
  if (tagName.toUpperCase() === 'INPUT' || tagName.toUpperCase() === 'TEXTAREA') {
    htmlControl.value = updatedStr;
    return;
  }

  if (shouldAppendBr) {
    updatedStr += '<br>';
  }

  htmlControl.innerHTML = updatedStr;
  setEndOfContenteditable(htmlControl);
}

function isFirstTextOfEditableTextNode(node) {
  var data = node.data;
  var textNode = '#text';

  if (node.nodeName === textNode && data.length === 1 && data.toUpperCase() != data && shouldCapitaliseContent(node.parentNode)) {
    return true;
  }

  return false;
}

function setEndOfContenteditable(contentEditableElement) {
  var range, selection;

  if (document.createRange) {
    //Firefox, Chrome, Opera, Safari, IE 9+
    range = document.createRange(); //Create a range (a range is a like the selection but invisible)

    var childNodes = contentEditableElement.childNodes;
    var childNode = childNodes.length == 1 ? childNodes[0] : childNodes[childNodes.length - 2]; // childNodes.forEach(x=>console.log(x.outerHTML));

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

function capitaliseText(element, shouldCapitalise, shouldCapitaliseForI, getText, setText) {
  if (!element) return;
  var tagName = element.tagName;
  if (!isEditableElement(element, tagName)) return;
  var text = getText(element, tagName);
  var lastChar = text.trim().slice(-1);

  if (lastChar == '@') {
    return;
  } //support for jira's comment section's p tags


  if (lastChar.match(/[a-z]/i) && lastChar.toUpperCase() === lastChar) {
    return;
  }

  var shouldAppendBr = false;

  if (text.length >= 4 && text.slice(-4) === '<br>') {
    text = text.slice(0, -4);
    shouldAppendBr = true;
  }

  if (shouldCapitalise(text)) {
    var updatedStr = getCapitalisedContent(text);
    setText(element, tagName, updatedStr, shouldAppendBr);
    return;
  }

  if (text.length >= 2 && shouldCapitaliseForI(text)) {
    var _updatedStr = getCapitalisedContentForI(text);

    setText(element, tagName, _updatedStr, shouldAppendBr);
    return;
  }
}

function getCapitalisedContentForI(text) {
  var lastTwoChars = text.slice(-2);
  var updatedStr = text.substr(0, text.length - 2) + lastTwoChars.toUpperCase();
  return updatedStr;
}

function getCapitalisedContent(text) {
  var lastChar = text.slice(-1);
  var updatedStr = text.substr(0, text.length - 1) + lastChar.toUpperCase();
  return updatedStr;
}

function containsHtmlContent(element) {
  var content = $(element).html();
  var brRegex = /\s*<br>/;
  if (content && brRegex.test(content)) return false;
  var regex = /<\/?\w+>/;
  var hasHtmlTag = regex.test(content);
  return hasHtmlTag;
}

function isContentEditable(element) {
  return element && element.isContentEditable;
}

function getFilteredElements(addedNodes, tagName) {
  return $(addedNodes).find(tagName).addBack(tagName); // finds either added alone or as tree
}

function shouldCapitaliseContent(element) {
  return isContentEditable(element) && !containsHtmlContent(element);
}

function isEditableElement(element, tagName) {
  return element.isContentEditable || tagName.toUpperCase() === 'INPUT' || tagName.toUpperCase() === 'TEXTAREA';
}

},{}]},{},[1]);
