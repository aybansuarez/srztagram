import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Card, Image, Row } from 'react-bootstrap';
import defaultLogo from '../assets/default_avatar.png'
import { useSelector } from 'react-redux';

import LikeButton from './LikeButton';
import UnlikeButton from './UnlikeButton';
import Likes from './Likes';

function NewsfeedPost(props) {
  const currentProfile = useSelector(state => state.currentUser).profile;

  const [likesCount, setLikesCount] = useState(props.post.likes.length);
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const findLiker = (arr, profile) => {
    return arr.find((liker) => {
      return liker._id === profile;
    })
  }

  const onLikeClick = () => setLikesCount(likesCount + 1);
  const onUnlikeClick = () => setLikesCount(likesCount - 1);
  const newDate = new Date(
    props.post.createdAt.slice(0, 10)
  ).toLocaleDateString();

  return (
    <Container className='py-3'>
      <Card style={{ border: '1px solid #183881' }}>
        <Card.Body
          className='p-1'
          style={{ borderBottom: '1px solid #183881' }}
        >
          <Row className='font-weight-bold mr-1 d-flex align-items-center'>
            <Link
              to={`/${props.post.profile.username}`}
              className='col-xs-2 ml-4'
            >
              <Image fluid roundedCircle
                src={props.post.profile.avatar ?
                  props.post.profile.avatar : defaultLogo}
                style={{
                  width: '40px',
                  height: '40px',
                  objectFit: 'contain',
                  border: '1px solid #c0c0c0',
                }}
              />
            </Link>
            <Link
              to={`/${props.post.profile.username}`}
              className='col-xs-5 ml-2 pr-0'
              style={{ color: '#000' }}
            >
              {props.post.profile.username}
            </Link>
            <div className='col text-right'>{newDate}</div>
          </Row>
        </Card.Body>
        <Link to={`/${props.post.profile.username}/p/${props.post._id}`}>
          <Card.Img
            variant='bottom'
            src={props.post.image}
            style={{ borderRadius: '0' }}
          />
        </Link>
        <Card.Body
          className='px-1 py-2'
          style={{ borderTop: '1px solid #183881' }}
        >
          <div className='ml-2' style={{ fontSize: '14px' }}>
            <div className='my-1 d-flex align-items-center'>
              {findLiker(props.post.likes, currentProfile) ?
                <UnlikeButton
                  like={onLikeClick}
                  unlike={onUnlikeClick}
                  post={props.post}
                  profile={currentProfile}
                />
                :
                <LikeButton
                  like={onLikeClick}
                  unlike={onUnlikeClick}
                  post={props.post}
                  profile={currentProfile}
                />
              }
              <span onClick={handleShow} style={{ cursor: 'pointer', fontSize: '17px', marginLeft: '7px' }}>
                {likesCount}
              </span>
              <Likes
                likes={props.post.likes}
                show={show}
                hide={handleClose}
              />
            </div>
            <Link to={`/${props.post.profile.username}`}>
              <div className='d-inline font-weight-bold mr-1'>
                {props.post.profile.username}
              </div>
            </Link>
            <div className='d-inline ml-1'>{props.post.caption}</div>
          </div>
        </Card.Body>
      </Card>
    </Container>
  )
}

export default NewsfeedPost;
