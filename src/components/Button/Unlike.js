import React, { useState } from 'react';
import axios from 'axios';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { useSelector } from 'react-redux';

import Like from './Like';
import { buttonStyle } from './styles';
import { POSTS_API_URL } from '../../utils/constants';

function Unlike({ like, unlike, post, profile }) {
  let content = null;
  const style = buttonStyle();
  const profileID = useSelector(state => state.currentUser).profile;

  const [doneUnlike, setDoneUnlike] = useState(false);

  const handleUnlike = (e) => {
    e.preventDefault();
    axios.patch(
      `${POSTS_API_URL}/${profile}/unlike/${post._id}`,
      { withCredentials: true })
      .then(() => {
        let index = post.likes.map(
          (liker) => { return liker._id; }
        ).indexOf(profileID);
        post.likes.splice(index, 1);
        unlike();
        setDoneUnlike(true);
      })
  };

  if (doneUnlike)
    content =
      <Like unlike={unlike} like={like} post={post} profile={profile} />
  else
    content =
      <FavoriteIcon onClick={handleUnlike} className={style.unlike} />

  return content;
}

export default Unlike;
