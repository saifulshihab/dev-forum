import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import {
  createArticle,
  fetchAllArticle,
  fetchSingleArticle,
  getUserArticles,
} from '../controller/ArticleController.js';
const router = express.Router();

router.route('/').post(protect, createArticle).get(protect, fetchAllArticle);
router.route('/:userId/articles').get(protect, getUserArticles);
router.route('/:articleId').get(protect, fetchSingleArticle);

export default router;
