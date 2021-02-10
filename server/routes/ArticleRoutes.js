import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import {
  createArticle,
  fetchAllArticle,
  fetchSingleArticle,
} from '../controller/ArticleController.js';
const router = express.Router();

router.route('/').post(protect, createArticle).get(protect, fetchAllArticle);
router.route('/:articleId').get(protect, fetchSingleArticle);

export default router;
