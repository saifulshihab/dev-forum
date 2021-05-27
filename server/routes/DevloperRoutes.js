import express from 'express';
import { protect, protect2 } from '../middleware/authMiddleware.js';
import { corsWithOptions } from './cors.js';
const router = express.Router();

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
// developer profile public view
router
  .route('/user/:username/recruiterView')
  .get(protect2, getDevPublicProfile);
router.route('/user/:username').get(protect, getDevPublicProfile);

// add project
router.route('/addProject').post(protect, addProject);
// get user projects
router
  .route('/getProjects/:userId/recruiterView')
  .get(protect2, getUserProjects);
router.route('/getProjects/:userId').get(protect, getUserProjects);
// add project
// router.route('/addProject').post(protect, addProject);
// delete projectId
router.route('/deleteProject/:projectId').delete(protect, deleteProject);
// delete projectId
router.route('/editProject/:projectId').put(protect, editProject);
// get developer list
router.route('/developers/list').get(protect, getDevelopers);
// follow a person
router.route('/follow/:userId').post(protect, followOther);
// unfollow a person
router.route('/unfollow/:userId').delete(protect, unfollowOther);
// get following users
router.route('/following/:userId').get(protect, getFollowing);
// get followers
router.route('/followers/:userId').get(protect, getFollowers);
// get job circulars
router.route('/getJobCirculars/list').get(protect, getJobCirculars);
// change work status
router.route('/changeWorkStatus/:userId').put(protect, changeWorkStatus);
// reset password
router.route('/resetPasswordDev/:userId').put(protect, resetPasswordDev);
// get reset password link
router.route('/getResetPasswordLinkDev').post(getResetPasswordLinkDev);
// reset password from link
router.route('/resetPasswordFromLink/:token').post(resetPasswordFromLink);

export default router;
