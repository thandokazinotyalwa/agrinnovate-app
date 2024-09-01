import React from "react";
import "./MessageList.css";

const MessageList = ({ messages }) => {
  return (
    <div className="message-list">
      {messages.map((msg, index) => (
        <div key={index} className={`message message-${index % 4}`}>
          {msg}
          <span className="emoji">😊</span>
        </div>
      ))}
    </div>
  );
};

export default MessageList;
