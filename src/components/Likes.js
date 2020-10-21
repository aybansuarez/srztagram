import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Modal, Col, Image } from 'react-bootstrap';
import { HiBadgeCheck } from "react-icons/hi";
import { CgSmileSad } from "react-icons/cg";

import defaultLogo from '../assets/default_avatar.png'

function ListModal(props) {
  return (
    <Modal className="like-modal" show={props.show} onHide={props.hide}>
      <Modal.Header closeButton className="py-2">
        <Modal.Title as={"h5"}>Likes</Modal.Title>
      </Modal.Header>
      <Modal.Body
        className="p-0"
        style={{ maxHeight: 'calc(100vh - 150px)', overflowY: 'auto' }}
      >
        {props.likes.length ? props.likes.map((liker, key) =>
          <Container
            key={key}
            className="like-modal-body d-flex align-items-center py-2"
            style={{ borderBottom: '1px solid #c0c0c0' }}
          >
            <Col xs={1} className="p-0">
              <Link to={`/${liker.username}`}>
                <Image
                  src={liker.avatar ? liker.avatar : defaultLogo}
                  alt={liker.username}
                  roundedCircle fluid
                />
              </Link>
            </Col>
            <Col>
              <Link to={`/${liker.username}`} style={{ color: '#183881', textDecoration: 'none' }}>
                <h5 className="card-title m-0">
                  {liker.username} {liker.verified && <HiBadgeCheck />}
                </h5>
                <p className="card-text m-0">
                  <small className="text-muted">{liker.name}</small>
                </p>
              </Link>
            </Col>
          </Container>
        ) :
          <Container className="text-center my-5">
            <CgSmileSad style={{ fontSize: '30px' }} />
            <p className="mt-2 mb-0">No likers.</p>
          </Container>
        }
      </Modal.Body>
    </Modal >
  );
}

export default ListModal;