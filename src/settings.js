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
  // (no new constants required for tab persistence)
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

// Restore last active tab after popup open
const LAST_ACTIVE_TAB_KEY = 'lastActiveSettingsTab';
const MODE_DETAILS_STATE_KEY = 'modeDetailsOpenState';
browser.storage.sync.get(LAST_ACTIVE_TAB_KEY).then((res) => {
  const targetId = res[LAST_ACTIVE_TAB_KEY];
  if (targetId && document.querySelector(`#${targetId}.tab-pane`)) {
    // Defer until bootstrap has initialised tabs
    setTimeout(() => {
      const triggerBtn = document.querySelector(
        `[data-bs-target="#${targetId}"]`
      );
      if (triggerBtn) {
        // Simulate click to activate stored tab
        triggerBtn.click();
      }
      // After tab restore, restore details open state
      browser.storage.sync.get(MODE_DETAILS_STATE_KEY).then((r) => {
        const map = r[MODE_DETAILS_STATE_KEY];
        if (map && typeof map === 'object') {
          document
            .querySelectorAll('details.mode-details')
            .forEach((el, idx) => {
              const key =
                el.getAttribute('data-details-id') || `details-${idx}`;
              if (map[key] === false) {
                el.removeAttribute('open');
              } else if (map[key] === true) {
                el.setAttribute('open', '');
              }
            });
        } else {
          // Attach ids if missing for future persistence
          document
            .querySelectorAll('details.mode-details')
            .forEach((el, idx) => {
              if (!el.getAttribute('data-details-id')) {
                el.setAttribute('data-details-id', `details-${idx}`);
              }
            });
        }
      });
    }, 50);
  }
});

// Track tab changes and persist
$(document).on('shown.bs.tab', 'button[data-bs-toggle="tab"]', function (e) {
  const targetSelector = $(e.target).attr('data-bs-target');
  if (targetSelector && targetSelector.startsWith('#')) {
    const paneId = targetSelector.substring(1);
    browser.storage.sync.set({ [LAST_ACTIVE_TAB_KEY]: paneId });
  }
});

// Persist <details> open/closed state for mode info panels
function persistDetailsState() {
  const state = {};
  document.querySelectorAll('details.mode-details').forEach((el, idx) => {
    let id = el.getAttribute('data-details-id');
    if (!id) {
      id = `details-${idx}`;
      el.setAttribute('data-details-id', id);
    }
    state[id] = el.hasAttribute('open');
  });
  browser.storage.sync.set({ [MODE_DETAILS_STATE_KEY]: state });
}

// Delegate toggle events (captures both click and keyboard activation)
document.addEventListener(
  'toggle',
  (evt) => {
    const target = evt.target;
    if (target && target.matches && target.matches('details.mode-details')) {
      persistDetailsState();
    }
  },
  true
);

// Fallback: if browser doesn't dispatch 'toggle', bind click on summary
document.addEventListener('click', (evt) => {
  const summary = evt.target.closest && evt.target.closest('summary');
  if (summary) {
    const parent = summary.parentElement;
    if (parent && parent.matches && parent.matches('details.mode-details')) {
      // Debounce a tick to allow DOM to apply open attribute
      setTimeout(persistDetailsState, 0);
    }
  }
});

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
    const enabled = flagValue === true;
    $(`#${flagName}`).prop('checked', enabled);
    setShouldCapitaliseVariable(flagName, enabled);
    toggleSentenceCaseHint(enabled);
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
// There are exactly TWO modes:
// 1. Sentence Case Mode (only sentence starts capitalised) -> all word-level flags OFF
// 2. Word Capitalisation Mode (any of I/Names/Acronyms/Locations) -> sentence case OFF
// Toggling a mode switch must immediately flip the other group off visually & in storage.

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
  toggleSentenceCaseHint(enabled);
});

// When any other flag turns on, ensure sentence case is off.
otherFlags.forEach((f) => {
  $(document).on('change', `#${f}`, function () {
    if ($(this).prop('checked')) {
      const $sentence = $(`#${sentenceCaseFlag}`);
      if ($sentence.prop('checked')) {
        $sentence.prop('checked', false);
        setShouldCapitaliseVariable(sentenceCaseFlag, false);
        toggleSentenceCaseHint(false);
      }
    }
    updateMasterFromChildren();
  });
});

