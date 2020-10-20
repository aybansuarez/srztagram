import React from 'react';
import { Container, Col } from 'react-bootstrap';
import { CgSmileNone } from "react-icons/cg";
import { Link } from 'react-router-dom';

import PostCard from './PostCard';

function Posts(props) {
  return (
    <Container className="p-2">
      <Container className="d-flex flex-wrap p-0">
        {props.posts.length ? props.posts.map((post, key) =>
          <Col
            key={key}
            xs={4}
            className="p-2 d-flex justify-content-around"
          >
            <Link to={`/${props.profile.username}/p/${post._id}`}>
              <PostCard post={post} />
            </Link>
          </Col>
        ) :
          <Container className="text-center mt-5">
            <CgSmileNone style={{ fontSize: '30px' }} />
            <p className="mt-2 mb-0">No posts yet.</p>
          </Container>
        }
      </Container>
    </Container>
  )
}

export default Posts;

