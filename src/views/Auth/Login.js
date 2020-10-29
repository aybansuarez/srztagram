import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';

import Alert from '../../components/Alert';
import { login, setUser } from '../../actions';
import { AUTH_API_URL } from '../../utils/constants';
import { authStyle } from './styles';

function Login({ history }) {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => state.isLoggedIn);

  if (isLoggedIn) history.push('/');

  const [status, setStatus] = useState({
    loading: false, type: '', message: ''
  });
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [open, setOpen] = useState(false);

  const loginSubmit = (e) => {
    e.preventDefault();
    setStatus({ loading: true, type: '', message: '' })
    const data = { username, password };
    axios.post(`${AUTH_API_URL}/login`, data, { withCredentials: true })
      .then(res => {
        setStatus({
          loading: false, type: 'success', message: 'Success! Logging you in...'
        });
        localStorage.setItem('auth-token', res.data.token);
        localStorage.setItem('srztagram-username', res.data.username);
        localStorage.setItem('srztagram-id', res.data.id);
        setOpen(true);
        setTimeout(() => {
          dispatch(setUser({ username, profile: res.data.id }));
          dispatch(login());
          history.push('/');
        }, 1000)
      })
      .catch(error => {
        setOpen(true);
        setStatus({
          loading: false, type: 'error', message: error.response.data.msg
        });
      });
  };
  const noValues = (username.length === 0 || password.length === 0);
  const style = authStyle();

  return (
    <Container maxWidth='xs' className={style.root}>
      {status.type && status.message &&
        <Alert
          severity={status.type}
          message={status.message}
          open={open}
          setOpen={setOpen}
        />
      }
      <Card className={style.media} />
      <form
        className={style.form}
        autoComplete='off'
        onSubmit={loginSubmit}
      >
        <TextField
          variant='filled'
          margin='dense'
          fullWidth
          size='small'
          value={username}
          label='Username/Email'
          type='text'
          className={style.input}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          variant='filled'
          margin='dense'
          fullWidth
          size='small'
          value={password}
          type='password'
          label='Password'
          className={style.input}
          onChange={(e) => setPassword(e.target.value)}
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
              /> Logging In
              </>
            :
            'Log In'
          }
        </Button>
        <Grid container className={style.footer}>
          Don't have an account?
            <Link className={style.link} to='/signup'>Sign Up</Link>!
          </Grid>
      </form>
    </Container>
  );
}

export default Login;
