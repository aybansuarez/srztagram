import React, { useState, useEffect } from 'react';
import { useLocation} from 'react-router-dom';
import axios from 'axios';
import queryString from 'query-string';

import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';

import Alert from '../../components/Alert';
import { AUTH_API_URL } from '../../utils/constants';
import { authStyle } from './styles';

function Login({ history }) {
  const location = useLocation();
  const token = queryString.parse(location.search).token;
  const [status, setStatus] = useState({
    loading: false, type: '', message: ''
  });
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [open, setOpen] = useState(false);

  if (!token) history.push('/')

  useEffect(() => {
    if (token) {
      axios.get(
        `${AUTH_API_URL}/verify-pass-token/${token}`, { withCredentials: true })
        .catch((err) => {
          history.push('/');
        });
    }
  }, [token, history]);

  const newPassSubmit = (e) => {
    e.preventDefault();
    const data = { password, confirmPassword, token }
    setStatus({ loading: true, type: '', message: '' });
    axios.post(
      `${AUTH_API_URL}/reset-password/new`, data, { withCredentials: true })
      .then((res) => {
        setOpen(true);
        setStatus({
          loading: false, type: 'success', message: res.data.msg
        });
        setTimeout(() => {
          history.push('/login');
        }, 3000)
      })
      .catch((err) => {
        setOpen(true);
        setStatus({
          loading: false, type: 'error', message: err.response.data.msg
        });
      })
  };

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
        onSubmit={newPassSubmit}
      >
        <TextField
          variant='filled'
          margin='dense'
          fullWidth
          size='small'
          value={password}
          label='Password'
          type='password'
          className={style.input}
          onChange={(e) => setPassword(e.target.value)}
        />
        <TextField
          variant='filled'
          margin='dense'
          fullWidth
          size='small'
          value={confirmPassword}
          label='Confirm Password'
          type='password'
          className={style.input}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <Button
          type='submit'
          className={style.button}
          fullWidth
          variant='contained'
          disabled={status.loading || !password || !confirmPassword}
        >
          {status.loading ?
            <>
              <CircularProgress
                size={20}
                color='inherit'
                className={style.spinner}
              /> Updating
              </>
            :
            'Update Password'
          }
        </Button>
      </form>
    </Container>
  );
}

export default Login;
