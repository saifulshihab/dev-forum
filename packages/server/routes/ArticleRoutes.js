import express from 'express';
import { protect, protect2 } from '../middleware/authMiddleware.js';
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
  fetchCommentArticle,
  shareArticle,
  getSharedArticle,
  deleteSharedArticle,
} from '../controller/ArticleController.js';
const router = express.Router();

router.route('/').post(protect, createArticle).get(protect, fetchAllArticle);
router.route('/:userId/articles/recruiterView').get(protect2, getUserArticles);
router.route('/:userId/articles').get(protect, getUserArticles);
router
  .route('/:articleId')
  .get(protect, fetchSingleArticle)
  .delete(protect, deleteArticle)
  .put(protect, editArticle);
router.route('/:articleId/upvote').put(protect, upvoteArticle);
router.route('/:articleId/downvote').put(protect, downvoteArticle);
router
  .route('/:articleId/comment')
  .get(protect, fetchCommentArticle)
  .post(protect, commentonArticle);
// share a article
router.route('/:articleId/share').post(protect, shareArticle);
// get shared articles
router.route('/getSharedArticle/:userId/recruiterView').get(protect2, getSharedArticle);
router.route('/getSharedArticle/:userId').get(protect, getSharedArticle);
// delete a shared article
router
  .route('/deleteSharedArticle/:sharedId')
  .delete(protect, deleteSharedArticle);

export default router;
