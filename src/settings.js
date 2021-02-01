import browser from 'webextension-polyfill';
import {
  pluginNamespace,
  sites_to_ignore,
  words_to_exclude,
  should_capitalise_i,
  should_capitalise_names,
  should_capitalise_abbreviations,
} from './plugin-constants';

browser.storage.local
  .get([sites_to_ignore, words_to_exclude])
  .then(updateIgnoreLists, onError);

function updateIgnoreLists(item) {
  var sitesToExclude = item.sites_to_ignore;
  if (sitesToExclude) {
    $('#sites').val(sitesToExclude.join('\n'));
  }

  var wordsToExclude = item.words_to_exclude;
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
      sites_to_ignore: sites,
    });

    $('#sites').val(sites.join('\n'));
    $(this).prop('disabled', true);
    $(this).val('Site added to ignore list');
  });
});

$(document).on(`click.${pluginNamespace}`, '#submitButton', function() {
  var sites = getSites();

  browser.storage.local.set({
    sites_to_ignore: sites,
  });

  $(this).prop('disabled', true);
  $(this).val('Saved');
});

$(document).on(
  `click.${pluginNamespace}`,
  '#submitButtonExcludedWords',
  function() {
    var words = getExcludedWords();

    browser.storage.local.set({
      words_to_exclude: words,
    });

    $(this).prop('disabled', true);
    $(this).val('Saved');
  }
);

// setting the value of checkbox
browser.storage.local.get(should_capitalise_i).then(items => {
  const shouldCapitaliseI = items.should_capitalise_i;

  if (shouldCapitaliseI === true || shouldCapitaliseI === undefined) {
    //value not set yet/ext just installed
    $('#shouldCapitaliseI').prop('checked', true);
    set_should_capitalise_i_variable(true);
  } else {
    $('#shouldCapitaliseI').prop('checked', false);
    set_should_capitalise_i_variable(false);
  }
});

browser.storage.local.get(should_capitalise_names).then(items => {
  const shouldCapitaliseNames = items.should_capitalise_names;

  if (shouldCapitaliseNames === true || shouldCapitaliseNames === undefined) {
    //value not set yet/ext just installed
    $('#shouldCapitaliseNames').prop('checked', true);
    set_should_capitalise_names_variable(true);
  } else {
    $('#shouldCapitaliseNames').prop('checked', false);
    set_should_capitalise_names_variable(false);
  }
});

browser.storage.local.get(should_capitalise_abbreviations).then(items => {
  const shouldCapitaliseAbbreviations = items.should_capitalise_abbreviations;

  if (
    shouldCapitaliseAbbreviations === true ||
    shouldCapitaliseAbbreviations === undefined
  ) {
    //value not set yet/ext just installed
    $('#shouldCapitaliseAbbreviations').prop('checked', true);
    set_should_capitalise_abbreviations_variable(true);
  } else {
    $('#shouldCapitaliseAbbreviations').prop('checked', false);
    set_should_capitalise_abbreviations_variable(false);
  }
});

$(document).on(`change.${pluginNamespace}`, '#shouldCapitaliseI', function(
  event
) {
  if ($(event.target).prop('checked')) {
    set_should_capitalise_i_variable(true);
  } else {
    set_should_capitalise_i_variable(false);
  }
});

$(document).on(
  `change.${pluginNamespace}`,
  '#shouldCapitaliseAbbreviations',
  function(event) {
    if ($(event.target).prop('checked')) {
      set_should_capitalise_abbreviations_variable(true);
    } else {
      set_should_capitalise_abbreviations_variable(false);
    }
  }
);

$(document).on(`change.${pluginNamespace}`, '#shouldCapitaliseNames', function(
  event
) {
  if ($(event.target).prop('checked')) {
    set_should_capitalise_names_variable(true);
  } else {
    set_should_capitalise_names_variable(false);
  }
});

function set_should_capitalise_i_variable(value) {
  browser.storage.local.set({
    should_capitalise_i: value,
  });
}

function set_should_capitalise_names_variable(value) {
  browser.storage.local.set({
    should_capitalise_names: value,
  });
}

function set_should_capitalise_abbreviations_variable(value) {
  browser.storage.local.set({
    should_capitalise_abbreviations: value,
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
