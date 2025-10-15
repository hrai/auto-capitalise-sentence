// Simple test to verify the function works
import { getConvertedToSentenceCase } from './src/utils.js';

console.log('Testing function import...');
try {
  const result = getConvertedToSentenceCase('hello i am here');
  console.log('Input: "hello i am here"');
  console.log('Output:', JSON.stringify(result));
  console.log('Expected: "Hello I am here"');
  console.log('Test passed:', result === 'Hello I am here');
} catch (error) {
  console.error('Error:', error.message);
  console.error('Stack:', error.stack);
}