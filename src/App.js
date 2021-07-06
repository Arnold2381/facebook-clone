import { useState, useEffect } from 'react';
import {
  Button,
  FormControl,
  InputLabel,
  Input,
  IconButton,
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
  useEffect(() => {
    db.collection('messages')
      .orderBy('timestamp', 'asc')
      .onSnapshot((snapshot) =>
        setMessages(
          snapshot.docs.map((doc) => ({ id: doc.id, message: doc.data() }))
        )
      );
  }, []);

  useEffect(() => {
    setUserName(prompt('Please Enter your name'));
  }, []);
  const sendMes = (e) => {
    e.preventDefault();
    db.collection('messages').add({
      text: input,
      username: userName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    setInput('');
  };
  function add(e) {
    setInput(e.target.value);
  }
  return (
    <div className="App">
      <img
        src="https://wotline.com/static/media/logo-black.330bba59.png"
        style={{ width: '100px', marginTop: '10px' }}
      ></img>
      <h1>Wotline Chat🎊🎉</h1>
      <h1>Welcome {userName}</h1>
      <div
        style={{
          overflowY: 'auto',
          height: '400px',
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
            ></Message>
          ))}
        </FlipMove>
      </div>
      <form
        style={{
          padding: '20px',

          bottom: '0',
          position: 'fixed',
          width: '98%',
        }}
      >
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
  );
}

export default App;
