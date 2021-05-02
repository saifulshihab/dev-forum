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

const AnswerSchema = new mongoose.Schema(
  {
    question: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Question',
      required: true,
    },
    answer: {
      type: String,
      required: true,
    },
    upvote: [UpvoteSchema],
    downvote: [DownvoteSchema],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Developer',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const QuestionAnswer = mongoose.model('QuestionAnswer', AnswerSchema);

export default QuestionAnswer;
