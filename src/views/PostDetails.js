import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { RiQuillPenFill } from 'react-icons/ri';
import { useSelector } from 'react-redux';
import axios from 'axios';
import {
  Container, Card, Form, Button, Spinner as Loading
} from 'react-bootstrap';

import Main from './Main';
import Spinner from '../components/Spinner';
import Comment from '../components/Comment';
import Error404 from '../components/404';
import backendURL from '../utils/constants';

function PostDetails() {
  const { id } = useParams();
  const { username } = useParams();
  const profileID = useSelector(state => state.currentUser.profile);
  const isLogged = useSelector(state => state.isLoggedIn);

  const genericState = { loading: false, data: null, error: false };
  const [postDetails, setPostDetails] = useState(genericState);
  const [postProfile, setPostProfile] = useState();
  const [postComments, setPostComments] = useState();
  const [comment, setComment] = useState('');
  const [createComment, setCreateComment] = useState({
    loading: false, done: false, error: false
  });

  const onChangeComment = (e) => setComment(e.target.value);

  const url = `${backendURL}/api/posts/get_post_details/${id}/u/${username}`;

  useEffect(() => {
    setPostDetails({ loading: true, data: null, error: false })
    axios.get(url)
      .then((response) => {
        const newDate = new Date(
          response.data.createdAt.slice(0, 10)).toLocaleDateString();
        response.data.createdAt = newDate;
        setPostDetails({ loading: false, data: response.data, error: false });
        setPostProfile(response.data.profile);
        setPostComments(response.data.comments);
      })
      .catch(() => setPostDetails({ loading: false, data: null, error: true }))
  }, [url])

  let content = null;

  if (postDetails.loading) content = <Spinner whole />;
  if (postDetails.error) content = <Error404 />;

  if (postDetails.data && postProfile && postComments) {

    const handlePostComment = (e) => {
      e.preventDefault();
      setCreateComment({ loading: true, done: false, error: false })
      const data = { comment: comment, profile: profileID };
      axios.post(`${backendURL}/api/comments/post_comment/${id}`,
        data, { withCredentials: true })
        .then((res) => {
          setCreateComment({ loading: false, done: true, error: false });
          postComments.push(res.data);
          setComment('');
        })
        .catch(() => {
          setCreateComment({ loading: false, done: false, error: true })
        });
    };

    content =
      <Container fluid className="mb-5 post-details-div text-white">
        <div className="py-3">
          <Link to={`/${postProfile.username}`}>
            <FiArrowLeft /> Go to {postProfile.username}'s profile
          </Link>
        </div>
        <Card className="post-details-card">
          <Card.Img variant="top" src={postDetails.data.image} />
          <Card.Body className="post-details-body border-bottom mb-2">
            <Link to={`/${postProfile.username}`}>
              <div className="d-inline font-weight-bold mr-1">
                {postProfile.username}
              </div>
            </Link>
            <span style={{ color: '#c0c0c0' }}>
              <RiQuillPenFill />
            </span>
            <div className="d-inline ml-1">
              {postDetails.data.caption}
              <span className="float-right">
                {postDetails.data.createdAt}
              </span>
            </div>
          </Card.Body>
          <Card.Body className="post-comments py-0">
            {postComments.length ? postComments.map((comment, key) =>
              <Comment key={key} comment={comment} profile={postProfile} />
            ) :
              <div className="text-muted">No one posted a comment. Add one!</div>
            }
            {isLogged &&
              <div className="create">
                <div className="input-group mt-3 mb-2">
                  <Form.Control
                    value={comment}
                    onChange={onChangeComment}
                    as="textarea"
                    rows="1"
                    placeholder="Add comment..."
                    className="border"
                  />
                  <div className="input-group-append">
                    <Button
                      onClick={handlePostComment}
                      className="create-comment"
                      disabled={comment && !createComment.loading ? false : true}
                    >
                      {createComment.loading ?
                        <Loading
                          as="span"
                          animation="border"
                          size="sm"
                          role="status"
                          aria-hidden="true"
                        />
                        : 'Comment'}
                    </Button>
                  </div>
                </div>
              </div>
            }
          </Card.Body>
        </Card>
      </Container>
  }
  return (
    <Main component={content} />
  );
}

export default PostDetails;