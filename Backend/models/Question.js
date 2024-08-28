const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  tags: [String],
  answers: [{ type: String }],
  createdAt: { type: Date, default: Date.now },
});

const Question = mongoose.model("Question", questionSchema);

module.exports = Question;
