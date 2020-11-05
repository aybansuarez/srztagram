import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import ArrowBackRoundedIcon from '@material-ui/icons/ArrowBackRounded';
import IconButton from '@material-ui/core/IconButton';
import SendRoundedIcon from '@material-ui/icons/SendRounded';
import InputBase from '@material-ui/core/InputBase';

import Main from '../Main';
import Spinner from '../../components/Spinner';
import Comment from '../../components/Comment';
import Error404 from '../../components/404';
import NoAccess from '../../components/NoAccess';
import Post from '../../components/Post';
import { POSTS_API_URL, COMMENTS_API_URL } from '../../utils/constants';
import { findProfile } from '../../utils/helper';
import { postDetailsStyle } from './styles';

function PostDetails() {
  const { id } = useParams();
  const { username } = useParams();
  const profileID = useSelector(state => state.currentUser).profile;
  const isLoggedIn = useSelector(state => state.isLoggedIn);
  const isRendered = useRef(false);
  const style = postDetailsStyle();

  const genericState = { loading: false, data: null, error: false };
  const [postDetails, setPostDetails] = useState(genericState);
  const [postProfile, setPostProfile] = useState();
  const [postComments, setPostComments] = useState();
  const [comment, setComment] = useState('');
  const [createComment, setCreateComment] = useState(genericState);

  const onChangeComment = (e) => setComment(e.target.value);
  const url = `${POSTS_API_URL}/get_post_details/${id}/u/${username}`;

  useEffect(() => {
    setPostDetails({ loading: true, data: null, error: false });
    isRendered.current = true;
    axios.get(url)
      .then((res) => {
        const newDate = new Date(
          res.data.createdAt.slice(0, 10)
        ).toLocaleDateString();
        res.data.createdAt = newDate;
        if (isRendered.current) {
          setPostDetails({ loading: false, data: res.data, error: false });
          setPostProfile(res.data.profile);
          setPostComments(res.data.comments);
        }
      })
      .catch(() => setPostDetails({ loading: false, data: null, error: true }))

    return () => isRendered.current = false;
  }, [url])

  const handlePostComment = (e) => {
    e.preventDefault();
    setCreateComment({ loading: true, data: '', error: false })
    const data = { comment: comment, profile: profileID };
    axios.post(
      `${COMMENTS_API_URL}/post_comment/${id}`, data, { withCredentials: true }
    )
      .then((res) => {
        setCreateComment({ loading: false, data: '', error: false });
        postComments.push(res.data);
        setComment('');
      })
      .catch(() => {
        setCreateComment({ loading: false, done: false, error: true })
      });
  };

  let content = null;

  if (postDetails.loading) content = <Spinner whole />;
  if (postDetails.error) content = <Error404 />;
  if (postDetails.data && postProfile && postComments) {
    content =
      <>
        {postProfile.is_private && postProfile._id !== profileID &&
          !findProfile(postProfile.followers, profileID) ?
          <NoAccess />
          :
          <>
            <Grid className={style.header}>
              <Link to={`/${postProfile.username}`}>
                <ArrowBackRoundedIcon /> Go to {postProfile.username}'s profile
              </Link>
            </Grid>
            <Post post={postDetails.data} />
            <Paper square className={style.commentBox}>
              {postComments.length ? postComments.map((comment, key) =>
                <Comment key={key} comment={comment} />
              ) :
                <Grid style={{ display: 'flex', margin: '8px 0 0', color: '#666' }}>
                  No one posted a comment.
                  {isLoggedIn ? ' Add one!' : ' Login to add one!'}
                </Grid>
              }
              {isLoggedIn &&
                <Grid>
                  <Paper component='form' className={style.commentForm}>
                    <InputBase
                      type='text'
                      value={comment}
                      placeholder='Add Message'
                      fullWidth
                      onChange={onChangeComment}
                      className={style.input}
                    />
                    <IconButton
                      type='submit'
                      onClick={handlePostComment}
                      disabled={comment && !createComment.loading ? false : true}
                      className={style.button}
                    >
                      <SendRoundedIcon />
                    </IconButton>
                  </Paper>
                </Grid>
              }
            </Paper>
          </>
        }
      </>
  }

  return (
    <Main component={content} />
  );
}

export default PostDetails;
