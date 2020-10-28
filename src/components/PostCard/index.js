import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import Grid from '@material-ui/core/Grid';

import Spinner from '../Spinner';
import { POSTS_API_URL } from '../../utils/constants';
import postCardStyle from './styles';

function PostCard({ username }) {
  const style = postCardStyle();
  const isRendered = useRef(false);

  const [posts, setPosts] = useState({
    loading: false, data: null, error: false
  });

  useEffect(() => {
    isRendered.current = true;
    setPosts({ loading: true, data: null, error: false })
    axios.get(`${POSTS_API_URL}/u/${username}`, { withCredentials: true })
      .then((response) => {
        if (isRendered.current) {
          setPosts({ loading: false, data: response.data, error: false });
        }
      })
      .catch((err) => {
        setPosts({ loading: false, data: null, error: true })
      })

    return () => isRendered.current = false;
  }, [username])

  return (
    (posts.data ?
      <Grid container spacing={1} className={style.root}>
        {posts.data.map((post, key) =>
          <Grid item key={key} xs={4} className={style.grid}>
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
        )}
      </Grid>
      :
      <Spinner />
    )
  );
}

export default PostCard;
