import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';

import Alert from '../../components/Alert';
import { AUTH_API_URL } from '../../utils/constants';
import { authStyle } from './styles';

function Login({ history }) {
  const isLoggedIn = useSelector(state => state.isLoggedIn);
  const isDisabled = useRef(false)
  if (isLoggedIn) history.push('/');

  const [status, setStatus] = useState({
    loading: false, type: '', message: ''
  });
  const [username, setUsername] = useState('');
  const [open, setOpen] = useState(false);

  const resetSubmit = (e) => {
    e.preventDefault();
    setStatus({ loading: true, type: '', message: '' });
    axios.post(
      `${AUTH_API_URL}/reset-password`, { username }, { withCredentials: true })
      .then((res) => {
        isDisabled.current = true;
        setOpen(true);
        setStatus({
          loading: false, type: 'info', message: res.data.msg
        });
      })
      .catch((err) => {
        console.log(err)
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
        onSubmit={resetSubmit}
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
        <Button
          type='submit'
          className={style.button}
          fullWidth
          variant='contained'
          disabled={status.loading || !username || isDisabled.current}
        >
          {status.loading ?
            <>
              <CircularProgress
                size={20}
                color='inherit'
                className={style.spinner}
              /> Sending
              </>
            :
            'Reset Password'
          }
        </Button>
      </form>
    </Container>
  );
}

export default Login;
