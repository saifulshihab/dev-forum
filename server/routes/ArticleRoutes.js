import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import {
  createArticle,
  fetchAllArticle,
  fetchSingleArticle,
  getUserArticles,
  deleteArticle,
  editArticle,
  upvoteArticle,
  downvoteArticle,
  commentonArticle,
} from '../controller/ArticleController.js';
const router = express.Router();

router.route('/').post(protect, createArticle).get(protect, fetchAllArticle);
router.route('/:userId/articles').get(protect, getUserArticles);
router
  .route('/:articleId')
  .get(protect, fetchSingleArticle)
  .delete(protect, deleteArticle)
  .put(protect, editArticle);
router.route('/:articleId/upvote').put(protect, upvoteArticle);
router.route('/:articleId/downvote').put(protect, downvoteArticle);
router.route('/:articleId/comment').put(protect, commentonArticle);

export default router;
