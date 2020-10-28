import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Avatar from '@material-ui/core/Avatar';

import { PROFILE_API_URL } from '../../utils/constants';
import { findProfile } from '../../utils/helper';
import Spinner from '../Spinner';
import FollowButton from '../FollowButton'
import UnfollowButton from '../UnfollowButton'
import profileListStyle from './styles';

function ProfileList() {
  const location = useLocation();
  const isRendered = useRef(false);
  const profileID = useSelector(state => state.currentUser).profile;
  const [profiles, setProfiles] = useState({
    loading: false, data: null, error: false
  });
  let content = null;

  useEffect(() => {
    isRendered.current = true;
    setProfiles({ loading: true, data: null, error: false })
    axios.get(`${PROFILE_API_URL}${location.pathname}`, { withCredentials: true })
      .then((res) => {
        if (isRendered.current) {
          setProfiles({ loading: false, data: res.data, error: false });
        }
      })
      .catch((err) => {
        setProfiles({ loading: false, data: null, error: true })
      })

    return () => isRendered.current = false;
  }, [location.pathname])

  const style = profileListStyle();

  if (profiles.loading) content = <Spinner />;
  if (profiles.data) {
    content =
      <List dense className={style.root}>
        {profiles.data.map((profile, key) =>
          <ListItem key={key} className={style.item}>
            <ListItemAvatar>
              <Avatar src={profile.avatar} />
            </ListItemAvatar>
            <ListItemText>{profile.username}</ListItemText>
            <ListItemSecondaryAction>
              {profile._id === profileID ? null :
                findProfile(profile.followers, profileID) ||
                  findProfile(profile.following, profileID) ?
                  <UnfollowButton user={profile} profile={profileID} />
                  :
                  <FollowButton user={profile} profile={profileID} />
              }
            </ListItemSecondaryAction>
          </ListItem>
        )}
      </List>
  }

  return content;
}

export default ProfileList;
