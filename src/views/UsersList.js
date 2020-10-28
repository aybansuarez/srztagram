import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Spinner from '../components/Spinner';
import UserCard from '../components/UserCard';
import Error404 from '../components/404';
import Main from './Main';
import { BACKEND_URL } from '../utils/constants';

function Users() {
  const [searchTerm, setSearchTerm] = useState("");
  const handleChange = event => {
    setSearchTerm(event.target.value);
  };
  const url = `${BACKEND_URL}/api/profiles/search?q=${searchTerm}`;
  let content = null;

  const [usersList, setUsersList] = useState({
    loading: false, data: [], error: false
  });

  useEffect(() => {
    axios.get(url)
      .then((res) => {
        setUsersList({ loading: false, data: res.data, error: false })
      })
      .catch((err) => {
        setUsersList({ loading: false, data: [], error: true })
      })
  }, [url])

  if (usersList.loading) content = <Spinner whole />;
  if (usersList.error) content = <Error404 />;

  content =
    <div>
      <input
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={handleChange}
      />
      {usersList.data.map((user, key) =>
        <UserCard key={key} user={user} />
      )}
    </div>

  return (
    <Main component={content} />
  );
}

export default Users;
