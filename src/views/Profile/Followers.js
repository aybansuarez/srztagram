import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

import List from '@material-ui/core/List';

import { PROFILE_API_URL } from '../../utils/constants';
import Spinner from '../../components/Spinner';
import ProfileItem from '../../components/ProfileItem'
import NoItems from '../../components/NoItems'
import { profileStyle } from './styles';

function Followers({ profile }) {
  const isRendered = useRef(false);
  const [followers, setFollowers] = useState({
    loading: false, data: null, error: false
  });
  let content = null;

  useEffect(() => {
    isRendered.current = true;
    setFollowers({ loading: true, data: null, error: false })
    axios.get(
      `${PROFILE_API_URL}/${profile.username}/followers`,
      { withCredentials: true }
    )
      .then((res) => {
        if (isRendered.current) {
          setFollowers({ loading: false, data: res.data, error: false });
        }
      })
      .catch((err) => {
        setFollowers({ loading: false, data: null, error: true })
      })
    return () => isRendered.current = false;
  }, [profile.username])

  const style = profileStyle();

  if (followers.loading) content = <Spinner />;
  if (followers.data) {
    content =
      <List dense className={style.root}>
        {followers.data.length ?
          followers.data.map((profile, key) =>
            <ProfileItem key={key} profile={profile} />
          )
          :
          <NoItems title='followers' />
        }
      </List>
  }

  return content;
}

export default Followers;
