import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import "./ChatRoom.css";

const socket = io("http://localhost:5000");

function ChatRoom() {
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // Fetch initial questions via Socket.io
    socket.on("initialQuestions", (initialQuestions) => {
      setQuestions(initialQuestions);
    });

    // Listen for newly added questions
    socket.on("questionAdded", (question) => {
      setQuestions((prevQuestions) => [...prevQuestions, question]);
    });

    // Listen for replies added to questions
    socket.on("replyAdded", ({ questionId, reply }) => {
      setQuestions((prevQuestions) =>
        prevQuestions.map((q) =>
          q._id === questionId ? { ...q, answers: [...q.answers, reply] } : q
        )
      );
    });

    return () => {
      socket.off("initialQuestions");
      socket.off("questionAdded");
      socket.off("replyAdded");
    };
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    socket.emit("newQuestion", { question: newQuestion, tags: [] });
    setNewQuestion("");
  };

  const handleSearch = (event) => {
    event.preventDefault();
    fetch(`http://localhost:5000/api/questions/search?q=${searchQuery}`)
      .then((response) => response.json())
      .then((data) => setQuestions(data))
      .catch((error) =>
        console.error("Error fetching searched questions:", error)
      );
  };

  return (
    <div className="chat-room">
      <h1>QA Forum</h1>
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for questions..."
          className="search-bar"
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>

      <div className="question-list">
        {questions.map((question) => (
          <div key={question._id} className="question">
            <div className="user-info">
              <strong>User Account: {question.user}</strong>
            </div>
            <h2>{question.question}</h2>
            <p>Tags: {question.tags.join(", ")}</p>
            <p>Answers: {question.answers.length}</p>
            <div className="answers">
              {question.answers.map((answer, index) => (
                <div key={index} className="answer">
                  {answer}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="ask-form">
        <input
          type="text"
          value={newQuestion}
          onChange={(e) => setNewQuestion(e.target.value)}
          placeholder="Ask your question"
          className="ask-bar"
        />
        <button type="submit" className="ask-button">
          Ask
        </button>
      </form>
    </div>
  );
}

export default ChatRoom;
