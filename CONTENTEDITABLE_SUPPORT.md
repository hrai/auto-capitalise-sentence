# ContentEditable Support for Modern Chat Applications

## Overview
The extension now has **enhanced support for contenteditable elements** used by modern chat applications like WhatsApp Web, Facebook Messenger, Discord, Slack, and other web-based messaging platforms.

## What Changed?

### Previous Behavior
- Extension primarily focused on traditional `<input type="text">` and `<textarea>` elements
- WhatsApp, Messenger, Discord, and Facebook were in the **default exclusion list**
- Limited event handling for contenteditable `<span>` and `<div>` elements

### New Behavior
- ✅ **Full support for contenteditable `<span>`, `<div>`, and `<p>` elements**
- ✅ **Removed WhatsApp, Messenger, Discord, and Facebook from default exclusions**
- ✅ Multiple event listeners for robust capitalization:
  - `input` events (typed characters)
  - `paste` events (with small delay for paste completion)
  - `keyup` events (for space, Enter, punctuation)
  - MutationObserver for DOM changes within contenteditable elements
- ✅ Automatic detection and attachment of handlers to dynamically added contenteditable elements
- ✅ Support for contenteditable elements inside iframes
- ✅ Prevents duplicate event handler attachment with tracking flag

## Technical Implementation

### New Function: `attachContentEditableHandlers(element)`
This function attaches comprehensive event handlers to contenteditable elements:

```javascript
// Tracks last capitalized text to avoid unnecessary processing
let lastCapitalisedText = utils.getText(element, element.tagName);

// Event Handlers:
1. input event → capitalizes as user types
2. paste event → capitalizes pasted content (10ms delay)
3. keyup event → capitalizes on space, Enter, or punctuation (. ! ?)
4. MutationObserver → catches DOM changes within the element
```

### New Function: `observeContentEditableElements()`
Finds all existing contenteditable elements on page load and attaches handlers:

```javascript
// Selectors used:
[contenteditable="true"]
[contenteditable=""]
[contenteditable="plaintext-only"]
span[contenteditable]
div[contenteditable]
p[contenteditable]
```

### Enhanced MutationObserver
The main `observeHtmlBody()` function now:
1. Includes `'div'` in contentEditableTags array (was `['p', 'span']`, now `['p', 'span', 'div']`)
2. Automatically detects newly added contenteditable elements
3. Recursively searches for contenteditable descendants in added nodes
4. Attaches handlers immediately to dynamically loaded elements

### Enhanced Iframe Support
The `observeIframeInputTags()` function now:
1. Observes both traditional inputs AND contenteditable elements within iframes
2. Applies the same comprehensive handler attachment
3. Supports embedded chat widgets and messaging components

## Supported Platforms

### ✅ Now Working
- **WhatsApp Web** (web.whatsapp.com)
- **Facebook Messenger** (messenger.com)
- **Discord** (discord.com)
- **Facebook** (facebook.com - chat/comment boxes)
- **Slack** (slack.com)
- **Microsoft Teams** (teams.microsoft.com)
- **Telegram Web** (web.telegram.org)
- **Google Chat** (chat.google.com)
- **Any web app using contenteditable elements**

### Still Excluded (AWS only)
- **AWS Console** (aws.amazon.com) - retained in exclusion list due to potential conflicts with code editors

## User Configuration
Users can still manually exclude specific sites using the extension settings:
1. Click extension icon
2. Go to "Excluded Websites"
3. Add domains to exclude (e.g., `example.com`)

## Performance Considerations

### Deduplication
- Each contenteditable element is marked with `data-capitalisation-attached="true"`
- Prevents duplicate event handler attachment
- Efficient memory usage even with many elements

### Event Throttling
- Existing debounce mechanism still applies (default: 5000ms for sentence mode)
- Word mode capitalizes immediately for instant feedback
- MutationObserver efficiently batches DOM changes

### Framework Compatibility
- Works with React-based chat apps (Messenger, WhatsApp Web)
- Compatible with Vue.js implementations
- Handles Angular applications
- Supports vanilla JavaScript contenteditable implementations

