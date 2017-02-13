// Utilities


// TODO: Comments


// Moves function to the end of the call stack
function debounce(func, timeout = 0) {
  setTimeout(func, timeout);
}

function each(elements, callback) {
  [...elements].forEach(callback);
}


function isToggled(element, dataAttribute = 'active') {
  return element.hasAttribute(`data-${dataAttribute}`);
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
  debounce,
  each,
  isToggled,
  off,
  on,
  once,
  toggleElement,
};
