import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

import Unlike from './Unlike';
import { buttonStyle } from './styles';
import { POSTS_API_URL } from '../../utils/constants';
import socket from '../../utils/socket';

function Like({ like, unlike, post, profile }) {
  let content = null;
  const style = buttonStyle();
  const [doneLike, setDoneLike] = useState(false);
  const username = useSelector(state => state.currentUser).username;

  const handleLike = (e) => {
    e.preventDefault();
    axios.patch(
      `${POSTS_API_URL}/${profile}/like/${post._id}`, { withCredentials: true }
    )
      .then((res) => {
        like();
        if (profile !== post.profile._id) {
          socket.emit(
            'like',
            {
              profile: post.profile._id,
              liker: username,
              post: post._id
            },
            () => console.log('liked')
          );
        }
        post.likes.push(res.data.likes[0]);
        setDoneLike(true);
      })
  };

  if (doneLike)
    content =
      <Unlike like={like} unlike={unlike} post={post} profile={profile} />
  else
    content =
      <FavoriteBorderIcon onClick={handleLike} className={style.like} />

  return content;
}

export default Like;
