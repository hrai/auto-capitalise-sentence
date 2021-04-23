import * as utils from './utils';
import browser from 'webextension-polyfill';
import {
  pluginNamespace,
  sitesToIgnore,
  shouldCapitaliseI,
  shouldCapitaliseNames,
  shouldCapitaliseAbbreviations,
  shouldCapitaliseLocations,
  constantsKeyVal,
  namesKeyVal,
  abbreviationsKeyVal,
  locationsKeyVal,
  wordsToExclude,
} from './plugin-constants';

const errorMsg = 'breaking loop';
let sitesToExclude = [];

browser.storage.local
  .get([
    sitesToIgnore,
    shouldCapitaliseI,
    shouldCapitaliseNames,
    shouldCapitaliseAbbreviations,
    shouldCapitaliseLocations,
    constantsKeyVal,
    namesKeyVal,
    abbreviationsKeyVal,
    locationsKeyVal,
    wordsToExclude,
  ])
  .then(processResponse, utils.onError);

let toggleOptionsValue = (changes, variableName) => {
  if (changes[variableName] != null) {
    const newValue = changes[variableName].newValue;

    if (newValue != null) {
      utils.setShouldCapitaliseOption(variableName, newValue);
    }
  }
};

/* Updating the value of this local storage variable in settings.js happens AFTER content.js.
 * The browser doesn't register the change and doesn't capitalise I by default after installing the extension.
 * This block will capture the event and update the value of 'shouldCapitaliseI'.
 */
browser.storage.onChanged.addListener(function (
  changes, // object
  areaName // string
) {
  if (areaName === 'local') {
    toggleOptionsValue(changes, shouldCapitaliseI);
    toggleOptionsValue(changes, shouldCapitaliseNames);
    toggleOptionsValue(changes, shouldCapitaliseAbbreviations);
    toggleOptionsValue(changes, shouldCapitaliseLocations);

    if (changes.wordsToExclude != null) {
      const newValue = changes.wordsToExclude.newValue;

      if (newValue != null) {
        utils.setWordsToExclude(newValue);
      }
    }
    //browser.runtime.reload() - reload browser
  }
});

function hookupEventHandlers() {
  observeInputTags();
  observeHtmlBody();

  observeIframeInputTags();
}

function observeIframeInputTags() {
  $('iframe').on('load', (event) => {
    let iframe = event.target;
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

function processResponse(item) {
  sitesToExclude = item.sitesToIgnore;

  utils.setShouldCapitaliseOption(shouldCapitaliseI, item.shouldCapitaliseI);
  utils.setShouldCapitaliseOption(
    shouldCapitaliseNames,
    item.shouldCapitaliseNames
  );
  utils.setShouldCapitaliseOption(
    shouldCapitaliseAbbreviations,
    item.shouldCapitaliseAbbreviations
  );
  utils.setShouldCapitaliseOption(
    shouldCapitaliseLocations,
    item.shouldCapitaliseLocations
  );

  utils.setKeyValue(constantsKeyVal, item.constantsKeyVal);
  utils.setKeyValue(namesKeyVal, item.namesKeyVal);
  utils.setKeyValue(abbreviationsKeyVal, item.abbreviationsKeyVal);
  utils.setKeyValue(locationsKeyVal, item.locationsKeyVal);
  utils.setWordsToExclude(item.wordsToExclude);

  if (item && sitesToExclude) {
    //https://stackoverflow.com/questions/406192/get-current-url-with-jquery
    var currentUrlDomain = window.location.origin;

    try {
      var shouldEnableCapitalisingOnCurrentSite = true;

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

/*eslint no-debugger: "error"*/
function observeHtmlBody() {
  var target = document.querySelector('body');

  var tags = ['p', 'span'];
  var inputTags = ['input[type=\'text\']', 'textarea'];

  var observer = new MutationObserver(function (mutations) {
    $.each(mutations, function (_i, mutation) {
      try {
        if (mutation.type === 'childList') {
          // add support for div block in gmail and outlook
          if (['P'].includes(mutation.target.nodeName)) {
            capitaliseText(mutation.target);
            throw new Error(errorMsg);
          }

          var addedNodes = mutation.addedNodes;
          if (addedNodes && addedNodes.length > 0) {
            addedNodes.forEach((node) => {
              if (utils.isFirstTextOfEditableTextNode(node)) {
                capitaliseText(node.parentNode);
                addedNodes = addedNodes.filter((addedNode) => {
                  addedNode != node;
                });
              }
            });

            $.each(tags, function (_i, tagName) {
              var filteredEls = utils.getFilteredElements(addedNodes, tagName);

              filteredEls.each(function (_index, element) {
                if (utils.shouldCapitaliseContent(element)) {
                  capitaliseText(element);
                }
              });
            });

            $.each(inputTags, function (_i, tagName) {
              var filteredEls = utils.getFilteredElements(addedNodes, tagName);

              filteredEls.each(function (_index, element) {
                $(element).on(`input.${pluginNamespace}`, function (event) {
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
    characterData: true,
  };

  observer.observe(target, config);
}

function capitaliseText(element) {
  utils.capitaliseText(
    element,
    utils.shouldCapitalise,
    utils.shouldCapitaliseForI,
    utils.getText,
    utils.setText
  );
}
