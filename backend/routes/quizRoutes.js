// routes/quizRoutes.js
import express from "express";
import Quiz from "../models/Quiz.js";

const router = express.Router();

// GET /api/quiz - fetch all active quizzes
router.get("/", async (req, res) => {
  try {
    const quizzes = await Quiz.find({ active: true });
    res.json(quizzes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
