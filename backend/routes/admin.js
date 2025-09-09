// routes/adminRoutes.js
import express from "express";
import {
  getAllUsers,
  createQuiz,
  getQuizzes,
  deleteUser,
  getQuizById,
  updateQuestion,
  deleteQuestion,
  addQuestionToQuiz // ✅ naya function import
} from "../controllers/adminController.js";
import { protect } from "../middleware/authMiddleware.js";
import { isAdmin } from "../middleware/adminMiddleware.js";

const router = express.Router();

// ✅ Middleware for authentication & admin check
router.use(protect, isAdmin);

// Users
router.get("/users", getAllUsers);
router.delete("/users/:id", deleteUser);

// Quizzes
router.post("/quizzes", createQuiz);
router.get("/quizzes", getQuizzes);
router.get("/quizzes/:quizId", getQuizById);

// Questions inside quizzes
router.post("/quizzes/questions", addQuestionToQuiz); // ✅ add question to existing quiz
router.put("/quizzes/:quizId/questions/:qIndex", updateQuestion);
router.delete("/quizzes/:quizId/questions/:qIndex", deleteQuestion);

export default router;
