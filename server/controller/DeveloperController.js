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

export { signupDeveloper, signinDeveloper };
