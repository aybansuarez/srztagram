import { combineReducers } from 'redux';
import loggedReducer from './logged';
import userReducer from './user';
import signupReducer from './signup';

const allReducers = combineReducers({
  isLoggedIn: loggedReducer,
  currentUser: userReducer,
  signedUp: signupReducer,
})

export default allReducers;