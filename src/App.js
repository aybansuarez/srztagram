import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Container } from 'react-bootstrap';

import Login from './views/Login';
import Signup from './views/Signup';
import Home from './views/Home';
import Profile from './views/Profile';
import PostDetails from './views/PostDetails';
import Settings from './views/Settings';
import Users from './views/Users';
import Header from './components/Header';

function App() {
  const isLogged = useSelector(state => state.isLoggedIn);

  const landingPage = isLogged ? Home : Login;

  return (
    <Container fluid style={{ padding: 0 }}>
      <Router>
        <Header />
        <Switch>
          <Route exact path={['/', '/login']} component={landingPage} />
          <Route exact path='/signup' component={Signup} />
          <Route exact path='/users' component={Users} />
          <Route exact path='/settings' component={Settings} />
          <Route path='/:username/p/:id' component={PostDetails} />
          <Route path='/:username/followers' component={Profile} />
          <Route path='/:username' component={Profile} />
        </Switch>
      </Router>
    </Container>
  );
}

export default App;