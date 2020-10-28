let username = localStorage.getItem('srztagram-username');
let id = localStorage.getItem('srztagram-id');

const initialState = {
  username, profile: id
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USER':
      return { ...action.user };
    case 'UNSET_USER':
      const blankState = {
        username: '',
        profile: '',
      }
      return blankState;
    default:
      return state;
  }
}

export default userReducer;
