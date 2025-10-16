import * as utils from './utils';
import browser from 'webextension-polyfill';
import { each, inArray, querySelectorAll, on } from './lib/dom-utils.js';
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
  'web.whatsapp.com',
  'messenger.com',
  'discord.com',
  'facebook.com',
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

      each(sitesToExclude, function (_i, siteToExclude) {
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
      // Re-run capitalization immediately on active element after mode changes so UI reflects new mode without waiting
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
      const inputs = querySelectorAll(
        'input[type="text"],textarea',
        iframeDocument
      );
      inputs.forEach((item) => {
        on(item, `input.${pluginNamespace}`, function (event) {
          capitaliseText(event.target);
        });
      });
    }
  });
}

function observeInputTags() {
  const inputs = querySelectorAll('input[type="text"],textarea');
  on(inputs, `input.${pluginNamespace}`, function (event) {
    capitaliseText(event.target);
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

  const contentEditableTags = ['p', 'span'];
  const inputTags = ["input[type='text']", 'textarea'];

  const lastUpdatedText = '';
  const observer = new MutationObserver(function (mutations) {
    let characterDataMutations = [];

    each(mutations, function (_i, mutation) {
      try {
        // console.log(mutation);

        if (mutation.type === 'childList') {
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

            each(contentEditableTags, function (_i, tagName) {
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

            each(inputTags, function (_i, tagName) {
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
  each(list, function (i, e) {
    if (inArray(e, result) == -1) result.push(e);
  });
  return result;
}

function capitaliseText(element) {
  // Only apply debounce when sentence case feature is enabled; otherwise capitalize immediately
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

// Immediately invoke capitalization (bypassing debounce) for the currently focused editable element
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
