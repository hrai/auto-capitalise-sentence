import { names } from './name-constants'
import { abbreviations } from './abbreviation-constants'

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
  doesnt: "doesn't",
  cant: "can't",
  wont: "won't",
  dont: "don't",
  shes: "she's",
  hes: "he's",
  theres: "there's",
  theyre: "they're",
  youve: "you've",
  youre: "you're",
  couldnt: "couldn't",
  shouldnt: "shouldn't",
  wouldnt: "wouldn't",
  hasnt: "hasn't",
}

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
  'CLI',
  'CSS',
  'Compaq',
  'CompuServe',
  'CosmosDB',
  'DevOps',
  'DI',
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
]

let commonLocalAbbreviations = ['Syd', 'Melb']

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
