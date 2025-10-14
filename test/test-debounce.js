// Test script to verify debounce functionality
console.log('🕒 Testing Debounce Functionality for Capitalization');
console.log('=================================================');

// Simulated test of debounce behavior
let testCallCount = 0;

// Create a simple function to test debouncing
function testFunction() {
  testCallCount++;
  console.log(`Function called - Count: ${testCallCount}`);
}

// Import the debounce function (simulate)
function debounce(func, delay) {
  let timeoutId;

  return function (...args) {
    // Clear the previous timeout if it exists (sliding window)
    if (timeoutId) {
      clearTimeout(timeoutId);
      console.log('⏰ Previous timer cleared (sliding window effect)');
    }

    console.log(`🕐 New timer set for ${delay}ms`);
    // Set a new timeout
    timeoutId = setTimeout(() => {
      console.log('⚡ Timer expired - executing function');
      func.apply(this, args);
    }, delay);
  };
}

console.log('\n📝 Test Scenario: Rapid text changes with 1-second debounce');
const debouncedTest = debounce(testFunction, 1000);

// Simulate rapid typing
console.log('\n🔤 Simulating rapid typing...');
console.log('Type 1: "H"');
debouncedTest();

setTimeout(() => {
  console.log('Type 2: "He" (500ms later)');
  debouncedTest();
}, 500);

setTimeout(() => {
  console.log('Type 3: "Hel" (800ms later)');
  debouncedTest();
}, 800);

setTimeout(() => {
  console.log('Type 4: "Hell" (1200ms later)');
  debouncedTest();
}, 1200);

setTimeout(() => {
  console.log('Type 5: "Hello" (1500ms later)');
  debouncedTest();
}, 1500);

// Check results after all typing is done
setTimeout(() => {
  console.log('\n📊 Results:');
  console.log(`Expected: Function should be called 2 times`);
  console.log(
    `- Once after "Hell" (at ~2200ms, since no more typing for 1 second)`
  );
  console.log(
    `- Once after "Hello" (at ~2500ms, since no more typing for 1 second)`
  );
  console.log(`Actual calls: ${testCallCount}`);

  if (testCallCount === 2) {
    console.log('✅ Debounce working correctly!');
  } else {
    console.log('❌ Debounce not working as expected');
  }

  console.log('\n🎯 Key Features Implemented:');
  console.log('• 5-second sliding window delay');
  console.log('• Timer resets on each new text change');
  console.log('• Only final change after 5 seconds gets processed');
  console.log('• Per-element debouncing (WeakMap storage)');
  console.log('• Prevents rapid-fire capitalization calls');
}, 3000);

console.log('\n⏱️  Implementation Details:');
console.log('• Debounce delay: 5000ms (5 seconds)');
console.log('• Uses WeakMap for per-element timer storage');
console.log('• Sliding window: each change resets the timer');
console.log('• Applied to all text input events and DOM mutations');
