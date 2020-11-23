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

const abbreviations = [
  'AFAIK',
  'AKA',
  'API',
  'ATM',
  'BTW',
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

export let constants = days.concat(months, abbreviations, names);
