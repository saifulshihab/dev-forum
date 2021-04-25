import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { createQuestion } from '../controller/QuestionController.js';

const router = express.Router();

// ask/write a quesion
router.route('/createQuestion').post(protect, createQuestion);
export default router;
