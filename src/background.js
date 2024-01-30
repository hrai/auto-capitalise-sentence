import {
  constantsKeyValuePairs,
  namesKeyValuePairs,
  acronymsKeyValuePairs,
  locationsKeyValuePairs,
} from './constants';
import {
  constantsKeyVal,
  namesKeyVal,
  acronymsKeyVal,
  locationsKeyVal,
} from './plugin-constants';
import browser from 'webextension-polyfill';

browser.storage.sync.set({
  [constantsKeyVal]: constantsKeyValuePairs,
  [namesKeyVal]: namesKeyValuePairs,
  [acronymsKeyVal]: acronymsKeyValuePairs,
  [locationsKeyVal]: locationsKeyValuePairs,
});
