import React, { useState } from "react";
import "./styles.css";

const RealTimeChat = () => {
  const [chatMessages, setChatMessages] = useState([]);

  const sendMessage = (message) => {
    setChatMessages([...chatMessages, message]);
  };

  return (
    <div className="real-time-chat">
      <div className="chat-window">
        {chatMessages.map((msg, index) => (
          <p key={index}>{msg}</p>
        ))}
      </div>
      <input
        type="text"
        placeholder="Type a message..."
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            sendMessage(e.target.value);
            e.target.value = "";
          }
        }}
      />
    </div>
  );
};

export default RealTimeChat;
