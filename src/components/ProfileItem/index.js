import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Avatar from '@material-ui/core/Avatar';

import { findProfile } from '../../utils/helper';
import FollowButton from '../FollowButton'
import UnfollowButton from '../UnfollowButton'
import profileItemStyle from './styles';

function ProfileItem({ profile }) {
  let button;
  const style = profileItemStyle();
  const profileID = useSelector(state => state.currentUser).profile;

  const isFollower = findProfile(profile.followers, profileID);
  const isFollowing = findProfile(profile.following, profileID);

  if (profile._id === profileID)
    button = null;
  else if (isFollower || isFollowing)
    button = <UnfollowButton user={profile} profile={profileID} />
  else
    button = <FollowButton user={profile} profile={profileID} />

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
