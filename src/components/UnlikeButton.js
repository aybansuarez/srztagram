import React, { useState } from 'react';
import axios from 'axios';
import { AiFillHeart } from 'react-icons/ai';

import backendURL from '../utils/constants';
import LikeButton from './LikeButton';

function UnlikeButton(props) {
  let content = null;
  const [doneUnlike, setDoneUnlike] = useState(false);

  const handleUnlike = (e) => {
    e.preventDefault();
    axios.patch(
      `${backendURL}/api/posts/${props.profile}/unlike/${props.post._id}`,
      { withCredentials: true })
      .then(() => {
        props.unlike();
        setDoneUnlike(true);
      })
  };

  if (doneUnlike) {
    content =
      <LikeButton
        unlike={props.unlike}
        like={props.like}
        post={props.post}
        profile={props.profile}
      />
  } else {
    content =
      <AiFillHeart
        onClick={handleUnlike}
        style={{ fontSize: '20px', cursor: 'pointer' }}
      />
  }

  return content;
}

export default UnlikeButton;