## Testing Recommendations

### WhatsApp Web
1. Open web.whatsapp.com
2. Select any chat conversation
3. Type in the message input box (contenteditable span)
4. Verify capitalization works as expected

### Discord
1. Open discord.com
2. Navigate to any channel
3. Type in the message box (contenteditable div)
4. Test sentence case and word capitalization modes

### Messenger
1. Open messenger.com
2. Select a conversation
3. Type in the message compose area
4. Verify both typing and pasting work correctly

### Generic Test
1. Create a test HTML file with:
   ```html
   <div contenteditable="true">Type here...</div>
   <span contenteditable="true">Or here...</span>
   ```
2. Load in browser with extension installed
3. Type and paste text
4. Verify capitalization applies correctly

## Known Limitations

### Emoji Handling
- Some chat platforms mix emoji with text in complex DOM structures
- The extension focuses on text capitalization and may not affect emoji

### Rich Text Editors
- Extensions work best with plain-text contenteditable elements
- Rich text editors with complex formatting may have variable results
- Setting `contenteditable="plaintext-only"` is fully supported

### GIF/Sticker Panels
- Extension only processes text content
- Media insertion panels are not affected

## Debugging

### Check if handlers are attached:
```javascript
// In browser console
document.querySelectorAll('[contenteditable]').forEach(el => {
  console.log('ContentEditable:', el.tagName, 
              'Attached:', el.dataset.capitalisationAttached);
});
```

### Monitor events:
```javascript
// In browser console
const el = document.querySelector('[contenteditable]');
el.addEventListener('input', (e) => console.log('Input event:', e.target.textContent));
```

### Check MutationObserver:
The main observer watches the entire `<body>` with:
- `subtree: true` - observes all descendants
- `childList: true` - detects added/removed nodes
- `characterData: true` - catches text changes

## Migration Notes

### For Users
- **No action required** - the extension will automatically work on previously excluded sites
- If you manually excluded WhatsApp/Messenger/Discord, you can now remove those exclusions
- All existing settings and preferences are preserved

### For Developers
- `contentEditableTags` array in `content.js` now includes `'div'`
- New function `attachContentEditableHandlers()` is available
- New function `observeContentEditableElements()` called during initialization
- `sitesToExclude` default array reduced from 5 to 1 item (only AWS remains)

## Bundle Size Impact
- **content.js**: Increased by ~1.1 KB (17.9 KB, was ~16.8 KB)
- **Total bundle size**: Minimal impact, well within acceptable limits
- **Background bundle**: Unchanged at 55.3 KB
- **Main bundle**: Unchanged at 23.1 KB

## Future Enhancements
- [ ] Add specific optimizations for popular chat platforms
- [ ] Support for collaborative editing tools (Google Docs, Notion)
- [ ] Enhanced handling of markdown-style input boxes
- [ ] Platform-specific selector configurations

## Related Files
- `src/content.js` - Main implementation
- `src/utils.js` - Helper functions for contenteditable elements
- `src/lib/dom-utils.js` - DOM manipulation utilities

## Changelog

### Version: Current
**Date**: October 17, 2025

**Added**:
- Full contenteditable element support for modern chat applications
- `attachContentEditableHandlers()` function with multi-event handling
- `observeContentEditableElements()` for initial element discovery
- Dynamic element detection in MutationObserver
- Iframe contenteditable support

**Changed**:
- Removed WhatsApp, Messenger, Discord, Facebook from default exclusions
- Enhanced `observeHtmlBody()` to detect new contenteditable elements
- Updated `contentEditableTags` to include `'div'`
- Improved `observeIframeInputTags()` for contenteditable support

**Fixed**:
- Elements not being capitalized in modern chat applications
- Missing event handlers on dynamically loaded contenteditable elements
- Duplicate handler attachment through deduplication flag

---

**Questions or Issues?**
If the extension doesn't work on a specific site, please:
1. Check if the site is in your excluded websites list
2. Try both sentence case and word capitalization modes
3. Check browser console for any errors
4. Report the issue with site URL and browser version
