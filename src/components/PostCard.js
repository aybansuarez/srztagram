import React from 'react';
import { Card } from 'react-bootstrap';

function PostCard(props) {
  const style = {
    backgroundImage: `url(${props.post.image})`,
  }

  return (
    <Card className="post-card" style={style}></Card>
  )
}

export default PostCard;