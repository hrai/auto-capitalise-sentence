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
  shouldEnableAllWordCapitalisation,
  debounceDelayMs,
} from './plugin-constants';

browser.storage.sync
  .get([sitesToIgnore, wordsToExclude, wordsToInclude, debounceDelayMs])
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

  // Debounce delay (ms) default 5000
  let delay = 5000;
  if (item.debounceDelayMs != null) {
    const parsed = parseInt(item.debounceDelayMs, 10);
    if (!isNaN(parsed)) {
      delay = parsed;
    }
  }
  $('#debounce_delay_ms').val(delay);
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
loadMasterWordFlagFromBrowserStorage();

function loadMasterWordFlagFromBrowserStorage() {
  browser.storage.sync
    .get([
      shouldEnableAllWordCapitalisation,
      shouldCapitaliseI,
      shouldCapitaliseNames,
      shouldCapitaliseAcronyms,
      shouldCapitaliseLocations,
    ])
    .then((items) => {
      // Master flag is true only if all individual flags are true
      const allOn = [
        shouldCapitaliseI,
        shouldCapitaliseNames,
        shouldCapitaliseAcronyms,
        shouldCapitaliseLocations,
      ].every((f) => items[f] === true || items[f] === undefined); // treat undefined as true (legacy default)
      const storedMaster = items[shouldEnableAllWordCapitalisation];
      const masterValue = storedMaster != null ? storedMaster : allOn; // prefer stored value else infer
      if (masterValue) {
        $('#' + shouldEnableAllWordCapitalisation).prop('checked', true);
      } else {
        $('#' + shouldEnableAllWordCapitalisation).prop('checked', false);
      }
    });
}

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

// Master checkbox change handler
$(document).on('change', `#${shouldEnableAllWordCapitalisation}`, function () {
  const enabled = $(this).prop('checked');
  // Persist master state for convenience (not required for runtime logic)
  browser.storage.sync.set({ [shouldEnableAllWordCapitalisation]: enabled });
  // If turning on master, ensure sentence case is off (mutual exclusion)
  if (enabled) {
    const $sentence = $(`#${shouldConvertToSentenceCase}`);
    if ($sentence.prop('checked')) {
      $sentence.prop('checked', false);
      setShouldCapitaliseVariable(shouldConvertToSentenceCase, false);
    }
  }
  // Apply to each individual flag
  [
    shouldCapitaliseI,
    shouldCapitaliseNames,
    shouldCapitaliseAcronyms,
    shouldCapitaliseLocations,
  ].forEach((flag) => {
    const $el = $(`#${flag}`);
    if ($el.prop('checked') !== enabled) {
      $el.prop('checked', enabled);
      setShouldCapitaliseVariable(flag, enabled);
    } else {
      // still set storage to ensure explicit value
      setShouldCapitaliseVariable(flag, enabled);
    }
  });
});

// Mutual exclusion: enabling sentence case disables other capitalisation checkboxes,
// and enabling any other disables sentence case.
const sentenceCaseFlag = shouldConvertToSentenceCase;
const otherFlags = [
  shouldCapitaliseI,
  shouldCapitaliseNames,
  shouldCapitaliseAcronyms,
  shouldCapitaliseLocations,
];

// Helper: update master checkbox (shouldEnableAllWordCapitalisation) to reflect current child states
function updateMasterFromChildren() {
  const $sentence = $(`#${sentenceCaseFlag}`);
  if ($sentence.prop('checked')) return; // while sentence case active, master remains unchecked/disabled
  const allOn = otherFlags.every((f) => $(`#${f}`).prop('checked'));
  const $master = $(`#${shouldEnableAllWordCapitalisation}`);
  if ($master.prop('checked') !== allOn) {
    $master.prop('checked', allOn);
    browser.storage.sync.set({ [shouldEnableAllWordCapitalisation]: allOn });
  }
}

// When sentence case toggles on, turn others off.
$(document).on('change', `#${sentenceCaseFlag}`, function () {
  const enabled = $(this).prop('checked');
  if (enabled) {
    otherFlags.forEach((f) => {
      const $el = $(`#${f}`);
      if ($el.prop('checked')) {
        $el.prop('checked', false);
        setShouldCapitaliseVariable(f, false);
      }
    });
    // Also uncheck and disable master checkbox
    const $master = $(`#${shouldEnableAllWordCapitalisation}`);
    if ($master.prop('checked')) {
      $master.prop('checked', false);
      browser.storage.sync.set({ [shouldEnableAllWordCapitalisation]: false });
    }
    $master.prop('disabled', true);
    // Disable child boxes (UI) while sentence case active
    otherFlags.forEach((f) => {
      $(`#${f}`).prop('disabled', true);
    });
  } else {
    // Re-enable master and child checkboxes when sentence case turns off
    $(`#${shouldEnableAllWordCapitalisation}`).prop('disabled', false);
    otherFlags.forEach((f) => {
      $(`#${f}`).prop('disabled', false);
    });
    // Recalculate master based on existing child states
    updateMasterFromChildren();
  }
});

// When any other flag turns on, ensure sentence case is off.
otherFlags.forEach((f) => {
  $(document).on('change', `#${f}`, function () {
    if ($(this).prop('checked')) {
      const $sentence = $(`#${sentenceCaseFlag}`);
      if ($sentence.prop('checked')) {
        $sentence.prop('checked', false);
        setShouldCapitaliseVariable(sentenceCaseFlag, false);
      }
    }
    updateMasterFromChildren();
  });
});

// Debounce delay change handler
$(document).on('input', '#debounce_delay_ms', function () {
  const raw = $(this).val();
  const parsed = parseInt(raw, 10);
  if (!isNaN(parsed) && parsed >= 0 && parsed <= 60000) {
    browser.storage.sync.set({ [debounceDelayMs]: parsed });
    $('#debounce_delay_status').text('Saved');
  } else {
    $('#debounce_delay_status').text('Enter 0 - 60000');
  }
});

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
