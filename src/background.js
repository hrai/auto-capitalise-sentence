import { constants_key_val, names_key_val } from './constants';
import browser from 'webextension-polyfill';

browser.storage.local.set({
  constants_key_val: constants_key_val,
  names_key_val: names_key_val,
});
