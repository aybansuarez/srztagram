import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';

import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import SearchRoundedIcon from '@material-ui/icons/SearchRounded';
import InputBase from '@material-ui/core/InputBase';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import Grid from '@material-ui/core/Grid';

import ProfileItem from '../../components/ProfileItem';
import Error404 from '../../components/404';
import Main from '../Main';
import { PROFILE_API_URL } from '../../utils/constants';
import { userSearchStyle } from './styles';

function Users() {
  let content = null;
  const style = userSearchStyle();
  const isRendered = useRef(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [usersList, setUsersList] = useState({ data: null, error: false });

  const url = `${PROFILE_API_URL}/search?q=${searchTerm}`;

  const handleChange = event => setSearchTerm(event.target.value);

  useEffect(() => {
    isRendered.current = true;
    axios.get(url)
      .then((res) => {
        if (isRendered.current) {
          setUsersList({ data: res.data, error: false });
        }
      })
      .catch((err) => {
        setUsersList({ data: null, error: true });
      })

    return () => isRendered.current = false;
  }, [url])

  if (usersList.error) content = <Error404 />;
  if (usersList.data) {
    content =
      <>
        <Container maxWidth='xs' className={style.root}>
          <Paper component='form' className={style.search}>
            <InputBase
              type='text'
              placeholder='Search Srztagram'
              fullWidth
              value={searchTerm}
              onChange={handleChange}
              className={style.input}
            />
            <IconButton disabled={true}>
              <SearchRoundedIcon />
            </IconButton>
          </Paper>
        </Container>
        <List dense className={style.list}>
          {usersList.data.length
            ? (usersList.data.map((user, key) =>
              <ProfileItem key={key} profile={user} />
            ))
            :
            <Grid className={style.none}>No results found</Grid>
          }
        </List>
      </>
  }

  return (
    <Main component={content} />
  );
}

export default Users;
