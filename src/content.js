import * as utils from './utils';
import browser from 'webextension-polyfill';
import {
  pluginNamespace,
  sitesToIgnore,
  shouldCapitaliseI,
  shouldCapitaliseNames,
  shouldCapitaliseAcronyms,
  shouldCapitaliseLocations,
  shouldConvertToSentenceCase,
  constantsKeyVal,
  namesKeyVal,
  acronymsKeyVal,
  locationsKeyVal,
  wordsToExclude,
  wordsToInclude,
  wordsToIncludeKeyVal,
} from './plugin-constants';

const errorMsg = 'breaking loop';
let sitesToExclude = [
  'aws.amazon.com',
  'web.whatsapp.com',
  'messenger.com',
  'discord.com',
  'facebook.com',
];

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
        wordsToExclude,
        wordsToInclude,
      ])
      .then((remoteDict) => {
        processResponse({ ...localDict, ...remoteDict });
      }, utils.onError);
  }, utils.onError);

function processResponse(storageDict) {
  if (storageDict.sitesToIgnore) {
    sitesToExclude = sitesToExclude.concat(storageDict.sitesToIgnore);
  }

  setOptions(storageDict);
  setKeyValues(storageDict);

  if (storageDict && sitesToExclude) {
    //https://stackoverflow.com/questions/406192/get-current-url-with-jquery
    const currentUrlDomain = window.location.origin;

    try {
      let shouldEnableCapitalisingOnCurrentSite = true;

      $.each(sitesToExclude, function (_i, siteToExclude) {
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

      if (changes.wordsToExclude != null) {
        const newValue = changes.wordsToExclude.newValue;

        if (newValue != null) {
          utils.setWordsToExclude(newValue);
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
  $('iframe').on('load', (event) => {
    const iframe = event.target;
    $(iframe)
      .contents()
      .find(':text,textarea')
      .each((_, item) => {
        $(item).on(`input.${pluginNamespace}`, function (event) {
          capitaliseText(event.target);
        });
      });
  });
}

function observeInputTags() {
  $(':text,textarea').on(`input.${pluginNamespace}`, function (event) {
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

    $.each(mutations, function (_i, mutation) {
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

            $.each(contentEditableTags, function (_i, tagName) {
              const filteredEls = utils.getFilteredElements(
                addedNodesArr,
                tagName
              );

              if (filteredEls?.length) {
                filteredEls.each(function (_index, element) {
                  if (utils.shouldCapitaliseContent(element)) {
                    capitaliseText(element);
                  }
                });
              }
            });

            $.each(inputTags, function (_i, tagName) {
              const filteredEls = utils.getFilteredElements(
                addedNodesArr,
                tagName
              );

              if (filteredEls?.length) {
                filteredEls.each(function (_index, element) {
                  $(element).on(`input.${pluginNamespace}`, function (event) {
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
  $.each(list, function (i, e) {
    if ($.inArray(e, result) == -1) result.push(e);
  });
  return result;
}

function capitaliseText(element) {
  // Use debounced version with 5-second sliding window
  const debouncedFn = utils.getDebouncedCapitaliseText(element);
  debouncedFn(element);
}
