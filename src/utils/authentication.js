import axios from 'axios';
import { AUTH_API_URL } from './constants';

export const authenticate = async () => {
  let token = localStorage.getItem('auth-token');
  if (token === null) {
    localStorage.setItem('auth-token', '');
    localStorage.setItem('srztagram-username', '');
    localStorage.setItem('srztagram-id', '');
    token = '';
  }
  try {
    const response = await axios.post(`${AUTH_API_URL}/authenticate`, null,
      { headers: { 'auth-token': token }, withCredentials: true }
    );
    if (response.data) {
      const user = await axios.get(`${AUTH_API_URL}/current`,
        { headers: { 'auth-token': token }, withCredentials: true }
      );
      localStorage.setItem('srztagram-username', user.data.username);
      localStorage.setItem('srztagram-id', user.data.id);
      return user;
    }
  } catch (err) {
    localStorage.setItem('auth-token', '');
    localStorage.setItem('srztagram-username', '');
    localStorage.setItem('srztagram-id', '');
    return null;
  }
};
