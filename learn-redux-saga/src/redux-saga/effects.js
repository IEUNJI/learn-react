export function take(actionType) {

  return {
    type: 'TAKE',
    actionType
  };
};

export function put(action) {

  return {
    type: 'PUT',
    action
  };
};

export function fork(task, ...args) {

  return {
    type: 'FORK',
    task,
    args
  };
};

export function* takeEvery(actionType, task) {
  yield fork(function* () {
    while (true) {
      yield take(actionType);
      yield task();
    }
  });
};

export function call(fn, ...args) {

  return {
    type: 'CALL',
    fn,
    args
  };
};

export function delay(...args) {
  const innerDelay = ms => new Promise(r => setTimeout(r, ms, ms));

  return call(innerDelay, ...args);
};

export function cps(fn, ...args) {

  return {
    type: 'CPS',
    fn,
    args
  };
};

export function all(iterators) {

  return {
    type: 'ALL',
    iterators
  };
};

export function cancel(task) {

  return {
    type: 'CANCEL',
    task
  };
};
