import * as types from '../action-types';

const initState = {
  username: ''
};

export default function counter(state = initState, action) {
  switch (action.type) {
    case types.LOGIN_SUCCESS:
      return { username: action.payload };
    case types.LOGOUT_SUCCESS:
      return { username: '' };
    default:
      return state;
  }
};
