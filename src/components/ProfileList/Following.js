import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

import List from '@material-ui/core/List';

import { PROFILE_API_URL } from '../../utils/constants';
import Spinner from '../Spinner';
import ProfileItem from '../ProfileItem'
import NoItems from '../NoItems'
import profileListStyle from './styles';

function Following({ profile }) {
  const isRendered = useRef(false);
  const [following, setFollowing] = useState({
    loading: false, data: null, error: false
  });
  let content = null;

  useEffect(() => {
    isRendered.current = true;
    setFollowing({ loading: true, data: null, error: false })
    axios.get(
      `${PROFILE_API_URL}/${profile.username}/following`,
      { withCredentials: true }
    )
      .then((res) => {
        if (isRendered.current) {
          setFollowing({ loading: false, data: res.data, error: false });
        }
      })
      .catch((err) => {
        setFollowing({ loading: false, data: null, error: true })
      })

    return () => isRendered.current = false;
  }, [profile.username])

  const style = profileListStyle();

  if (following.loading) content = <Spinner />;
  if (following.data) {
    content =
      <List dense className={style.root}>
        {following.data.length ?
          following.data.map((profile, key) =>
            <ProfileItem key={key} profile={profile} />
          )
          :
          <NoItems title='following' />
        }
      </List>
  }

  return content;
}

export default Following;
