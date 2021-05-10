import express from 'express';
import { recSignUp, recSignin } from '../controller/RecruiterController.js';

const router = express.Router();

// recruiter signup
router.route('/signup').post(recSignUp);
// recruiter signin
router.route('/signin').post(recSignin);

export default router;
