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
      id: user.id,
      email: user.email,
      username: user.username,
      profile: user.profile,
    }
  };
};

export const unsetUser = () => {
  return {
    type: 'UNSET_USER',
    user: {
      id: '',
      email: '',
      username: '',
      profile: '',
    }
  };
};

export const signUp = () => {
  return {
    type: 'SIGNUP',
  };
};

export const notSignUp = () => {
  return {
    type: 'NOT_SIGNUP',
  };
};
