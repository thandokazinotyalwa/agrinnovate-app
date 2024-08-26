const express = require("express");
const User = require("../models/user");
const adminAuth = require("../middleware/adminAuth");
const router = express.Router();

// Add a new user (Admin only)
router.post("/add-user", adminAuth, async (req, res) => {
  const { username, email, password, isAdmin } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: "User already exists" });

    user = new User({ username, email, password, isAdmin });
    await user.save();

    res.status(201).json({ msg: "User added successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// Delete a user (Admin only)
router.delete("/delete-user/:id", adminAuth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    await user.remove();
    res.json({ msg: "User deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

module.exports = router;
