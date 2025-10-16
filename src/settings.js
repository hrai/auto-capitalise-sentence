import browser from 'webextension-polyfill';
import { querySelector, val, prop, delegate, on } from './lib/dom-utils.js';
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
    val(querySelector('#sites'), sitesToExclude.join('\n'));
  }

  const wordsToExclude = item.wordsToExclude;
  if (wordsToExclude) {
    val(querySelector('#excluded_words_textbox'), wordsToExclude.join('\n'));
  }

  const wordsToInclude = item.wordsToInclude;
  if (wordsToInclude) {
    val(querySelector('#included_words_textbox'), wordsToInclude.join('\n'));
  }

  // Debounce delay (ms) default 5000
  let delay = 5000;
  if (item.debounceDelayMs != null) {
    const parsed = parseInt(item.debounceDelayMs, 10);
    if (!isNaN(parsed)) {
      delay = parsed;
    }
  }
  val(querySelector('#debounce_delay_ms'), delay);
}

function onError(error) {
  console.log(error);
}

function getUrlDomain(data) {
  const a = document.createElement('a');
  a.href = data;
  return a.hostname;
}

delegate(document, 'click', '#ignoreSiteButton', function () {
  browser.tabs.query({ currentWindow: true, active: true }).then((tabs) => {
    const hostname = getUrlDomain(tabs[0].url);
    const sites = getExcludedSites();
    sites.push(hostname);

    browser.storage.sync.set({
      sitesToIgnore: sites,
    });

    val(querySelector('#sites'), sites.join('\n'));
    prop(this, 'disabled', true);
    val(this, 'Site added to ignore list');
  });
});

delegate(document, 'click', '#submitButton', function () {
  const sites = getExcludedSites();

  browser.storage.sync.set({
    sitesToIgnore: sites,
  });

  prop(this, 'disabled', true);
  val(this, 'Saved');
});

delegate(document, 'click', '#submitButtonExcludedWords', function () {
  const excludedWords = getExcludedWords();

  browser.storage.sync.set({
    wordsToExclude: excludedWords,
  });

  prop(this, 'disabled', true);
  val(this, 'Saved');
});

delegate(document, 'click', '#submitButtonIncludedWords', function () {
  const includedWords = getIncludedWords();

  browser.storage.sync.set({
    wordsToInclude: includedWords,
  });

  prop(this, 'disabled', true);
  val(this, 'Saved');
});

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
delegate(
  document,
  'shown.bs.tab',
  'button[data-bs-toggle="tab"]',
  function (e) {
    const targetSelector = e.target.getAttribute('data-bs-target');
    if (targetSelector && targetSelector.startsWith('#')) {
      const paneId = targetSelector.substring(1);
      browser.storage.sync.set({ [LAST_ACTIVE_TAB_KEY]: paneId });
    }
  }
);

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
        prop(
          querySelector('#' + shouldEnableAllWordCapitalisation),
          'checked',
          true
        );
      } else {
        prop(
          querySelector('#' + shouldEnableAllWordCapitalisation),
          'checked',
          false
        );
      }
    });
}

function loadFlagValuesFromBrowserStorage(flagName) {
  browser.storage.sync.get(flagName).then((items) => {
    const flagValue = items[flagName];

    if (flagValue === true || flagValue === undefined) {
      //value not set yet/ext just installed
      prop(querySelector(`#${flagName}`), 'checked', true);
      setShouldCapitaliseVariable(flagName, true);
    } else {
      prop(querySelector(`#${flagName}`), 'checked', false);
      setShouldCapitaliseVariable(flagName, false);
    }
  });
}

