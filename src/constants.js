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

const common_tech_words = [
  'DevOps',
  'UI',
  'PR',
  'PRs',
  'APIs',
  'API',
  'MVC',
  'GitHub',
  'Google',
  'Microsoft',
  'MongoDB',
  'Mozilla',
  'Motorola',
  'MySQL',
  'OpenOffice',
  'PHP',
  'PayPal',
  'Perl',
  'PostgreSQL',
  'PowerPoint',
  'PyTorch',
  'Qualcomm',
  'Redis',
  'SQLite',
  'Scala',
  'Sega',
  'S3',
  'SUSE',
  'SVN',
  'Redshift',
  'MySpace',
  'JavaScript',
];

const abbreviations = [
  'AMD',
  'AOL',
  'APM',
  'SMH',
  'AFR',
  'ATM',
  'AWS',
  'BBB',
  'BMW',
  'BP',
  'BRB',
  'BSD',
  'BTW',
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
  'HBO',
  'HSBC',
  'IBM',
  'ICYMI',
  'IDK',
  'IKEA',
  'IMO',
  'ING',
  'IOW',
  'ISO',
  'ITT',
  'JFK',
  'KFC',
  'LGTM',
  'LOL',
  'MMW',
  'NP',
  'NW',
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
  'WSL',
  'WTF',
  'WTH',
];

let constants = days.concat(months, abbreviations, common_tech_words);

//convert array to key-value pairs
export let constants_key_val = constants.reduce((obj, val) => {
  obj[val.toLowerCase()] = val;
  return obj;
}, {});

export let names_key_val = names.reduce((obj, val) => {
  obj[val.toLowerCase()] = val;
  return obj;
}, {});
