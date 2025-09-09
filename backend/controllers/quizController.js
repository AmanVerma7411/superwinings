
import Quiz from "../models/Quiz.js";


export const createQuiz = async (req, res) => {
  try {
    const { title, questions } = req.body;

    if (!title || !questions || !questions.length) {
      return res.status(400).json({ success: false, message: "Title and questions are required" });
    }

  
    const quiz = await Quiz.create({
      title,
      questions,
      createdBy: req.user._id, 
      active: true
    });

    res.status(201).json({ success: true, quiz });
  } catch (err) {
    console.error("createQuiz error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};


export const getQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find().populate("createdBy", "name email");
    res.json({ success: true, quizzes });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


export const getQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id).populate("createdBy", "name email");
    if (!quiz) return res.status(404).json({ success: false, message: "Quiz not found" });
    res.json({ success: true, quiz });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
