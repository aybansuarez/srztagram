import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Col, Image, Container } from 'react-bootstrap';
import { HiBadgeCheck } from "react-icons/hi";

import defaultLogo from '../assets/default_avatar.png'
import FollowButton from './FollowButton'
import UnfollowButton from './UnfollowButton'

function UserCard(props) {
  const currentProfile = useSelector(state => state.currentUser).profile;

  const findFollowers = (arr, profile) => {
    return arr.find((follower) => {
      return follower === profile;
    })
  }

  const query = props.following ? props.user.following : props.user.followers;

  return (
    <Container
      className="user-card py-2 d-flex align-items-center border-bottom"
    >
      <Col xs={1} className="p-0">
        <Link to={`/${props.user.username}`}>
          <Image
            src={props.user.avatar ? props.user.avatar : defaultLogo}
            alt={props.user.username}
            roundedCircle fluid
          />
        </Link>
      </Col>
      <Col>
        <Link to={`/${props.user.username}`}>
          <h5 className="card-title m-0">
            {props.user.username} {props.user.verified && <HiBadgeCheck />}
          </h5>
          <p className="card-text m-0">
            <small className="text-muted">{props.user.name}</small>
          </p>
        </Link>
      </Col>
      <Col xs={3} className="text-right">
        {props.user._id === currentProfile ? null :
          findFollowers(query, currentProfile) ?
            <UnfollowButton user={props.user} profile={currentProfile} />
            :
            <FollowButton user={props.user} profile={currentProfile} />
        }
      </Col>
    </Container>
  )
}

export default UserCard;
