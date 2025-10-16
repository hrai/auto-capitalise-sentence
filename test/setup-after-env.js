// Global Jest setup after env: ensure timers restored and provide helper resets
import { __resetAllOptionsAndDictionariesForTests } from '../src/utils';

// jQuery has been removed from the extension

beforeEach(() => {
  if (typeof __resetAllOptionsAndDictionariesForTests === 'function') {
    __resetAllOptionsAndDictionariesForTests();
  }
});
