import path from 'path';
import fs from 'fs';
import asyncHandler from 'express-async-handler';
import { generateToken } from '../utils/generateToken.js';
import Developer from '../models/DeveloperModel.js';
import _ from 'lodash';
import DevProject from '../models/DevProjectModel.js';
import Follower from '../models/FollowerModel.js';
import Circular from '../models/CircularModel.js';
import Notification from '../models/NotificationModel.js';
import emailValidator from 'email-validator';
import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';
import { getUserNotifications } from '../utils/getUserNotifications.js';
import { createNotification } from '../utils/createNotification.js';
import { sendNotification } from '../utils/sendNotification.js';

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
    const validEmail = emailValidator.validate(email);
    if (validEmail) {
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
    } else {
      res.status(403);
      throw new Error('Invalid Email!');
    }
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
    const followers = await Follower.find({ user: user?._id }).populate(
      'follower'
    );
    const following = await Follower.find({ follower: user?._id }).populate(
      'user'
    );
    const userData = { user, followers, following };
    res.status(200).json(userData);
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
    if (user.dp !== '/server/uploads/default_dp.png') {
      fs.unlink(path.join(__dirname + user.dp), (err) => {
        if (err) {
          res.send(err);
        }
      });
    }
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
    if (user.cover !== '/server/uploads/default_dp.png') {
      fs.unlink(path.join(__dirname + user.cover), (err) => {
        if (err) {
          res.send(err);
        }
      });
    }
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
    const followers = await Follower.find({ user: user?._id }).populate(
      'follower'
    );
    const following = await Follower.find({ follower: user?._id }).populate(
      'user'
    );
    const userData = { user, followers, following };
    res.status(200).json(userData);
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

// desc: get developers
// routes: /api/dev/developers
// method: GET
const getDevelopers = asyncHandler(async (req, res) => {
  const developers = await Developer.find({});
  if (developers) {
    res.status(200).json(developers);
  } else {
    res.status(404);
    throw new Error('Developers not found!');
  }
});

// desc: follow others
// routes: /api/dev/follow/:userId
// method: POST
const followOther = asyncHandler(async (req, res) => {
  const user = await Developer.findById(req.params.userId);
  if (user) {
    const alreadyFollowed = await Follower.find({
      user: user?._id,
      follower: req.user._id,
    });
    if (alreadyFollowed.length <= 0) {
      const newFollower = await Follower.create({
        user: user?._id,
        follower: req.user?._id,
      });
      if (newFollower) {
        // create & send notification

      const {newNotification} =   await createNotification(
          req.user.full_name,
          user._id,
          'followed you!',
          'follow',
          'user',
          req.user.username
        );

        await sendNotification('newNotification', user._id, newNotification);

        res.status(200).json(newFollower);
      } else {
        res.status(500);
        throw new Error('Failed to follow!');
      }
    } else {
      res.status(403);
      throw new Error('You already followed this person!');
    }
  } else {
    res.status(404);
    throw new Error('User not found!');
  }
});
// desc: unfollow others
// routes: /api/dev/unfollow/:userId
// method: POST
const unfollowOther = asyncHandler(async (req, res) => {
  const user = await Developer.findById(req.params.userId);
  if (user) {
    const follower = await Follower.findOne({
      user: user?._id,
      follower: req.user._id,
    });
    if (follower) {
      await follower.remove();
      res.status(200).json(follower);
    } else {
      res.status(404);
      throw new Error('Follower not found!');
    }
  } else {
    res.status(404);
    throw new Error('User not found!');
  }
});
// no need anymore
// desc: get following
// routes: /api/dev/getFollowing/:userId
// method: GET
const getFollowing = asyncHandler(async (req, res) => {
  const user = await Developer.findById(req.params.userId);
  if (user) {
    const following = await Follower.find({ follower: user?._id }).populate(
      'user'
    );
    if (following) {
      res.status(200).json(following);
    } else {
      res.status(404);
      throw new Error('Follower not found!');
    }
  } else {
    res.status(404);
    throw new Error('User not found!');
  }
});
// no need anymore
// desc: get followers
// routes: /api/dev/getFollowers/:userId
// method: GET
const getFollowers = asyncHandler(async (req, res) => {
  const user = await Developer.findById(req.params.userId);
  if (user) {
    const followers = await Follower.find({ user: user?._id }).populate(
      'follower'
    );
    if (followers) {
      res.status(200).json(followers);
    } else {
      res.status(404);
      throw new Error('Follower not found!');
    }
  } else {
    res.status(404);
    throw new Error('User not found!');
  }
});
// desc:  get job circulars
// routes: /api/dev/getJobCirculars
// method: GET
const getJobCirculars = asyncHandler(async (req, res) => {
  const circulars = await Circular.find({}).sort({ createdAt: '-1' });
  if (circulars) {
    res.status(200).json(circulars);
  } else {
    res.status(404);
    throw new Error('Circilars not found!');
  }
});
// desc:  Change work status
// routes: /api/dev/changeWorkStatus/:userId
// method: PUT
const changeWorkStatus = asyncHandler(async (req, res) => {
  const user = await Developer.findById(req.params.userId);
  if (user) {
    if (user._id.equals(req.params.userId)) {
      user.workStatus = req.body.status;
      await user.save();
      res.status(200).json({ message: 'Work status updated!' });
    } else {
      res.status(403);
      throw new Error('You are not authorized to change this!');
    }
  } else {
    res.status(404);
    throw new Error('User not found!');
  }
});
// desc: Reset password (developer)
// routes: /api/dev/resetPasswordDev/:userId
// method: PUT
const resetPasswordDev = asyncHandler(async (req, res) => {
  const user = await Developer.findById(req.params.userId).select('password');
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
// desc: Get reset password link
// routes: /api/dev/getResetPasswordLinkDev/:userId
// method: PUT
const getResetPasswordLinkDev = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await Developer.findOne({ email: email });
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
    const url = `${process.env.PROD_CLIENT}/recover-password/${token}`;

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

const resetPasswordFromLink = asyncHandler(async (req, res) => {
  const { id } = jwt.verify(req.params.token, process.env.EMAIL_SECRET);
  const user = await Developer.findById(id);
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

const getNotifications = asyncHandler(async (req, res) => {
  const userId = req.params.userId;
  const { notifications } = await getUserNotifications(userId);

  if (notifications) {
    res.status(200).json(notifications);
  } else {
    res.status(500);
    throw new Error('Failed to fetch notifications! ');
  }
});

const seenNotifications = asyncHandler(async (req, res) => {
  const notifications = await Notification.find({
    toUserId: req.user._id,
    seen: false,
  });
  if (notifications) {
    notifications.forEach(async (notification) => {
      notification.seen = true;
      await notification.save();
    });

    res.status(200).json({ status: 'ok' });
  } else {
    res.status(404);
    throw new Error('Notification not found!');
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
  getDevelopers,
  followOther,
  unfollowOther,
  getFollowers,
  getFollowing,
  getJobCirculars,
  changeWorkStatus,
  resetPasswordDev,
  getResetPasswordLinkDev,
  resetPasswordFromLink,
  getNotifications,
  seenNotifications,
};
