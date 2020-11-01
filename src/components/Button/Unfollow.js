import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';

import Button from '@material-ui/core/Button';

import Follow from './Follow';
import { FOLLOWS_API_URL } from '../../utils/constants';

function Unfollow({ user, profile, reload }) {
  let content = null;
  const isLoggedIn = useSelector(state => state.isLoggedIn);
  const [doneUnfollow, setDoneUnfollow] = useState(false);
  const history = useHistory();

  const handleUnfollow = (e) => {
    e.preventDefault();
    axios.patch(
      `${FOLLOWS_API_URL}/${profile}/unfollow/${user._id}`,
      { withCredentials: true })
      .then(() => {
        setDoneUnfollow(true);
        if (reload) history.go(0);
      })
  };

  if (isLoggedIn)
    if (doneUnfollow)
      content = <Follow user={user} profile={profile} />
    else
      content =
        <Button
          onClick={handleUnfollow}
          size='small'
          color='secondary'
          variant='contained'
        >
          Unfollow
        </Button>;

  return content;
}

export default Unfollow;

