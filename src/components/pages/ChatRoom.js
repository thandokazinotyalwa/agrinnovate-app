import React, { useState, useEffect } from "react";
import "./ChatRoom.css";

function ChatRoom() {
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Fetch initial questions from the API (replace with your API endpoint)
    fetch("https://your-api-endpoint/questions")
      .then((response) => response.json())
      .then((data) => setQuestions(data))
      .catch((error) => console.error("Error fetching questions:", error));
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    // Send the new question to the API (replace with your API endpoint)
    fetch("https://your-api-endpoint/questions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        question: newQuestion,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setQuestions([...questions, data]);
        setNewQuestion("");
      })
      .catch((error) => console.error("Error submitting question:", error));
  };

  const filteredQuestions = questions.filter((question) =>
    question.question.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="chat-room">
      <h1>QA Forum</h1>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search questions..."
        className="search-bar"
      />
      <div className="question-list">
        {filteredQuestions.map((question) => (
          <div key={question.id} className="question">
            <h2>{question.question}</h2>
            <p>Tags: {question.tags.join(", ")}</p>
            <p>Answers: {question.answers.length}</p>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={newQuestion}
          onChange={(e) => setNewQuestion(e.target.value)}
          placeholder="Ask your question"
        />
        <button type="submit">Ask</button>
      </form>
      <div className="preview-question">
        <h3>Preview:</h3>
        <p>{newQuestion}</p>
      </div>
    </div>
  );
}

export default ChatRoom;
