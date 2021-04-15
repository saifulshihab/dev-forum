import mongoose from 'mongoose';

const ShareSchema = new mongoose.Schema(
  {
    caption: {
      type: String,
    },
    article: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Article',
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

const SharedArticle = mongoose.model('SharedArticle', ShareSchema);

export default SharedArticle;
