import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Avatar from '@material-ui/core/Avatar';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useTheme } from '@material-ui/core/styles';

import { POSTS_API_URL, PROFILE_API_URL } from '../../utils/constants';
import postDialogStyle from './styles';


function PostDialog({ open, setOpen }) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));
  const username = useSelector(state => state.currentUser).username;

  const isRendered = useRef(false);
  const [image, setImage] = useState('');
  const [caption, setCaption] = useState('');
  const [profile, setProfile] = useState(null)
  const [postStatus, setPostStatus] = useState({
    loading: false, done: false, error: false
  });
  const onImageChange = (e) => previewFile(e.target.files[0]);

  useEffect(() => {
    isRendered.current = true;
    axios.get(`${PROFILE_API_URL}/${username}`)
      .then((res) => {
        if (isRendered.current) setProfile(res.data)
      })
      .catch((err) => { console.log(err) })
    return () => isRendered.current = false;
  }, [username])

  const createPost = (e) => {
    e.preventDefault();
    const data = { image, caption, profile: profile._id };
    setPostStatus({ loading: true, done: false, error: false })
    axios.post(`${POSTS_API_URL}/create`, data, { withCredentials: true })
      .then((res) => {
        setPostStatus({ loading: false, done: true, error: false })
        setImage('');
        setCaption('');
        setOpen(false);
      })
      .catch((err) => {
        setPostStatus({ loading: false, done: false, error: true })
      });
  };
  const previewFile = (file) => {
    const reader = new FileReader();
    if (file && file.type.match('image.*')) {
      reader.readAsDataURL(file);
      reader.onloadend = () => setImage(reader.result);
    } else {
      console.log('none')
    }
  }

  const handleClose = () => {
    setImage('');
    setCaption('');
    setOpen(false);
  }

  const style = postDialogStyle();

  return (
    <Dialog fullScreen={fullScreen} open={open} onClose={handleClose}>
      <Container maxWidth='xs' className={style.root}>
        <Grid className={style.header}>
          <Typography variant="h6">Add new post</Typography>
          <IconButton className={style.close} onClick={handleClose}>
            <CloseRoundedIcon />
          </IconButton>
        </Grid>
        <Grid item xs={12} className={style.captionbox}>
          {profile &&
            <Avatar
              src={profile.avatar}
              alt={profile.username}
              className={style.avatar}
            />
          }
          <TextField
            label='Caption'
            margin='dense'
            variant='outlined'
            multiline
            rowsMax={4}
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            className={style.caption}
          />
        </Grid>
        {image &&
          <Grid className={style.imagediv}>
            <img src={image} alt='asd' className={style.image} />
          </Grid>
        }
        <Grid container className={style.footer}>
          <Grid item xs={2}>
            <input
              accept='image/*'
              className={style.input}
              id='icon-button-file'
              type='file'
              onChange={onImageChange}
            />
            <label htmlFor='icon-button-file'>
              <IconButton
                component='span'
                className={style.icon}>
                <PhotoCamera />
              </IconButton>
            </label>
          </Grid>
          <Grid item xs={10} className={style.buttonDiv}>
            <Button
              variant='outlined'
              className={style.button}
              onClick={createPost}
              disabled={!image || postStatus.loading ? true : false}
            >
              {postStatus.loading ?
                <>
                  <CircularProgress
                    size={20}
                    color='inherit'
                    className={style.spinner}
                  /> Posting
              </>
                :
                'Post'
              }
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Dialog>
  );
}

export default PostDialog;
