const express = require("express");
const router = express.Router();
const Question = require("../models/Question");

// Fetch all questions
router.get("/", async (req, res) => {
  try {
    const questions = await Question.find();
    res.json(questions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Search for questions by query
router.get("/search", async (req, res) => {
  const { q } = req.query;
  try {
    const questions = await Question.find({
      question: { $regex: q, $options: "i" },
    });
    res.json(questions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Post a new question
router.post("/", async (req, res) => {
  const question = new Question({
    question: req.body.question,
    tags: req.body.tags || [],
  });

  try {
    const newQuestion = await question.save();
    res.status(201).json(newQuestion);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Add an answer to a question
router.post("/:id/answer", async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }
    question.answers.push(req.body.answer);
    await question.save();
    res.status(201).json(question);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
