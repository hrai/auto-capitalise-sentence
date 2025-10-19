# Fix for Premature 'i' Capitalization

## Problem
The extension was capitalizing the letter 'i' **before** a space or punctuation was added. This caused issues when typing words that start with 'i' such as:
- "item" → was becoming "Item" prematurely
- "in" → was becoming "In" prematurely  
- "if" → was becoming "If" prematurely
- "is" → was becoming "Is" prematurely

The user would type "i" and it would be capitalized immediately, even though they might be typing "item", not the standalone pronoun "I".

## Root Cause
The original `shouldCapitaliseForI` function was using this regex:
```javascript
const regex = /\s+i(?=\s+|'|$|[.,!?])/;
```

The problem was the `$` (end-of-string) anchor. This caused the function to return `true` when the text ended with " i", meaning it would capitalize BEFORE the user typed the next character (space or letter).

## Solution
Changed the logic to **only** capitalize 'i' when it's confirmed to be standalone by checking if it's followed by a non-alphabetic character:

### Updated `shouldCapitaliseForI` function:
```javascript
export function shouldCapitaliseForI(text) {
  // Only capitalize 'i' when followed by a non-alphabetic character (space, punctuation, etc.)
  // This prevents premature capitalization while typing words like "item", "in", "if", etc.
  // Remove end-of-string ($) anchor to avoid capitalizing before space is added
  // Match 'i' at start of string OR after whitespace, when followed by space/punctuation
  const regex = /(^|\s)i(?=\s|[.,!?;:'")\]}])/;
  return regex.test(text);
}
```

Key changes:
1. **Removed `$` anchor** - No longer matches 'i' at end of string
2. **Added `(^|\s)`** - Matches 'i' at start of string OR after whitespace
3. **Removed `\s+` requirement after 'i'** - Now matches single space or punctuation
4. **Expanded punctuation list** - Includes `;`, `:`, `'`, `"`, `)`, `]`, `}`

### Updated `getCapitalisedContentForI` function:
```javascript
export function getCapitalisedContentForI(text) {
  // Find and capitalize standalone 'i' preceded by whitespace or at start
  // Use replace to only capitalize the 'i', not the surrounding characters
  return text.replace(/(^|\s)i(\s|[.,!?;:'")\]}])/g, '$1I$2');
}
```

Key changes:
1. **Uses regex replace** instead of manipulating last two characters
2. **Handles multiple 'i' instances** with global flag `g`
3. **Preserves surrounding characters** using capture groups `$1` and `$2`
4. **Matches 'i' at start** with `(^|\s)`

## Behavior Changes

### Before Fix:
```
User types: "hello i"
Result: "hello I"  ❌ (capitalized immediately, even though might type "item" next)
```

### After Fix:
```
User types: "hello i"
Result: "hello i"  ✅ (not capitalized yet)

User types: "hello i "  (adds space)
Result: "hello I "  ✅ (NOW capitalized because confirmed standalone)

User types: "hello it"  (adds 't')
Result: "hello it"  ✅ (not capitalized because part of word)
```

## Testing
Created comprehensive test suite in `test/i-capitalization-fix.test.js` with 14 test cases covering:

1. **Not triggering prematurely**:
   - 'i' at end of string should NOT capitalize
   - 'i' as part of word ("item", "in", "if") should NOT capitalize

2. **Triggering correctly**:
   - 'i' followed by space should capitalize
   - 'i' followed by punctuation (`.`, `,`, `!`, `?`, `;`, `:`) should capitalize
   - 'i' at start of sentence should capitalize

3. **Real-world scenarios**:
   - Typing "item" word-by-word
   - Typing standalone "I"
   - Multiple 'i' instances in a sentence

## Test Results
- All 79 tests pass ✅
- 14 new tests for 'i' capitalization ✅
- Build successful ✅
- Bundle size: 20.4 KB (main.bundle.js) ✅

## Files Modified
1. `src/utils.js`:
   - `shouldCapitaliseForI()` - Updated regex logic
   - `getCapitalisedContentForI()` - Updated replacement logic

2. `test/mode-switch.integration.test.js`:
   - Updated test to reflect new behavior (no longer capitalizing 'i' at end of string)

3. `test/i-capitalization-fix.test.js`:
   - New comprehensive test suite for 'i' capitalization

## Verification
To verify the fix works:

1. Type "hello i" → should remain "hello i"
2. Type "hello i " (add space) → should become "hello I "
3. Type "hello item" → should remain "hello item"
4. Type "i said" → should become "I said"
5. Type "yes i," → should become "yes I,"

The extension now only capitalizes 'i' when it's **confirmed** to be standalone by the presence of a non-alphabetic character after it.
