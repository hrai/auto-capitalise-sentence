// Global Jest setup after env: ensure timers restored and provide helper resets
import { __resetAllOptionsAndDictionariesForTests } from '../src/utils';

// Setup jQuery globally (moved from test-env.js to avoid setupFiles issue)
const $ = require('jquery');
global.$ = global.jQuery = $;

beforeEach(() => {
  if (typeof __resetAllOptionsAndDictionariesForTests === 'function') {
    __resetAllOptionsAndDictionariesForTests();
  }
});
