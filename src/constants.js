import { names } from './name-constants';

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

const common_tech_words = ['DevOps', 'UI', 'PR', 'PRs', 'APIs', 'API', 'MVC'];

const abbreviations = [
  'AFAIK',
  'AKA',
  'ATM',
  'BTW',
  'BBB',
  'BMW',
  'BP',
  'BRB',
  'BSD',
  'CRE',
  'CSS',
  'CVS',
  'DIY',
  'FAQ',
  'FTW',
  'FYI',
  'GE',
  'GNU',
  'GTE',
  'GTG',
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
  'ROTFL',
  'RSVP',
  'TBA',
  'TBC',
  'TC',
  'TGIF',
  'THX',
  'TIA',
  'TTYL',
  'USB',
  'WFH',
  'WTF',
  'WTH',
];

let constants = days.concat(months, abbreviations, names, common_tech_words);

//convert array to key-value pairs
export let constants_key_val = constants.reduce((obj, val) => {
  obj[val.toLowerCase()] = val;
  return obj;
}, {});
