import { Card, CardContent, Typography } from "@mui/material";
import React, { forwardRef } from "react";
import "./Message.css";

const Message = forwardRef(({ message, username, timestamp }, ref) => {
  let isUser = username === message.username;

  return (
    <div ref={ref} className={`message ${isUser && "message__user"}`}>
      <Card className={isUser ? "message__userCard" : "message__guestCard"}>
        <CardContent>
          <Typography color="" variant="h6" component="h2">
            {!isUser && `${message?.username || "Unknown User"}: `}
            {message.message}
          </Typography>
          <Typography
            className={
              isUser
                ? "message__userCard__typography"
                : "message__guestCard__typography"
            }
            sx={{ fontSize: 14 }}
            variant="body2"
            component="h3"
          >
            {timestamp}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
});

export default Message;
