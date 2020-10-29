export const login = () => {
  return {
    type: 'LOGIN'
  };
};

export const logout = () => {
  return {
    type: 'LOGOUT'
  };
};

export const setUser = (user) => {
  return {
    type: 'SET_USER',
    user: {
      username: user.username,
      profile: user.profile,
    }
  };
};

export const unsetUser = () => {
  return {
    type: 'UNSET_USER',
    user: {
      username: '',
      profile: '',
    }
  };
};
