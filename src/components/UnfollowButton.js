import React, { useState } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import FollowButton from './FollowButton';
import { BACKEND_URL } from '../utils/constants';

function UnfollowButton(props) {
  let content = null;
  const isLogged = useSelector(state => state.isLoggedIn);
  const [doneUnfollow, setDoneUnfollow] = useState(false);
  const history = useHistory();

  const handleUnfollow = (e) => {
    e.preventDefault();
    axios.patch(
      `${BACKEND_URL}/api/follows/${props.profile}/unfollow/${props.user._id}`,
      { withCredentials: true })
      .then(() => {
        if (props.reload) history.go(0);
        setDoneUnfollow(true);
      })
  };

  if (isLogged) {
    if (doneUnfollow) {
      content = <FollowButton user={props.user} profile={props.profile} />
    } else {
      content =
        <Button
          onClick={handleUnfollow}
          size='sm'
          variant='outline-danger'
        >Unfollow
      </Button>;
    }
  }

  return content;
}

export default UnfollowButton;

