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
  addProject,
  deleteProject,
  getUserProjects,
  editProject,
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
// add project
router.route('/addProject').post(protect, addProject);
// get user projects
router.route('/getProjects/:userId').get(protect, getUserProjects);
// add project
router.route('/addProject').post(protect, addProject);
// delete projectId
router.route('/deleteProject/:projectId').delete(protect, deleteProject);
// delete projectId
router.route('/editProject/:projectId').put(protect, editProject);

export default router;
