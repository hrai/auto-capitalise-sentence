"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.shouldCapitaliseForI = shouldCapitaliseForI;
exports.shouldCapitalise = shouldCapitalise;

function shouldCapitaliseForI(text) {
  var regex = /\s+i(\s+|')$/;
  var matches = regex.test(text);
  return matches;
}

function shouldCapitalise(text) {
  var multilineRegex = /\s*\n+\s*\w$/;
  var matches = multilineRegex.test(text);
  if (matches) return true;
  var sentenceRegex = /\w+\s*(\.|\?)+\s+\w$/;
  matches = sentenceRegex.test(text);

  if (!matches) {
    return text.length == 1;
  }

  return matches;
}