function loadSentenceCaseFlagFromBrowserStorage(flagName) {
  browser.storage.sync.get(flagName).then((items) => {
    const flagValue = items[flagName];

    // Sentence case defaults to false (disabled by default)
    const enabled = flagValue === true;
    prop(querySelector(`#${flagName}`), 'checked', enabled);
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
delegate(
  document,
  'change',
  `#${shouldEnableAllWordCapitalisation}`,
  function () {
    const enabled = prop(this, 'checked');
    // Persist master state for convenience (not required for runtime logic)
    browser.storage.sync.set({ [shouldEnableAllWordCapitalisation]: enabled });
    // If turning on master, ensure sentence case is off (mutual exclusion)
    if (enabled) {
      const sentenceEl = querySelector(`#${shouldConvertToSentenceCase}`);
      if (prop(sentenceEl, 'checked')) {
        prop(sentenceEl, 'checked', false);
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
      const el = querySelector(`#${flag}`);
      if (prop(el, 'checked') !== enabled) {
        prop(el, 'checked', enabled);
        setShouldCapitaliseVariable(flag, enabled);
      } else {
        // still set storage to ensure explicit value
        setShouldCapitaliseVariable(flag, enabled);
      }
    });
  }
);

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
  const sentence = querySelector(`#${sentenceCaseFlag}`);
  if (prop(sentence, 'checked')) return; // while sentence case active, master remains unchecked/disabled
  const allOn = otherFlags.every((f) =>
    prop(querySelector(`#${f}`), 'checked')
  );
  const master = querySelector(`#${shouldEnableAllWordCapitalisation}`);
  if (prop(master, 'checked') !== allOn) {
    prop(master, 'checked', allOn);
    browser.storage.sync.set({ [shouldEnableAllWordCapitalisation]: allOn });
  }
}

// When sentence case toggles on, turn others off.
delegate(document, 'change', `#${sentenceCaseFlag}`, function () {
  const enabled = prop(this, 'checked');
  if (enabled) {
    otherFlags.forEach((f) => {
      const el = querySelector(`#${f}`);
      if (prop(el, 'checked')) {
        prop(el, 'checked', false);
        setShouldCapitaliseVariable(f, false);
      }
    });
    // Also uncheck and disable master checkbox
    const masterEl = querySelector(`#${shouldEnableAllWordCapitalisation}`);
    if (prop(masterEl, 'checked')) {
      prop(masterEl, 'checked', false);
      browser.storage.sync.set({ [shouldEnableAllWordCapitalisation]: false });
    }
    prop(masterEl, 'disabled', true);
    // Disable child boxes (UI) while sentence case active
    otherFlags.forEach((f) => {
      prop(querySelector(`#${f}`), 'disabled', true);
    });
  } else {
    // Re-enable master and child checkboxes when sentence case turns off
    prop(
      querySelector(`#${shouldEnableAllWordCapitalisation}`),
      'disabled',
      false
    );
    otherFlags.forEach((f) => {
      prop(querySelector(`#${f}`), 'disabled', false);
    });
    // Recalculate master based on existing child states
    updateMasterFromChildren();
  }
  toggleSentenceCaseHint(enabled);
});

// When any other flag turns on, ensure sentence case is off.
otherFlags.forEach((f) => {
  delegate(document, 'change', `#${f}`, function () {
    if (prop(this, 'checked')) {
      const sentenceEl = querySelector(`#${sentenceCaseFlag}`);
      if (prop(sentenceEl, 'checked')) {
        prop(sentenceEl, 'checked', false);
        setShouldCapitaliseVariable(sentenceCaseFlag, false);
        toggleSentenceCaseHint(false);
      }
    }
    updateMasterFromChildren();
  });
});

function toggleSentenceCaseHint(enabled) {
  const hintEl = querySelector('#sentence_case_hint');
  if (!hintEl) return; // safety if HTML not present
  if (enabled) {
    hintEl.classList.remove('d-none');
  } else {
    hintEl.classList.add('d-none');
  }
}

// Debounce delay change handler
delegate(document, 'input', '#debounce_delay_ms', function () {
  const raw = val(this);
  const parsed = parseInt(raw, 10);
  if (!isNaN(parsed) && parsed >= 0 && parsed <= 60000) {
    browser.storage.sync.set({ [debounceDelayMs]: parsed });
    querySelector('#debounce_delay_status').textContent = 'Saved';
  } else {
    querySelector('#debounce_delay_status').textContent = 'Enter 0 - 60000';
  }
});

function setupCheckboxChangeEventHandlers(flagName) {
  delegate(document, 'change', `#${flagName}`, function (event) {
    if (prop(event.target, 'checked')) {
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
  const sitesBoxVal = val(querySelector('#sites'));

  if (sitesBoxVal) {
    const sites = sitesBoxVal.split('\n');
    return sites;
  }

  return [];
}

function getIncludedWords() {
  const wordsBoxVal = val(querySelector('#included_words_textbox'));

  if (wordsBoxVal) {
    const words = wordsBoxVal.split('\n');
    return words;
  }

  return [];
}

function getExcludedWords() {
  const wordsBoxVal = val(querySelector('#excluded_words_textbox'));

  if (wordsBoxVal) {
    const words = wordsBoxVal.split('\n');
    return words;
  }

  return [];
}

on(querySelector('#sites'), `input.${pluginNamespace}`, function () {
  prop(querySelector('#submitButton'), 'disabled', false);
});

on(
  querySelector('#included_words_textbox'),
  `input.${pluginNamespace}`,
  function () {
    prop(querySelector('#submitButtonIncludedWords'), 'disabled', false);
  }
);

on(
  querySelector('#excluded_words_textbox'),
  `input.${pluginNamespace}`,
  function () {
    prop(querySelector('#submitButtonExcludedWords'), 'disabled', false);
  }
);

// MODE TOGGLE BUTTONS (Sentence vs Word mode visual grouping)
let cachedWordFlags = null;
const CACHED_WORD_FLAGS_KEY = 'cachedWordFlagsSnapshot';
// Helper to refresh visual state (active/inactive sections + button) based on current checkbox values.
function refreshModeUI() {
  const sentenceActive = prop(
    querySelector('#' + shouldConvertToSentenceCase),
    'checked'
  );
  if (sentenceActive) {
    const sentenceSection = querySelector('#sentenceModeSection');
    const wordSection = querySelector('#wordModeSection');
    const perfCard = querySelector('#sentencePerformanceCard');

    if (sentenceSection) {
      sentenceSection.classList.add('active');
      sentenceSection.classList.remove('inactive');
    }
    if (wordSection) {
      wordSection.classList.add('inactive');
      wordSection.classList.remove('active');
    }
    reorderModeSections('sentence');
    const btn = querySelector('#modeToggleButton');
    if (btn) {
      btn.setAttribute('data-mode', 'sentence');
      btn.textContent = 'Switch to Word Capitalisation Mode';
      btn.classList.remove('btn-outline-primary');
      btn.classList.add('btn-primary', 'text-white');
    }
    // Enable debounce controls
    prop(querySelector('#debounce_delay_ms'), 'disabled', false);
    if (perfCard) perfCard.classList.remove('opacity-50');
  } else {
    const sentenceSection = querySelector('#sentenceModeSection');
    const wordSection = querySelector('#wordModeSection');
    const perfCard = querySelector('#sentencePerformanceCard');

    if (wordSection) {
      wordSection.classList.add('active');
      wordSection.classList.remove('inactive');
    }
    if (sentenceSection) {
      sentenceSection.classList.add('inactive');
      sentenceSection.classList.remove('active');
    }
    reorderModeSections('word');
    const btn = querySelector('#modeToggleButton');
    if (btn) {
      btn.setAttribute('data-mode', 'word');
      btn.textContent = 'Switch to Sentence Case Mode';
      btn.classList.remove('btn-primary', 'text-white');
      btn.classList.add('btn-outline-primary');
    }
    // Disable debounce controls (only relevant in sentence mode)
    prop(querySelector('#debounce_delay_ms'), 'disabled', true);
    if (perfCard) perfCard.classList.add('opacity-50');
  }
}

function updateCachedWordFlagsSnapshot() {
  // Only update snapshot if currently in word mode (sentence case not active)
  const sentenceActive = prop(
    querySelector('#' + shouldConvertToSentenceCase),
    'checked'
  );
  if (sentenceActive) return; // do not overwrite snapshot with disabled flags
  cachedWordFlags = {
    [shouldCapitaliseI]: prop(querySelector('#shouldCapitaliseI'), 'checked'),
    [shouldCapitaliseNames]: prop(
      querySelector('#shouldCapitaliseNames'),
      'checked'
    ),
    [shouldCapitaliseAcronyms]: prop(
      querySelector('#shouldCapitaliseAcronyms'),
      'checked'
    ),
    [shouldCapitaliseLocations]: prop(
      querySelector('#shouldCapitaliseLocations'),
      'checked'
    ),
    [shouldEnableAllWordCapitalisation]: prop(
      querySelector('#shouldEnableAllWordCapitalisation'),
      'checked'
    ),
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
  prop(querySelector('#shouldConvertToSentenceCase'), 'checked', true);
  [
    '#shouldCapitaliseI',
    '#shouldCapitaliseNames',
    '#shouldCapitaliseAcronyms',
    '#shouldCapitaliseLocations',
    '#shouldEnableAllWordCapitalisation',
  ].forEach(
    (sel) => (
      prop(querySelector(sel), 'checked', false),
      prop(querySelector(sel), 'disabled', true)
    )
  );
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
  prop(querySelector('#shouldConvertToSentenceCase'), 'checked', false);
  [
    '#shouldCapitaliseI',
    '#shouldCapitaliseNames',
    '#shouldCapitaliseAcronyms',
    '#shouldCapitaliseLocations',
    '#shouldEnableAllWordCapitalisation',
  ].forEach((sel) => prop(querySelector(sel), 'disabled', false));
  Object.entries(restore).forEach(([k, v]) => {
    if (v !== undefined) {
      prop(querySelector('#' + k), 'checked', v);
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
  const wrapper = querySelector('#modeSectionsWrapper');
  if (!wrapper.length) return;
  const sentence = querySelector('#sentenceModeSection');
  const word = querySelector('#wordModeSection');
  if (activeMode === 'sentence') {
    sentence.detach();
    wrapper.prepend(sentence);
  } else if (activeMode === 'word') {
    word.detach();
    wrapper.prepend(word);
  }
}

delegate(document, 'click', '#modeToggleButton', function () {
  const mode = this.getAttribute('data-mode');
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
          prop(querySelector(id), 'checked', effective);
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
              prop(querySelector('#' + k), 'checked', v);
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
  delegate(document, 'change', `#${f}`, function () {
    const sentenceActive = prop(
      querySelector('#' + shouldConvertToSentenceCase),
      'checked'
    );
    if (!sentenceActive) {
      updateCachedWordFlagsSnapshot();
    }
    // If user unchecks all word flags manually, reflect neutral state (still considered word mode but no features). Button state remains consistent.
    refreshModeUI();
  });
});

delegate(
  document,
  'change',
  `#${shouldEnableAllWordCapitalisation}`,
  function () {
    const sentenceActive = prop(
      querySelector('#' + shouldConvertToSentenceCase),
      'checked'
    );
    if (!sentenceActive) {
      updateCachedWordFlagsSnapshot();
    }
    refreshModeUI();
  }
);

// When sentence case checkbox itself changes directly (user clicks inside sentence section), ensure UI refresh.
// Hidden checkbox retained; mode changes now driven exclusively by toggle button so we do not bind a direct change handler.
