import React, { useState, useEffect, useRef } from 'react';
import { useParams, matchPath, useLocation, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';

import Grid from '@material-ui/core/Grid';
import LockRoundedIcon from '@material-ui/icons/LockRounded';

import Main from '../Main';
import Banner from '../../components/Banner';
import Spinner from '../../components/Spinner';
import PostCard from '../../components/PostCard';
import NoAccess from '../../components/NoAccess';
import ProfileList from '../../components/ProfileList';
import { PROFILE_API_URL } from '../../utils/constants';
import { findProfile } from '../../utils/helper';
import { profileStyle } from './styles';

function Profile() {
  const profileID = useSelector(state => state.currentUser).profile;
  const isLogged = useSelector(state => state.isLoggedIn);
  const isRendered = useRef(false);
  const { username } = useParams();
  const location = useLocation();
  let content = null;

  const matchPosts = matchPath(location.pathname, {
    path: '/:username', exact: true, strict: true
  })

  const [profile, setProfile] = useState({
    loading: false, data: null, error: false
  });

  useEffect(() => {
    isRendered.current = true;
    setProfile({ loading: true, data: null, error: false })
    axios.get(`${PROFILE_API_URL}/${username}`, { withCredentials: true })
      .then((response) => {
        if (isRendered.current) {
          setProfile({ loading: false, data: response.data, error: false });
        }
      })
      .catch(() => setProfile({ loading: false, data: null, error: true }))
    return () => isRendered.current = false;
  }, [username])

  const style = profileStyle();

  if (profile.loading) content = <Spinner />;

  if (profile.data)
    content =
      <Grid container className={style.root}>
        <Banner profile={profile.data} />
        {profile.data.is_private && profile.data._id !== profileID &&
          !findProfile(profile.data.followers, profileID) ?
          <NoAccess /> :
          (matchPosts ? <PostCard username={username} /> : <ProfileList />)
        }
      </Grid>
      ;

  return (
    <Main component={content} />
  );
}

export default Profile;
