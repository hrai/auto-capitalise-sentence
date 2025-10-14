import browser from 'webextension-polyfill';
import {
  pluginNamespace,
  sitesToIgnore,
  wordsToExclude,
  wordsToInclude,
  shouldCapitaliseI,
  shouldCapitaliseNames,
  shouldCapitaliseAcronyms,
  shouldCapitaliseLocations,
  shouldConvertToSentenceCase,
} from './plugin-constants';

browser.storage.sync
  .get([sitesToIgnore, wordsToExclude, wordsToInclude])
  .then(updateIgnoreLists, onError);

function updateIgnoreLists(item) {
  const sitesToExclude = item.sitesToIgnore;
  if (sitesToExclude) {
    $('#sites').val(sitesToExclude.join('\n'));
  }

  const wordsToExclude = item.wordsToExclude;
  if (wordsToExclude) {
    $('#excluded_words_textbox').val(wordsToExclude.join('\n'));
  }

  const wordsToInclude = item.wordsToInclude;
  if (wordsToInclude) {
    $('#included_words_textbox').val(wordsToInclude.join('\n'));
  }
}

function onError(error) {
  console.log(error);
}

function getUrlDomain(data) {
  const a = document.createElement('a');
  a.href = data;
  return a.hostname;
}

$(document).on(`click.${pluginNamespace}`, '#ignoreSiteButton', function () {
  browser.tabs.query({ currentWindow: true, active: true }).then((tabs) => {
    const hostname = getUrlDomain(tabs[0].url);
    const sites = getExcludedSites();
    sites.push(hostname);

    browser.storage.sync.set({
      sitesToIgnore: sites,
    });

    $('#sites').val(sites.join('\n'));
    $(this).prop('disabled', true);
    $(this).val('Site added to ignore list');
  });
});

$(document).on(`click.${pluginNamespace}`, '#submitButton', function () {
  const sites = getExcludedSites();

  browser.storage.sync.set({
    sitesToIgnore: sites,
  });

  $(this).prop('disabled', true);
  $(this).val('Saved');
});

$(document).on(
  `click.${pluginNamespace}`,
  '#submitButtonExcludedWords',
  function () {
    const excludedWords = getExcludedWords();

    browser.storage.sync.set({
      wordsToExclude: excludedWords,
    });

    $(this).prop('disabled', true);
    $(this).val('Saved');
  }
);

$(document).on(
  `click.${pluginNamespace}`,
  '#submitButtonIncludedWords',
  function () {
    const includedWords = getIncludedWords();

    browser.storage.sync.set({
      wordsToInclude: includedWords,
    });

    $(this).prop('disabled', true);
    $(this).val('Saved');
  }
);

loadFlagValuesFromBrowserStorage(shouldCapitaliseI);
loadFlagValuesFromBrowserStorage(shouldCapitaliseNames);
loadFlagValuesFromBrowserStorage(shouldCapitaliseAcronyms);
loadFlagValuesFromBrowserStorage(shouldCapitaliseLocations);
loadSentenceCaseFlagFromBrowserStorage(shouldConvertToSentenceCase);

function loadFlagValuesFromBrowserStorage(flagName) {
  browser.storage.sync.get(flagName).then((items) => {
    const flagValue = items[flagName];

    if (flagValue === true || flagValue === undefined) {
      //value not set yet/ext just installed
      $(`#${flagName}`).prop('checked', true);
      setShouldCapitaliseVariable(flagName, true);
    } else {
      $(`#${flagName}`).prop('checked', false);
      setShouldCapitaliseVariable(flagName, false);
    }
  });
}

function loadSentenceCaseFlagFromBrowserStorage(flagName) {
  browser.storage.sync.get(flagName).then((items) => {
    const flagValue = items[flagName];

    // Sentence case defaults to false (disabled by default)
    if (flagValue === true) {
      $(`#${flagName}`).prop('checked', true);
      setShouldCapitaliseVariable(flagName, true);
    } else {
      $(`#${flagName}`).prop('checked', false);
      setShouldCapitaliseVariable(flagName, false);
    }
  });
}

setupCheckboxChangeEventHandlers(shouldCapitaliseI);
setupCheckboxChangeEventHandlers(shouldCapitaliseNames);
setupCheckboxChangeEventHandlers(shouldCapitaliseAcronyms);
setupCheckboxChangeEventHandlers(shouldCapitaliseLocations);
setupCheckboxChangeEventHandlers(shouldConvertToSentenceCase);

function setupCheckboxChangeEventHandlers(flagName) {
  $(document).on('change', `#${flagName}`, function (event) {
    if ($(event.target).prop('checked')) {
      setShouldCapitaliseVariable(flagName, true);
    } else {
      setShouldCapitaliseVariable(flagName, false);
    }
  });
}

function setShouldCapitaliseVariable(variableName, value) {
  browser.storage.sync.set({
    [variableName]: value,
  });
}

function getExcludedSites() {
  const sitesBoxVal = $('#sites').val();

  if (sitesBoxVal) {
    const sites = sitesBoxVal.split('\n');
    return sites;
  }

  return [];
}

function getIncludedWords() {
  const wordsBoxVal = $('#included_words_textbox').val();

  if (wordsBoxVal) {
    const words = wordsBoxVal.split('\n');
    return words;
  }

  return [];
}

function getExcludedWords() {
  const wordsBoxVal = $('#excluded_words_textbox').val();

  if (wordsBoxVal) {
    const words = wordsBoxVal.split('\n');
    return words;
  }

  return [];
}

$('#sites').on(`input.${pluginNamespace}`, function () {
  $('#submitButton').prop('disabled', false);
});

$('#included_words_textbox').on(`input.${pluginNamespace}`, function () {
  $('#submitButtonIncludedWords').prop('disabled', false);
});

$('#excluded_words_textbox').on(`input.${pluginNamespace}`, function () {
  $('#submitButtonExcludedWords').prop('disabled', false);
});
