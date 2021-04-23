import browser from 'webextension-polyfill';
import {
  pluginNamespace,
  sitesToIgnore,
  wordsToExclude,
  shouldCapitaliseI,
  shouldCapitaliseNames,
  shouldCapitaliseAbbreviations,
  shouldCapitaliseLocations,
} from './plugin-constants';

// const variableDict = {
//   shouldCapitaliseI: shouldCapitaliseI,
//   shouldCapitaliseNames: shouldCapitaliseNames,
//   shouldCapitaliseAbbreviations: shouldCapitaliseAbbreviations,
//   shouldCapitaliseLocations: shouldCapitaliseLocations,
// };

// $(document).ready({

browser.storage.local
  .get([sitesToIgnore, wordsToExclude])
  .then(updateIgnoreLists, onError);

function updateIgnoreLists(item) {
  var sitesToExclude = item.sitesToIgnore;
  if (sitesToExclude) {
    $('#sites').val(sitesToExclude.join('\n'));
  }

  var wordsToExclude = item.wordsToExclude;
  if (wordsToExclude) {
    $('#excluded_words_textbox').val(wordsToExclude.join('\n'));
  }
}

function onError(error) {
  console.log(error);
}

function getUrlDomain(data) {
  var a = document.createElement('a');
  a.href = data;
  return a.hostname;
}

$(document).on(`click.${pluginNamespace}`, '#ignoreSiteButton', function () {
  browser.tabs.query({ currentWindow: true, active: true }).then((tabs) => {
    var hostname = getUrlDomain(tabs[0].url);
    var sites = getSites();
    sites.push(hostname);

    browser.storage.local.set({
      sitesToIgnore: sites,
    });

    $('#sites').val(sites.join('\n'));
    $(this).prop('disabled', true);
    $(this).val('Site added to ignore list');
  });
});

$(document).on(`click.${pluginNamespace}`, '#submitButton', function () {
  var sites = getSites();

  browser.storage.local.set({
    sitesToIgnore: sites,
  });

  $(this).prop('disabled', true);
  $(this).val('Saved');
});

$(document).on(
  `click.${pluginNamespace}`,
  '#submitButtonExcludedWords',
  function () {
    var words = getExcludedWords();

    console.log(words);
    browser.storage.local.set({
      wordsToExclude: words,
    });

    $(this).prop('disabled', true);
    $(this).val('Saved');
  }
);

loadFlagValuesFromBrowserStorage(shouldCapitaliseI);
loadFlagValuesFromBrowserStorage(shouldCapitaliseNames);
loadFlagValuesFromBrowserStorage(shouldCapitaliseAbbreviations);
loadFlagValuesFromBrowserStorage(shouldCapitaliseLocations);

