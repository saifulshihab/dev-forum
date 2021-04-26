import asyncHandler from 'express-async-handler';
import Question from '../models/QuestionModel.js';

// desc: ask/create a quesion
// routes: api/question/createQuestion
// method: POST
// access: private
export const createQuestion = asyncHandler(async (req, res) => {
  const newQuestion = await Question.create({
    user: req.user?._id,
    ...req.body,
  });
  if (newQuestion) {
    res.status(201).json(newQuestion);
  } else {
    res.status(500);
    throw new Error('Failed to create question!');
  }
});
// desc: fetch all questions
// routes: api/question/getAllQuestions
// method: GET
// access: private
export const getQuestions = asyncHandler(async (req, res) => {
  const questions = await Question.find({})
    .populate('user')
    .sort({ createdAt: '-1' });
  if (questions) {
    res.status(200).json(questions);
  } else {
    res.status(404);
    throw new Error('Failed to fetch questions!');
  }
});
