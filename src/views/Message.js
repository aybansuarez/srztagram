import React, { useState, useEffect } from "react";
import { NavLink, matchPath, useLocation, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import axios from 'axios';
import Main from './Main';
import ChatBox from '../components/ChatBox';
import defaultLogo from '../assets/default_avatar.png';

function Message() {
  const { id } = useParams();
  const [chats, setChats] = useState(null);
  const [chatID, setChatID] = useState(id);
  const [currentProfile, setCurrentProfile] = useState(null);
  const location = useLocation();

  const matchMessages = matchPath(location.pathname, {
    path: '/messages', exact: true, strict: true
  })

  const matchChat = matchPath(location.pathname, {
    path: '/messages/:id', exact: true, strict: true
  })

  const profileID = useSelector(state => state.currentUser.profile);
  const isLogged = useSelector(state => state.isLoggedIn);
  const url = `http://localhost:5000/api/messages/all/${profileID}`
  useEffect(() => {
    axios.get(url)
      .then((res) => {
        res.data.forEach(chat => {
          let index = chat.profiles.map(
            (chatProfile) => { return chatProfile._id }
          ).indexOf(profileID);
          let myProfile = chat.profiles.splice(index, 1);
          setCurrentProfile(myProfile);
        });
        setChats(res.data);
      })
      .catch((err) => console.log(err));
  }, [url, profileID])

  let content = null;

  if (chats) {
    if (isLogged) {
      content =
        <div>
          <div className="container d-flex border-bottom align-items-center" style={{ height: '95px', maxWidth: '800px', overflowX: 'auto', whiteSpace: 'nowrap' }}>
            {chats.map((chat, key) =>
              <div key={key} className="mr-2">
                <NavLink onClick={() => setChatID(chat._id)} to={`/messages/${chat._id}`} activeClassName="active-message">
                  <img alt={chat.profiles[0].username} src={chat.profiles[0].avatar ? chat.profiles[0].avatar : defaultLogo} style={{ cursor: 'pointer', width: '75px', height: '75px', borderRadius: '50%' }} />
                </NavLink>
              </div>
            )}
          </div>
          <div className="chat-container">
            {matchMessages ?
              <div className="text-center py-5">Select a chat</div>
              : matchChat && chatID ?
                <ChatBox chat={chatID} profile={currentProfile[0]} />
                : null}
          </div>
        </div>
    }
  }

  return (
    <Main component={content} />
  );
}

export default Message;