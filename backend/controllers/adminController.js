// controllers/adminController.js
import User from "../models/User.js";
import Quiz from "../models/Quiz.js";

// ---------------------- Users ----------------------
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password").sort({ createdAt: -1 });
    res.json({ success: true, users });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ---------------------- Quizzes ----------------------
export const createQuiz = async (req, res) => {
  try {
    const { title, questions } = req.body;

    if (!title || !questions || !questions.length) {
      return res.status(400).json({ success: false, message: "Title and questions are required" });
    }

    // Check if quiz with same title exists
    let quiz = await Quiz.findOne({ title });

    if (quiz) {
      // Append new questions to existing quiz
      quiz.questions.push(...questions);
      await quiz.save();
      return res.status(200).json({ success: true, message: "Questions added to existing quiz", quiz });
    }

    // Create new quiz if it doesn't exist
    quiz = await Quiz.create({
      title,
      questions,
      createdBy: req.user._id,
      active: true,
    });

    res.status(201).json({ success: true, message: "Quiz created", quiz });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find().sort({ createdAt: -1 });
    res.json({ success: true, quizzes });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getQuizById = async (req, res) => {
  try {
    const { quizId } = req.params;
    const quiz = await Quiz.findById(quizId);
    if (!quiz) return res.status(404).json({ success: false, message: "Quiz not found" });
    res.json({ success: true, quiz });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ---------------------- Questions ----------------------
export const updateQuestion = async (req, res) => {
  try {
    const { quizId, qIndex } = req.params;
    const { q, options, correctIndex } = req.body;
    const index = parseInt(qIndex, 10);

    if (!q || !Array.isArray(options) || typeof correctIndex !== "number") {
      return res.status(400).json({ success: false, message: "Invalid payload" });
    }

    const quiz = await Quiz.findById(quizId);
    if (!quiz) return res.status(404).json({ success: false, message: "Quiz not found" });
    if (!quiz.questions[index]) return res.status(404).json({ success: false, message: "Question not found" });

    quiz.questions[index] = { q, options, correctIndex };
    await quiz.save();

    res.json({ success: true, message: "Question updated", quiz });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const deleteQuestion = async (req, res) => {
  try {
    const { quizId, qIndex } = req.params;
    const index = parseInt(qIndex, 10);

    const quiz = await Quiz.findById(quizId);
    if (!quiz) return res.status(404).json({ success: false, message: "Quiz not found" });
    if (!quiz.questions[index]) return res.status(404).json({ success: false, message: "Question not found" });

    quiz.questions.splice(index, 1);
    await quiz.save();

    res.json({ success: true, message: "Question deleted", quiz });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const addQuestionToQuiz = async (req, res) => {
  try {
    const { quizId, q, options, correctIndex } = req.body;

    if (!quizId || !q || !Array.isArray(options) || typeof correctIndex !== "number") {
      return res.status(400).json({ success: false, message: "Invalid payload" });
    }

    const quiz = await Quiz.findById(quizId);
    if (!quiz) return res.status(404).json({ success: false, message: "Quiz not found" });

    quiz.questions.push({ q, options, correctIndex });
    await quiz.save();

    res.json({ success: true, message: "Question added to quiz", quiz });
  } catch (err) {
    console.error("addQuestionToQuiz error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};
