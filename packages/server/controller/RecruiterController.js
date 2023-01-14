import asyncHandler from 'express-async-handler';
import Recruiter from '../models/RecruiterModel.js';
import _ from 'lodash';
import { generateToken } from '../utils/generateToken.js';
import nodemailer from 'nodemailer';
import emailValidator from 'email-validator';
import jwt from 'jsonwebtoken';

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
    const valid_email = emailValidator.validate(email);
    if (valid_email) {
      const newRecruiter = await Recruiter.create(req.body);
      res.status(201).json({
        _id: newRecruiter._id,
        username: newRecruiter.username,
        token: generateToken(newRecruiter._id),
      });
    } else {
      res.status(403);
      throw new Error('Invalid email!');
    }
  }
});
// desc: recruiter signin
// routes: api/recruiter/signin
// method: POST
export const recSignin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
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
// desc: get profile information
// routes: api/recruiter/:userId
// method: GET
export const getRecruiterProfile = asyncHandler(async (req, res) => {
  const user = await Recruiter.findById(req.params.userId);
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404);
    throw new Error('User not found!');
  }
});
// desc: edit profile information
// routes: api/recruiter/:userId
// method: PUT
export const editRecruiterProfile = asyncHandler(async (req, res) => {
  const user = await Recruiter.findById(req.params.userId);
  if (user) {
    if (user._id.equals(req.user._id)) {
      const update = await Recruiter.findByIdAndUpdate(
        { _id: user._id },
        { $set: req.body },
        { new: true }
      );
      if (update) {
        res.status(200).json(update);
      } else {
        res.status(500);
        throw new Error('Failed to update!');
      }
    } else {
      res.status(403);
      throw new Error('You are not authorized to edit this!');
    }
  } else {
    res.status(404);
    throw new Error('User not found!');
  }
});
// desc: Get reset password link
// routes: /api/recruiter/getResetPasswordLinkRec/:userId
// method: POST
export const getResetPasswordLinkRec = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await Recruiter.findOne({ email: email });
  if (user) {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS,
      },
    });

    const token = await jwt.sign({ id: user._id }, process.env.EMAIL_SECRET, {
      expiresIn: '30min',
    });

    // const url = `http://localhost:3000/createNewPassword/${token}`;    //localhost
    const url = `${process.env.PROD_CLIENT}/recover-password-recruiter/${token}`;

    const emailSent = await transporter.sendMail({
      from: process.env.EMAIL,
      to: email,
      subject: 'Reset Password | DevForum',
      text: 'Reset your password',
      html: `<p>Please click this link to reset password. <a href="${url}">${url}</a></p>`,
    });
    if (emailSent) {
      res.status(201).json({
        status: 'Password reset email sent.',
        message: `Password reset link was sent to ${email}.`,
      });
    } else {
      res.status(403);
      throw new Error('Password reset failed, Email sending failed!');
    }
  } else {
    res.status(403);
    throw new Error('There is no account associated with this email!');
  }
});

export const resetPasswordFromLinkRec = asyncHandler(async (req, res) => {
  const { id } = jwt.verify(req.params.token, process.env.EMAIL_SECRET);
  const user = await Recruiter.findById(id);
  if (user) {
    let { newPass, conPass } = req.body;
    if (newPass === conPass) {
      user.password = newPass;
      await user.save();
      res.status(200);
      res.json({ message: 'Password reset successfully!' });
    } else {
      res.status(403);
      throw new Error('Password does not match!');
    }
  } else {
    res.status(404);
    throw new Error('User not found!');
  }
});

// desc: Reset password (recruiter)
// routes: /api/recruiter/resetPasswordRec/:userId
// method: PUT
export const resetPasswordRec = asyncHandler(async (req, res) => {
  const user = await Recruiter.findById(req.params.userId).select('password');
  if (user) {
    if (user._id.equals(req.params.userId)) {
      const { p_password, new_password, retype_new_password } = req.body;
      if (await user.verifyPassword(p_password)) {
        if (new_password === retype_new_password) {
          user.password = new_password;
          await user.save();
          res.status(200).json({ message: 'Password reset successfully!' });
        } else {
          res.status(403);
          throw new Error('New password doens not match!');
        }
      } else {
        res.status(403);
        throw new Error('Invalid Previous Password!');
      }
    } else {
      res.status(403);
      throw new Error('You are not authorized to change this!');
    }
  } else {
    res.status(404);
    throw new Error('User not found!');
  }
});
