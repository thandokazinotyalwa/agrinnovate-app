// const express = require("express");
// const mongoose = require("mongoose");
// const authRoutes = require("./routes/auth");
// const userRoutes = require("./routes/userRoutes");
// const adminRoutes = require("./routes/adminRoutes");
// const Message = require("./models/message"); // Import your Message model
// require("dotenv").config();
// const socketIO = require("socket.io");

// const app = express();

// app.use(express.json());

// app.use("/api/auth", authRoutes);
// app.use("/api/users", userRoutes);
// app.use("/api/admin", adminRoutes);

// mongoose
//   .connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log("MongoDB connected"))
//   .catch((err) => console.log(err));

// const server = app.listen(process.env.PORT || 5000, () =>
//   console.log(`Server running on port ${PORT}`)
// );
// const io = socketIO(server);

// const messages = []; // In-memory store, consider using MongoDB for persistence

// io.on("connection", (socket) => {
//   console.log("New client connected");

//   // Send initial messages to the client
//   socket.emit("initialMessages", messages);

//   // Handle new messages
//   socket.on("newMessage", (messageData) => {
//     const newMessage = new Message(messageData); // Save to the database if needed
//     newMessage
//       .save()
//       .then((savedMessage) => {
//         messages.push(savedMessage);
//         io.emit("messageAdded", savedMessage);
//       })
//       .catch((err) => console.error(err));
//   });

//   socket.on("disconnect", () => {
//     console.log("Client disconnected");
//   });
// });

const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
const Message = require("./models/Message"); // Correct model import
require("dotenv").config();
const socketIO = require("socket.io");

const app = express();

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

const server = app.listen(process.env.PORT || 5000, () =>
  console.log(`Server running on port ${process.env.PORT || 5000}`)
);

const io = socketIO(server);

io.on("connection", (socket) => {
  console.log("New client connected");

  // Send initial messages to the client
  Message.find()
    .then((messages) => {
      socket.emit("initialMessages", messages);
    })
    .catch((err) => console.error(err));

  // Handle new messages
  socket.on("newMessage", (messageData) => {
    const newMessage = new Message(messageData); // Save to the database
    newMessage
      .save()
      .then((savedMessage) => {
        io.emit("messageAdded", savedMessage); // Emit to all clients
      })
      .catch((err) => console.error(err));
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});
