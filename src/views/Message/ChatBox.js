import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import io from 'socket.io-client';
import axios from 'axios';

import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import SendRoundedIcon from '@material-ui/icons/SendRounded';
import InputBase from '@material-ui/core/InputBase';
import Paper from '@material-ui/core/Paper';

import { BACKEND_URL, MESSAGES_API_URL } from '../../utils/constants'
import defaultLogo from '../../assets/default_avatar.png';
import { messageStyle } from './styles';
let socket;

function Chatbox({ chat, profile }) {
  const style = messageStyle();
  const url = `${MESSAGES_API_URL}/chat/${chat}`;
  const profileID = useSelector(state => state.currentUser).profile;

  const isRendered = useRef(false);
  const messagesEndRef = useRef('el');
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [profiles, setProfiles] = useState(null);

  const scrollToBottom = () => {
    if (messages.length > 0)
      messagesEndRef.current.scrollIntoView()
  }

  useEffect(() => {
    socket = io(BACKEND_URL);
    isRendered.current = true;
    axios.get(url)
      .then((res) => {
        if (isRendered.current)
          setProfiles(res.data.profiles);
        setMessages(res.data.messages);
        socket.emit('join', { profile: profile._id, chat }, () => null);
      })
      .catch((err) => console.log(err));

    return () => {
      isRendered.current = false;
      socket.emit('forceDisconnect');
      socket.off();
    }
  }, [url, chat, profile._id]);

  useEffect(() => {
    isRendered.current = true;
    socket.on('message', (message) => {
      if (isRendered.current) setMessages([message, ...messages]);
    });

    return () => isRendered.current = false;
  }, [messages]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (message) {
      const data = { message, profile: profile._id };
      axios.post(url, data, { withCredentials: true })
        .then(() => {
          socket.emit(
            'sendMessage', { message, profile }, () => setMessage('')
          );
        })
        .catch((err) => console.log(err));
    }
  }

  const findProfile = (arr, current) => {
    return arr.find((profile) => {
      return profile._id === current;
    });
  }

  return (
    <>
      {profiles && findProfile(profiles, profileID) ?
        <>
          {profiles.map((profile, key) =>
            <Grid key={key}>
              {profile._id !== profileID &&
                <Grid className={style.header}>
                  {profile.name} ({profile.username})
                </Grid>
              }
            </Grid>
          )}
          <Grid className={style.chatbox}>
            <Grid ref={(el) => messagesEndRef.current = el}></Grid>
            {messages.length && messages.map((message, key) =>
              <Grid key={key}>
                {message.profile._id === profile._id ?
                  <Grid container className={style.chatOne}>
                    <Grid item xs={7} sm={6} className={style.chatMessageOne}>
                      <span className={`${style.message} ${style.messageOne}`}>
                        {message.message}
                      </span>
                    </Grid>
                    <Grid item xs={2} sm={1} className={style.chatAvatar}>
                      <Avatar
                        alt={message.profile.username}
                        src={
                          message.profile.avatar
                            ? message.profile.avatar
                            : defaultLogo
                        }
                      />
                    </Grid>
                  </Grid>
                  :
                  <Grid container className={style.chatTwo}>
                    <Grid item xs={2} sm={1} className={style.chatAvatar}>
                      <Avatar
                        alt={message.profile.username}
                        src={
                          message.profile.avatar
                            ? message.profile.avatar
                            : defaultLogo
                        }
                      />
                    </Grid>
                    <Grid item xs={7} sm={6} className={style.chatMessageTwo}>
                      <span className={`${style.message} ${style.messageTwo}`}>
                        {message.message}
                      </span>
                    </Grid>
                  </Grid>
                }
              </Grid>
            )}
          </Grid>
          <Grid>
            <Paper component='form' className={style.chatForm}>
              <InputBase
                type='text'
                value={message}
                placeholder='Add Message'
                fullWidth
                className={style.input}
                onChange={(e) => {
                  setMessage(e.target.value); scrollToBottom();
                }}
                onKeyPress={(e) => e.key === 'Enter' ? sendMessage(e) : null}
              />
              <IconButton
                type='submit'
                onClick={(e) => sendMessage(e)}
                className={style.button}
              >
                <SendRoundedIcon />
              </IconButton>
            </Paper>
          </Grid>
        </>
        : null
      }
    </ >
  )
}

export default Chatbox;
