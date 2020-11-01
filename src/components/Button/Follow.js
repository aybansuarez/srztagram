import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';

import Button from '@material-ui/core/Button';

import Unfollow from './Unfollow';
import { FOLLOWS_API_URL } from '../../utils/constants';

function Follow({ user, profile, reload }) {
  let content = null;
  const isLoggedIn = useSelector(state => state.isLoggedIn);
  const [doneFollow, setDoneFollow] = useState(false);
  const history = useHistory();

  const handleFollow = (e) => {
    e.preventDefault();
    axios.patch(
      `${FOLLOWS_API_URL}/${profile}/follow/${user._id}`,
      { withCredentials: true })
      .then(() => {
        setDoneFollow(true);
        if (reload) history.go(0);
      })
  };

  if (isLoggedIn)
    if (doneFollow)
      content = <Unfollow user={user} profile={profile} />
    else
      content =
        <Button
          onClick={handleFollow}
          color='primary'
          size='small'
          variant='contained'
        >
          Follow
        </Button>;

  return content;
}

export default Follow;
