import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { createQuestion, getQuestions } from '../controller/QuestionController.js';

const router = express.Router();

// ask/write a quesion
router.route('/createQuestion').post(protect, createQuestion);
// get all question
router.route('/getAllQuestions').get(protect, getQuestions);

export default router;
