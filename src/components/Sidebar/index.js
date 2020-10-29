import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import ListItemText from '@material-ui/core/ListItemText';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import PersonRoundedIcon from '@material-ui/icons/PersonRounded';
import ChatRoundedIcon from '@material-ui/icons/ChatRounded';
import PeopleAltRoundedIcon from '@material-ui/icons/PeopleAltRounded';
import SettingsRoundedIcon from '@material-ui/icons/SettingsRounded';
import MeetingRoomRoundedIcon from '@material-ui/icons/MeetingRoomRounded';
import VpnKeyRoundedIcon from '@material-ui/icons/VpnKeyRounded';
import AddIcon from '@material-ui/icons/Add';

import PostDialog from '../PostDialog';
import sidebarStyle from './styles';
import { logout, unsetUser } from '../../actions';

function Sidebar() {
  const history = useHistory();
  const style = sidebarStyle();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => state.isLoggedIn);

  const username = localStorage.getItem('srztagram-username');
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem('auth-token');
    localStorage.removeItem('srztagram-username');
    localStorage.removeItem('srztagram-id');
    dispatch(logout());
    dispatch(unsetUser());
    history.push('/login');
  };

  return (
    <List component='nav' className={style.list}>
      {isLoggedIn ?
        <>
          <NavLink activeClassName={style.active} exact to='/'>
            <ListItem button >
              <ListItemAvatar>
                <Avatar>
                  <HomeRoundedIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary='Home' />
            </ListItem>
          </NavLink>
          <NavLink activeClassName={style.active} to={`/${username}`}>
            <ListItem button >
              <ListItemAvatar>
                <Avatar>
                  <PersonRoundedIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary='Profile' />
            </ListItem>
          </NavLink>
          <NavLink activeClassName={style.active} to='/messages'>
            <ListItem button >
              <ListItemAvatar>
                <Avatar>
                  <ChatRoundedIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary='Messages' />
            </ListItem>
          </NavLink>
          <NavLink activeClassName={style.active} to='/users'>
            <ListItem button >
              <ListItemAvatar>
                <Avatar>
                  <PeopleAltRoundedIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary='Users' />
            </ListItem>
          </NavLink>
          <NavLink activeClassName={style.active} to='/settings'>
            <ListItem button >
              <ListItemAvatar>
                <Avatar>
                  <SettingsRoundedIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary='Settings' />
            </ListItem>
          </NavLink>
          <Button
            variant='contained'
            onClick={handleClickOpen}
            startIcon={<AddIcon />}
            className={style.create}
          >
            Create
          </Button>
          <div className={style.spacer} />
          <ListItem button onClick={handleLogout}>
            <ListItemAvatar>
              <Avatar>
                <MeetingRoomRoundedIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary='Logout' />
          </ListItem>
          <PostDialog open={open} setOpen={setOpen} />
        </>
        :
        <NavLink to='/login'>
          <ListItem button>
            <ListItemAvatar>
              <Avatar>
                <VpnKeyRoundedIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary='Login' />
          </ListItem>
        </NavLink>
      }
    </List>
  );
}

export default Sidebar;
