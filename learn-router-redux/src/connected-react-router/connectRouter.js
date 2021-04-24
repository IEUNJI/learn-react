import {
  LOCATION_CHANGE
} from './constants';

export default function connectRouter(history) {
  const initState = {
    location: history.location,
    action: history.action
  };

  return function (state = initState, action) {
    switch (action.type) {
      case LOCATION_CHANGE:
        return action.payload;
      default:
        return state;
    }
  };
};
