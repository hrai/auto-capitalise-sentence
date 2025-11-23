// Debounce utilities separated from utils.js to avoid mixing domain logic.
export const DEFAULT_DEBOUNCE_DELAY = 5000;

export function debounce(func, delay) {
  const normalisedDelay =
    Number.isFinite(delay) && delay >= 0 ? delay : DEFAULT_DEBOUNCE_DELAY;

  if (normalisedDelay === 0) {
    return function (...args) {
      return func.apply(this, args);
    };
  }

  let timeoutId;
  return function (...args) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => func.apply(this, args), normalisedDelay);
  };
}

// Value shape: { fn: Function, timeoutId: number|null }
let debouncedCapitalizationMap = new WeakMap();

export function __resetDebouncedMapForTests() {
  debouncedCapitalizationMap = new WeakMap();
}

export function clearDebouncedCapitalisationCache() {
  debouncedCapitalizationMap = new WeakMap();
}

export function flushAndClearDebouncedCapitalisations() {
  try {
    debouncedCapitalizationMap.forEach?.(() => {});
  } catch {
    /* ignore */
  }
}

export function cancelDebouncedForElement(element) {
  if (!element || typeof element !== 'object') return;
  try {
    const entry = debouncedCapitalizationMap.get(element);
    if (entry && entry.timeoutId) {
      clearTimeout(entry.timeoutId);
      entry.timeoutId = null;
    }
  } catch (e) {
    console.debug(
      'WeakMap access error (extension may be reloading):',
      e.message
    );
  }
}

// getDebouncedCapitaliseText: returns a wrapped debounced function for an element
// capitaliserFn must be provided by the caller (keeps this module independent)
export function getDebouncedCapitaliseText(
  element,
  delay = DEFAULT_DEBOUNCE_DELAY,
  capitaliserFn
) {
  if (!element || typeof element !== 'object') return () => {};

  const existing = debouncedCapitalizationMap.get(element);
  if (existing && typeof existing.fn === 'function') return existing.fn;

  let timeoutId = null;
  const wrapped = function (targetElement) {
    if (!targetElement || typeof targetElement !== 'object') return;
    if (timeoutId) clearTimeout(timeoutId);
    if (!Number.isFinite(delay) || delay < 0) delay = DEFAULT_DEBOUNCE_DELAY;
    if (delay === 0) {
      if (typeof capitaliserFn === 'function') {
        capitaliserFn(targetElement);
      }
      return;
    }
    timeoutId = setTimeout(() => {
      timeoutId = null;
      try {
        if (typeof capitaliserFn === 'function') {
          capitaliserFn(targetElement);
        }
      } catch {
        /* ignore */
      }
    }, delay);
    try {
      debouncedCapitalizationMap.set(element, { fn: wrapped, timeoutId });
    } catch (e) {
      console.debug(
        'WeakMap set error (extension may be reloading):',
        e.message
      );
    }
  };

  try {
    debouncedCapitalizationMap.set(element, { fn: wrapped, timeoutId });
  } catch (e) {
    console.debug('WeakMap set error (extension may be reloading):', e.message);
  }
  return wrapped;
}
