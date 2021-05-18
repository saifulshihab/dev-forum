import express from 'express';
import {
  recSignUp,
  recSignin,
  getRecruiterProfile,
  editRecruiterProfile,
  resetPasswordFromLinkRec,
  getResetPasswordLinkRec, resetPasswordRec
} from '../controller/RecruiterController.js';
import { protect2 } from '../middleware/authMiddleware.js';

const router = express.Router();

// recruiter signup
router.route('/signup').post(recSignUp);
// recruiter signin
router.route('/signin').post(recSignin);
// get/edit recruiter profile
router
  .route('/:userId')
  .get(protect2, getRecruiterProfile)
  .put(protect2, editRecruiterProfile);
// reset password
router.route('/resetPasswordRec/:userId').put(protect2, resetPasswordRec);
// get reset password link
router.route('/getResetPasswordLinkRec').post(getResetPasswordLinkRec);
// reset password from link
router.route('/resetPasswordFromLinkRec/:token').post(resetPasswordFromLinkRec);

export default router;
