import React from 'react';
import { Spinner as Loading, Container } from 'react-bootstrap';


function Spinner(props) {

  let style = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '50px'
  }

  if (props.whole) {
    style = {
      height: 'calc(100vh - 60px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }

  return (
    <Container style={style}>
      <Loading className="mr-3" animation="border" /> Loading...
    </Container>
  );
}

export default Spinner;