import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Col, Row, Form, Button, Alert, Image, Spinner as Loading } from 'react-bootstrap';
import axios from 'axios';

import defaultLogo from '../assets/default_avatar.png';
import Error404 from '../components/404';
import Spinner from '../components/Spinner';
import Main from './Main';
import { setUser } from '../actions';
import { BACKEND_URL } from '../utils/constants';

function Settings() {
  const currentUser = useSelector(state => state.currentUser);

  useEffect(() => { document.title = "SRZtagram | Settings" }, []);
  const inputFile = useRef(null);
  const dispatch = useDispatch();

  const [profile, setProfile] = useState({
    loading: false, data: null, error: false,
  });

  const onAvatarClick = () => inputFile.current.click();

  const [username, setUsername] = useState(currentUser.username);
  const [email, setEmail] = useState(currentUser.email);
  const [avatar, setAvatar] = useState('');
  const [name, setName] = useState('');
  const [birthday, setBirthday] = useState('');
  const [is_private, setIsPrivate] = useState('');
  const [bio, setBio] = useState('');
  const [message, setMessage] = useState({
    type: '', loading: false, message: ''
  });

  let content = null;
  const url = `${BACKEND_URL}/api/profiles/${currentUser.username}/`;

  useEffect(() => {
    setProfile({ loading: true, data: null, error: false })
    axios.get(url)
      .then((response) => {
        setProfile({ loading: false, data: response.data, error: false });
        setIsPrivate(response.data.is_private);
        setBio(response.data.bio);
        setName(response.data.name);
        setBirthday(response.data.birthday.slice(0, 10));
      })
      .catch(() => setProfile({ loading: false, data: null, error: true }))

    return () => {
    }
  }, [url])

  const onChangeUsername = (e) => setUsername(e.target.value);
  const onChangeName = (e) => setName(e.target.value);
  const onChangeEmail = (e) => setEmail(e.target.value);
  const onChangeBirthday = (e) => setBirthday(e.target.value);
  const onChangePrivacy = (e) => setIsPrivate(e.target.checked);
  const onChangeBio = (e) => setBio(e.target.value);
  const onAvatarChange = (e) => previewFile(e.target.files[0]);

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
      setMessage({ type: '', loading: true, message: '' });
      axios.post(`${BACKEND_URL}/api/profiles/${profile.data._id}/update`,
        data, { withCredentials: true })
        .then((res) => {
          const newDetails = {
            id: currentUser.id,
            username: username,
            email: email,
            profile: profile.data._id
          }
          localStorage.setItem('user', JSON.stringify(newDetails));
          dispatch(setUser(newDetails));
          window.scrollTo(0, 0);
          setMessage({ type: 'success', loading: false, message: res.data });
        })
        .catch((err) => {
          setMessage({ type: 'danger', loading: false, message: err.response.data });
        });
    };

    content =
      <Container className="settings p-0">
        <Form encType="multipart/form-data" onSubmit={updateProfile}>

          {message.message ? (
            <Alert className="mb-0" variant={message.type}>
              {message.message}
            </Alert>
          ) : null}
          <div className="settings-border d-flex align-items-center justify-content-between">
            <span className="settings-title">Profile</span>
            <Form.Check
              onChange={onChangePrivacy}
              type="switch"
              id="custom-switch"
              label={`${(is_private ? 'Private' : 'Public')}`}
              checked={is_private ? true : false}
            />
          </div>
          <Row>
            <Col xs={12} sm={4} className="order-0 order-sm-1 text-center">
              <Form.Group>
                <Form.Label htmlFor="avatar">
                  <Image className="settings-avatar"
                    onClick={onAvatarClick}
                    style={{ cursor: 'pointer' }}
                    src={avatar ? avatar : profile.data.avatar ?
                      profile.data.avatar : defaultLogo}
                    alt="chosen" roundedCircle />
                </Form.Label>
                <Form.File
                  onChange={onAvatarChange}
                  className="d-none"
                  ref={inputFile}
                  custom
                />
                <div onClick={onAvatarClick} style={{ cursor: 'pointer' }}>Change avatar</div>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label htmlFor="username">Username</Form.Label>
                <Form.Control
                  onChange={onChangeUsername}
                  id="username"
                  type="text"
                  value={username}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label htmlFor="bio">Bio</Form.Label>
                <Form.Control
                  onChange={onChangeBio}
                  id="bio"
                  type="text"
                  value={bio}
                  placeholder="Add bio"
                />
              </Form.Group>

              <Form.Group>
                <Form.Label htmlFor="name">Name</Form.Label>
                <Form.Control
                  onChange={onChangeName}
                  id="name"
                  type="text"
                  value={name}
                  required={true}
                />
                <Form.Text className="text-muted">
                  Help people discover your account by using the name you're known by: either your full name or nickname.
                </Form.Text>
              </Form.Group>

              <Form.Group>
                <Form.Label htmlFor="email">Email</Form.Label>
                <Form.Control
                  onChange={onChangeEmail}
                  id="email"
                  type="email"
                  value={email}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label htmlFor="birthday">Birthday</Form.Label>
                <Form.Control
                  onChange={onChangeBirthday}
                  id="birthday"
                  type="date"
                  value={birthday}
                />
              </Form.Group>

              <Form.Group>
                <Button
                  type="submit"
                  className="ml-0 settings-button w-100"
                  disabled={message.loading ? true : false}
                >
                  {message.loading ? (
                    <div>
                      <Loading
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                        className="mr-2"
                      /> Saving
                    </div>
                  ) : (
                      'Save'
                    )}
                </Button>
              </Form.Group>

            </Col>
          </Row>
        </Form>
      </Container>
  }

  return (
    <Main component={content} />
  );
}

export default Settings;
