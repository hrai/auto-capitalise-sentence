/* eslint-env jest */
// Verify that when defaults are auto-enabled on startup the cached snapshot is persisted to local storage

jest.mock('webextension-polyfill', () => {
  return {
    storage: {
      local: {
        set: jest.fn(),
        get: jest.fn().mockResolvedValue({}),
      },
      sync: {
        get: jest.fn().mockResolvedValue({}),
        set: jest.fn(),
      },
    },
  };
});

const browser = require('webextension-polyfill');
const utils = require('../src/utils');
const constants = require('../src/plugin-constants');

describe('cached snapshot persistence on startup', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    // avoid utils side-effects (they are tested elsewhere)
    jest.spyOn(utils, 'setShouldCapitaliseOption').mockImplementation(() => {});
    jest.spyOn(utils, 'setKeyValue').mockImplementation(() => {});
    jest.spyOn(utils, 'setWordsToExclude').mockImplementation(() => {});
  });

  it('persists a cached snapshot to local storage when auto-enabling defaults', async () => {
    // Import content module after mocks - it exports processResponse
    const content = require('../src/content');

    // Simulate a storageDict with no sentence-case flag and no word flags -> should auto-enable defaults
    const storageDict = {};

    // Call processResponse synchronously
    content.processResponse(storageDict);

    // Expect that local.set was called with a cached snapshot entry
    const calls = browser.storage.local.set.mock.calls;
    // Find call where cached snapshot key is present
    const found = calls.some((args) => {
      const obj = args[0] || {};
      return Object.prototype.hasOwnProperty.call(
        obj,
        constants.cachedWordFlagsSnapshot
      );
    });

    expect(found).toBe(true);
  });
});
