import React, { useEffect, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Row, Col, Form, Button, Card, Alert, Spinner as Loading } from 'react-bootstrap';
import axios from 'axios';

import { signUp } from '../actions';
import Logo from '../components/Logo';
import backendURL from '../utils/constants';

function Signup() {
  useEffect(() => { document.title = "SRZtagram | Signup"; }, [])

  const history = useHistory();
  const currentUser = useSelector(state => state.currentUser.id);
  if (currentUser) history.push('/');

  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [signingUp, setSigningUp] = useState({ loading: false, error: '' });

  const [message, setMessage] = useState({ type: '', message: '' });

  const signupSubmit = (e) => {
    e.preventDefault();
    const data = { username, password, email, name };
    setSigningUp({ loading: true, error: false });
    axios.post(
      `${backendURL}/api/auth/signup`, data, { withCredentials: true })
      .then(() => {
        dispatch(signUp());
        setSigningUp({ loading: false, error: false });
        history.push('/');
      })
      .catch((error) => {
        setMessage({ type: 'danger', message: `${error.response.data}.` })
        setSigningUp({ loading: false, error: error.response.data })
      });
  };

  return (
    <Container className="auth-container">
      <Col lg={5} md={8} className="mx-auto">
        <Card className="auth-card text-center">
          <Card.Header className="auth-card-header">
            <Logo width={'20%'} />
          </Card.Header>
          <Card.Body>
            <Form onSubmit={signupSubmit} className="mx-auto px-5">
              {message.message ? (
                <Alert variant={message.type}>
                  {message.message}
                </Alert>
              ) : null}
              <Form.Control
                onChange={(e) => setName(e.target.value)}
                className="auth-inputs my-2"
                placeholder="Name"
                type="text" required={true}
              />
              <Form.Control
                onChange={(e) => setUsername(e.target.value)}
                className="auth-inputs my-2"
                placeholder="Username"
                type="text" required={true}
              />
              <Form.Control
                onChange={(e) => setEmail(e.target.value)}
                className="auth-inputs my-2"
                placeholder="Email"
                type="email" required={true}
              />
              <Form.Control
                onChange={(e) => setPassword(e.target.value)}
                className="auth-inputs my-2"
                placeholder="Password"
                autoComplete="true"
                type="password" required={true}
              />
              <Button
                type="submit"
                className="auth-button w-100"
                disabled={signingUp.loading ? true : false}
              >
                {signingUp.loading ? (
                  <div>
                    <Loading
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                      className="mr-2"
                    /> Signing Up
                  </div>
                ) : (
                    'Sign Up'
                  )}
              </Button>
            </Form>
          </Card.Body>
          <Row className="pb-3 auth-card-footer">
            <Col>
              Already have an account? <Link to="/">Log In</Link>!
            </Col>
          </Row>
        </Card>
      </Col>
    </Container>
  );
}

export default Signup;