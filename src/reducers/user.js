let user = localStorage.getItem('user') ? localStorage.getItem('user') : '';

if (user) {
  user = JSON.parse(user);
}

const initialState = {
  id: user ? user.id : '',
  email: user ? user.email : '',
  username: user ? user.username : '',
  profile: user ? user.profile : '',
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USER':
      return { ...action.user };
    case 'UNSET_USER':
      const blankState = {
        id: '',
        email: '',
        username: '',
        profile: '',
      }
      return blankState;
    default:
      return state;
  }
}

export default userReducer;