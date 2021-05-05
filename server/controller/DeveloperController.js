import path from 'path';
import fs from 'fs';
import asyncHandler from 'express-async-handler';
import { generateToken } from '../utils/generateToken.js';
import Developer from '../models/DeveloperModel.js';
import _ from 'lodash';
import DevProject from '../models/DevProjectModel.js';

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
    res.status(201).json({
      _id: newDeveloper._id,
      username: newDeveloper.username,
      token: generateToken(newDeveloper._id),
    });
  }
});

// desc: signin developer
// routes: api/dev/signin
// access: public
const signinDeveloper = asyncHandler(async (req, res) => {
  const { username, password } = req.body.credentials;
  const dev = await Developer.findOne({ username }).select('password');
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

// desc: get developer public profile
// routes: /api/dev/username/:username
// access: private
const getDevPublicProfile = asyncHandler(async (req, res) => {
  const user = await Developer.findOne({
    username: req.params.username,
  }).select('-password');
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404);
    throw new Error('User not found!');
  }
});
// desc: add project
// routes: /api/dev/addProject
// access: private
const addProject = asyncHandler(async (req, res) => {
  const newProject = await DevProject.create({
    user: req.user._id,
    ...req.body,
  });
  if (newProject) {
    const populated = await DevProject.findById(newProject._id).populate(
      'user'
    );
    res.status(201).json(populated);
  } else {
    res.status(500);
    throw new Error('Faild to add project!');
  }
});
// desc: get user projects
// routes: /api/dev/getUserProjects/:userId
// access: private
const getUserProjects = asyncHandler(async (req, res) => {
  const projects = await DevProject.find({ user: req.params.userId }).populate(
    'user'
  );
  if (projects) {
    res.status(200).json(projects);
  } else {
    res.status(404);
    throw new Error('Projects not found!');
  }
});
// desc: delete project
// routes: /api/dev/deleteProject/:projectId
// access: private
const deleteProject = asyncHandler(async (req, res) => {
  const project = await DevProject.findById(req.params.projectId);
  if (project) {
    if (project.user.toString() === req.user._id.toString()) {
      await project.remove();
      const projects = await DevProject.find({ user: req.user._id }).populate(
        'user'
      );
      res.status(200).json(projects);
    } else {
      res.status(403);
      throw new Error('You are not authorized to delete this!');
    }
  } else {
    res.status(404);
    throw new Error('Project not found!');
  }
});
// desc: edit project
// routes: /api/dev/editProject/:projectId
// access: private
const editProject = asyncHandler(async (req, res) => {
  const project = await DevProject.findById(req.params.projectId);
  if (project) {
    if (project.user.toString() === req.user._id.toString()) {
      const update = await DevProject.findOneAndUpdate(
        { _id: project?._id },
        { $set: req.body },
        { new: true }
      );
      if (update) {
        const projects = await DevProject.find({ user: req.user._id }).populate(
          'user'
        );
        res.status(200).json(projects);
      } else {
        res.status(500);
        throw new Error('Failed to updtae project!');
      }
    } else {
      res.status(403);
      throw new Error('You are not authorized to edit this!');
    }
  } else {
    res.status(404);
    throw new Error('Project not found!');
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
  getDevPublicProfile,
  addProject,
  getUserProjects,
  deleteProject,
  editProject,
};
