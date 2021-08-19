import { names } from './name-constants'
import { abbreviations } from './abbreviation-constants'
import { locations } from './location-constants'

const days = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
]

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
]

const wordsWithApostrophe = {
  arent: "aren't",
  cant: "can't",
  couldnt: "couldn't",
  couldve: "could've",
  didnt: "didn't",
  doesnt: "doesn't",
  dont: "don't",
  hadnt: "hadn't",
  hasnt: "hasn't",
  havent: "haven't",
  hed: "he'd",
  heres: "here's",
  hes: "he's",
  isnt: "isn't",
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
}

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
  'Kibana',
  'LibreOffice',
  'LinkedIn',
  'Mac',
  'Macintosh',
  'MariaDB',
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
]

let commonLocalAbbreviations = ['Syd', 'Melb', 'AdID', 'AdIDs']

let constants = days.concat(months, commonTechWords, commonLocalAbbreviations)

let stringToKeyValuePairs = (obj, val) => {
  obj[val.toLowerCase()] = val
  return obj
}

let constantsMap = constants.reduce(stringToKeyValuePairs, {})

let toTitleCase = (str) => {
  return str.replace(/\w\S*/g, (txt) => {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  })
}

let wordsWithApostropheTitleCase = {}
for (const [key, value] of Object.entries(wordsWithApostrophe)) {
  wordsWithApostropheTitleCase[toTitleCase(key)] = toTitleCase(value)
}

//convert array to key-value pairs
export let constantsKeyValuePairs = {
  ...constantsMap,
  ...wordsWithApostrophe,
  ...wordsWithApostropheTitleCase,
}

export let namesKeyValuePairs = names.reduce(stringToKeyValuePairs, {})
export let abbreviationsKeyValuePairs = abbreviations.reduce(
  stringToKeyValuePairs,
  {}
)
export let locationsKeyValuePairs = locations.reduce(stringToKeyValuePairs, {})
