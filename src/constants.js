import { names } from './name-constants';
import { abbreviations } from './abbreviation-constants';
import { locations } from './location-constants';

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

const wordsWithApostrophe = {
  arent: "aren't",
  cant: "can't",
  couldnt: "couldn't",
  couldve: "could've",
  didnt: "didn't",
  doesnt: "doesn't",
  dont: "don't",
  everyones: "everyone's",
  hadnt: "hadn't",
  hasnt: "hasn't",
  havent: "haven't",
  hed: "he'd",
  heres: "here's",
  hes: "he's",
  isnt: "isn't",
  ias: "I'as",
  im: "I'm",
  neednt: "needn't",
  shes: "she's",
  shouldnt: "shouldn't",
  shouldve: "should've",
  thats: "that's",
  theres: "there's",
  theyd: "they'd",
  theyll: "they'll",
  theyre: "they're",
  theyve: "they've",
  wasnt: "wasn't",
  werent: "weren't",
  whats: "what's",
  wheres: "where's",
  whered: "where'd",
  whos: "who's",
  wholl: "who'll",
  wont: "won't",
  wouldnt: "wouldn't",
  wouldve: "would've",
  yall: "y'all",
  youd: "you'd",
  youre: "you're",
  youve: "you've",
  youll: "you'll",
};

const commonTechWords = [
  'Akamai',
  'Artifactory',
  'Baidu',
  'BigQuery',
  'BitTorrent',
  'Bluetooth',
  'Compaq',
  'CompuServe',
  'CosmosDB',
  'Detectify',
  'DevOps',
  'Drupal',
  'DynamoDB',
  'ECMAScript',
  'Emacs',
  'HBase',
  'Instagram',
  'JavaScript',
  'Jekyll',
  'Jenkins',
  'Jira',
  'Jiras',
  'jQuery',
  'Kibana',
  'LibreOffice',
  'LinkedIn',
  'Lucidchart',
  'Mac',
  'Macintosh',
  'MariaDB',
  'Mixpanel',
  'MongoDB',
  'MySQL',
  'Netscape',
  'Nielsen',
  'NuGet',
  'NuGets',
  'Ocaml',
  'PagerDuty',
  'Perl',
  'PostgreSQL',
  'PowerPC',
  'PowerPoint',
  'PyTorch',
  'Raygun',
  'README',
  'Reddit',
  'Redis',
  'Redshift',
  'SQLite',
  'Scala',
  'SharePoint',
  'TensorFlow',
  'Trello',
  'Ubuntu',
  'Unicode',
  'Wii',
  'WordPress',
  'Xamarin',
  'iOS',
  'iPad',
  'iPhone',
  'iPod',
  'iTunes',
];

let awsWords = ['Fargate', 'CloudWatch'];

let expansions = {
  thx: 'thanks',
  pls: 'please',
  np: 'no problem',
  nw: 'no worries',
};

let commonConstants = ['Xmas', 'Christmas', 'Easter', 'Diwali', 'Holi'];

let commonLocalAbbreviations = ['Syd', 'Melb', 'AdID', 'AdIDs'];

let constants = days.concat(
  months,
  commonTechWords,
  awsWords,
  commonConstants,
  commonLocalAbbreviations
);

export let stringToKeyValuePairs = (obj, val) => {
  obj[val.toLowerCase()] = val;
  return obj;
};

let constantsMap = constants.reduce(stringToKeyValuePairs, {});

let toTitleCase = (str) => {
  return str.replace(/\w\S*/g, (txt) => {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
};

let toSentenceCase = (str) => {
  return str.charAt(0).toUpperCase() + str.substr(1).toLowerCase();
};

export let convertToTitleCase = (keyValuePairs) => {
  let destination = {};
  for (const [key, value] of Object.entries(keyValuePairs)) {
    destination[toTitleCase(key)] = toTitleCase(value);
  }
  return destination;
};

export let convertToSentenceCase = (keyValuePairs) => {
  let destination = {};
  for (const [key, value] of Object.entries(keyValuePairs)) {
    destination[toSentenceCase(key)] = toSentenceCase(value);
  }
  return destination;
};

//convert array to key-value pairs
export let constantsKeyValuePairs = {
  ...constantsMap,
  ...wordsWithApostrophe,
  ...convertToTitleCase(wordsWithApostrophe),
  ...expansions,
  ...convertToSentenceCase(expansions),
};

export let namesKeyValuePairs = names.reduce(stringToKeyValuePairs, {});
export let abbreviationsKeyValuePairs = abbreviations.reduce(
  stringToKeyValuePairs,
  {}
);
export let locationsKeyValuePairs = locations.reduce(stringToKeyValuePairs, {});
