import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import CardMedia from '@material-ui/core/CardMedia';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

import Like from '../Button/Like';
import Unlike from '../Button/Unlike';
import Likes from '../Likes';
import { postStyle } from './styles';

function Post({ post }) {
  const style = postStyle();
  const profileID = useSelector(state => state.currentUser).profile;
  const [likesCount, setLikesCount] = useState(post.likes.length);
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const onLikeClick = () => setLikesCount(likesCount + 1);
  const onUnlikeClick = () => setLikesCount(likesCount - 1);

  const findLiker = (arr, profile) => {
    return arr.find((liker) => {
      return liker._id === profile;
    })
  }
  return (
    <Paper square className={style.root}>
      <Grid container className={style.container}>
        <Link to={`/${post.profile.username}`} className={style.header}>
          <Avatar
            src={post.profile.avatar}
            alt={post.profile.username}
          />
          <Typography>{post.profile.username}</Typography>
        </Link>
      </Grid>
      <CardMedia component='img' image={post.image} />
      <Grid container className={style.container}>
        <Likes likes={post.likes} show={show} hide={handleClose} />
        <Grid item xs={6} className={style.likes}>
          <IconButton className={style.button}>
            {findLiker(post.likes, profileID) ?
              <Unlike
                like={onLikeClick}
                unlike={onUnlikeClick}
                post={post}
                profile={profileID}
              />
              :
              <Like
                like={onLikeClick}
                unlike={onUnlikeClick}
                post={post}
                profile={profileID}
              />
            }
          </IconButton>
          <Typography onClick={handleShow} className={style.span}>
            {likesCount}
          </Typography>
        </Grid>
        <Grid item xs={6} className={style.date}>
          <Typography className={style.span}>
            <Link to={`/${post.profile.username}/p/${post._id}`}>
              {post.createdAt}
            </Link>
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <span className={style.username}>
            <Link to={`/${post.profile.username}`}>
              {post.profile.username}
            </Link>
          </span>
          <span className={style.authorIcon}>
            <PhotoCameraIcon />
          </span>
          <span>
            {post.caption}
          </span>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default Post;
