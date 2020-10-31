import React, { useState } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import UnfollowButton from './UnfollowButton';
import { BACKEND_URL } from '../utils/constants';

function FollowButton(props) {
  let content = null;
  const isLogged = useSelector(state => state.isLoggedIn);
  const [doneFollow, setDoneFollow] = useState(false);
  const history = useHistory();

  const handleFollow = (e) => {
    e.preventDefault();
    axios.patch(
      `${BACKEND_URL}/api/follows/${props.profile}/follow/${props.user._id}`,
      { withCredentials: true })
      .then(() => {
        if (props.reload) history.go(0);
        setDoneFollow(true);
      })
  };

  if (isLogged) {
    if (doneFollow) {
      content = <UnfollowButton user={props.user} profile={props.profile} />
    } else {
      content =
        <Button
          onClick={handleFollow}
          size='sm'
          variant='outline-primary'
        >Follow
      </Button>;
    }
  }

  return content;
}

export default FollowButton;
