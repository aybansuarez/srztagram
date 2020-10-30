import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import queryString from 'query-string';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CheckCircleRoundedIcon from '@material-ui/icons/CheckCircleRounded';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';

import { authStyle } from './styles';
import Spinner from '../../components/Spinner';
import logo from '../../assets/srztagram-text.png';
import { AUTH_API_URL } from '../../utils/constants';

function EmailVerify({ history }) {
  const style = authStyle();
  const location = useLocation();
  const [status, setStatus] = useState({ type: '', message: '' });

  let icon;
  let content = <Spinner />;
  const token = queryString.parse(location.search).token;

  if (!token) history.push('/login')

  useEffect(() => {
    if (token) {
      axios.post(
        `${AUTH_API_URL}/email-verify`, { token }, { withCredentials: true })
        .then((res) => {
          setStatus({ type: res.data.type, message: res.data.msg });
        })
        .catch((err) => {
          setStatus({
            type: err.response.data.type, message: err.response.data.msg
          });
        });
    }
  }, [token]);

  if (status.type && status.message) {
    if (status.type === '200')
      icon = <CheckCircleRoundedIcon className={style.success} />
    else
      icon = <CloseRoundedIcon className={style.error} />;

    content =
      <Grid className={style.verifyRoot}>
        <Grid className={style.iconDiv}>
          {icon}
          <img src={logo} alt='logo' className={style.verifyLogo} />
        </Grid>
        <hr className={style.divider} />
        <Typography variant='h6' className={style.message}>
          {status.message}
        </Typography>
        <Button
          component={Link}
          to='/login'
          variant='outlined'
          size='large'
          className={style.button}
        >
          Log In
          </Button>
      </Grid>
  }

  return (
    <Container maxWidth='md' className={style.root}>
      {content}
    </Container>
  );
}

export default EmailVerify;
