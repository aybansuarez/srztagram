import React, { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { Container, Card, Row, Col, Form, Button, Image, Spinner as Loading, Alert } from 'react-bootstrap';
import backendURL from '../utils/constants';

function CreatePost() {
  const history = useHistory();
  const profile = useSelector(state => state.currentUser.profile);
  const username = useSelector(state => state.currentUser.username);
  const inputFile = useRef(null);
  const [image, setImage] = useState('');
  const [caption, setCaption] = useState('');
  const [postStatus, setPostStatus] = useState({
    loading: false,
    done: false,
    error: false
  });

  const onUploadClick = () => inputFile.current.click();
  const onImageChange = (e) => previewFile(e.target.files[0]);
  const onCaptionChange = (e) => setCaption(e.target.value);
  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImage(reader.result);
    }
  }

  const createPost = (e) => {
    e.preventDefault();
    const data = { image, caption, profile };
    setPostStatus({ loading: true, done: false, error: false })
    axios.post(`${backendURL}/api/posts/create`,
      data, { withCredentials: true })
      .then((res) => {
        setPostStatus({ loading: false, done: true, error: false })
        setImage('');
        setCaption('');
        history.push(`/${username}/p/${res.data._id}`);
      })
      .catch(() => {
        setPostStatus({ loading: false, done: false, error: true })
      });
  };

  const cardStyle = { border: '.5px solid #183881', cursor: 'pointer' }
  const dFlex = "h-100 align-items-center d-flex justify-content-center";

  return (
    <Container fluid className="py-3 border-bottom">
      {postStatus.error &&
        <Alert variant="danger" className="mb-1">
          Encountered an error while posting. Please try again.
      </Alert>
      }
      <Card style={{ border: '1px solid #183881' }}>
        <Card.Body className="p-2">
          <Form onSubmit={createPost}>
            <Row>
              <Col xs={4} sm={3} className="pr-0">
                <input
                  type="file"
                  ref={inputFile}
                  onChange={onImageChange}
                  className="d-none"
                  required={true}
                />
                <Card
                  onClick={onUploadClick}
                  className={`${dFlex}`}
                  style={cardStyle}
                >
                  {image ?
                    <Image src={image} fluid
                      style={{
                        maxWidth: 'auto',
                        height: '158px',
                        objectFit: 'contain'
                      }}
                    />
                    :
                    <div
                      className={`text-center w-100 ${dFlex}`}
                      style={{ backgroundColor: '#f5f5f5' }}
                    >
                      <small style={{ color: '#b0b0b0' }}>Upload image</small>
                    </div>
                  }
                </Card>
              </Col>
              <Col>
                <Form.Control value={caption} onChange={onCaptionChange} as="textarea" rows="4" placeholder="Add caption..." className="mb-2" />
                <Button
                  type="submit"
                  className="w-100 mt-2"
                  style={{ backgroundColor: '#183881', borderColor: '#183881' }}
                  disabled={image && !postStatus.loading ? false : true}
                >
                  {postStatus.loading ?
                    <Loading
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                      className="mr-2"
                    />
                    : 'Create Post'}
                </Button>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default CreatePost;