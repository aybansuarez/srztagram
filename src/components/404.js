import React from 'react';
import { Spinner as Loading, Container } from 'react-bootstrap';

function Error404() {
  const style404 = {
    height: 'calc(100vh - 60px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }

  return (
    <Container style={style404}>
      <Loading className="mr-3" animation="grow" /> ERROR <Loading className="ml-3" animation="grow" />
    </Container>
  );
}

export default Error404;