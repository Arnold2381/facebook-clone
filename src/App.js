import { useState, useEffect } from 'react';
import {
  FormControl,
  Input,
  IconButton,
  Select,
  MenuItem,
  InputLabel,
} from '@material-ui/core';
import Message from './components/Message';
import './App.css';
import db from './firebase';
import firebase from 'firebase';
import FlipMove from 'react-flip-move';
import SendIcon from '@material-ui/icons/Send';

function App() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [userName, setUserName] = useState('');
  const [userNames, setUserNames] = useState([]);
  const [chatuser, setchatUser] = useState('None');

  useEffect(() => {
    db.collection('messages')
      .orderBy('timestamp', 'asc')
      .onSnapshot((snapshot) =>
        setMessages(
          snapshot.docs.map((doc) => ({ id: doc.id, message: doc.data() }))
        )
      );

    db.collection('users')
      .orderBy('username', 'asc')
      .onSnapshot((snapshot) =>
        setUserNames(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            user_name: doc.data(),
          }))
        )
      );
  }, []);

  useEffect(() => {
    setUserName(prompt('Please Enter your name', ''));
  }, []);

  useEffect(() => {
    const res = userNames.find((user) => user.user_name.username === userName);

    if (userName !== '' && res === undefined)
      db.collection('users').add({ username: userName });
  }, [userNames]);
  const sendMes = (e) => {
    e.preventDefault();
    db.collection('messages').add({
      text: input,
      username: userName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    setInput('');
  };
  const handleInput = (e) => {
    setchatUser(e.target.value);
  };
  function add(e) {
    setInput(e.target.value);
  }
  return (
    <div className="App" style={{ backgroundColor: '#FFF7EE ' }}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#FFFFFF',
        }}
      >
        <h1 style={{ paddingRight: '10%' }}>Welcome {userName}</h1>

        <div>
          <InputLabel htmlFor="label">Users</InputLabel>
          <Select value={chatuser} onChange={(event) => handleInput(event)}>
            <MenuItem value="None">None</MenuItem>
            {userNames.length === 0 ? (
              <MenuItem></MenuItem>
            ) : (
              userNames.map((usename) => (
                <MenuItem value={usename.user_name.username}>
                  {String(usename.user_name.username)}
                </MenuItem>
              ))
            )}
          </Select>
        </div>
      </div>

      <div
        style={{
          overflowY: 'auto',
          height: '550px',
          display: 'flex',
          flexDirection: 'column-reverse',
        }}
      >
        <FlipMove>
          {messages.map((mess) => (
            <Message
              key={mess.id}
              username={userName}
              message={mess.message}
              chatUserName={chatuser}
            ></Message>
          ))}
        </FlipMove>
      </div>

      <div
        style={{
          padding: '20px',
          bottom: '0',
          position: 'fixed',
          width: '98%',
        }}
      >
        <form>
          <FormControl style={{ display: 'flex', flexDirection: 'row' }}>
            <Input
              value={input}
              onChange={add}
              placeholder="Enter a Message"
              style={{ flex: '1' }}
            />
            <IconButton
              disabled={!input}
              onClick={sendMes}
              variant="contained"
              color="#000000"
              type="submit"
              style={{ flex: '0' }}
            >
              <SendIcon> Send Message</SendIcon>
            </IconButton>
          </FormControl>
        </form>
      </div>
    </div>
  );
}

export default App;
