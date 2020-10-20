import React, { useState } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';

import FollowButton from './FollowButton';
import backendURL from '../utils/constants';

function UnfollowButton(props) {
  let content = null;
  const [doneUnfollow, setDoneUnfollow] = useState(false);

  const handleUnfollow = (e) => {
    e.preventDefault();
    axios.patch(
      `${backendURL}/api/follows/${props.profile}/unfollow/${props.user._id}`,
      { withCredentials: true })
      .then(() => {
        setDoneUnfollow(true);
      })
  };

  if (doneUnfollow) {
    content = <FollowButton user={props.user} profile={props.profile} />
  } else {
    content =
      <Button
        onClick={handleUnfollow}
        size="sm"
        variant="outline-danger"
      >Unfollow
      </Button>;
  }

  return content;
}

export default UnfollowButton;

