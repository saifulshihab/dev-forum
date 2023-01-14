import mongoose from 'mongoose';

const JobApplicationSchema = new mongoose.Schema(
  {
    circular: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Circular',
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

const JobApplication = mongoose.model('JobApplication', JobApplicationSchema);
export default JobApplication;
