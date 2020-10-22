import React, { useState, useEffect } from "react";
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import io from 'socket.io-client';
import backendURL from '../utils/constants'

let socket;

function Chatbox(props) {
  const url = `http://localhost:5000/api/messages/chat/${props.chat}`

  const [messages, setMessages] = useState([])
  const [message, setMessage] = useState('')

  useEffect(() => {
    socket = io(backendURL);
    axios.get(url)
      .then((res) => {
        console.log(res.data.messages)
        setMessages(res.data.messages);
        socket.emit('join', { profile: props.profile, chat: props.chat }, () => {
          console.log('joined')
        });
      })
      .catch((err) => console.log(err));

    return () => {
      socket.emit('forceDisconnect');
      console.log('disconnected');
      socket.off();
    }
  }, [url, props.chat, props.profile])

  useEffect(() => {
    socket.on('message', (message) => {
      setMessages([...messages, message])
    })
  }, [messages])

  const sendMessage = (e) => {
    e.preventDefault();

    if (message) {
      const data = { message, profile: props.profile }
      axios.post(url, data, { withCredentials: true })
        .then(() => {
          socket.emit('sendMessage', message, () => setMessage(''))
        })
        .catch((err) => console.log(err));
    }
  }

  return (
    <div className="w-100">
      <div className="legit-chatbox">
        {messages.map((message, key) =>
          <div key={key}>
            {message.profile === props.profile ?
              <div className="text-right">{message.message}</div>
              :
              <div>{message.message}</div>
            }
          </div>
        )}
      </div>
      <div className="input-group chatbox-input">
        <Form.Control
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Add message"
          className="border"
          onKeyPress={(e) => e.key === 'Enter' ? sendMessage(e) : null}
          style={{ borderRadius: 0 }}
        />
      </div>
    </div>
  )
}

export default Chatbox;