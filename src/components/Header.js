import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from 'react-bootstrap';

import Logo from '../components/Logo';

function Header() {
  return (
    <Navbar style={{ borderBottom: '.5px solid #c0c0c0' }}>
      <Link className="navbar-brand text-center mx-auto" to="/">
        <Logo width={'20%'} />
      </Link>
    </Navbar>
  )
}

export default Header;