function loadFlagValuesFromBrowserStorage(flagName) {
  browser.storage.local.get(flagName).then((items) => {
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

/*
// setting the value of checkbox
browser.storage.local.get(shouldCapitaliseI).then((items) => {
  const shouldCapitaliseI = items.shouldCapitaliseI;

  if (shouldCapitaliseI === true || shouldCapitaliseI === undefined) {
    //value not set yet/ext just installed
    $('#shouldCapitaliseI').prop('checked', true);
    setShouldCapitaliseVariable(shouldCapitaliseI,true);
  } else {
    $('#shouldCapitaliseI').prop('checked', false);
    setShouldCapitaliseVariable(shouldCapitaliseI,false);
  }
});

browser.storage.local.get(shouldCapitaliseNames).then((items) => {
  const shouldCapitaliseNames = items.shouldCapitaliseNames;

  if (shouldCapitaliseNames === true || shouldCapitaliseNames === undefined) {
    //value not set yet/ext just installed
    $('#shouldCapitaliseNames').prop('checked', true);
      setShouldCapitaliseVariable(shouldCapitaliseNames, true);
  } else {
    $('#shouldCapitaliseNames').prop('checked', false);
      setShouldCapitaliseVariable(shouldCapitaliseNames, false);
  }
});

browser.storage.local.get(shouldCapitaliseAbbreviations).then((items) => {
  const shouldCapitaliseAbbreviations = items.shouldCapitaliseAbbreviations;

  if (
    shouldCapitaliseAbbreviations === true ||
    shouldCapitaliseAbbreviations === undefined
  ) {
    //value not set yet/ext just installed
    $('#shouldCapitaliseAbbreviations').prop('checked', true);
      setShouldCapitaliseVariable(shouldCapitaliseAbbreviations, true);
  } else {
    $('#shouldCapitaliseAbbreviations').prop('checked', false);
      setShouldCapitaliseVariable(shouldCapitaliseAbbreviations, false);
  }
});

browser.storage.local.get(shouldCapitaliseLocations).then((items) => {
  const shouldCapitaliseLocations = items.shouldCapitaliseLocations;

  if (
    shouldCapitaliseLocations === true ||
    shouldCapitaliseLocations === undefined
  ) {
    //value not set yet/ext just installed
    $('#shouldCapitaliseLocations').prop('checked', true);
      setShouldCapitaliseVariable(shouldCapitaliseLocations, true);
  } else {
    $('#shouldCapitaliseLocations').prop('checked', false);
      setShouldCapitaliseVariable(shouldCapitaliseLocations, false);
  }
});
*/

setupCheckboxChangeEventHandlers(shouldCapitaliseI);
setupCheckboxChangeEventHandlers(shouldCapitaliseNames);
setupCheckboxChangeEventHandlers(shouldCapitaliseAbbreviations);
setupCheckboxChangeEventHandlers(shouldCapitaliseLocations);

function setupCheckboxChangeEventHandlers(flagName) {
  $(document).on(`change.${pluginNamespace}`, `#${flagName}`, function (event) {
    if ($(event.target).prop('checked')) {
      setShouldCapitaliseVariable(flagName, true);
    } else {
      setShouldCapitaliseVariable(flagName, false);
    }
  });
}

/*
$(document).on(
  `change.${pluginNamespace}`,
  '#shouldCapitaliseI',
  function (event) {
    if ($(event.target).prop('checked')) {
      setShouldCapitaliseVariable(shouldCapitaliseI, true);
    } else {
      setShouldCapitaliseVariable(shouldCapitaliseI, false);
    }
  }
);

$(document).on(
  `change.${pluginNamespace}`,
  '#shouldCapitaliseAbbreviations',
  function (event) {
    if ($(event.target).prop('checked')) {
      setShouldCapitaliseLocationsVariable(true);
    } else {
      setShouldCapitaliseLocationsVariable(false);
    }
  }
);

$(document).on(
  `change.${pluginNamespace}`,
  '#shouldCapitaliseNames',
  function (event) {
    if ($(event.target).prop('checked')) {
      setShouldCapitaliseVariable(shouldCapitaliseAbbreviations, true);
    } else {
      setShouldCapitaliseVariable(shouldCapitaliseAbbreviations, false);
    }
  }
);

$(document).on(
  `change.${pluginNamespace}`,
  '#shouldCapitaliseLocations',
  function (event) {
    if ($(event.target).prop('checked')) {
      setShouldCapitaliseVariable(shouldCapitaliseLocations, true);
    } else {
      setShouldCapitaliseVariable(shouldCapitaliseLocations, false);
    }
  }
);

$(document).on(
  `change.${pluginNamespace}`,
  '#shouldCapitaliseNames',
  function (event) {
    if ($(event.target).prop('checked')) {
      setShouldCapitaliseVariable(shouldCapitaliseNames, true);
    } else {
      setShouldCapitaliseVariable(shouldCapitaliseNames, false);
    }
  }
);

*/

function setShouldCapitaliseVariable(variableName, value) {
  browser.storage.local.set({
    variableName: value,
  });
}

function setShouldCapitaliseLocationsVariable(value) {
  browser.storage.local.set({
    shouldCapitaliseLocations: value,
  });
}

function getSites() {
  var sitesBoxVal = $('#sites').val();

  if (sitesBoxVal) {
    var sites = sitesBoxVal.split('\n');
    return sites;
  }

  return [];
}

function getExcludedWords() {
  var wordsBoxVal = $('#excluded_words_textbox').val();

  if (wordsBoxVal) {
    var words = wordsBoxVal.split('\n');
    return words;
  }

  return [];
}

$('#sites').on(`input.${pluginNamespace}`, function () {
  $('#submitButton').prop('disabled', false);
});

$('#excluded_words_textbox').on(`input.${pluginNamespace}`, function () {
  $('#submitButtonExcludedWords').prop('disabled', false);
});

// });
