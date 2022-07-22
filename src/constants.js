import { names } from './name-constants';
import { acronyms } from './acronym-constants';
import { locations } from './location-constants';
import { arrayToMap } from './utils';

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
  hows: "how's",
  isnt: "isn't",
  ias: "I'as",
  im: "I'm",
  ive: "I've",
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

let expansions = {
  diag: 'diagram',
  eg: 'example',
  lib: 'library',
  mig: 'migration',
  msg: 'message',
  msgs: 'messages',
  np: 'no problem',
  nw: 'no worries',
  pkg: 'package',
  pkgs: 'packages',
  pls: 'please',
  prob: 'problem',
  probs: 'problems',
  prolly: 'probably',
  pwd: 'password',
  req: 'request',
  reqs: 'requests',
  svc: 'service',
  svcs: 'services',
  tho: 'though',
  thru: 'through',
  thx: 'thanks',
  tix: 'tickets',
};

let commonConstants = ['Xmas', 'Christmas', 'Easter', 'Diwali', 'Holi'];

let constants = days.concat(months, commonConstants);

let constantsMap = arrayToMap(constants);

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

export let namesKeyValuePairs = arrayToMap(names);
export let acronymsKeyValuePairs = arrayToMap(acronyms);
export let locationsKeyValuePairs = arrayToMap(locations);
