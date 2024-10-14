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

browser.storage.local.set({
  [constantsKeyVal]: constantsKeyValuePairs,
  [namesKeyVal]: namesKeyValuePairs,
  [acronymsKeyVal]: acronymsKeyValuePairs,
  [locationsKeyVal]: locationsKeyValuePairs,
});
