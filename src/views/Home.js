import React, { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Container } from 'react-bootstrap';
import { CgSmileNone } from "react-icons/cg";

import Main from './Main';
import Spinner from '../components/Spinner';
import NewsfeedPost from '../components/NewsfeedPost';
import CreatePost from '../components/CreatePost';
import { BACKEND_URL } from '../utils/constants';

function Home() {
  useEffect(() => { document.title = "SRZtagram"; }, [])
  const profileID = useSelector(state => state.currentUser.profile);
  let content = null;
  let subcontent = null;
  const isRendered = useRef(true);
  const [feed, setFeed] = useState({ loading: true, data: null, error: false });

  const url = `${BACKEND_URL}/api/posts/newsfeed/${profileID}`;

  useEffect(() => {
    setFeed({ loading: true, data: null, error: false })
    axios.get(url)
      .then((response) => {
        if (isRendered.current) {
          setFeed({ loading: false, data: response.data, error: false });
        }
      })
      .catch(() => setFeed({ loading: false, data: null, error: true }))

    return () => isRendered.current = false;
  }, [url])

  if (feed.loading) subcontent = <Spinner />;

  if (feed.data) {
    if (feed.data.length) {
      subcontent = feed.data.map((feed, key) =>
        <NewsfeedPost key={key} post={feed} />)
    } else {
      subcontent =
        <Container className="text-center mt-5">
          <CgSmileNone style={{ fontSize: '30px' }} />
          <p className="mt-2 mb-0">
            No posts found. Follow a user or add a post!
          </p>
        </Container>
    }
  }

  content =
    <div>
      <CreatePost />
      {subcontent}
    </div>

  return (
    <Main component={content} />
  );
}

export default Home;
