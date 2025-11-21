import {
  shouldCapitaliseI,
  shouldCapitaliseNames,
  shouldCapitaliseAcronyms,
  shouldCapitaliseLocations,
  shouldConvertToSentenceCase,
} from './plugin-constants';

// Enable sentence mode: save current word-mode flags then turn on sentence mode
export function enableSentenceMode(optionsDictionary, savedWordModeSettings) {
  // Save current word mode settings before switching to sentence case
  savedWordModeSettings[shouldCapitaliseI] = optionsDictionary[shouldCapitaliseI];
  savedWordModeSettings[shouldCapitaliseNames] = optionsDictionary[shouldCapitaliseNames];
  savedWordModeSettings[shouldCapitaliseAcronyms] = optionsDictionary[shouldCapitaliseAcronyms];
  savedWordModeSettings[shouldCapitaliseLocations] = optionsDictionary[shouldCapitaliseLocations];

  optionsDictionary[shouldConvertToSentenceCase] = true;
  // Turn off all word-level flags explicitly
  optionsDictionary[shouldCapitaliseI] = false;
  optionsDictionary[shouldCapitaliseNames] = false;
  optionsDictionary[shouldCapitaliseAcronyms] = false;
  optionsDictionary[shouldCapitaliseLocations] = false;

  // Sync disabled word flags to browser storage so UI stays in sync
  if (typeof browser !== 'undefined' && browser.storage && browser.storage.sync) {
    browser.storage.sync.set({
      [shouldCapitaliseI]: false,
      [shouldCapitaliseNames]: false,
      [shouldCapitaliseAcronyms]: false,
      [shouldCapitaliseLocations]: false,
    });
  }
}

// Disable sentence mode: restore saved word-mode flags
export function disableSentenceMode(optionsDictionary, savedWordModeSettings) {
  optionsDictionary[shouldConvertToSentenceCase] = false;
  optionsDictionary[shouldCapitaliseI] = savedWordModeSettings[shouldCapitaliseI];
  optionsDictionary[shouldCapitaliseNames] = savedWordModeSettings[shouldCapitaliseNames];
  optionsDictionary[shouldCapitaliseAcronyms] = savedWordModeSettings[shouldCapitaliseAcronyms];
  optionsDictionary[shouldCapitaliseLocations] = savedWordModeSettings[shouldCapitaliseLocations];

  // Sync restored word flags to browser storage so UI stays in sync
  if (typeof browser !== 'undefined' && browser.storage && browser.storage.sync) {
    browser.storage.sync.set({
      [shouldCapitaliseI]: savedWordModeSettings[shouldCapitaliseI],
      [shouldCapitaliseNames]: savedWordModeSettings[shouldCapitaliseNames],
      [shouldCapitaliseAcronyms]: savedWordModeSettings[shouldCapitaliseAcronyms],
      [shouldCapitaliseLocations]: savedWordModeSettings[shouldCapitaliseLocations],
    });
  }
}
