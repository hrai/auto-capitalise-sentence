import * as utils from './utils';
import browser from 'webextension-polyfill';
import {
  pluginNamespace,
  sites_to_ignore,
  should_capitalise_i,
  should_capitalise_names,
  should_capitalise_abbreviations,
  constants_key_val,
  names_key_val,
  abbreviations_key_val,
  words_to_exclude,
} from './plugin-constants';

const errorMsg = 'breaking loop';
let sitesToExclude = [];

browser.storage.local
  .get([
    sites_to_ignore,
    should_capitalise_i,
    should_capitalise_names,
    should_capitalise_abbreviations,
    constants_key_val,
    names_key_val,
    abbreviations_key_val,
    words_to_exclude,
  ])
  .then(processResponse, utils.onError);

/* Updating the value of this local storage variable in settings.js happens AFTER content.js.
 * The browser doesn't register the change and doesn't capitalise I by dfeault after installing the extension.
 * This block will capture the event and update the value of 'should_capitalise_i'.
 */
browser.storage.onChanged.addListener(function(
  changes, // object
  areaName // string
) {
  if (areaName === 'local') {
    if (changes.should_capitalise_i != null) {
      const newValue = changes.should_capitalise_i.newValue;

      if (newValue != null) {
        utils.setShouldCapitaliseI(newValue);
      }
    }

    if (changes.should_capitalise_names != null) {
      const newValue = changes.should_capitalise_names.newValue;

      if (newValue != null) {
        utils.setShouldCapitaliseNames(newValue);
      }
    }

    if (changes.should_capitalise_abbreviations != null) {
      const newValue = changes.should_capitalise_abbreviations.newValue;

      if (newValue != null) {
        utils.setShouldCapitaliseAbbreviations(newValue);
      }
    }
  }
});

function hookupEventHandlers() {
  observeInputTags();
  observeHtmlBody();

  observeIframeInputTags();
}

function observeIframeInputTags() {
  $('iframe').on('load', event => {
    let iframe = event.target;
    $(iframe)
      .contents()
      .find(':text,textarea')
      .each((_, item) => {
        //console.log(item);

        $(item).on(`input.${pluginNamespace}`, function(event) {
          capitaliseText(event.target);
        });
      });
  });
}

function observeInputTags() {
  $(':text,textarea').on(`input.${pluginNamespace}`, function(event) {
    capitaliseText(event.target);
  });
}

function processResponse(item) {
  sitesToExclude = item.sites_to_ignore;
  utils.setShouldCapitaliseI(item.should_capitalise_i);
  utils.setShouldCapitaliseNames(item.should_capitalise_names);
  utils.setShouldCapitaliseAbbreviations(item.should_capitalise_abbreviations);
  utils.setConstantsKeyVal(item.constants_key_val);
  utils.setNamesKeyVal(item.names_key_val);
  utils.setAbbreviationsKeyVal(item.abbreviations_key_val);
  console.log(item.words_to_exclude);
  utils.setWordsToExclude(item.words_to_exclude);

  if (item && sitesToExclude) {
    //https://stackoverflow.com/questions/406192/get-current-url-with-jquery
    var currentUrlDomain = window.location.origin;

    try {
      var shouldEnableCapitalisingOnCurrentSite = true;

      $.each(sitesToExclude, function(_i, siteToExclude) {
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

  var observer = new MutationObserver(function(mutations) {
    $.each(mutations, function(_i, mutation) {
      try {
        if (mutation.type === 'childList') {
          // add support for div block in gmail and outlook
          if (['P'].includes(mutation.target.nodeName)) {
            capitaliseText(mutation.target);
            throw new Error(errorMsg);
          }

          var addedNodes = mutation.addedNodes;
          if (addedNodes && addedNodes.length > 0) {
            addedNodes.forEach(node => {
              if (utils.isFirstTextOfEditableTextNode(node)) {
                capitaliseText(node.parentNode);
                addedNodes = addedNodes.filter(addedNode => {
                  addedNode != node;
                });
              }
            });

            $.each(tags, function(_i, tagName) {
              var filteredEls = utils.getFilteredElements(addedNodes, tagName);

              filteredEls.each(function(_index, element) {
                if (utils.shouldCapitaliseContent(element)) {
                  capitaliseText(element);
                }
              });
            });

            $.each(inputTags, function(_i, tagName) {
              var filteredEls = utils.getFilteredElements(addedNodes, tagName);

              filteredEls.each(function(_index, element) {
                $(element).on(`input.${pluginNamespace}`, function(event) {
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
