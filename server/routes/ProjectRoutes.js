import express from 'express';
import {
  createProject,
  deleteProject,
  editProject,
  getRecruiterProjects,
} from '../controller/ProjectController.js';
import { protect2 } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/createProject').post(protect2, createProject);
router
  .route('/:projectId')
  .put(protect2, editProject)
  .delete(protect2, deleteProject);
router.route('/getRecruiterProjects').get(protect2, getRecruiterProjects);

export default router;
