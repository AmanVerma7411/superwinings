import express from "express";
import {
  getAllUsers,
  createQuiz,
  getQuizzes,
  deleteUser,
  getQuizById,
  updateQuestion,
  deleteQuestion,
  addQuestionToQuiz,
  uploadCSV
} from "../controllers/adminController.js";
import { protect } from "../middleware/authMiddleware.js";
import { isAdmin } from "../middleware/adminMiddleware.js";
import multer from "multer";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

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
router.post("/quizzes/questions", addQuestionToQuiz);
router.put("/quizzes/:quizId/questions/:qIndex", updateQuestion);
router.delete("/quizzes/:quizId/questions/:qIndex", deleteQuestion);

// CSV upload route
router.post("/quizzes/upload-csv", upload.single("file"), uploadCSV);

export default router;
