import path from 'path';
import fs from 'fs';
import asyncHandler from 'express-async-handler';
import { generateToken } from '../utils/generateToken.js';
import Developer from '../models/DeveloperModel.js';
import _ from 'lodash';

// desc: developer signup
// routes: api/dev/signup
// access: public
const signupDeveloper = asyncHandler(async (req, res) => {
  const { full_name, username, email, password, c_password } = req.body.dev;

  const devExist = await Developer.findOne({ email: email });
  const devExist2 = await Developer.findOne({ username: username });
  if (devExist) {
    res.status(400);
    throw new Error('User already exist with this email!');
  } else if (devExist2) {
    res.status(400);
    throw new Error('User already exist with this username!');
  } else if (!_.isEqual(password, c_password)) {
    res.status(400);
    throw new Error('Confirm password does not match!');
  } else {
    const newDeveloper = await Developer.create({
      full_name,
      username,
      email,
      password,
    });
    res.status(201).json(newDeveloper);
  }
});

// desc: signin developer
// routes: api/dev/signin
// access: public
const signinDeveloper = asyncHandler(async (req, res) => {
  const { username, password } = req.body.credentials;
  const dev = await Developer.findOne({ username });
  if (dev && (await dev.verifyPassword(password))) {
    res.status(200).json({
      _id: dev._id,
      username: dev.username,
      token: generateToken(dev._id),
    });
  } else {
    res.status(401);
    throw new Error('Invalid Credential!');
  }
});

// desc: Fetch Developer profile data by username
// routes: api/dev/:username
// access: private
const getDevprofile = asyncHandler(async (req, res) => {
  const user = await Developer.findById(req.params.userId)
    .populate('education')
    .populate('social')
    .populate('experience');
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404);
    throw new Error('User not found!');
  }
});

// desc: Del developer profile
// routes: api/dev/:username
// access: private
const delDevprofile = asyncHandler(async (req, res) => {
  const user = await Developer.findById(req.params.userId);
  if (user) {
    if (user._id.equals(req.user._id)) {
      await user.remove();
      res.status(200).json({
        status: 'user deleted!',
      });
    } else {
      res.status(400);
      throw new Error('You are not authorized to delete this!');
    }
  } else {
    res.status(404);
    throw new Error('User not found!');
  }
});
// desc: Edit developer profile
// routes: api/dev/:username
// access: private
const editDevProfile = asyncHandler(async (req, res) => {
  const user = await Developer.findById(req.params.userId);
  if (user) {
    if (user._id.equals(req.user._id)) {
      const { email, username } = req.body;
      const devExistwEmail = await Developer.findOne({ email: email });
      if (!devExistwEmail || devExistwEmail._id.equals(user._id)) {
        const devExistwUsername = await Developer.findOne({
          username: username,
        });
        if (!devExistwUsername || devExistwUsername._id.equals(user._id)) {
          const updateProfile = await Developer.findByIdAndUpdate(
            user._id,
            { $set: req.body },
            { new: true }
          );
          if (updateProfile) {
            res.status(200).json({
              status: 'Profile updated!',
              data: updateProfile,
            });
          } else {
            res.status(500);
            throw new Error();
          }
        } else {
          res.status(500);
          throw new Error('This username is already taken!');
        }
      } else {
        res.status(400);
        throw new Error('User already exist with this email!');
      }
    } else {
      res.status(400);
      throw new Error('You are not authorized to delete this!');
    }
  } else {
    res.status(404);
    throw new Error('User not found!');
  }
});

// desc: Update developer dp
// routes: /api/dev/updateDp
// access: private
const updateDevDp = asyncHandler(async (req, res) => {
  const { dp } = req.body;
  const user = await Developer.findById(req.user._id);
  if (user) {
    const __dirname = path.resolve();
    fs.unlink(path.join(__dirname + user.dp), (err) => {
      if (err) {
        res.send(err);
      }
    });
    user.dp = dp || user.dp;
    const updatedUser = await user.save();
    if (updatedUser) {
      res.status(200).json({ status: 'Dp updated!' });
    } else {
      throw new Error();
    }
  } else {
    res.status(404);
    throw new Error('User not found!');
  }
});

// desc: Update developer cover
// routes: /api/dev/updateCover
// access: private
const updateDevCover = asyncHandler(async (req, res) => {
  const { cover } = req.body;
  const user = await Developer.findById(req.user._id);
  if (user) {
    const __dirname = path.resolve();
    fs.unlink(path.join(__dirname + user.cover), (err) => {
      if (err) {
        res.send(err);
      }
    });
    user.cover = cover || user.cover;
    const updatedUser = await user.save();
    if (updatedUser) {
      res.status(200).json({ status: 'Cover updated!' });
    } else {
      throw new Error();
    }
  } else {
    res.status(404);
    throw new Error('User not found!');
  }
});

export {
  signupDeveloper,
  signinDeveloper,
  getDevprofile,
  delDevprofile,
  editDevProfile,
  updateDevDp,
  updateDevCover,
};
