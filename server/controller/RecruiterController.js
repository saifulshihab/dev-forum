import asyncHandler from 'express-async-handler';
import Recruiter from '../models/RecruiterModel.js';
import _ from 'lodash';
import { generateToken } from '../utils/generateToken.js';

// desc: recruiter signup
// routes: api/recruiter/signup
// method: POST
export const recSignUp = asyncHandler(async (req, res) => {
  const { email, password, c_password } = req.body;
  const emailTaken = await Recruiter.findOne({ email: email });

  if (emailTaken) {
    res.status(403);
    throw new Error('User already exist with this email!');
  } else if (!_.isEqual(password, c_password)) {
    res.status(403);
    throw new Error('Confirm password does not match!');
  } else {
    const newRecruiter = await Recruiter.create(req.body);
    res.status(201).json({
      _id: newRecruiter._id,
      username: newRecruiter.username,
      token: generateToken(newRecruiter._id),
    });
  }
});
// desc: recruiter signin
// routes: api/recruiter/signin
// method: POST
export const recSignin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body)
  const user = await Recruiter.findOne({ email }).select('password');
  if (user && (await user.verifyPassword(password))) {
    res.status(200).json({
      _id: user._id,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error('Invalid Credential!');
  }
});
