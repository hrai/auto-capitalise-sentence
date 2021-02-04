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

const common_tech_words = [
  'API',
  'APIs',
  'Artifactory',
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
  'HBase',
  'Instagram',
  'JavaScript',
  'Jekyll',
  'Jenkins',
  'LibreOffice',
  'MVC',
  'MariaDB',
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
  'UI',
  'UIs',
  'URL',
  'URLs',
  'Ubuntu',
  'Unicode',
  'VoIP',
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

let words_with_apostrophe = {
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
}

let common_local_abbreviations = ['Syd', 'Melb']

let constants = days.concat(
  months,
  common_tech_words,
  common_local_abbreviations
)

let string_to_key_val = (obj, val) => {
  obj[val.toLowerCase()] = val
  return obj
}

let constants_map = constants.reduce(string_to_key_val, {})

//convert array to key-value pairs
export let constants_key_val = { ...constants_map, ...words_with_apostrophe }

export let names_key_val = names.reduce(string_to_key_val, {})
export let abbreviations_key_val = abbreviations.reduce(string_to_key_val, {})
