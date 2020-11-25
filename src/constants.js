import { names } from './name-constants';
import browser from 'webextension-polyfill';
// import { constants_key_val } from './plugin-constants';

const days = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

const months = [
  'January',
  'February',
  'April',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const common_tech_words = ['DevOps', 'UI'];

const abbreviations = [
  'AFAIK',
  'AKA',
  'API',
  'ATM',
  'BTW',
  'CRE',
  'DIY',
  'FAQ',
  'FTW',
  'FYI',
  'ICYMI',
  'IDK',
  'IMO',
  'IOW',
  'ITT',
  'LOL',
  'MMW',
  'OMG',
  'OTOH',
  'POV',
  'PR',
  'ROTFL',
  'RSVP',
  'TBA',
  'TBC',
  'TGIF',
  'THX',
  'TIA',
  'TTYL',
  'USB',
  'WTF',
  'WTH',
];

export let constants = days.concat(
  months,
  abbreviations,
  names,
  common_tech_words
);

const constants_map = constants.reduce((obj, val) => {
  obj[val.toLowerCase()] = val;
  return obj;
}, {});

browser.storage.local.set({
  constants_key_val: constants_map,
});