function toggleSentenceCaseHint(enabled) {
  const $hint = $('#sentence_case_hint');
  if (!$hint.length) return; // safety if HTML not present
  if (enabled) {
    $hint.removeClass('d-none');
  } else {
    $hint.addClass('d-none');
  }
}

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

// MODE TOGGLE BUTTONS (Sentence vs Word mode visual grouping)
let cachedWordFlags = null;
const CACHED_WORD_FLAGS_KEY = 'cachedWordFlagsSnapshot';
// Helper to refresh visual state (active/inactive sections + button) based on current checkbox values.
function refreshModeUI() {
  const sentenceActive = $('#' + shouldConvertToSentenceCase).prop('checked');
  if (sentenceActive) {
    $('#sentenceModeSection').addClass('active').removeClass('inactive');
    $('#wordModeSection').addClass('inactive').removeClass('active');
    reorderModeSections('sentence');
    const $btn = $('#modeToggleButton');
    $btn
      .attr('data-mode', 'sentence')
      .text('Switch to Word Capitalisation Mode')
      .removeClass('btn-outline-primary')
      .addClass('btn-primary text-white');
    // Enable debounce controls
    $('#debounce_delay_ms').prop('disabled', false);
    $('#sentencePerformanceCard').removeClass('opacity-50');
  } else {
    $('#wordModeSection').addClass('active').removeClass('inactive');
    $('#sentenceModeSection').addClass('inactive').removeClass('active');
    reorderModeSections('word');
    const $btn = $('#modeToggleButton');
    $btn
      .attr('data-mode', 'word')
      .text('Switch to Sentence Case Mode')
      .removeClass('btn-primary text-white')
      .addClass('btn-outline-primary');
    // Disable debounce controls (only relevant in sentence mode)
    $('#debounce_delay_ms').prop('disabled', true);
    $('#sentencePerformanceCard').addClass('opacity-50');
  }
}

function updateCachedWordFlagsSnapshot() {
  // Only update snapshot if currently in word mode (sentence case not active)
  const sentenceActive = $('#' + shouldConvertToSentenceCase).prop('checked');
  if (sentenceActive) return; // do not overwrite snapshot with disabled flags
  cachedWordFlags = {
    [shouldCapitaliseI]: $('#shouldCapitaliseI').prop('checked'),
    [shouldCapitaliseNames]: $('#shouldCapitaliseNames').prop('checked'),
    [shouldCapitaliseAcronyms]: $('#shouldCapitaliseAcronyms').prop('checked'),
    [shouldCapitaliseLocations]: $('#shouldCapitaliseLocations').prop(
      'checked'
    ),
    [shouldEnableAllWordCapitalisation]: $(
      '#shouldEnableAllWordCapitalisation'
    ).prop('checked'),
  };
  browser.storage.sync.set({ [CACHED_WORD_FLAGS_KEY]: cachedWordFlags });
}

function applySentenceCaseMode() {
  // Cache current word flags so we can restore later
  if (!cachedWordFlags) {
    // First time entering sentence case this session and no prior snapshot loaded
    updateCachedWordFlagsSnapshot();
  }
  browser.storage.sync.set({
    [shouldConvertToSentenceCase]: true,
    [shouldCapitaliseI]: false,
    [shouldCapitaliseNames]: false,
    [shouldCapitaliseAcronyms]: false,
    [shouldCapitaliseLocations]: false,
    [shouldEnableAllWordCapitalisation]: false,
  });
  $('#shouldConvertToSentenceCase').prop('checked', true);
  [
    '#shouldCapitaliseI',
    '#shouldCapitaliseNames',
    '#shouldCapitaliseAcronyms',
    '#shouldCapitaliseLocations',
    '#shouldEnableAllWordCapitalisation',
  ].forEach((sel) => $(sel).prop('checked', false).prop('disabled', true));
  toggleSentenceCaseHint(true);
  refreshModeUI();
}

function applyWordMode() {
  // Restore cached flags if available
  const restore = cachedWordFlags || {};
  const updates = { [shouldConvertToSentenceCase]: false };
  Object.keys(restore).forEach((k) => {
    updates[k] = restore[k];
  });
  browser.storage.sync.set(updates);
  $('#shouldConvertToSentenceCase').prop('checked', false);
  [
    '#shouldCapitaliseI',
    '#shouldCapitaliseNames',
    '#shouldCapitaliseAcronyms',
    '#shouldCapitaliseLocations',
    '#shouldEnableAllWordCapitalisation',
  ].forEach((sel) => $(sel).prop('disabled', false));
  Object.entries(restore).forEach(([k, v]) => {
    if (v !== undefined) {
      $('#' + k).prop('checked', v);
    }
  });
  // Ensure snapshot persisted (in case it was only in-memory before navigation or restore)
  if (cachedWordFlags) {
    browser.storage.sync.set({ [CACHED_WORD_FLAGS_KEY]: cachedWordFlags });
  } else {
    // If no snapshot existed (fresh install, first toggle back), capture now
    updateCachedWordFlagsSnapshot();
  }
  toggleSentenceCaseHint(false);
  refreshModeUI();
}

