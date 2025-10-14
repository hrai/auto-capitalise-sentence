const utils = require('../src/utils.js');

console.log('Testing getConvertedToSentenceCase:');
console.log('');

const testCases = [
  'hello i am here',
  'yes i think so',
  'hello world. i am fine',
];

testCases.forEach((input) => {
  const output = utils.getConvertedToSentenceCase(input);
  console.log(`Input:  "${input}"`);
  console.log(`Output: "${output}"`);
  console.log('');
});
