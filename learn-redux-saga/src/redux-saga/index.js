export default function createSagaMiddleware() {
  function createChannel() {
    const observer = {};

    function subscribe(actionType, callback) {
      observer[actionType] = callback;
    }

    function publish(action) {
      const { type: actionType } = action;

      const callback = observer[actionType];

      delete observer[actionType];

      callback && callback(action);
    }

    return {
      subscribe,
      publish
    };
  }

  const channel = createChannel();

  function sagaMiddleware({ dispatch, getState }) {
    function run(generator, callback, ...args) {
      let iterator;
      if (typeof generator[Symbol.iterator] === 'function') {
        iterator = generator;
      } else {
        iterator = generator(...args);
      }

      function next(value) {
        const { value: effect, done } = iterator.next(value);

        if (!done) {
          if (typeof effect[Symbol.iterator] === 'function') {
            run(effect);
            next();
          } else if (typeof effect.then === 'function') {
            effect.then(next);
          } else {
            switch (effect.type) {
              case 'TAKE':
                channel.subscribe(effect.actionType, next);
                break;
              case 'PUT':
                dispatch(effect.action);
                next();
                break;
              case 'FORK':
                const newTask = effect.task();
                run(newTask, null, ...effect.args);
                next(newTask);
                break;
              case 'CALL':
                effect.fn(...effect.args).then(next).catch(error => {
                  iterator.throw(error);
                });
                break;
              case 'CPS':
                effect.fn(...effect.args, next);
                break;
              case 'ALL':
                const times = (cb, length, count = 0) => () => (++count === length && cb());

                const done = times(next, effect.iterators.length);
                effect.iterators.forEach(iterator => run(iterator, done));
                break;
              case 'CANCEL':
                effect.task.return();
                break;
              default:
                break;
            }
          }
        } else {
          callback && callback();
        }
      }
      next();
    };
    sagaMiddleware.run = run;

    return function (next) {

      return function (action) {
        channel.publish(action);

        next(action);
      };
    };
  }


  return sagaMiddleware;
};
