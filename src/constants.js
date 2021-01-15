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
  'CLI',
  'CSS',
  'CosmosDB',
  'DevOps',
  'DynamoDB',
  'ECMAScript',
  'GitHub',
  'Google',
  'HBase',
  'Instagram',
  'JavaScript',
  'MVC',
  'MariaDB',
  'Microsoft',
  'MongoDB',
  'Motorola',
  'Mozilla',
  'MySQL',
  'MySpace',
  'NuGet',
  'Ocaml',
  'OpenOffice',
  'PHP',
  'PR',
  'PRs',
  'PayPal',
  'Perl',
  'PostgreSQL',
  'PowerPC',
  'PowerPoint',
  'PyTorch',
  'Qualcomm',
  'Redis',
  'Redshift',
  'S3',
  'SQLite',
  'SUSE',
  'SVN',
  'Scala',
  'Sega',
  'UI',
  'Ubuntu',
  'VoIP',
  'eBay',
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

let constants = days.concat(months, common_tech_words)

let string_to_key_val = (obj, val) => {
  obj[val.toLowerCase()] = val
  return obj
}

let constants_map = constants.reduce(string_to_key_val, {})

//convert array to key-value pairs
export let constants_key_val = { ...constants_map, ...words_with_apostrophe }

export let names_key_val = names.reduce(string_to_key_val, {})
export let abbreviations_key_val = abbreviations.reduce(string_to_key_val, {})
