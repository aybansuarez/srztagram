import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Link, NavLink } from 'react-router-dom';
import { Nav, Tab } from 'react-bootstrap';
import axios from 'axios';
import { FiLogIn, FiLogOut, FiSettings } from 'react-icons/fi';
import { CgProfile } from 'react-icons/cg';
import { MdPeopleOutline } from 'react-icons/md';
import { RiHome2Line } from 'react-icons/ri';

import backendURL from '../utils/constants';
import { logout, unsetUser } from '../actions';

function Sidebar() {
  const dispatch = useDispatch();
  const history = useHistory();
  const username = useSelector(state => state.currentUser.username);
  const isLogged = useSelector(state => state.isLoggedIn);

  const handleLogout = (e) => {
    e.preventDefault();
    axios.get(
      `${backendURL}/api/auth/logout`, { withCredentials: true })
      .then(() => {
        localStorage.removeItem('user');
        dispatch(logout());
        dispatch(unsetUser());
        history.push('/');
      })
      .catch((error) => console.log(error));
  };

  return (
    <div style={{ position: 'sticky', top: '60px' }}>
      {isLogged ? (
        <Tab.Container className="p-0">
          <Nav variant="pills" className="flex-column">
            <Nav.Item>
              <Nav.Link className="py-3" as={NavLink} activeClassName="active-sidebar-nav" exact to="/">
                <RiHome2Line /> Home
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link className="py-3" as={NavLink} activeClassName="active-sidebar-nav" to={`/${username}`}>
                <CgProfile /> Profile
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link className="py-3" as={NavLink} activeClassName="active-sidebar-nav" to="/users">
                <MdPeopleOutline /> Users
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link className="py-3" as={NavLink} activeClassName="active-sidebar-nav" to="/settings">
                <FiSettings /> Settings
              </Nav.Link>
            </Nav.Item>
            <Nav.Item style={{ position: 'fixed', bottom: 0 }}>
              <Nav.Link className="py-3" as={Link} onClick={handleLogout} to="/">
                <FiLogOut /> Logout
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Tab.Container>
      ) : (
          <Tab.Container className="p-0">
            <Nav variant="pills" className="flex-column">
              <Nav.Item>
                <Nav.Link className="py-3" as={Link} to="/">
                  <FiLogIn /> Login
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Tab.Container>
        )}
    </div>
  );
}

export default Sidebar;