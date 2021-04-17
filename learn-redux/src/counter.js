import { createStore } from './redux';

const initState = 0;

const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';

function reducer(state = initState, action) {
  switch (action.type) {
    case INCREMENT:
      return state + 1;
    case DECREMENT:
      return state - 1;
    default:
      return state;
  }
}

const store = createStore(reducer);

const counter = document.getElementById('counter');
const counterValue = document.getElementById('counter-value');
const incrementBtn = document.getElementById('increment-btn');
const decrementBtn = document.getElementById('decrement-btn');

counter.style.display = 'block';

function render() {
  counterValue.innerHTML = store.getState();
}

const unsubscribe = store.subscribe(render);

setTimeout(() => {
  unsubscribe();
}, 3000);

render();

incrementBtn.addEventListener('click', () => {
  store.dispatch({ type: INCREMENT });
});

decrementBtn.addEventListener('click', () => {
  store.dispatch({ type: DECREMENT });
});
