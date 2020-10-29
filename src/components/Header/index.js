import React from 'react';
import { NavLink } from 'react-router-dom';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import ChatRoundedIcon from '@material-ui/icons/ChatRounded';

import logo from '../../assets/srztagram-logo.png';
import textLogo from '../../assets/srztagram-text.png';
import headerStyle from './styles';

function Header() {
  const style = headerStyle();

  return (
    <AppBar position='sticky' className={style.root} elevation={0}>
      <Container maxWidth='md' className={style.header}>
        <Toolbar className={style.toolbar}>
          <NavLink exact to='/'>
            <img src={logo} alt='logo' className={style.logo} />
            <img src={textLogo} alt='logo' className={style.textLogo} />
          </NavLink>
          <NavLink to='/messages'>
            <IconButton className={style.button}>
              <ChatRoundedIcon />
            </IconButton>
          </NavLink>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;
