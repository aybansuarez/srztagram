import React, { useState, useEffect, useRef } from 'react';
import { NavLink, matchPath, useLocation, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import axios from 'axios';
import Main from '../Main';
import ChatBox from '../../components/ChatBox';
import defaultLogo from '../../assets/default_avatar.png';
import { BACKEND_URL } from '../../utils/constants'

import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import { messageStyle } from './styles';

function Message() {
  const { id } = useParams();
  const [chats, setChats] = useState(null);
  const [chatID, setChatID] = useState(id);
  const [currentProfile, setCurrentProfile] = useState(null);
  const profileID = useSelector(state => state.currentUser.profile);
  const isLoggedIn = useSelector(state => state.isLoggedIn);
  const location = useLocation();
  const isRendered = useRef(false);

  const style = messageStyle();

  const matchMessages = matchPath(location.pathname, {
    path: '/messages', exact: true, strict: true
  })
  const matchChat = matchPath(location.pathname, {
    path: '/messages/:id', exact: true, strict: true
  })

  const url = `${BACKEND_URL}/api/messages/all/${profileID}`

  useEffect(() => {
    isRendered.current = true;
    axios.get(url)
      .then((res) => {
        if (isRendered.current) {
          res.data.forEach(chat => {
            let index = chat.profiles.map(
              (chatProfile) => { return chatProfile._id }
            ).indexOf(profileID);
            let myProfile = chat.profiles.splice(index, 1);
            setCurrentProfile(myProfile);
          });
          setChats(res.data);
        }
      })
      .catch((err) => console.log(err));
    return () => isRendered.current = false;
  }, [url, profileID])

  let content = null;

  if (chats && isLoggedIn) {
    content =
      <>
        <Grid container className={style.root}>
          {chats.map((chat, key) =>
            <Grid item key={key} className={style.chats}>
              <NavLink
                onClick={() => setChatID(chat._id)}
                to={`/messages/${chat._id}`}
                className={style.avatar}
                activeClassName='active'
              >
                <Avatar
                  alt={chat.profiles[0].username}
                  src={
                    chat.profiles[0].avatar
                      ? chat.profiles[0].avatar
                      : defaultLogo
                  }
                />
              </NavLink>
            </Grid>
          )}
        </Grid>
        {matchMessages ?
          <Grid className={style.select}>Select a chat</Grid>
          : matchChat && chatID ?
            <ChatBox chat={chatID} profile={currentProfile[0]} />
            : null}
      </>

  }

  return (
    <Main component={content} />
  );
}

export default Message;
