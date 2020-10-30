import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Avatar from '@material-ui/core/Avatar';
import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Typography from '@material-ui/core/Typography';

import defaultLogo from '../../assets/default_avatar.png';
import Error404 from '../../components/404';
import Spinner from '../../components/Spinner';
import Alert from '../../components/Alert';
import Main from '../Main';
import { setUser } from '../../actions';
import { PROFILE_API_URL } from '../../utils/constants';

import { authStyle } from './styles';

function Settings() {
  const style = authStyle();
  const inputFile = useRef(null);
  const isRendered = useRef(false);
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.currentUser);
  let content = null;

  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState(currentUser.username);
  const [email, setEmail] = useState('');
  const [avatar, setAvatar] = useState('');
  const [name, setName] = useState('');
  const [birthday, setBirthday] = useState('');
  const [is_private, setIsPrivate] = useState('');
  const [bio, setBio] = useState('');
  const [status, setStatus] = useState({
    type: '', loading: false, message: ''
  });
  const [profile, setProfile] = useState({
    loading: false, data: null, error: false,
  });

  const onAvatarClick = () => inputFile.current.click();

  const url = `${PROFILE_API_URL}/${currentUser.username}/`;

  useEffect(() => {
    isRendered.current = true;
    setProfile({ loading: true, data: null, error: false })
    axios.get(url)
      .then((res) => {
        if (isRendered.current) {
          setProfile({ loading: false, data: res.data, error: false });
          setIsPrivate(res.data.is_private);
          setBio(res.data.bio);
          setName(res.data.name);
          setEmail(res.data.email)
          setBirthday(res.data.birthday.slice(0, 10));
        }
      })
      .catch(() => setProfile({ loading: false, data: null, error: true }))

    return () => isRendered.current = false;
  }, [url])

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => setAvatar(reader.result);
  }

  if (profile.loading) content = <Spinner whole />;
  if (profile.error) content = <Error404 />;
  if (profile.data) {
    const updateProfile = (e) => {
      e.preventDefault();
      const data = { avatar, bio, username, name, email, birthday, is_private };
      setStatus({ type: '', loading: true, message: '' });
      axios.post(`${PROFILE_API_URL}/${profile.data._id}/update`,
        data, { withCredentials: true })
        .then((res) => {
          setOpen(true)
          localStorage.setItem('srztagram-username', username);
          dispatch(setUser({ username, profile: profile.data._id }));
          window.scrollTo(0, 0);
          setStatus({ type: 'success', loading: false, message: res.data });
        })
        .catch((err) => {
          setStatus({
            type: 'error', loading: false, message: err.response.data
          });
        });
    };

    content =
      <Container maxWidth='md'>
        <form encType='multipart/form-data' onSubmit={updateProfile}>
          {status.message &&
            <Alert
              severity={status.type}
              message={status.message}
              open={open}
              setOpen={setOpen}
            />
          }
          <Grid container className={style.header}>
            <Grid item xs={6}>
              <Typography variant='h4'>Profile</Typography>
            </Grid>
            <Grid item xs={6} className={style.switch}>
            <FormControlLabel
              label={`${(is_private ? 'Private' : 'Public')}`}
              control={
                <Switch
                  checked={is_private ? true : false}
                  onChange={(e) => setIsPrivate(e.target.checked)}
                />
              }
            />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12} md={3} className={style.avatarGrid}>
                <Avatar
                  src={
                    avatar ? avatar :
                    profile.data.avatar ? profile.data.avatar :
                    defaultLogo
                  }
                  onClick={onAvatarClick}
                  alt={profile.username}
                  style={{ cursor: 'pointer' }}
                  className={style.avatar}
                />
                <input
                  accept='image/*'
                  className={style.fileInput}
                  type='file'
                  onChange={(e) => previewFile(e.target.files[0])}
                  ref={inputFile}
                />
                <Typography
                  onClick={onAvatarClick}
                  className={style.avatarLabel}
                >
                  Change avatar
                </Typography>
            </Grid>
            <Grid item md={9} className={style.inputGrid}>
              <TextField
                variant='filled'
                margin='dense'
                fullWidth
                size='small'
                value={name}
                label='Display Name'
                className={style.input}
                type='text'
                onChange={(e) => setName(e.target.value)}
              />
              <TextField
                variant='filled'
                margin='dense'
                fullWidth
                size='small'
                value={username}
                label='Username'
                type='text'
                className={style.input}
                onChange={(e) => setUsername(e.target.value)}
              />
              <TextField
                variant='filled'
                margin='dense'
                fullWidth
                size='small'
                value={bio}
                multiline
                rowsMax={4}
                label='Bio'
                className={style.input}
                type='text'
                onChange={(e) => setBio(e.target.value)}
              />
              <TextField
                variant='filled'
                margin='dense'
                fullWidth
                size='small'
                value={email}
                label='Email'
                type='email'
                className={style.input}
                onChange={(e) => setEmail(e.target.value)}
                />
              <TextField
                variant='filled'
                margin='dense'
                fullWidth
                size='small'
                value={birthday}
                label='Birthday'
                type='date'
                className={style.input}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(e) => setBirthday(e.target.value)}
              />
              <Button
                type='submit'
                fullWidth
                variant='contained'
                className={style.button}
                disabled={status.loading ? true : false}
              >
                {status.loading ?
                  <>
                    <CircularProgress
                      size={20}
                      color='inherit'
                    /> Updating
                    </>
                  :
                  'Update'
                }
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
  }

  return (
    <Main component={content} />
  );
}

export default Settings;
