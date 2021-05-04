import $ from 'jquery';
import React from './';
import { Element } from './element';

function delegate(...args) {
  $(React.rootContainer).delegate(...args);
}

function undelegate(...args) {
  $(React.rootContainer).undelegate(...args);
}

function on(...args) {
  $(React.rootContainer).on(...args);
}

function trigger(...args) {
  $(React.rootContainer).trigger(...args);
}

function shouldDeepCompare(oldElement, newElement) {
  if (oldElement != null && newElement != null) {
    const oldType = typeof oldElement;
    const newType = typeof newElement;

    if (
      (oldType === 'string' || oldType === 'number') &&
      (newType === 'string' || newType === 'number')
    ) {
      return true;
    }

    if (
      oldElement instanceof Element &&
      newElement instanceof Element
    ) {
      return oldElement.type === newElement.type;
    }
  }

  return false;
}

function outerHTML(reactid, html) {
  document.querySelector(`[data-reactid="${reactid}"]`).outerHTML = html;
}

function innerHTML(reactid, html) {
  document.querySelector(`[data-reactid="${reactid}"]`).innerHTML = html;
}

export {
  delegate,
  undelegate,
  on,
  trigger,
  shouldDeepCompare,
  outerHTML,
  innerHTML
};
