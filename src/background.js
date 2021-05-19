import {
  constantsKeyValuePairs,
  namesKeyValuePairs,
  abbreviationsKeyValuePairs,
  locationsKeyValuePairs,
} from './constants';
import {
  constantsKeyVal,
  namesKeyVal,
  abbreviationsKeyVal,
  locationsKeyVal,
} from './plugin-constants';
import browser from 'webextension-polyfill';

browser.storage.local.set({
  [constantsKeyVal]: constantsKeyValuePairs,
  [namesKeyVal]: namesKeyValuePairs,
  [abbreviationsKeyVal]: abbreviationsKeyValuePairs,
  [locationsKeyVal]: locationsKeyValuePairs,
});
