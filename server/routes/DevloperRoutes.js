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
  getDevPublicProfile,
} from '../controller/DeveloperController.js';

router.route('/signup').post(signupDeveloper);
router.route('/signin').post(signinDeveloper);
router.route('/updateDp').put(protect, updateDevDp);
router.route('/updateCover').put(protect, updateDevCover);
router
  .route('/:userId')
  .get(protect, getDevprofile)
  .put(protect, editDevProfile);
router.route('/:userId/deleteAccount').delete(protect, delDevprofile);
router.route('/username/:username').get(protect, getDevPublicProfile);

export default router;
