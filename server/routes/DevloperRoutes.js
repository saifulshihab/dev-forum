import express from 'express';
const router = express.Router();
import {
  signupDeveloper,
  signinDeveloper,
} from '../controller/DeveloperController.js';

router.route('/signup').post(signupDeveloper);
router.route('/signin').post(signinDeveloper);

export default router;
