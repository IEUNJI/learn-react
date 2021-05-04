import React from './';
import { createUnit } from './unit';
import { trigger } from './utils';

function render(element, container) {
  React.rootContainer = container;

  const unit = createUnit(element);
  const markUp = unit.getMarkUp(React.rootId);

  container.innerHTML = markUp;
  trigger('mounted');
}

export {
  render
};
