const signupReducer = (state = false, action) => {
  switch (action.type) {
    case 'SIGNUP':
      return true;
    case 'NOT_SIGNUP':
      return false;
    default:
      return state;
  }
}

export default signupReducer;