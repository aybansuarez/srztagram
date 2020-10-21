import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Col, Row, Image } from 'react-bootstrap';
import { FiLock, FiUnlock } from "react-icons/fi";
import { HiBadgeCheck } from "react-icons/hi";
import { useSelector } from 'react-redux';
import defaultLogo from '../assets/default_avatar.png';
import FollowButton from './FollowButton'
import UnfollowButton from './UnfollowButton'

function Banner(props) {
  const currentProfile = useSelector(state => state.currentUser).profile;
  let followingCount = 0;
  let followersCount = 0;
  for (let i = 0; i < props.profile.following.length; ++i) followingCount++;
  for (let x = 0; x < props.profile.followers.length; ++x) followersCount++;

  const findFollowers = (arr, profile) => {
    return arr.find((follower) => {
      return follower === profile;
    })
  }

  return (
    <div>
      <Container
        className="pb-4 pt-4 d-flex"
        style={{ alignItems: 'center' }}
      >
        <Col xs={5} className="text-right">
          <Image
            src={props.profile.avatar ? props.profile.avatar : defaultLogo}
            className="settings-avatar" roundedCircle
          />
        </Col>
        <Col xs={7}>
          <Row>
            <Col lg={12}>
              <h4 className="banner-details">
                {props.profile.name}&nbsp;
                {props.profile.is_private ? <FiLock /> : <FiUnlock />}
              </h4>
            </Col>
            <Col lg={12}>
              <p className="banner-details m-0">
                {props.profile.username} {props.profile.verified && <HiBadgeCheck />}
              </p>
              {props.profile.bio && <p>{props.profile.bio}</p>}
              {props.profile._id === currentProfile ? null :
                findFollowers(props.profile.followers, currentProfile) ?
                  <UnfollowButton user={props.profile} profile={currentProfile} />
                  :
                  <FollowButton user={props.profile} profile={currentProfile} />
              }
            </Col>
          </Row>
        </Col>
      </Container>
      <Container
        className="profile-details d-flex m-0 w-100 py-3 text-center"
      >
        <Col>
          <Link to={`/${props.profile.username}`}>
            <div className="font-weight-bold on-hover">Posts</div>
            <div>{props.posts.length}</div>
          </Link>
        </Col>
        <Col>
          <Link to={`/${props.profile.username}/following`}>
            <div className="font-weight-bold on-hover">Following</div>
            <div>{followingCount}</div>
          </Link>
        </Col>
        <Col>
          <Link to={`/${props.profile.username}/followers`}>
            <div className="font-weight-bold on-hover">Followers</div>
            <div>{followersCount}</div>
          </Link>
        </Col>
      </Container>
    </div>
  )
}

export default Banner;