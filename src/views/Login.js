import React, { useEffect, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col, Form, Button, Card, Alert, Spinner as Loading } from 'react-bootstrap';
import axios from 'axios';

import { login, setUser, notSignUp } from '../actions';
import Logo from '../components/Logo';
import backendURL from '../utils/constants';

function Login() {
  useEffect(() => { document.title = "SRZtagram | Login"; }, [])

  const dispatch = useDispatch();
  const history = useHistory();
  const signedUp = useSelector(state => state.signedUp);

  const [loggingIn, setLoggingIn] = useState({ loading: false, error: '' });
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const loginSubmit = (e) => {
    e.preventDefault();
    const data = { username, password };
    setLoggingIn({ loading: true, error: false });
    axios.post(
      `${backendURL}/api/auth/login`, data, { withCredentials: true })
      .then(res => {
        localStorage.setItem('user', JSON.stringify(res.data));
        dispatch(login());
        dispatch(notSignUp());
        dispatch(setUser(res.data));
        setLoggingIn({ loading: false, error: false })
        history.push('/');
      })
      .catch(error => {
        setLoggingIn({ loading: false, error: error.response.data })
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
            <Form onSubmit={loginSubmit} className="mx-auto px-5">
              {loggingIn.error ? (
                <Alert variant="danger">
                  {loggingIn.error}
                </Alert>
              ) : signedUp ? (
                <Alert variant="success">
                  Signed up successfully. You may now login your account.
                </Alert>
              ) : null}
              <Form.Control
                onChange={(e) => setUsername(e.target.value)}
                className="auth-inputs my-2"
                placeholder="Username/Email"
                type="text" required={true}
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
                disabled={loggingIn.loading ? true : false}
              >
                {loggingIn.loading ? (
                  <div>
                    <Loading
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                      className="mr-2"
                    /> Logging In
                  </div>
                ) : (
                    'Log In'
                  )}
              </Button>
            </Form>
          </Card.Body>
          <Row className="pb-3 auth-card-footer">
            <Col>
              Don't have an account? <Link to="/signup">Sign Up</Link>!
            </Col>
          </Row>
        </Card>
      </Col>
    </Container>
  );
}

export default Login;