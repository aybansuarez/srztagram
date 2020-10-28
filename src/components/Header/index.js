import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Container from '@material-ui/core/Container';

import logo from '../../assets/srztagram-logo.png';
import textLogo from '../../assets/srztagram-text.png';
import headerStyle from './styles';

function Header() {
  const style = headerStyle();

  return (
    <AppBar position='sticky' className={style.root} elevation={0}>
      <Container maxWidth='md'>
        <Toolbar className={style.toolbar}>
          <img src={logo} alt='logo' className={style.logo} />
          <img src={textLogo} alt='logo' className={style.textLogo} />
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;
