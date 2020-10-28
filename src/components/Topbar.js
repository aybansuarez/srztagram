import React from 'react';
import { useHistory, Link, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Nav } from 'react-bootstrap';
import axios from 'axios';
import { FiLogIn, FiLogOut, FiSettings } from 'react-icons/fi';
import { CgProfile } from 'react-icons/cg';
import { RiHome2Line, RiMessage3Line } from 'react-icons/ri';
import { MdPeopleOutline } from 'react-icons/md';

import { BACKEND_URL } from '../utils/constants';
import { logout, unsetUser } from '../actions';

function Topbar() {
  const dispatch = useDispatch();
  const history = useHistory();
  const username = useSelector(state => state.currentUser.username);
  const isLogged = useSelector(state => state.isLoggedIn);

  const handleLogout = (e) => {
    e.preventDefault();
    axios.get(
      `${BACKEND_URL}/api/auth/logout`, { withCredentials: true })
      .then(() => {
        localStorage.removeItem('user');
        dispatch(logout());
        dispatch(unsetUser());
        history.push('/');
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      {isLogged ? (
        <Nav justify variant="tabs">
          <Nav.Item>
            <Nav.Link as={NavLink} activeClassName="active" exact to="/"><RiHome2Line /></Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={NavLink} activeClassName="active" to={`/${username}`}><CgProfile /></Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={NavLink} activeClassName="active" to={'/messages'}><RiMessage3Line /></Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={NavLink} activeClassName="active" to="/users"><MdPeopleOutline /></Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={NavLink} activeClassName="active" to="/settings"><FiSettings /></Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={Link} onClick={handleLogout} to="/">
              <FiLogOut />
            </Nav.Link>
          </Nav.Item>
        </Nav>
      ) : (
          <Nav justify variant="tabs">
            <Nav.Item>
              <Nav.Link as={Link} to="/">
                <FiLogIn />
              </Nav.Link>
            </Nav.Item>
          </Nav>
        )}
    </div>
  );
}

export default Topbar;
