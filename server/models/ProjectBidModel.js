import mongoose from 'mongoose';

const ProjectBidSchema = new mongoose.Schema(
  {
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project',
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Developer',
      required: true,
    },
    description: {
      type: String,
    },
    duration: {
      type: String,
    },
    budget: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const ProjectBid = mongoose.model('ProjectBid', ProjectBidSchema);
export default ProjectBid;
