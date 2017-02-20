// Utilities


// TODO: Comments
function createElement(tag, attributes, text) {
  const element = document.createElement(tag);
  Object.keys(attributes)
    .forEach(attribute => element.setAttribute(attribute, attributes[attribute]));

  if (text) {
    element.appendChild(
      document.createTextNode(text)
    );
  }

  return element;
}


// Moves function to the end of the call stack
function debounce(func, timeout = 0) {
  setTimeout(func, timeout);
}


function each(elements, callback) {
  [...elements].forEach(callback);
}


function getElement(selector, element = document) {
  return element.querySelector(selector);
}


function getElements(selector, element = document) {
  return [...element.querySelectorAll(selector)];
}


function toggleEventListener(element, eventListenerToggle, eventType, func) {
  element[`${eventListenerToggle}EventListener`](eventType, func);
}


function off(element, eventType, func) {
  toggleEventListener(element, 'remove', eventType, func);
}


function on(element, eventType, func) {
  toggleEventListener(element, 'add', eventType, func);
}


function once(element, eventType, functionToCall) {
  const eventListenerFunction = (event) => {
    off(element, eventType, eventListenerFunction);
    functionToCall(event);
  };

  on(element, eventType, eventListenerFunction);
}


function toggleElement(element, dataAttribute = 'active', attributeValue = '') {
  const attribute = `data-${dataAttribute}`;
  element.hasAttribute(attribute) ?
    element.removeAttribute(attribute) :
    element.setAttribute(attribute, attributeValue);
}


export {
  createElement,
  debounce,
  each,
  getElement,
  getElements,
  on,
  once,
  toggleElement,
};
