import React, { useState } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';

import UnfollowButton from './UnfollowButton';
import backendURL from '../utils/constants';

function FollowButton(props) {
  let content = null;
  const [doneFollow, setDoneFollow] = useState(false);

  const handleFollow = (e) => {
    e.preventDefault();
    axios.patch(
      `${backendURL}/api/follows/${props.profile}/follow/${props.user._id}`,
      { withCredentials: true })
      .then(() => {
        setDoneFollow(true);
      })
  };

  if (doneFollow) {
    content = <UnfollowButton user={props.user} profile={props.profile} />
  } else {
    content =
      <Button
        onClick={handleFollow}
        size="sm"
        variant="outline-primary"
      >Follow
    </Button>;
  }

  return content;
}

export default FollowButton;