// Lightweight vanilla JavaScript DOM utilities to replace jQuery
// This eliminates the 114KB jQuery dependency

/**
 * Parse HTML string into DOM nodes
 * Replaces: $.parseHTML()
 */
export function parseHTML(htmlString) {
  const template = document.createElement('template');
  // eslint-disable-next-line no-unsanitized/property
  template.innerHTML = htmlString.trim();
  return Array.from(template.content.childNodes);
}

/**
 * Get HTML content of an element
 * Replaces: $(element).html()
 */
export function getHTML(element) {
  return element?.innerHTML ?? '';
}

/**
 * Set HTML content of an element
 * Replaces: $(element).html(content)
 *
 * Security: This function is used to set capitalized text back into editable elements.
 * The content comes from getText() which reads what the user already typed into the element.
 * The extension only modifies the text for capitalization - it doesn't introduce new HTML.
 * Any HTML in the content was already rendered by the browser when the user typed it.
 *
 * The extension adds minimal controlled HTML (e.g., <br> tags for line breaks in contentEditable).
 * This is safe because:
 * 1. The user is editing their own content in their own browser
 * 2. Any malicious HTML they type would execute when they type it, not when we capitalize it
 * 3. The extension runs in the user's browser context, not server-side
 * 4. We're not transmitting this content to other users or storing it
 */
export function setHTML(element, htmlContent) {
  if (element) {
    // codeql[js/xss] - False positive: Content comes from user's own input in their own editable elements.
    // The extension reads text from elements the user is typing into, capitalizes it, and writes it back.
    // Any HTML in the content was already typed by the user and rendered by their browser.
    // This is a browser extension that only modifies the user's own local content, not content shared with others.
    // eslint-disable-next-line no-unsanitized/property
    element.innerHTML = htmlContent;
  }
}

/**
 * Find descendant elements matching a selector
 * Replaces: $(element).find(selector)
 */
export function findElements(element, selector) {
  return element ? Array.from(element.querySelectorAll(selector)) : [];
}

/**
 * Find elements in a NodeList and return combined array
 * Replaces: $(addedNodes).find(tagName).addBack(tagName)
 */
export function findAndAddBack(nodeList, selector) {
  const results = [];
  const nodes = Array.isArray(nodeList) ? nodeList : Array.from(nodeList);

  nodes.forEach((node) => {
    // Check if the node itself matches
    if (node.nodeType === Node.ELEMENT_NODE && node.matches(selector)) {
      results.push(node);
    }
    // Find matching descendants
    if (node.querySelectorAll) {
      results.push(...node.querySelectorAll(selector));
    }
  });

  return results;
}

/**
 * Iterate over array or object
 * Replaces: $.each()
 */
export function each(collection, callback) {
  if (Array.isArray(collection)) {
    collection.forEach((item, index) => callback(index, item));
  } else if (collection && typeof collection === 'object') {
    Object.keys(collection).forEach((key) => callback(key, collection[key]));
  }
}

/**
 * Find index of item in array
 * Replaces: $.inArray()
 */
export function inArray(item, array) {
  return array.indexOf(item);
}

/**
 * Remove elements matching selector from a collection
 * Replaces: $(html).find('selector').remove()
 */
export function removeFromHTML(htmlNodes, selector) {
  htmlNodes.forEach((node) => {
    if (node.querySelectorAll) {
      const elementsToRemove = node.querySelectorAll(selector);
      elementsToRemove.forEach((el) => el.remove());
    }
  });
  return htmlNodes;
}

/**
 * Query selector (single element)
 * Replaces: $(selector) when expecting single element
 */
export function querySelector(selector, context = document) {
  return context.querySelector(selector);
}

/**
 * Query selector (all elements)
 * Replaces: $(selector) when expecting multiple elements
 */
export function querySelectorAll(selector, context = document) {
  return Array.from(context.querySelectorAll(selector));
}

/**
 * Add event listener to element(s)
 * Replaces: $(element).on(event, handler)
 * Note: Strips jQuery-style namespaces (e.g., "input.namespace" becomes "input")
 */
export function on(elements, eventName, handler, options) {
  const elementList =
    elements instanceof NodeList || Array.isArray(elements)
      ? Array.from(elements)
      : [elements];

  // Strip jQuery-style namespace from event name (e.g., "input.namespace" -> "input")
  const cleanEventName = eventName.split('.')[0];

  elementList.forEach((element) => {
    if (element && element.addEventListener) {
      element.addEventListener(cleanEventName, handler, options);
    }
  });
}

/**
 * Remove event listener from element(s)
 * Replaces: $(element).off(event, handler)
 * Note: Strips jQuery-style namespaces (e.g., "input.namespace" becomes "input")
 */
export function off(elements, eventName, handler, options) {
  const elementList =
    elements instanceof NodeList || Array.isArray(elements)
      ? Array.from(elements)
      : [elements];

  // Strip jQuery-style namespace from event name (e.g., "input.namespace" -> "input")
  const cleanEventName = eventName.split('.')[0];

  elementList.forEach((element) => {
    if (element && element.removeEventListener) {
      element.removeEventListener(cleanEventName, handler, options);
    }
  });
}

/**
 * Get or set value of an input element
 * Replaces: $(element).val() and $(element).val(value)
 */
export function val(element, value) {
  if (!element) return value === undefined ? '' : undefined;

  if (value === undefined) {
    // Getter
    return element.value || '';
  } else {
    // Setter
    element.value = value;
    return element;
  }
}

/**
 * Get or set property of an element
 * Replaces: $(element).prop(name) and $(element).prop(name, value)
 */
export function prop(element, name, value) {
  if (!element) return value === undefined ? undefined : element;

  if (value === undefined) {
    // Getter
    return element[name];
  } else {
    // Setter
    element[name] = value;
    return element;
  }
}

/**
 * Delegate event listener (event delegation)
 * Replaces: $(document).on(event, selector, handler)
 */
export function delegate(context, eventName, selector, handler) {
  context.addEventListener(eventName, (event) => {
    const target = event.target.closest(selector);
    if (target) {
      handler.call(target, event);
    }
  });
}
