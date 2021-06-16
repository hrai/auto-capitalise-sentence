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
  arent: 'aren\'t',
  cant: 'can\'t',
  couldnt: 'couldn\'t',
  couldve: 'could\'ve',
  didnt: 'didn\'t',
  doesnt: 'doesn\'t',
  dont: 'don\'t',
  hadnt: 'hadn\'t',
  hasnt: 'hasn\'t',
  havent: 'haven\'t',
  hed: 'he\'d',
  hes: 'he\'s',
  isnt: 'isn\'t',
  shes: 'she\'s',
  shouldnt: 'shouldn\'t',
  shouldve: 'should\'ve',
  theres: 'there\'s',
  theyre: 'they\'re',
  theyve: 'they\'ve',
  wont: 'won\'t',
  wouldnt: 'wouldn\'t',
  wouldve: 'would\'ve',
  youre: 'you\'re',
  youve: 'you\'ve',
};

const commonTechWords = [
  'AI',
  'API',
  'APIs',
  'Artifactory',
  'AWS',
  'Baidu',
  'BigQuery',
  'BitTorrent',
  'Bluetooth',
  'CD',
  'CDK',
  'CI',
  'CLI',
  'CSS',
  'Compaq',
  'CompuServe',
  'CosmosDB',
  'DevOps',
  'DI',
  'DNS',
  'Drupal',
  'DynamoDB',
  'ECMAScript',
  'Emacs',
  'ES',
  'HBase',
  'Instagram',
  'JavaScript',
  'Jekyll',
  'Jenkins',
  'Jira',
  'LibreOffice',
  'MVC',
  'MariaDB',
  'ML',
  'MongoDB',
  'MySQL',
  'Netscape',
  'NuGet',
  'NuGets',
  'Ocaml',
  'PagerDuty',
  'PHP',
  'PR',
  'PRs',
  'Perl',
  'PostgreSQL',
  'PowerPC',
  'PowerPoint',
  'PyTorch',
  'Redis',
  'Redshift',
  'S3',
  'SQLite',
  'SUSE',
  'SVN',
  'Scala',
  'SharePoint',
  'TensorFlow',
  'UAT',
  'UI',
  'UIs',
  'URL',
  'URLs',
  'Ubuntu',
  'Unicode',
  'VoIP',
  'VPC',
  'VPN',
  'WiFi',
  'Wii',
  'WordPress',
  'Xamarin',
  'iOS',
  'iPad',
  'iPhone',
  'iPod',
  'iTunes',
];

let commonLocalAbbreviations = ['Syd', 'Melb'];

let constants = days.concat(months, commonTechWords, commonLocalAbbreviations);

let stringToKeyValuePairs = (obj, val) => {
  obj[val.toLowerCase()] = val;
  return obj;
};

let constantsMap = constants.reduce(stringToKeyValuePairs, {});

let toTitleCase = (str) => {
  return str.replace(/\w\S*/g, (txt) => {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
};

let wordsWithApostropheTitleCase = {};
for (const [key, value] of Object.entries(wordsWithApostrophe)) {
  wordsWithApostropheTitleCase[toTitleCase(key)] = toTitleCase(value);
}

//convert array to key-value pairs
export let constantsKeyValuePairs = {
  ...constantsMap,
  ...wordsWithApostrophe,
  ...wordsWithApostropheTitleCase,
};

export let namesKeyValuePairs = names.reduce(stringToKeyValuePairs, {});
export let abbreviationsKeyValuePairs = abbreviations.reduce(
  stringToKeyValuePairs,
  {}
);
export let locationsKeyValuePairs = locations.reduce(stringToKeyValuePairs, {});
