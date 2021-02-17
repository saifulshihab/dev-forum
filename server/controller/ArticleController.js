import asyncHandler from 'express-async-handler';
import Article from '../models/ArticleModel.js';

// desc: create a article
// routes: api/article
// method: POST
// access: private
const createArticle = asyncHandler(async (req, res) => {
  const article = req.body;
  const newArticle = await Article.create({ user: req.user._id, ...article });
  if (newArticle) {
    res.status(200).json(newArticle);
  } else {
    res.status(500);
    throw new Error('Failed to create article!');
  }
});
// desc: fetch all articles
// routes: api/article
// method: GET
// access: private
const fetchAllArticle = asyncHandler(async (req, res) => {
  const articles = await Article.find({})
    .sort({ createdAt: '-1' })
    .populate('user');
  if (articles) {
    res.status(200).json(articles);
  } else {
    res.status(500);
    throw new Error('Failed to fetch article!');
  }
});
// desc: fetch single articles
// routes: api/article/:articleId
// method: GET
// access: private
const fetchSingleArticle = asyncHandler(async (req, res) => {
  const article = await Article.findById(req.params.articleId).populate('user');
  if (article) {
    res.status(200).json(article);
  } else {
    res.status(404);
    throw new Error('Article not found!');
  }
});
// desc: fetch single user articles
// routes: api/article/:userId/articles
// method: GET
// access: private
const getUserArticles = asyncHandler(async (req, res) => {
  const articles = await Article.find({ user: req.params.userId }).populate(
    'user'
  );
  if (articles) {
    res.status(200).json(articles);
  } else {
    res.status(404);
    throw new Error('Failed to fetch user articles!');
  }
});
// desc: delete single article by authentic user
// routes: api/article/:articleId
// method: DEL
// access: private
const deleteArticle = asyncHandler(async (req, res) => {
  const article = await Article.findById(req.params.articleId).populate('user');
  if (article) {
    if (article.user._id.toString() === req.user._id.toString()) {
      const deleteArticle = await article.remove();
      if (deleteArticle) {
        res.status(200).json({ status: 'Article deleted!' });
      } else {
        res.status(500);
        throw new Error();
      }
    } else {
      res.status(400);
      throw new Error('You are not authorized to delete this article!');
    }
  } else {
    res.status(404);
    throw new Error('Article not found!');
  }
});
// desc: edit article by authentic user
// routes: api/article/:articleId
// method: PUT
// access: private
const editArticle = asyncHandler(async (req, res) => {
  const article = await Article.findById(req.params.articleId).populate('user');
  if (article) {
    if (article.user._id.toString() === req.user._id.toString()) {
      const updateArticle = await Article.findByIdAndUpdate(
        req.params.articleId,
        { $set: req.body },
        { new: true }
      );
      if (updateArticle) {
        res.status(200).json(updateArticle);
      } else {
        res.status(500);
        throw new Error('Failed to update Article!');
      }
    } else {
      res.status(400);
      throw new Error('You are not authorized to delete this article!');
    }
  } else {
    res.status(404);
    throw new Error('Article not found!');
  }
});

export {
  createArticle,
  fetchAllArticle,
  fetchSingleArticle,
  getUserArticles,
  deleteArticle,
  editArticle,
};
