import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiArrowLeft, FiLock } from 'react-icons/fi';
import { RiQuillPenFill } from 'react-icons/ri';
import { useSelector } from 'react-redux';
import axios from 'axios';
import {
  Container, Card, Form, Button, Spinner as Loading
} from 'react-bootstrap';

import Main from './Main';
import LikeButton from '../components/LikeButton';
import UnlikeButton from '../components/UnlikeButton';
import Likes from '../components/Likes';
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
  const [likesCount, setLikesCount] = useState(0);
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const onChangeComment = (e) => setComment(e.target.value);
  const onLikeClick = () => setLikesCount(likesCount + 1);
  const onUnlikeClick = () => setLikesCount(likesCount - 1);
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
        setLikesCount(response.data.likes.length);
      })
      .catch(() => setPostDetails({ loading: false, data: null, error: true }))
  }, [url])

  let content = null;

  if (postDetails.loading) content = <Spinner whole />;
  if (postDetails.error) content = <Error404 />;

  if (postDetails.data && postProfile && postComments) {
    const findFollowers = (followers, profileId) => {
      return followers.find((follower) => {
        return follower === profileId;
      })
    }
    const findLiker = (arr, profile) => {
      return arr.find((liker) => {
        return liker._id === profile;
      })
    }
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
      <div>
        {postProfile.is_private && postProfile._id !== profileID &&
          (!findFollowers(postProfile.followers, profileID)) ? (
          <Container
          className="text-center"
          style={{
            height: 'calc(100vh - 60px)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <FiLock style={{ fontSize: '30px' }} />
            <p className="mt-2 mb-0">This post is private.</p>
            {isLogged ? (
              <p>Follow to see the account's post.</p>
            ) :
              <p>
                <Link to="/">Login</Link> to see the account's post.
              </p>
            }
          </Container>
        ) : (
        <Container fluid className="mb-5 post-details-div text-white">
          <div className="py-3">
            <Link to={`/${postProfile.username}`}>
              <FiArrowLeft /> Go to {postProfile.username}'s profile
            </Link>
          </div>
          <Card className="post-details-card">
            <Card.Img variant="top" src={postDetails.data.image} />
            <Card.Body className="post-details-body border-bottom mb-2 pt-2">
              <div className="my-1 d-flex">
                <div className="col-6 p-0  align-items-center">
                  {findLiker(postDetails.data.likes, profileID) ?
                      <UnlikeButton
                        like={onLikeClick}
                        unlike={onUnlikeClick}
                        post={postDetails.data}
                        profile={profileID}
                      />
                      :
                      <LikeButton
                        like={onLikeClick}
                        unlike={onUnlikeClick}
                        post={postDetails.data}
                        profile={profileID}
                      />
                  }
                  <span onClick={handleShow} style={{ cursor: 'pointer', fontSize: '17px', marginLeft: '7px' }}>
                    {likesCount}
                  </span>
                </div>
                <div className="col text-right">
                  {postDetails.data.createdAt}
                </div>
                <Likes
                  likes={postDetails.data.likes}
                  show={show}
                  hide={handleClose}
                />
              </div>
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
              </div>
            </Card.Body>
            <Card.Body className="post-comments py-0">
              {postComments.length ? postComments.map((comment, key) =>
                <Comment key={key} comment={comment} profile={postProfile} />
              ) :
                <div className="text-muted pb-2">
                  No one posted a comment. {isLogged ? ' Add one!' : 'Login to add one!' }
                </div>
              }
              {isLogged &&
                <div className="create">
                  <div className="input-group mt-2 mb-2">
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
        )}
      </div>
  }

  return (
    <Main component={content} />
  );
}

export default PostDetails;