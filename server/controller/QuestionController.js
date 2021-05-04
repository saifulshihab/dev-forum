import asyncHandler from 'express-async-handler';
import QuestionAnswer from '../models/QuestionAnswerModel.js';
import Question from '../models/QuestionModel.js';
import _ from 'lodash';
import Developer from '../models/DeveloperModel.js';

// desc: ask/create a quesion
// routes: api/question/createQuestion
// method: POST
export const createQuestion = asyncHandler(async (req, res) => {
  const newQuestion = await Question.create({
    user: req.user?._id,
    tags: req.body.tags.reverse(),
    ...req.body,
  });
  if (newQuestion) {
    const question = await Question.findById(newQuestion?._id).populate('user');
    res.status(201).json(question);
  } else {
    res.status(500);
    throw new Error('Failed to create question!');
  }
});
// desc: fetch all questions
// routes: api/question/getAllQuestions
// method: GET
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

// desc: delete a question
// routes: api/question/deleteQuestion/:questionId
// method: DELETE
export const deleteQuestion = asyncHandler(async (req, res) => {
  const question = await Question.findById(req.params.questionId);
  if (question) {
    await question.remove();
    res.status(200).json({ status: 'Question deleted!' });
  } else {
    res.status(404);
    throw new Error('Question not found!');
  }
});
// desc: edit question
// routes: api/question/editQuestion/:questionId
// method: PUT
export const editQuestion = asyncHandler(async (req, res) => {
  const question = await Question.findById(req.params.questionId);
  if (question) {
    const update = await Question.findOneAndUpdate(
      { _id: question?._id },
      { $set: req.body },
      { new: true }
    );
    if (update) {
      res.status(200).json(update);
    } else {
      throw new Error('Failed to update question!');
    }
  } else {
    res.status(404);
    throw new Error('Question not found!');
  }
});
// desc: answer on question
// routes: api/question/:questionId/answer
// method: POST
export const answerQuestion = asyncHandler(async (req, res) => {
  const question = await Question.findById(req.params.questionId);
  if (question) {
    const { answer } = req.body;
    const newAnswer = await QuestionAnswer.create({
      question: question?._id,
      user: req.user?._id,
      answer: answer,
    });
    if (newAnswer) {
      const populated = await QuestionAnswer.findById(newAnswer?._id).populate(
        'user'
      );
      res.status(200).json(populated);
    } else {
      res.status(500);
      throw new Error('Failed to answer question!');
    }
  } else {
    res.status(404);
    throw new Error('Question not found!');
  }
});
// desc: get question answers
// routes: api/question/getAnswers/:questionId/answer
// method: POST
export const getQuestionAnswers = asyncHandler(async (req, res) => {
  const answers = await QuestionAnswer.find({
    question: req.params.questionId,
  })
    .populate('user')
    .sort({ createdAt: '-1' });
  if (answers) {
    res.status(200).json(answers);
  } else {
    res.status(404);
    throw new Error('No answers!');
  }
});
// desc: upvote answer
// routes: api/question/upvoteAnswer/:answerId
// method: PUT
// access: private
export const upvoteAnswer = asyncHandler(async (req, res) => {
  const answer = await QuestionAnswer.findById(req.params.answerId).populate([
    { path: 'upvote' },
    { path: 'user' },
  ]);
  if (answer) {
    let alreadyUpVoted = _.findIndex(answer.upvote, function (data) {
      return data.user.toString() === req.user._id.toString();
    });
    if (alreadyUpVoted > -1) {
      res.status(403);
      throw new Error('You already upvoted!');
    } else {
      let alreadyDownVoted = _.findIndex(answer.downvote, function (data) {
        return data.user.toString() === req.user._id.toString();
      });
      if (alreadyDownVoted > -1) {
        answer.downvote.splice(alreadyDownVoted, 1);
      }
      const vote = answer.upvote.push({ user: req.user._id });
      if (vote) {
        await answer.save();
        const answers = await QuestionAnswer.find({
          question: answer?.question,
        })
          .sort({ createdAt: '-1' })
          .populate('user');
        res.status(200).json(answers);
      } else {
        res.status(500);
        throw new Error('Somthing wrong! Failed to upvote!');
      }
    }
  } else {
    res.status(404);
    throw new Error('Answer not found!');
  }
});
// desc: downvote article
// routes: api/question/downvoteAnswer/:answerId
// method: PUT
// access: private
export const downvoteAnswer = asyncHandler(async (req, res) => {
  const answer = await QuestionAnswer.findById(req.params.answerId).populate([
    { path: 'downvote' },
    { path: 'user' },
  ]);
  if (answer) {
    let alreadydownVoted = _.findIndex(answer.downvote, function (data) {
      return data.user.toString() === req.user._id.toString();
    });

    if (alreadydownVoted > -1) {
      res.status(403);
      throw new Error('You already downvoted!');
    } else {
      let alreadyUpVoted = _.findIndex(answer.upvote, function (data) {
        return data.user.toString() === req.user._id.toString();
      });

      if (alreadyUpVoted > -1) {
        answer.upvote.splice(alreadyUpVoted, 1);
      }
      const vote = answer.downvote.push({ user: req.user._id });
      if (vote) {
        await answer.save();
        const answers = await QuestionAnswer.find({
          question: answer?.question,
        })
          .sort({ createdAt: '-1' })
          .populate('user');
        res.status(200).json(answers);
      } else {
        res.status(500);
        throw new Error('Somthing wrong! Failed to upvote!');
      }
    }
  } else {
    res.status(404);
    throw new Error('Answer not found!');
  }
});
// desc: get user questions
// routes: api/question/getUserQuestions/:userId
// method: GET
// access: private
export const getUserQuestions = asyncHandler(async (req, res) => {
  const user = await Developer.findById(req.params.userId);
  if (user) {
    const questions = await Question.find({ user: user?._id }).populate('user');
    if (questions) {
      res.status(200).json(questions);
    } else {
      res.status(500);
      throw new Error('Failed to fetch user questions!');
    }
  } else {
    res.status(404);
    throw new Error('User not found!');
  }
});
// desc: delete answer
// routes: api/question/deleteAnswer/:answerId
// method: DELETE
// access: private
export const deleteAnswer = asyncHandler(async (req, res) => {
  const answer = await QuestionAnswer.findById(req.params.answerId);
  if (answer) {
    if (answer?.user?.toString() === req?.user?._id.toString()) {
      await answer.remove();
      const answers = await QuestionAnswer.find({
        question: answer?.question,
      })
        .populate('user')
        .sort({ createdAt: '-1' });
      res.status(200).json(answers);
    } else {
      res.status(403);
      throw new Error('You are not authorized to perform this action!');
    }
  } else {
    res.status(404);
    throw new Error('Answer not found!');
  }
});
