import React, { useState, useEffect, useRef } from "react";
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import io from 'socket.io-client';
import backendURL from '../utils/constants'
import { useSelector } from 'react-redux';
import defaultLogo from '../assets/default_avatar.png';
let socket;

function Chatbox(props) {
  const url = `${backendURL}/api/messages/chat/${props.chat}`
  const profileID = useSelector(state => state.currentUser.profile);

  const [messages, setMessages] = useState([])
  const [message, setMessage] = useState('')
  const [profiles, setProfiles] s = useState(null)

  const messagesEndRef = useRef('el')

  const scrollToBottom = () => {
    if (messages.length > 0) {
      messagesEndRef.current.scrollIntoView()
    }
  }

  useEffect(() => {
    socket = io(backendURL);
    axios.get(url)
      .then((res) => {
        setProfiles(res.data.profiles)
        setMessages(res.data.messages);
        scrollToBottom();
        socket.emit(
          'join',
          { profile: props.profile._id, chat: props.chat },
          () => null
        );
      })
      .catch((err) => console.log(err));

    return () => {
      socket.emit('forceDisconnect');
      socket.off();
    }
  }, [url, props.chat, props.profile._id])

  useEffect(() => {
    socket.on('message', (message) => {
      setMessages([...messages, message])
      scrollToBottom();
    })
  }, [messages])

  const sendMessage = (e) => {
    e.preventDefault();

    if (message) {
      const data = { message, profile: props.profile._id }
      axios.post(url, data, { withCredentials: true })
        .then(() => {
          socket.emit('sendMessage', { message, profile: props.profile }, () => setMessage(''));
        })
        .catch((err) => console.log(err));
    }
    scrollToBottom();
  }

  const findProfile = (arr, current) => {
    return arr.find((profile) => {
      return profile._id === current;
    })
  }


  return (
    <div className="w-100">
      {profiles && findProfile(profiles, profileID) ?
        <div>
          <div>
            {profiles.map((profile, key) =>
              <div key={key}>
                {profile._id !== profileID &&
                  <div className="username-box p-3 font-weight-bold" style={{ backgroundColor: '#183881', color: '#fff' }}>
                    {profile.name} ({profile.username})
                  </div>
                }
              </div>
            )}
          </div>
          <div className="legit-chatbox">
            {messages.length ? messages.map((message, key) =>
              <div key={key} className={message.profile._id === props.profile._id ? 'text-right' : null}>
                {message.profile._id === props.profile._id ?
                  <div className="row justify-content-end align-items-end">
                    <div className="col-8 pr-0">
                      <span className="p-2 d-inline-block" style={{ backgroundColor: '#183881', color: '#fff', borderRadius: '10px', margin: '1px' }}>{message.message}</span>
                    </div>
                    <div className="col-1 pl-0 text-center">
                      <img alt={message.profile.username} src={message.profile.avatar ? message.profile.avatar : defaultLogo} style={{ width: '38px', height: '38px', borderRadius: '50%' }} />
                    </div>
                  </div>
                  :
                  <div className="row justify-content-start align-items-end">
                    <div className="col-1 pr-0 text-center">
                      <img alt={message.profile.username} src={message.profile.avatar ? message.profile.avatar : defaultLogo} style={{ width: '38px', height: '38px', borderRadius: '50%' }} />
                    </div>
                    <div className="col-8 pl-0">
                      <span className="p-2 d-inline-block" style={{ backgroundColor: '#c0c0c0', color: '#183881', borderRadius: '10px', margin: '1px' }}>{message.message}</span>
                    </div>
                  </div>
                }
                <div ref={(el) => messagesEndRef.current = el}></div>
              </div>
            ) :
              <div className="my-5 py-5 text-muted text-center">Send a new message.</div>
            }
          </div>
          <div className="input-group mt-2 chatbox-input">
            <Form.Control
              type="text"
              value={message}
              onChange={(e) => { setMessage(e.target.value); scrollToBottom(); }}
              placeholder="Add message"
              className="border"
              onKeyPress={(e) => e.key === 'Enter' ? sendMessage(e) : null}
              style={{ borderRadius: 0 }}
            />
            <Button type="submit" onClick={(e) => sendMessage(e)} style={{ borderRadius: '0', backgroundColor: '#183881', border: 'none' }}>Send</Button>
          </div>
        </div>
        : null
      }
    </div>
  )
}

export default Chatbox;