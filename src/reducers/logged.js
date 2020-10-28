const initialState = localStorage.getItem('auth-token') ? true : false;

const loggedReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN':
      return true;
    case 'LOGOUT':
      return false;
    default:
      return state;
  }
}

export default loggedReducer;
