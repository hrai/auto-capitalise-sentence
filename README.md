# What is this extension?

Firefox/Microsoft Edge Chromium add-on to automatically capitalise words while typing.

## Features

- Capitalise the first letter of a sentence.
- Capitalise the word `I`.
- Capitalise common [names](src/name-constants.js#L1)
- Capitalise common [locations/places](src/location-constants.js#L1)
- Capitalise common [abbreviations/acronyms](src/acronym-constants.js#L1)
- Capitalise constants such as [days](src/constants.js#L4), [months](src/constants.js#L14)
- Add apostrophe to common [English words](src/constants.js#L27)
- Capitalise custom words

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

## Add-on download links

- [Chrome](https://chrome.google.com/webstore/detail/auto-capitalise-sentence/ibihgblnfolhldgjbikghldfhkgknlpa?hl=en-GB)
- [Firefox](https://addons.mozilla.org/en-US/firefox/addon/auto-capitalise-sentence/)
- [Microsoft Edge](https://microsoftedge.microsoft.com/addons/detail/auto-capitalise-sentence/ifebcbphlfoifeajpbecncpgjflpbann)

## How to contribute?

### Sponsor

- [Donate/Sponsor](https://github.com/sponsors/hrai) the project

### Raise issues

- Please feel free to raise issues [here](https://github.com/hrai/auto-capitalise-extension/issues)
- PRs are welcome! :)
