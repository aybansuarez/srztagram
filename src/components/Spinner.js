import React from 'react';
import { Spinner as Loading, Container } from 'react-bootstrap';


function Spinner() {
  const spinnerStyle = {
    height: 'calc(100vh - 60px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
  return (
    <Container style={spinnerStyle}>
      <Loading className="mr-3" animation="border" /> Loading...
    </Container>
  );
}

export default Spinner;