// Quick test of the getConvertedToSentenceCase function
function getConvertedToSentenceCase(text) {
  if (!text || typeof text !== 'string') return text;

  // Only capitalize first letter of sentences and common words, preserve all other casing
  let result = text;

  // Capitalize first letter of text (case-insensitive match, preserve rest)
  result = result.replace(/^\s*([a-z])/i, (match, letter) =>
    match.replace(letter, letter.toUpperCase())
  );

  // Capitalize first letter after sentence endings (preserve other casing)
  result = result.replace(
    /([.!?])\s+([a-z])/gi,
    (match, punctuation, letter) =>
      punctuation + match.slice(1).replace(letter, letter.toUpperCase())
  );

  // Capitalize first letter after line breaks (preserve other casing)
  result = result.replace(
    /(\n)\s*([a-z])/gi,
    (match, linebreak, letter) =>
      linebreak + match.slice(1).replace(letter, letter.toUpperCase())
  );

  // Capitalize "I" when it stands alone
  result = result.replace(/ i /g, ' I ');
  result = result.replace(/^i /g, 'I ');
  result = result.replace(/ i$/g, ' I');

  // Capitalize first letter after common abbreviations (Mr., Dr., etc.)
  result = result.replace(
    /\b(mr|mrs|ms|dr|prof|st)\.\s+([a-z])/gi,
    (match, abbrev, letter) =>
      abbrev.charAt(0).toUpperCase() +
      abbrev.slice(1).toLowerCase() +
      '.' +
      match.slice(abbrev.length + 1).replace(letter, letter.toUpperCase())
  );

  return result;
}

// Test the function
const testInput = 'hello i am here';
const result = getConvertedToSentenceCase(testInput);
console.log(`Input: "${testInput}"`);
console.log(`Output: "${result}"`);
console.log(`Expected: "Hello I am here"`);
console.log(`Test passes: ${result === 'Hello I am here'}`);

// Test other cases
const tests = [
  { input: 'yes i think so', expected: 'Yes I think so' },
  { input: 'hello world. i am fine', expected: 'Hello world. I am fine' },
];

tests.forEach(({ input, expected }) => {
  const actual = getConvertedToSentenceCase(input);
  console.log(`\nInput: "${input}"`);
  console.log(`Expected: "${expected}"`);
  console.log(`Actual: "${actual}"`);
  console.log(`Pass: ${actual === expected}`);
});
