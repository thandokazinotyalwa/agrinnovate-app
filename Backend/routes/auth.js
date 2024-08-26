const express = require("express");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const User = require("../models/user");
const router = express.Router();
require("dotenv").config();

// Email setup
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Generate random PIN
function generatePin() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Registration route
router.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: "User already exists" });

    const pin = generatePin();
    user = new User({ username, email, password, pin });

    await user.save();

    // Send PIN to email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your PIN Code",
      text: `Your verification PIN is: ${pin}`,
    });

    res.status(201).json({ msg: "User registered, PIN sent to email" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// Login route
router.post("/login", async (req, res) => {
  const { email, password, pin } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Invalid credentials" });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    if (user.pin !== pin) return res.status(400).json({ msg: "Invalid PIN" });

    user.isVerified = true;
    await user.save();

    const payload = { userId: user._id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

module.exports = router;
