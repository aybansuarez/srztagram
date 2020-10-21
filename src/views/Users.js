import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

import Spinner from '../components/Spinner';
import UserCard from '../components/UserCard';
import Error404 from '../components/404';
import Main from './Main';
import backendURL from '../utils/constants';

function Users() {
  const currentUser = useSelector(state => state.currentUser);

  const url = `${backendURL}/api/profiles/all/except/${currentUser.profile}`;
  let content = null;

  const [usersList, setUsersList] = useState({
    loading: false, data: null, error: false
  });

  useEffect(() => {
    setUsersList({ loading: true, data: null, error: false })
    axios.get(url)
      .then((response) => {
        setUsersList({ loading: false, data: response.data, error: false });
      })
      .catch(() => setUsersList({ loading: false, data: null, error: true }))
  }, [url])

  if (usersList.loading) content = <Spinner whole />;
  if (usersList.error) content = <Error404 />;

  if (usersList.data) {
    content =
      usersList.data.map((user, key) =>
        <UserCard key={key} user={user} />
      )
  }

  return (
    <Main component={content} />
  );
}

export default Users;