import express from 'express';
import {
  createProject,
  deleteProject,
  editProject,
  getRecruiterProjects,
  getFreelanceProjects,
} from '../controller/ProjectController.js';
import { protect, protect2 } from '../middleware/authMiddleware.js';

const router = express.Router();

// post project by recruiter
router.route('/createProject').post(protect2, createProject);
// edit or delete a project
router
  .route('/:projectId')
  .put(protect2, editProject)
  .delete(protect2, deleteProject);
// get recruiter prijects
router.route('/getRecruiterProjects').get(protect2, getRecruiterProjects);
// get freelance projects by developer[all]
router.route('/getFreelanceProjects').get(protect, getFreelanceProjects);

export default router;
