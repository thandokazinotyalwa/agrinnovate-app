const express = require("express");
const mongoose = require("mongoose");
const http = require("http");
const socketIo = require("socket.io");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
const questionRoutes = require("./routes/questions"); // New import for questions
require("dotenv").config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
  },
});

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/questions", questionRoutes); // Use the questions routes

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Socket.io implementation
let questions = [];

io.on("connection", (socket) => {
  console.log("A user connected");

  // Fetch initial questions from the database
  Question.find()
    .then((initialQuestions) => {
      questions = initialQuestions;
      socket.emit("initialQuestions", questions);
    })
    .catch((err) => console.error(err));

  // Handle new question
  socket.on("newQuestion", (questionData) => {
    const question = new Question(questionData);
    question
      .save()
      .then((savedQuestion) => {
        questions.push(savedQuestion);
        io.emit("questionAdded", savedQuestion);
      })
      .catch((err) => console.error(err));
  });

  // Handle new reply
  socket.on("newReply", ({ questionId, reply }) => {
    Question.findById(questionId)
      .then((question) => {
        if (question) {
          question.answers.push(reply);
          return question.save();
        }
      })
      .then((updatedQuestion) => {
        io.emit("replyAdded", { questionId, reply });
      })
      .catch((err) => console.error(err));
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
