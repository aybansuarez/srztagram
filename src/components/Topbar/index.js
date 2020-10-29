import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import PersonRoundedIcon from '@material-ui/icons/PersonRounded';
import SettingsRoundedIcon from '@material-ui/icons/SettingsRounded';
import PeopleAltRoundedIcon from '@material-ui/icons/PeopleAltRounded';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import PostDialog from '../PostDialog';
import topbarStyle from './styles';

function Topbar() {
  const style = topbarStyle();
  const username = useSelector(state => state.currentUser).username;
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  return (
    <>
      <Fab onClick={handleClickOpen} className={style.floatBtn}>
        <AddIcon />
      </Fab>
      <PostDialog open={open} setOpen={setOpen} />
      <BottomNavigation className={style.root}>
        <BottomNavigationAction
          exact to='/'
          component={NavLink}
          activeClassName={style.active}
          className={style.button}
          icon={<HomeRoundedIcon />}
        />
        <BottomNavigationAction
          to={`/${username}`}
          component={NavLink}
          activeClassName={style.active}
          className={style.button}
          icon={<PersonRoundedIcon />}
        />
        <BottomNavigationAction
          to='/users'
          component={NavLink}
          activeClassName={style.active}
          className={style.button}
          icon={<PeopleAltRoundedIcon />}
        />
        <BottomNavigationAction
          to='/settings'
          component={NavLink}
          activeClassName={style.active}
          className={style.button}
          icon={<SettingsRoundedIcon />}
        />
      </BottomNavigation>
    </>
  );
}

export default Topbar;
