// Simple test of the complete function
function getConvertedToSentenceCase(text) {
  if (!text || typeof text !== 'string') return text;

  // Only capitalize first letter of sentences and common words, preserve all other casing
  return (
    text
      // Capitalize first letter of text (case-insensitive match, preserve rest)
      .replace(/^\s*([a-z])/i, (match, letter) =>
        match.replace(letter, letter.toUpperCase())
      )
      // Capitalize first letter after sentence endings (preserve other casing)
      .replace(
        /([.!?])\s+([a-z])/gi,
        (match, punctuation, letter) =>
          punctuation + match.slice(1).replace(letter, letter.toUpperCase())
      )
      // Capitalize first letter after line breaks (preserve other casing)
      .replace(
        /(\n)\s*([a-z])/gi,
        (match, linebreak, letter) =>
          linebreak + match.slice(1).replace(letter, letter.toUpperCase())
      )
      // Capitalize "I" when it stands alone
      .replace(/\bi\b/g, 'I')
      // Capitalize first letter after common abbreviations (Mr., Dr., etc.)
      .replace(
        /\b(mr|mrs|ms|dr|prof|st)\.\s+([a-z])/gi,
        (match, abbrev, letter) =>
          abbrev.charAt(0).toUpperCase() +
          abbrev.slice(1).toLowerCase() +
          '.' +
          match.slice(abbrev.length + 1).replace(letter, letter.toUpperCase())
      )
  );
}

const testCases = [
  'hello i am here',
  'yes i think so',
  'hello world. i am fine',
];

testCases.forEach((input) => {
  const output = getConvertedToSentenceCase(input);
  console.log(`Input:  "${input}"`);
  console.log(`Output: "${output}"`);
  console.log('');
});
