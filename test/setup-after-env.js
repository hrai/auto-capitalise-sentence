// Global Jest setup after env: ensure timers restored and provide helper resets
import { __resetAllOptionsAndDictionariesForTests } from '../src/utils';

beforeEach(() => {
  if (typeof __resetAllOptionsAndDictionariesForTests === 'function') {
    __resetAllOptionsAndDictionariesForTests();
  }
});
