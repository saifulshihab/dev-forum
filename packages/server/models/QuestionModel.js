import mongoose from 'mongoose';

const QuestionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Developer',
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    tags: [],
  },
  {
    timestamps: true,
  }
);

const Question = mongoose.model('Question', QuestionSchema);

export default Question;
