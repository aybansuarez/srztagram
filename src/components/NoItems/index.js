import React from 'react';

import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import SentimentDissatisfiedRoundedIcon from '@material-ui/icons/SentimentDissatisfiedRounded';

import noAccessStyle from './styles';

function NoItems({ title }) {
  const style = noAccessStyle();

  return (
    <Container className={style.root}>
      <Avatar className={style.avatar}>
        <SentimentDissatisfiedRoundedIcon />
      </Avatar>
      <Typography>No {title} yet.</Typography>
    </Container>
  );
}

export default NoItems;
