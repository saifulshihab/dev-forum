import mongoose from 'mongoose';

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
    upvote: [UpvoteSchema],
    downvote: [DownvoteSchema],
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
