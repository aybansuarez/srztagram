import React from 'react';
import { Link } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';

import { commentStyle } from './styles';

function Comment({ comment }) {
  const style = commentStyle();

  return (
    <Grid container className={style.root}>
      <span className={style.username}>
        <Link to={`/${comment.profile.username}`}>
          {comment.profile.username}
        </Link>
      </span>
      <span>
        {comment.comment}
      </span>
    </Grid>
  )
}

export default Comment;
