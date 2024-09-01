import React, { useState } from "react";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import "./ChatRoom.css";

const ChatRoom = () => {
  const [messages, setMessages] = useState([]);

  const addMessage = (message) => {
    setMessages([...messages, message]);
  };

  return (
    <div className="chat-room">
      <MessageList messages={messages} />
      <MessageInput addMessage={addMessage} />
    </div>
  );
};

export default ChatRoom;
