// server/signup.js
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

// Use CORS middleware
app.use(cors());

app.use(bodyParser.json());

// Sample user data (In a real application, you would use a database)
const users = [];

// Signup route
app.post("/signup", (req, res) => {
  const { username, name, surname, phoneNumber, password, agreeTerms } =
    req.body;

  // Basic validation
  if (
    !username ||
    !name ||
    !surname ||
    !phoneNumber ||
    !password ||
    !agreeTerms
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Check if the user already exists
  const existingUser = users.find((user) => user.username === username);
  if (existingUser) {
    return res.status(409).json({ message: "User already exists" });
  }

  // Add new user to the "database"
  users.push({
    username,
    name,
    surname,
    phoneNumber,
    password, // In a real app, you should hash the password before storing it
  });

  // Respond with success
  res.status(201).json({ message: "User registered successfully" });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
