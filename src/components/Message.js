import React, { forwardRef } from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';
import './Message.css';
const Message = forwardRef((props, ref) => {
  const isUser = props.username === props.message.username;
  const text = isUser
    ? props.message.text
    : props.message.username === ''
    ? 'Unknown User: ' + props.message.text
    : props.message.username + ': ' + props.message.text;
  return (
    <div ref={ref} className={isUser ? 'message_user' : 'message'}>
      <Card className={isUser ? 'message_userCard' : 'message_guestCard'}>
        <CardContent>
          <Typography color="white" variants="h5" component="h2">
            {text}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
});

export default Message;
