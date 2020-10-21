import React, { useState } from 'react';
import axios from 'axios';
import { AiOutlineHeart } from 'react-icons/ai';

import backendURL from '../utils/constants';
import UnlikeButton from './UnlikeButton';

function LikeButton(props) {
  let content = null;
  const [doneLike, setDoneLike] = useState(false);

  const handleLike = (e) => {
    e.preventDefault();
    axios.patch(
      `${backendURL}/api/posts/${props.profile}/like/${props.post._id}`,
      { withCredentials: true })
      .then((res) => {
        props.like();
        props.post.likes.push(res.data.likes[0]);
        setDoneLike(true);
      })
  };

  if (doneLike) {
    content =
      <UnlikeButton
        like={props.like}
        unlike={props.unlike}
        post={props.post}
        profile={props.profile}
      />
  } else {
    content =
      <AiOutlineHeart
        onClick={handleLike}
        style={{ fontSize: '20px', cursor: 'pointer' }}
      />
  }

  return content;
}

export default LikeButton;