import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

import Grid from '@material-ui/core/Grid';

import PostCard from '../../components/PostCard';
import Spinner from '../../components/Spinner';
import NoItems from '../../components/NoItems';
import { POSTS_API_URL } from '../../utils/constants';
import { profileStyle } from './styles';

function Post({ username }) {
  const style = profileStyle();
  const isRendered = useRef(false);

  const [posts, setPosts] = useState({
    loading: false, data: null, error: false
  });

  useEffect(() => {
    isRendered.current = true;
    setPosts({ loading: true, data: null, error: false });
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
      <Grid container spacing={1} className={style.post}>
        {posts.data.length ? posts.data.map(
          (post, key) => <PostCard key={key} post={post} username={username} />
        )
          : <NoItems title='posts' />
        }
      </Grid>
      :
      <Spinner />
    )
  );
}

export default Post;
