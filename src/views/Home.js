import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Container, Card, Image, Row, Spinner as Loading } from 'react-bootstrap';
import defaultLogo from '../assets/default_avatar.png'
import { FiHeart } from 'react-icons/fi';

import Main from './Main';
import CreatePost from '../components/CreatePost';
import backendURL from '../utils/constants';

function Home() {
  useEffect(() => { document.title = "SRZtagram"; }, [])
  const profileID = useSelector(state => state.currentUser.profile);
  let content = null;

  const [feed, setFeed] = useState({ loading: true, data: null, error: false });

  const url = `${backendURL}/api/posts/newsfeed/${profileID}`;

  useEffect(() => {
    setFeed({ loading: true, data: null, error: false })
    axios.get(url)
      .then((response) => {
        setFeed({ loading: false, data: response.data, error: false });
      })
      .catch(() => setFeed({ loading: false, data: null, error: true }))
  }, [url])

  content =
    <div>
      <CreatePost />
      {feed.loading && <Loading />}
      {feed.data && feed.data.map((feed, key) =>
        <Container key={key} className="py-3">
          <Card style={{ border: '1px solid #183881' }}>
            <Card.Body className="p-1" style={{ borderBottom: '1px solid #183881' }}>
              <Row className="font-weight-bold mr-1 d-flex align-items-center">
                <Link to={`/${feed.profile.username}`} className="col-xs-2 ml-4">
                  <Image
                    src={feed.profile.avatar ? feed.profile.avatar : defaultLogo}
                    style={{ border: '1px solid #c0c0c0', width: '40px', height: '40px', objectFit: 'contain' }}
                    fluid roundedCircle
                  />
                </Link>
                <Link to={`/${feed.profile.username}`} className="col-xs-5 ml-2 pr-0" style={{ color: '#000' }}>
                  {feed.profile.username}
                </Link>
              </Row>
            </Card.Body>
            <Link to={`/${feed.profile.username}/p/${feed._id}`}>
              <Card.Img variant="bottom" src={feed.image} style={{ borderRadius: '0' }} />
            </Link>
            <Card.Body className="p-1" style={{ borderTop: '1px solid #183881' }}>
              <div className="ml-2" style={{ fontSize: '14px' }}>
                <Link to={`/${feed.profile.username}`}>
                  <div className="d-inline font-weight-bold mr-1">
                    {feed.profile.username}
                  </div>
                </Link>
                <div className="d-inline ml-1">{feed.profile.comment}</div>
                <div className="d-inline float-right mr-2"><FiHeart /></div>
              </div>
            </Card.Body>
          </Card>
        </Container>
      )}
    </div>

  return (
    <Main component={content} />
  );
}

export default Home;