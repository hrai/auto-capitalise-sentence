import {
  constantsKeyValuePairs,
  namesKeyValuePairs,
  abbreviationsKeyValuePairs,
} from './constants'
import browser from 'webextension-polyfill'

browser.storage.local.set({
  constants_key_val: constantsKeyValuePairs,
  names_key_val: namesKeyValuePairs,
  abbreviations_key_val: abbreviationsKeyValuePairs,
})
