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
      ref: 'Developer',
    },
  },
  {
    timestamps: true,
  }
);

const UpvoteSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Developer',
    },
  },
  {
    timestamps: true,
  }
);
const DownvoteSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Developer',
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
    upvote: [UpvoteSchema],
    downvote: [DownvoteSchema],
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
