const logger = store => dispatch => action => {
  console.log('prev state', store.getState());
  dispatch(action);
  console.log('next state', store.getState());
};

export default logger;
