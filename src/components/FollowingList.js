import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container } from 'react-bootstrap';
import { CgSmileNone } from "react-icons/cg";
import UserCard from './UserCard';
import backendURL from '../utils/constants';
import Spinner from './Spinner';

function FollowingList(props) {
  let content = null;
  useEffect(() => {
    const changeTitle = () => {
      document.title = `SRZtagram | ${props.profile.username} Following`;
    }
    changeTitle();
  }, [props.profile.username]);

  const [profile, setProfile] = useState({
    loading: false, data: null, error: false
  });

  const url = `${backendURL}/api/follows/get_following/${props.profile.username}`;
  useEffect(() => {
    setProfile({ loading: true, data: null, error: false })
    axios.get(url)
      .then((response) => {
        setProfile({ loading: false, data: response.data, error: false });
      })
      .catch(() => setProfile({ loading: false, data: null, error: true }))
  }, [url])

  if (profile.loading) {
    content = <Spinner />
  }
  if (profile.data) {
    content =
      <Container className="p-0">
        <Container className="d-flex flex-wrap p-0" style={{ maxWidth: '800px' }}>
          {profile.data.following.length ? profile.data.following.map((following, key) =>
            <UserCard key={key} user={following} />
          ) :
            <Container className="text-center mt-5">
              <CgSmileNone style={{ fontSize: '30px' }} />
              <p className="mt-2 mb-0">No following yet.</p>
            </Container>
          }
        </Container>
      </Container>
  }
  return content;
}

export default FollowingList;