import express from 'express';
const router = express.Router();
import { corsWithOptions } from './cors.js';
import cors from 'cors';
import { protect } from '../middleware/authMiddleware.js';

import {
  signupDeveloper,
  signinDeveloper,
  getDevprofile,
} from '../controller/DeveloperController.js';

router.route('/signup').post(signupDeveloper);
router.route('/signin').post(signinDeveloper);
router.route('/:username').get(protect, getDevprofile);

export default router;
