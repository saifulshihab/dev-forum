import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import {
  createArticle,
  fetchAllArticle,
  fetchSingleArticle,
  getUserArticles,
  deleteArticle,
} from '../controller/ArticleController.js';
const router = express.Router();

router.route('/').post(protect, createArticle).get(protect, fetchAllArticle);
router.route('/:userId/articles').get(protect, getUserArticles);
router
  .route('/:articleId')
  .get(protect, fetchSingleArticle)
  .delete(protect, deleteArticle);

export default router;
