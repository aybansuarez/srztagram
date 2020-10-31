import React from 'react';
import { Link } from 'react-router-dom';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import Grid from '@material-ui/core/Grid';

import postCardStyle from './styles';

function PostCard({ post, username }) {
  const style = postCardStyle();

  return (
    <Grid item xs={4} className={style.grid}>
      <Link to={`/${username}/p/${post._id}`}>
        <CardActionArea>
          <Card
            className={style.imageDiv}
            style={{
              background: `url(${post.image})`,
              backgroundPosition: 'center center',
              backgroundSize: 'cover',
            }}
          >
          </Card>
        </CardActionArea>
      </Link>
    </Grid>
  )
}

export default PostCard;
