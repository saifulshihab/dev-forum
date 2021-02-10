import mongoose from 'mongoose';

const ArticleCommentSchema = new mongoose.Schema(
  {
    comment: {
      type: String,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Developer',
    },
  },
  {
    timestamps: true,
  }
);

const ShareSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
    },
  },
  {
    timestamps: true,
  }
);

const ArticleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    comments: [ArticleCommentSchema],
    upvote: {
      type: Number,
      default: 0,
    },
    downvote: {
      type: Number,
      default: 0,
    },
    shares: [ShareSchema],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Developer',
    },
  },
  {
    timestamps: true,
  }
);

const Article = mongoose.model('Article', ArticleSchema);

export default Article;
