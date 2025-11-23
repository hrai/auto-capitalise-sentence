# What is this extension?

Firefox/Microsoft Edge Chromium add-on to automatically capitalise words while typing.

## Features

- Capitalise the first letter of a sentence.
- Capitalise the word `I`.
- Capitalise common [names](src/name-constants.js#L1)
- Capitalise common [locations/places](src/location-constants.js#L1)
- Capitalise common [abbreviations/acronyms](src/acronym-constants.js#L1)
- Capitalise constants such as [days](src/constants.js#L6), [months](src/constants.js#L16)
- Add apostrophe to common [English words](src/constants.js#L27)
- Capitalise custom words
- Optional Sentence Case mode (preserve internal word casing while capitalising sentence starts and standalone "I")
- Per-field debounced processing to reduce performance impact (configurable delay)

### Processing Modes

**Word Case Mode (Default):**
- Immediate capitalization as you type
- Real-time feedback for most features
- Optimized for responsive typing experience

**Sentence Case Mode:**
- All capitalization waits for the debounce delay (default: 5 seconds)  
- No immediate processing - preserves exact typing flow
- Comprehensive sentence structure analysis after timeout
- Ideal for complex editing scenarios or when you prefer uninterrupted typing

## Configuration/Settings

There are 4 sections to configure the extension.

- Excluded websites: If you don't want the words to be auto-capitalised, you can add the website's name in the textarea and save it.

  ![excluded-websites](imgs/excluded-websites.png)

- Included words: If you want to capitalise some custom words, you can add them here.

  ![included-words](imgs/included-words.png)

- Excluded words: If you want to exclude words from being auto-capitalised, you can add the words in the textarea and save it.

  ![excluded-words](imgs/excluded-words.png)

- Enable/disable features: If you don't want any of the features provided by this extension, you can disable it here.

  ![features](imgs/features.png)

### Debounce Delay Configuration

Configure how long the extension waits after your last keystroke before performing capitalization processing.

**Defaults:**
- Default delay: 5000 ms (5 seconds)
- Range: 0 – 60000 ms

**Behavior by Mode:**

**Word Case Mode:**
- Most features apply immediately (no delay)
- Debounce only affects complex sentence processing
- Setting delay to 0 disables debouncing entirely

**Sentence Case Mode:**  
- ALL capitalization waits for the full debounce delay
- No immediate processing regardless of delay setting
- Comprehensive analysis runs only after timeout expires

**General Behavior:**
- Sliding window: each new keystroke resets the timer
- Each editable field gets its own independent timer
- Lower delays increase responsiveness but may impact performance

**Recommendations:**
- **Word Case**: 1000–3000 ms for balanced performance
- **Sentence Case**: 3000–5000 ms for optimal typing flow  
- **Complex editors**: 5000+ ms to avoid interruptions during long typing sessions

To change it, open the extension popup settings and update the Debounce Delay (ms) field. The change applies immediately to all newly observed inputs.

## Add-on download links

- [Chrome](https://chrome.google.com/webstore/detail/auto-capitalise-sentence/ibihgblnfolhldgjbikghldfhkgknlpa?hl=en-GB)
- [Firefox](https://addons.mozilla.org/en-US/firefox/addon/auto-capitalise-sentence/)
- [Microsoft Edge](https://microsoftedge.microsoft.com/addons/detail/auto-capitalise-sentence/ifebcbphlfoifeajpbecncpgjflpbann)

## Exceptions

Certain sites reset the text change so this extension will not work on them.

- Reddit
- WhatsApp Web
- Facebook Messenger
- Discord


## How to contribute?

### Sponsor

- [Donate/Sponsor](https://github.com/sponsors/hrai) the project

### Raise issues

- Please feel free to raise issues on the GitHub issues page: [Issue Tracker](https://github.com/hrai/auto-capitalise-extension/issues)
- PRs are welcome! :)

## Developer notes

- Running tests: this project uses Jest. From the repository root run `npm test` to execute the full test suite.
- Recent tests required a small content-script guard and a cached snapshot persistence fix. If you import `src/content.js` into a non-extension environment (such as unit tests), ensure `webextension-polyfill` is mocked or available; the code now safely guards `browser.storage` access.
- Branches: the repo historically used `master` as the primary branch; a `main` branch now exists and mirrors `master` for users who expect `main`.

If you plan to run tests locally, make sure dependencies are installed with Yarn:

```bash
yarn install
```

Then run the test suite:

```bash
yarn test
```

If you see failures related to webextension APIs, the tests expect `webextension-polyfill` to be mocked (see `test/*` for examples).
