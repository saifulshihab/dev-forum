import asyncHandler from 'express-async-handler';
import Circular from '../models/CircularModel.js';
import JobApplication from '../models/JobApplicationModel.js';
import Recruiter from '../models/RecruiterModel.js';

// desc: post circular by recruiter
// routes: api/circular/postCircular
// method: POST
export const postCircular = asyncHandler(async (req, res) => {
  const newCircular = await Circular.create({
    user: req.user?._id,
    ...req.body,
  });
  if (newCircular) {
    res.status(201).json(newCircular);
  } else {
    res.status(500);
    throw new Error('Failed to post circular!');
  }
});
// desc: delete circular by recruiter
// routes: api/circular/deleteCircular/:circularId
// method: POST
export const deleteCircular = asyncHandler(async (req, res) => {
  const circular = await Circular.findById(req.params.circularId);
  if (circular) {
    if (circular.user.equals(req.user._id)) {
      await circular.remove();
      res.status(200).json(circular);
    } else {
      res.status(403);
      throw new Error('You are not authorized to delete this!');
    }
  } else {
    res.status(404);
    throw new Error('Circular not found!');
  }
});
// desc: delete circular by recruiter
// routes: api/circular/deleteCircular/:circularId
// method: POST
export const editCircular = asyncHandler(async (req, res) => {
  const circular = await Circular.findById(req.params.circularId);
  if (circular) {
    if (circular.user.equals(req.user._id)) {
      const update = await Circular.findByIdAndUpdate(
        { _id: circular?._id },
        { $set: req.body },
        { new: true }
      );
      if (update) {
        res.status(200).json(update);
      } else {
        res.status(500);
        throw new Error('Failed to update circular!');
      }
    } else {
      res.status(403);
      throw new Error('You are not authorized to delete this!');
    }
  } else {
    res.status(404);
    throw new Error('Circular not found!');
  }
});
// desc: get recruiter circulars
// routes: api/circular/getRecruiterCirculars/:userId
// method: GET
export const getRecruiterCirculars = asyncHandler(async (req, res) => {
  const user = await Recruiter.findById(req.params.userId);
  if (user) {
    const circulars = await Circular.find({ user: user?._id });
    if (circulars) {
      res.status(200).json(circulars);
    } else {
      res.status(404);
      throw new Error('Circular not found!');
    }
  } else {
    res.status(404);
    throw new Error('User not found!');
  }
});
// desc: apply for job by developer
// routes: api/circular/sendApplication/:circularId
// method: POST
export const applyForJob = asyncHandler(async (req, res) => {
  const circular = await Circular.findById(req.params.circularId);
  if (circular) {
    const alreadyApplied = await JobApplication.find({
      circular: circular._id,
      user: req.user._id,
    });
    if (alreadyApplied.length < 1) {
      const newApplication = await JobApplication.create({
        circular: circular._id,
        user: req.user._id,
      });
      if (newApplication) {
        res.status(200).json(newApplication);
      } else {
        res.status(500);
        throw new Error('Failed to send application!');
      }
    } else {
      res.status(403);
      throw new Error('You already applied for this job!');
    }
  } else {
    res.status(404);
    throw new Error('User not found!');
  }
});
// desc: get job applicant for a circular
// routes: api/circular/getApplicants/:circularId
// method: GET
export const getApplicant = asyncHandler(async (req, res) => {
  const circular = await Circular.findById(req.params.circularId);
  if (circular) {
    const applicants = await JobApplication.find({
      circular: circular._id,
    }).populate('user');
    res.status(200).json(applicants);
  } else {
    res.status(404);
    throw new Error('User not found!');
  }
});
