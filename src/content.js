import * as utils from './utils';
import browser from 'webextension-polyfill';
import { inArray, querySelectorAll, on } from './lib/dom-utils.js';
import {
  pluginNamespace,
  sitesToIgnore,
  shouldCapitaliseI,
  shouldCapitaliseNames,
  shouldCapitaliseAcronyms,
  shouldCapitaliseLocations,
  shouldConvertToSentenceCase,
  debounceDelayMs,
  constantsKeyVal,
  namesKeyVal,
  acronymsKeyVal,
  locationsKeyVal,
  wordsToExclude,
  wordsToInclude,
  wordsToIncludeKeyVal,
  shouldEnableAllWordCapitalisation,
} from './plugin-constants';

const errorMsg = 'breaking loop';
let sitesToExclude = [
  'aws.amazon.com',
  // Removed WhatsApp, Messenger, Discord, Facebook from default exclusions
  // The extension now properly supports contenteditable span/div elements
  // used by modern chat applications
];

let configuredDebounceDelay = 5000;

browser.storage.local
  .get([constantsKeyVal, namesKeyVal, acronymsKeyVal, locationsKeyVal])
  .then((localDict) => {
    browser.storage.sync
      .get([
        sitesToIgnore,
        shouldCapitaliseI,
        shouldCapitaliseNames,
        shouldCapitaliseAcronyms,
        shouldCapitaliseLocations,
        shouldConvertToSentenceCase,
        debounceDelayMs,
        wordsToExclude,
        wordsToInclude,
        shouldEnableAllWordCapitalisation,
      ])
      .then((remoteDict) => {
        processResponse({ ...localDict, ...remoteDict });
      }, utils.onError);
  }, utils.onError);

