import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';

import { login } from '../../actions';
import { BACKEND_URL } from '../../utils/constants';
import { signupStyle } from './styles';

function Signup({ history }) {

  const isLoggedIn = useSelector(state => state.isLoggedIn);
  if (isLoggedIn) history.push('/');
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [status, setStatus] = useState({
    loading: false, type: '', message: ''
  });

  const noValues = (
    username.length === 0 || password.length === 0 ||
    email.length === 0 || confirmPassword.length === 0
  );

  const signupSubmit = (e) => {
    e.preventDefault();
    const data = { username, password, email, confirmPassword };
    setStatus({ loading: false, type: '', message: '' });
    axios.post(
      `${BACKEND_URL}/api/auth/signup`, data, { withCredentials: true })
      .then(() => {
        const data = { username, password }
        axios.post(`${BACKEND_URL}/api/auth/login`, data, { withCredentials: true })
          .then((res) => {
            localStorage.setItem('auth-token', res.data.token);
            localStorage.setItem('srztagram-username', res.data.username);
            localStorage.setItem('srztagram-id', res.data.id);
            setTimeout(() => {
              dispatch(login());
              history.push('/');
            }, 1000)
          })
      })
      .catch((error) => {
        setStatus({
          loading: false, type: 'error', message: error.response.data.msg
        });
      });
  };


  const style = signupStyle();

  return (
    <Container maxWidth='xs' className={style.root}>
      <Card className={style.media} />
      <form
        className={style.form}
        autoComplete='off'
        onSubmit={signupSubmit}
      >
        <TextField
          variant='outlined'
          margin='dense'
          fullWidth
          size='small'
          value={username}
          label='Username'
          type='text'
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          variant='outlined'
          margin='dense'
          fullWidth
          size='small'
          value={email}
          label='Email'
          type='email'
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          variant='outlined'
          margin='dense'
          fullWidth
          size='small'
          value={password}
          label='Password'
          type='password'
          onChange={(e) => setPassword(e.target.value)}
        />
        <TextField
          variant='outlined'
          margin='dense'
          fullWidth
          size='small'
          value={confirmPassword}
          label='Confirm Password'
          type='password'
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <Button
          type='submit'
          className={style.button}
          fullWidth
          variant='contained'
          disabled={status.loading || noValues ? true : false}
        >
          {status.loading ?
            <>
              <CircularProgress
                size={20}
                color='inherit'
                className={style.spinner}
              /> Signing Up
              </>
            :
            'Sign Up'
          }
        </Button>
        <Grid container className={style.footer}>
          Already have an account?
            <Link className={style.link} to='/'>Log In</Link>!
          </Grid>
      </form>
    </Container>
  );
}

export default Signup;
