import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link, matchPath, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Container } from 'react-bootstrap';
import { FiLock } from "react-icons/fi";

import Banner from '../components/Banner';
import Spinner from '../components/Spinner';
import FollowersList from '../components/FollowersList';
import FollowingList from '../components/FollowingList';
import Error404 from './404';
import Posts from '../components/Posts';
import Main from './Main';
import backendURL from '../utils/constants';

function Profile() {
  const currentUser = useSelector(state => state.currentUser);
  const isLogged = useSelector(state => state.isLoggedIn);
  const { username } = useParams();
  const location = useLocation();

  const matchPosts = matchPath(location.pathname, {
    path: '/:username', exact: true, strict: true
  })
  const matchFollowers = matchPath(location.pathname, {
    path: '/:username/followers', exact: true, strict: true
  })
  const matchFollowing = matchPath(location.pathname, {
    path: '/:username/following', exact: true, strict: true
  })

  useEffect(() => {
    const changeTitle = () => document.title = `SRZtagram | ${username}`;
    changeTitle();
  }, [username]);

  const genericState = { loading: false, data: null, error: false };
  const [profile, setProfile] = useState(genericState);
  const [posts, setPosts] = useState(genericState);

  const url = `${backendURL}/api/profiles/${username}/`;
  let content = null;

  useEffect(() => {
    setProfile({ loading: true, data: null, error: false })
    axios.get(url)
      .then((response) => {
        setProfile({ loading: false, data: response.data, error: false });
      })
      .catch(() => setProfile({ loading: false, data: null, error: true }))
  }, [url])

  const findFollowers = (followers, profileId) => {
    return followers.find((follower) => {
      return follower === profileId;
    })
  }

  const postsUrl = `${backendURL}/api/posts/u/${username}/`;

  useEffect(() => {
    setPosts({ loading: true, data: null, error: false })
    axios.get(postsUrl)
      .then((response) => {
        setPosts({ loading: false, data: response.data, error: false })
      })
      .catch(() => setPosts({ loading: false, data: null, error: true }))
  }, [postsUrl])

  if (profile.loading) content = <Spinner />;
  if (profile.error) content = <Error404 />;

  if (profile.data && posts.data) {
    content =
      <div>
        <Banner profile={profile.data} posts={posts.data} />
        {profile.data.is_private && profile.data._id !== currentUser.profile &&
        (!findFollowers(profile.data.followers, currentUser.profile)) ? (
        <Container className="text-center mt-5">
          <FiLock style={{ fontSize: '30px' }} />
          <p className="mt-2 mb-0">This account is private.</p>
          {isLogged ? (
            <p>Follow to see the account's posts.</p>
          ) :
            <p>
              <Link to="/">Login</Link> to see the account's posts.
            </p>
          }
        </Container>
      ) : (
        matchPosts ?
          <Posts profile={profile.data} posts={posts.data} />
          : matchFollowers ?
            <FollowersList profile={profile.data} />
            : matchFollowing ?
              <FollowingList profile={profile.data} />
              : null
      )}
      </div>
  }

  return (
    <Main component={content} />
  );
}

export default Profile;