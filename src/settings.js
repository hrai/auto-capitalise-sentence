import browser from 'webextension-polyfill';
import {
  pluginNamespace,
  sitesToIgnore,
  wordsToExclude,
  shouldCapitaliseI,
  shouldCapitaliseNames,
  shouldCapitaliseAbbreviations,
} from './plugin-constants';

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

$(document).on(`click.${pluginNamespace}`, '#ignoreSiteButton', function() {
  browser.tabs.query({ currentWindow: true, active: true }).then(tabs => {
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

$(document).on(`click.${pluginNamespace}`, '#submitButton', function() {
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
  function() {
    var words = getExcludedWords();

    console.log(words);
    browser.storage.local.set({
      wordsToExclude: words,
    });

    $(this).prop('disabled', true);
    $(this).val('Saved');
  }
);

// setting the value of checkbox
browser.storage.local.get(shouldCapitaliseI).then(items => {
  const shouldCapitaliseI = items.shouldCapitaliseI;

  if (shouldCapitaliseI === true || shouldCapitaliseI === undefined) {
    //value not set yet/ext just installed
    $('#shouldCapitaliseI').prop('checked', true);
    setShouldCapitaliseIVariable(true);
  } else {
    $('#shouldCapitaliseI').prop('checked', false);
    setShouldCapitaliseIVariable(false);
  }
});

browser.storage.local.get(shouldCapitaliseNames).then(items => {
  const shouldCapitaliseNames = items.shouldCapitaliseNames;

  if (shouldCapitaliseNames === true || shouldCapitaliseNames === undefined) {
    //value not set yet/ext just installed
    $('#shouldCapitaliseNames').prop('checked', true);
    setShouldCapitaliseNamesVariable(true);
  } else {
    $('#shouldCapitaliseNames').prop('checked', false);
    setShouldCapitaliseNamesVariable(false);
  }
});

browser.storage.local.get(shouldCapitaliseAbbreviations).then(items => {
  const shouldCapitaliseAbbreviations = items.shouldCapitaliseAbbreviations;

  if (
    shouldCapitaliseAbbreviations === true ||
    shouldCapitaliseAbbreviations === undefined
  ) {
    //value not set yet/ext just installed
    $('#shouldCapitaliseAbbreviations').prop('checked', true);
    setShouldCapitaliseAbbreviationsVariable(true);
  } else {
    $('#shouldCapitaliseAbbreviations').prop('checked', false);
    setShouldCapitaliseAbbreviationsVariable(false);
  }
});

$(document).on(`change.${pluginNamespace}`, '#shouldCapitaliseI', function(
  event
) {
  if ($(event.target).prop('checked')) {
    setShouldCapitaliseIVariable(true);
  } else {
    setShouldCapitaliseIVariable(false);
  }
});

$(document).on(
  `change.${pluginNamespace}`,
  '#shouldCapitaliseAbbreviations',
  function(event) {
    if ($(event.target).prop('checked')) {
      setShouldCapitaliseAbbreviationsVariable(true);
    } else {
      setShouldCapitaliseAbbreviationsVariable(false);
    }
  }
);

$(document).on(`change.${pluginNamespace}`, '#shouldCapitaliseNames', function(
  event
) {
  if ($(event.target).prop('checked')) {
    setShouldCapitaliseNamesVariable(true);
  } else {
    setShouldCapitaliseNamesVariable(false);
  }
});

function setShouldCapitaliseIVariable(value) {
  browser.storage.local.set({
    shouldCapitaliseI: value,
  });
}

function setShouldCapitaliseNamesVariable(value) {
  browser.storage.local.set({
    shouldCapitaliseNames: value,
  });
}

function setShouldCapitaliseAbbreviationsVariable(value) {
  browser.storage.local.set({
    shouldCapitaliseAbbreviations: value,
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

$('#sites').on(`input.${pluginNamespace}`, function() {
  $('#submitButton').prop('disabled', false);
});

$('#excluded_words_textbox').on(`input.${pluginNamespace}`, function() {
  $('#submitButtonExcludedWords').prop('disabled', false);
});
