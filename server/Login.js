const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors"); // Import CORS

const app = express();

// Use CORS middleware
app.use(
  cors({
    origin: "http://localhost:3000", // Allow your frontend origin
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  })
);

app.use(bodyParser.json());

// Sample user data (In a real application, you'd fetch this from a database)
const users = [
  {
    username: "user@example.com",
    password: "password123",
  },
];

// Login route
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  // Find user
  const user = users.find(
    (user) => user.username === username && user.password === password
  );

  if (user) {
    // Authentication successful
    res.status(200).json({ message: "Login successful" });
  } else {
    // Authentication failed
    res.status(401).json({ message: "Invalid username or password" });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
