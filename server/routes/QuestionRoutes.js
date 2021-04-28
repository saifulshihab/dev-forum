import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import {
  createQuestion,
  getQuestions,
  deleteQuestion,
  editQuestion,
} from '../controller/QuestionController.js';

const router = express.Router();

// ask/write a quesion
router.route('/createQuestion').post(protect, createQuestion);
// get all question
router.route('/getAllQuestions').get(protect, getQuestions);
// delete a question
router.route('/deleteQuestion/:questionId').delete(protect, deleteQuestion);
// edit question
router.route('/editQuestion/:questionId').put(protect, editQuestion);

export default router;
