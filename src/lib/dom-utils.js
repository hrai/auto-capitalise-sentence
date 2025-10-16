// Lightweight vanilla JavaScript DOM utilities to replace jQuery
// This eliminates the 114KB jQuery dependency

/**
 * Parse HTML string into DOM nodes
 * Replaces: $.parseHTML()
 */
export function parseHTML(htmlString) {
  const template = document.createElement('template');
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
 */
export function setHTML(element, htmlContent) {
  if (element) {
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
