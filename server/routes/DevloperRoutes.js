import express from 'express';
const router = express.Router();
import { corsWithOptions } from './cors.js';
import cors from 'cors';
import { protect } from '../middleware/authMiddleware.js';

import {
  signupDeveloper,
  signinDeveloper,
  getDevprofile,
  delDevprofile,
  editDevProfile,
  updateDevDp,
  updateDevCover,
} from '../controller/DeveloperController.js';

router.route('/signup').post(signupDeveloper);
router.route('/signin').post(signinDeveloper);
router.route('/updateDp').put(protect, updateDevDp);
router.route('/updateCover').put(protect, updateDevCover);
router
  .route('/:username')
  .get(protect, getDevprofile)
  .put(protect, editDevProfile);
router.route('/:username/deleteAccount').delete(protect, delDevprofile);

export default router;
