import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';

function Main(props) {

  return (
    <Container id="main-container" fluid>
      <Row>
        <Col md={3}
          className="sidebar d-md-block d-none p-0"
        >
          <Sidebar />
        </Col>
        <Col md={3}
          className="topbar d-md-none d-block p-0"
        >
          <Topbar />
        </Col>
        <Col md={9} className="mainbar p-0">
          {props.component}
        </Col>
      </Row>
    </Container>
  );
}

export default Main;