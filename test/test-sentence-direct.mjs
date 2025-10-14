// Direct test of the getConvertedToSentenceCase function
import * as utils from '../src/utils.js';

console.log('Testing getConvertedToSentenceCase with I capitalization:');
console.log('');

const testInput = 'hello i am here';
const expectedOutput = 'Hello I am here';
const actualOutput = utils.getConvertedToSentenceCase(testInput);

console.log(`Input: "${testInput}"`);
console.log(`Expected: "${expectedOutput}"`);
console.log(`Actual: "${actualOutput}"`);
console.log(`Match: ${actualOutput === expectedOutput ? '✅ PASS' : '❌ FAIL'}`);

// Test other cases too
const testCases = [
  { input: 'yes i think so', expected: 'Yes I think so' },
  { input: 'hello world. i am fine', expected: 'Hello world. I am fine' }
];

testCases.forEach(({ input, expected }) => {
  const actual = utils.getConvertedToSentenceCase(input);
  console.log(`\nInput: "${input}"`);
  console.log(`Expected: "${expected}"`);
  console.log(`Actual: "${actual}"`);
  console.log(`Match: ${actual === expected ? '✅ PASS' : '❌ FAIL'}`);
});
