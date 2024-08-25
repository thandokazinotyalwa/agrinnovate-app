import React from "react";
import "./styles.css";

const DiscussionThread = ({ threads }) => {
  return (
    <div className="discussion-thread">
      {threads.map((thread, index) => (
        <div key={index} className="thread-card">
          <h4>{thread.title}</h4>
          <p>{thread.content}</p>
          <p>Posted by {thread.author}</p>
        </div>
      ))}
    </div>
  );
};

export default DiscussionThread;
