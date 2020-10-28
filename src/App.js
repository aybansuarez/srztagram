import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Switch, Route, useLocation } from 'react-router-dom';

import Login from './views/Login';
import Signup from './views/Signup';
import Home from './views/Home';
import Profile from './views/Profile';
import PostDetails from './views/PostDetails';
import Settings from './views/Settings';
import Message from './views/Message';
import UsersList from './views/UsersList';
import Header from './components/Header';
import { authenticate } from './utils/authentication';
import { login } from './actions';

function App() {
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    const auth = async () => {
      const isAuth = await authenticate();
      if (isAuth) dispatch(login())
    }
    auth();
  }, [dispatch]);

  return (
    <>
      {location.pathname !== '/login' && location.pathname !== '/signup' &&
        <Header />
      }
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/signup' component={Signup} />
        <Route exact path='/users' component={UsersList} />
        <Route exact path='/settings' component={Settings} />
        <Route exact path='/messages' component={Message} />
        <Route exact path='/messages/:id' component={Message} />
        <Route path='/:username/p/:id' component={PostDetails} />
        <Route path='/:username/followers' component={Profile} />
        <Route path='/:username/following' component={Profile} />
        <Route path='/:username' component={Profile} />
      </Switch>
    </>
  );
}

export default App;
