import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import LockRoundedIcon from '@material-ui/icons/LockRounded';

import noAccessStyle from './styles';

function Header() {
  const style = noAccessStyle();
  const isLoggedIn = useSelector(state => state.isLoggedIn);

  return (
    <Container className={style.root}>
      <Avatar className={style.avatar}>
        <LockRoundedIcon />
      </Avatar>
      <Typography>This account is private.</Typography>
      {isLoggedIn ?
        <Typography>Follow to see the account's posts.</Typography>
        :
        <Typography>
          <Link to='/'>Login</Link> to see the account's posts.
        </Typography>
      }
    </Container>
  );
}

export default Header;
