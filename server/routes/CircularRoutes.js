import express from 'express';
import {
  postCircular,
  deleteCircular,
  editCircular,
  getRecruiterCirculars,
} from '../controller/CircularController.js';
import { protect2 } from '../middleware/authMiddleware.js';

const router = express.Router();

// post circular by recruiter
router.route('/postCircular').post(protect2, postCircular);
// delete circular by recruiter
router.route('/deleteCircular/:circularId').delete(protect2, deleteCircular);
// edit circular by recruiter
router.route('/editCircular/:circularId').put(protect2, editCircular);
// get recruiter circulars
router
  .route('/getRecruiterCirculars/:userId')
  .get(protect2, getRecruiterCirculars);

export default router;
