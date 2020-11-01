import React, { useState } from 'react';
import axios from 'axios';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

import Unlike from './Unlike';
import { buttonStyle } from './styles';
import { POSTS_API_URL } from '../../utils/constants';

function Like({ like, unlike, post, profile }) {
  let content = null;
  const style = buttonStyle();
  const [doneLike, setDoneLike] = useState(false);

  const handleLike = (e) => {
    e.preventDefault();
    axios.patch(
      `${POSTS_API_URL}/${profile}/like/${post._id}`, { withCredentials: true }
    )
      .then((res) => {
        like();
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