function processResponse(storageDict) {
  if (storageDict.sitesToIgnore) {
    sitesToExclude = sitesToExclude.concat(storageDict.sitesToIgnore);
  }

  if (storageDict.debounceDelayMs != null) {
    const parsed = parseInt(storageDict.debounceDelayMs, 10);
    if (!isNaN(parsed) && parsed >= 0 && parsed <= 60000) {
      configuredDebounceDelay = parsed;
    }
  }

  setOptions(storageDict);
  setKeyValues(storageDict);

  // Default: enable word group if sentence case disabled AND none of the individual flags are true
  if (!storageDict[shouldConvertToSentenceCase]) {
    const wordFlags = [
      shouldCapitaliseI,
      shouldCapitaliseNames,
      shouldCapitaliseAcronyms,
      shouldCapitaliseLocations,
    ];
    const anyTrue = wordFlags.some((f) => storageDict[f] === true);
    if (!anyTrue) {
      const enableAll = {};
      wordFlags.forEach((f) => {
        enableAll[f] = true;
        utils.setShouldCapitaliseOption(f, true);
      });
      enableAll[shouldEnableAllWordCapitalisation] = true;
      browser.storage.sync.set(enableAll); // persist defaults
    }
  }

  if (storageDict && sitesToExclude) {
    //https://stackoverflow.com/questions/406192/get-current-url-with-jquery
    const currentUrlDomain = window.location.origin;

    try {
      let shouldEnableCapitalisingOnCurrentSite = true;

      sitesToExclude.forEach(function (siteToExclude) {
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

/* Updating the value of this sync storage variable in settings.js happens AFTER content.js.
 * The browser doesn't register the change and doesn't capitalise I by default after installing the extension.
 * This block will capture the event and update the value of 'shouldCapitaliseI'.
 */
browser.storage.onChanged.addListener(
  function (
    changes, // object
    areaName // string
  ) {
    if (areaName === 'sync') {
      utils.toggleOptionsValue(changes, shouldCapitaliseI);
      utils.toggleOptionsValue(changes, shouldCapitaliseNames);
      utils.toggleOptionsValue(changes, shouldCapitaliseAcronyms);
      utils.toggleOptionsValue(changes, shouldCapitaliseLocations);
      utils.toggleOptionsValue(changes, shouldConvertToSentenceCase);
      if (changes.debounceDelayMs) {
        const v = parseInt(changes.debounceDelayMs.newValue, 10);
        if (!isNaN(v) && v >= 0 && v <= 60000) {
          configuredDebounceDelay = v;
        }
      }

      if (changes.wordsToExclude != null) {
        const newValue = changes.wordsToExclude.newValue;

        if (newValue != null) {
          utils.setWordsToExclude(newValue);
        }
      }
      // Re-run capitalisation immediately on active element after mode changes so UI reflects new mode without waiting
      if (
        changes.shouldConvertToSentenceCase ||
        changes.shouldCapitaliseI ||
        changes.shouldCapitaliseNames ||
        changes.shouldCapitaliseAcronyms ||
        changes.shouldCapitaliseLocations
      ) {
        if (changes.shouldConvertToSentenceCase) {
          // Clear existing debounced functions so no delayed word-mode updates fire after switching
          utils.clearDebouncedCapitalisationCache();
        }
        if (
          changes.shouldConvertToSentenceCase &&
          changes.shouldConvertToSentenceCase.newValue === true
        ) {
          // Force full sentence case pass across all elements
          fullReprocessAllVisible(true);
        } else {
          reprocessActiveElement();
          fullReprocessAllVisible(false);
        }
      }
      //browser.runtime.reload() - reload browser
    }
  }
);

function hookupEventHandlers() {
  observeInputTags();
  observeHtmlBody();

  observeIframeInputTags();
}

function observeIframeInputTags() {
  const iframes = querySelectorAll('iframe');
  on(iframes, 'load', (event) => {
    const iframe = event.target;
    const iframeDocument =
      iframe.contentDocument || iframe.contentWindow?.document;
    if (iframeDocument) {
      // Traditional inputs
      const inputs = querySelectorAll(
        'input[type="text"],textarea',
        iframeDocument
      );
      inputs.forEach((input) => {
        let lastCapitalisedValue = input.value;

        const handleInput = function (event) {
          capitaliseText(event.target);
          lastCapitalisedValue = event.target.value;

          // Re-check after microtask
          Promise.resolve().then(() => {
            if (event.target.value !== lastCapitalisedValue) {
              capitaliseText(event.target);
            }
          });
        };

        input.addEventListener('input', handleInput, false);
      });

      // Contenteditable elements in iframes
      const contentEditables = querySelectorAll(
        '[contenteditable="true"],[contenteditable=""],[contenteditable="plaintext-only"],span[contenteditable],div[contenteditable],p[contenteditable]',
        iframeDocument
      );
      contentEditables.forEach((element) => {
        attachContentEditableHandlers(element);
      });
    }
  });
}

function observeInputTags() {
  // Traditional form inputs
  const inputs = querySelectorAll('input[type="text"],textarea');

  inputs.forEach((input) => {
    // Store the expected capitalised value
    let lastCapitalisedValue = input.value;

    // Main input handler
    const handleInput = function (event) {
      capitaliseText(event.target);
      lastCapitalisedValue = event.target.value;

      // Re-check after a microtask to ensure frameworks haven't reverted
      Promise.resolve().then(() => {
        if (event.target.value !== lastCapitalisedValue) {
          // Framework reverted our change, reapply with native event
          const text = utils.getText(event.target, event.target.tagName);
          if (text !== lastCapitalisedValue) {
            capitaliseText(event.target);
          }
        }
      });
    };

    input.addEventListener('input', handleInput, false);

    // Also observe with MutationObserver for value changes not triggered by input events
    const observer = new MutationObserver(() => {
      if (input.value && input.value !== lastCapitalisedValue) {
        const oldValue = input.value;
        capitaliseText(input);
        if (input.value !== oldValue) {
          lastCapitalisedValue = input.value;
        }
      }
    });

    observer.observe(input, {
      attributes: true,
      attributeFilter: ['value'],
      characterData: false,
      childList: false,
    });
  });

  // Modern contenteditable elements (WhatsApp, Messenger, Discord, etc.)
  observeContentEditableElements();
}

/**
 * Observe contenteditable elements used by modern chat apps
 * (WhatsApp, Messenger, Discord, Slack, etc.)
 */
function observeContentEditableElements() {
  // Find all existing contenteditable elements
  const contentEditables = querySelectorAll(
    '[contenteditable="true"],[contenteditable=""],[contenteditable="plaintext-only"],span[contenteditable],div[contenteditable],p[contenteditable]'
  );

  contentEditables.forEach((element) => {
    attachContentEditableHandlers(element);
  });
}

/**
 * Attach event handlers to a contenteditable element
 */
function attachContentEditableHandlers(element) {
  // Skip if already attached
  if (element.dataset && element.dataset.capitalisationAttached === 'true') {
    return;
  }

  // Mark as attached to avoid duplicate handlers
  if (element.dataset) {
    element.dataset.capitalisationAttached = 'true';
  }

  let lastCapitalisedText = utils.getText(element, element.tagName);

  // Handle input events (typed characters)
  const handleInput = function (event) {
    capitaliseText(event.target);
    lastCapitalisedText = utils.getText(event.target, event.target.tagName);
  };

  // Handle paste events
  const handlePaste = function (event) {
    // Small delay to allow paste to complete
    setTimeout(() => {
      capitaliseText(event.target);
      lastCapitalisedText = utils.getText(event.target, event.target.tagName);
    }, 10);
  };

  // Handle keyup for special keys (Enter, space, etc.)
  const handleKeyUp = function (event) {
    // Capitalise on space, enter, or punctuation
    if (
      event.key === ' ' ||
      event.key === 'Enter' ||
      event.key === '.' ||
      event.key === '!' ||
      event.key === '?'
    ) {
      capitaliseText(event.target);
      lastCapitalisedText = utils.getText(event.target, event.target.tagName);
    }
  };

  element.addEventListener('input', handleInput, false);
  element.addEventListener('paste', handlePaste, false);
  element.addEventListener('keyup', handleKeyUp, false);

  // MutationObserver for DOM changes within the contenteditable
  const observer = new MutationObserver(() => {
    const currentText = utils.getText(element, element.tagName);
    if (currentText && currentText !== lastCapitalisedText) {
      capitaliseText(element);
      lastCapitalisedText = currentText;
    }
  });

  observer.observe(element, {
    characterData: true,
    childList: true,
    subtree: true,
  });
}

function setOptions(item) {
  utils.setShouldCapitaliseOption(shouldCapitaliseI, item.shouldCapitaliseI);
  utils.setShouldCapitaliseOption(
    shouldCapitaliseNames,
    item.shouldCapitaliseNames
  );
  utils.setShouldCapitaliseOption(
    shouldCapitaliseAcronyms,
    item.shouldCapitaliseAcronyms
  );
  utils.setShouldCapitaliseOption(
    shouldCapitaliseLocations,
    item.shouldCapitaliseLocations
  );
  utils.setShouldCapitaliseOption(
    shouldConvertToSentenceCase,
    item.shouldConvertToSentenceCase
  );
}

function setKeyValues(item) {
  utils.setKeyValue(constantsKeyVal, item.constantsKeyVal);
  utils.setKeyValue(namesKeyVal, item.namesKeyVal);
  utils.setKeyValue(acronymsKeyVal, item.acronymsKeyVal);
  utils.setKeyValue(locationsKeyVal, item.locationsKeyVal);
  utils.setKeyValue(
    wordsToIncludeKeyVal,
    utils.arrayToMap(item.wordsToInclude)
  );
  utils.setWordsToExclude(item.wordsToExclude);
}

/*eslint no-debugger: "error"*/
function observeHtmlBody() {
  const target = document.querySelector('body');

  const contentEditableTags = ['p', 'span', 'div'];
  const inputTags = ["input[type='text']", 'textarea'];

  const lastUpdatedText = '';
  const observer = new MutationObserver(function (mutations) {
    let characterDataMutations = [];

    mutations.forEach(function (mutation) {
      try {
        // console.log(mutation);

        if (mutation.type === 'childList') {
          // Guard: Skip mutations triggered by our own updates
          if (
            mutation.target.dataset &&
            mutation.target.dataset.capitalising === 'true'
          ) {
            return;
          }

          // add support for div block in gmail and outlook
          if (['P'].includes(mutation.target.nodeName)) {
            capitaliseText(mutation.target);
            throw new Error(errorMsg);
          }

          const addedNodes = mutation.addedNodes;
          if (addedNodes && addedNodes.length > 0) {
            let addedNodesArr = Array.from(addedNodes);
            addedNodesArr.forEach((node) => {
              if (utils.isFirstTextOfEditableTextNode(node, lastUpdatedText)) {
                capitaliseText(node.parentNode);

                // console.log(lastUpdatedText + " " + node.data);
                // lastUpdatedText = node.data;
                // console.log(lastUpdatedText + " " + node.data);

                // capitaliseText(node);
                addedNodesArr = addedNodesArr.filter((addedNode) => {
                  addedNode != node;
                });
              }
            });

            // Check for newly added contenteditable elements and attach handlers
            addedNodesArr.forEach((node) => {
              if (node.nodeType === Node.ELEMENT_NODE) {
                // Check the node itself
                if (
                  node.isContentEditable ||
                  node.hasAttribute('contenteditable')
                ) {
                  attachContentEditableHandlers(node);
                }
                // Check descendants
                if (node.querySelectorAll) {
                  const editables = node.querySelectorAll(
                    '[contenteditable="true"],[contenteditable=""],[contenteditable="plaintext-only"],span[contenteditable],div[contenteditable],p[contenteditable]'
                  );
                  editables.forEach((el) => {
                    attachContentEditableHandlers(el);
                  });
                }
              }
            });

            contentEditableTags.forEach(function (tagName) {
              const filteredEls = utils.getFilteredElements(
                addedNodesArr,
                tagName
              );

              if (filteredEls?.length) {
                filteredEls.forEach(function (element) {
                  if (utils.shouldCapitaliseContent(element)) {
                    capitaliseText(element);
                  }
                });
              }
            });

            inputTags.forEach(function (tagName) {
              const filteredEls = utils.getFilteredElements(
                addedNodesArr,
                tagName
              );

              if (filteredEls?.length) {
                filteredEls.forEach(function (element) {
                  on(element, `input.${pluginNamespace}`, function (event) {
                    capitaliseText(event.target);
                  });
                });
              }
            });
          }
        } else if (mutation.type === 'characterData') {
          characterDataMutations.push(mutation.target.parentNode);
        }
      } catch (err) {
        if (err.message !== errorMsg) {
          console.log(err);
        }
      }
    });

    characterDataMutations = unique(characterDataMutations);
    characterDataMutations.forEach((element) => capitaliseText(element));
  });

  const config = {
    subtree: true,
    childList: true,
    characterData: true,
  };

  observer.observe(target, config);
}

function unique(list) {
  const result = [];
  list.forEach(function (e) {
    if (inArray(e, result) == -1) result.push(e);
  });
  return result;
}

function capitaliseText(element) {
  // Only apply debounce when sentence case feature is enabled; otherwise capitalise immediately
  if (utils.isSentenceCaseModeActive()) {
    utils.applyImmediateSentenceStartCapitalisation(element);
    const debouncedFn = utils.getDebouncedCapitaliseText(
      element,
      configuredDebounceDelay
    );
    debouncedFn(element);
  } else {
    try {
      utils.capitaliseTextProxy(element);
    } catch {
      // swallow errors to avoid disrupting typing
    }
  }
}

// Immediately invoke capitalisation (bypassing debounce) for the currently focused editable element
function reprocessActiveElement() {
  const active = document.activeElement;
  if (!active) return;
  const tag = active.tagName?.toUpperCase();
  const isEditable =
    active.isContentEditable || tag === 'INPUT' || tag === 'TEXTAREA';
  if (!isEditable) return;
  // Directly call underlying capitalise logic synchronously using current mode flags
  try {
    utils.capitaliseTextProxy(active);
  } catch {
    // swallow to avoid disrupting user typing
  }
}

function fullReprocessAllVisible(forceSentenceCase) {
  const selector =
    "input[type='text'], textarea, [contenteditable=''], [contenteditable='true'], [contenteditable='plaintext-only']";
  document.querySelectorAll(selector).forEach((el) => {
    try {
      if (forceSentenceCase && utils.isSentenceCaseEnabled()) {
        const tag = el.tagName;
        const text = utils.getText(el, tag);
        if (text && typeof text === 'string') {
          const updated = utils.getConvertedToSentenceCase(text);
          if (updated !== text) {
            utils.setText(el, tag, updated, false);
          }
        }
      } else {
        utils.fullReprocessElement(el);
      }
    } catch {
      // ignore element-level failures
    }
  });
}
