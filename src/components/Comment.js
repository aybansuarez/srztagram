import React from 'react';
import { Link } from 'react-router-dom';
import { RiQuillPenFill } from 'react-icons/ri';

function Comment(props) {
  const isAuthor = (
    props.comment.profile._id === props.profile._id
  )

  return (
    <div className="mb-2">
      <Link to={`/${props.comment.profile.username}`}>
        <div className="d-inline font-weight-bold mr-1">
          {props.comment.profile.username}
        </div>
      </Link>
      {isAuthor &&
        <span style={{ color: '#c0c0c0' }}>
          <RiQuillPenFill />
        </span>
      }
      <div className="d-inline ml-1">{props.comment.comment} </div>
    </div>
  )
}

export default Comment;
