import { combineReducers } from 'redux';
import loggedReducer from './logged';
import userReducer from './user';

const allReducers = combineReducers({
  isLoggedIn: loggedReducer,
  currentUser: userReducer,
})

export default allReducers;
