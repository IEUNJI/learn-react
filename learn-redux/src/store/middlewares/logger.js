const logger = store => dispatch => action => {
  console.log('prev state', store.getState());
  action = dispatch(action);
  console.log('next state', store.getState());
  return action;
};

export default logger;
