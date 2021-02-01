import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import Developer from '../models/DeveloperModel.js';

const protect = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = await jwt.verify(token, process.env.JWT_SECRET);
      req.user = await Developer.findById(decoded.id).select('-password');
      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error('Not authirized! Token failed.');
    }
  }
  if (!token) {
    res.status(401);
    throw new Error('Not authorized! No Token');
  }
});

export { protect };