// Ensure the active section is visually first in the wrapper for clarity.
function reorderModeSections(activeMode) {
  const wrapper = $('#modeSectionsWrapper');
  if (!wrapper.length) return;
  const sentence = $('#sentenceModeSection');
  const word = $('#wordModeSection');
  if (activeMode === 'sentence') {
    sentence.detach();
    wrapper.prepend(sentence);
  } else if (activeMode === 'word') {
    word.detach();
    wrapper.prepend(word);
  }
}

$(document).on('click', '#modeToggleButton', function () {
  const mode = $(this).attr('data-mode');
  if (mode === 'word') {
    applySentenceCaseMode();
  } else {
    applyWordMode();
  }
});

// Initialise grouping visibility based on current stored state after a short delay
setTimeout(() => {
  browser.storage.sync
    .get([
      shouldConvertToSentenceCase,
      shouldCapitaliseI,
      shouldCapitaliseNames,
      shouldCapitaliseAcronyms,
      shouldCapitaliseLocations,
      shouldEnableAllWordCapitalisation,
      CACHED_WORD_FLAGS_KEY,
    ])
    .then((res) => {
      if (res[shouldConvertToSentenceCase]) {
        // Load persisted snapshot if available before applying sentence case
        if (
          res[CACHED_WORD_FLAGS_KEY] &&
          typeof res[CACHED_WORD_FLAGS_KEY] === 'object'
        ) {
          cachedWordFlags = res[CACHED_WORD_FLAGS_KEY];
        }
        applySentenceCaseMode();
      } else {
        const applyFlag = (id, val) => {
          const effective = val === undefined ? true : !!val;
          $(id).prop('checked', effective);
        };
        applyFlag('#shouldCapitaliseI', res[shouldCapitaliseI]);
        applyFlag('#shouldCapitaliseNames', res[shouldCapitaliseNames]);
        applyFlag('#shouldCapitaliseAcronyms', res[shouldCapitaliseAcronyms]);
        applyFlag('#shouldCapitaliseLocations', res[shouldCapitaliseLocations]);
        applyFlag(
          '#shouldEnableAllWordCapitalisation',
          res[shouldEnableAllWordCapitalisation]
        );
        // If there's a persisted snapshot, prefer it (user may have changed flags then reloaded popup)
        if (
          res[CACHED_WORD_FLAGS_KEY] &&
          typeof res[CACHED_WORD_FLAGS_KEY] === 'object'
        ) {
          cachedWordFlags = res[CACHED_WORD_FLAGS_KEY];
          Object.entries(cachedWordFlags).forEach(([k, v]) => {
            if (v !== undefined) {
              $('#' + k).prop('checked', v);
            }
          });
        } else {
          // Capture initial snapshot based on currently applied flags
          updateCachedWordFlagsSnapshot();
        }
        applyWordMode();
      }
    });
}, 120);

// Keep snapshot current when user changes word flags while in word mode
otherFlags.forEach((f) => {
  $(document).on('change', `#${f}`, function () {
    const sentenceActive = $('#' + shouldConvertToSentenceCase).prop('checked');
    if (!sentenceActive) {
      updateCachedWordFlagsSnapshot();
    }
    // If user unchecks all word flags manually, reflect neutral state (still considered word mode but no features). Button state remains consistent.
    refreshModeUI();
  });
});

$(document).on('change', `#${shouldEnableAllWordCapitalisation}`, function () {
  const sentenceActive = $('#' + shouldConvertToSentenceCase).prop('checked');
  if (!sentenceActive) {
    updateCachedWordFlagsSnapshot();
  }
  refreshModeUI();
});

// When sentence case checkbox itself changes directly (user clicks inside sentence section), ensure UI refresh.
// Hidden checkbox retained; mode changes now driven exclusively by toggle button so we do not bind a direct change handler.
