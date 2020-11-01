import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Avatar from '@material-ui/core/Avatar';

import { findProfile } from '../../utils/helper';
import Follow from '../Button/Follow';
import Unfollow from '../Button/Unfollow';
import profileItemStyle from './styles';

function ProfileItem({ profile, type }) {
  let button;
  const style = profileItemStyle();
  const profileID = useSelector(state => state.currentUser).profile;

  const isFollower = findProfile(profile.followers, profileID);

  if (profile._id === profileID)
    button = null;
  else if (isFollower)
    button = <Unfollow user={profile} profile={profileID} />
  else
    button = <Follow user={profile} profile={profileID} />

  return (
    <ListItem
      to={`/${profile.username}`}
      component={Link}
      className={style.item}
    >
      <ListItemAvatar>
        <Avatar src={profile.avatar} />
      </ListItemAvatar>
      <ListItemText className={style.username}>
        {profile.username}
      </ListItemText>
      <ListItemSecondaryAction>
        {button}
      </ListItemSecondaryAction>
    </ListItem>
  );
}

export default ProfileItem;
