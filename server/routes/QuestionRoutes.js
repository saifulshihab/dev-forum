import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import {
  createQuestion,
  getQuestions,
  deleteQuestion,
  editQuestion,
  answerQuestion,
  getQuestionAnswers,
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
// answer on question
router.route('/:questionId/createAnswer').post(protect, answerQuestion);
// answer on question
router.route('/getAnswers/:questionId').get(protect, getQuestionAnswers);

export default router;
