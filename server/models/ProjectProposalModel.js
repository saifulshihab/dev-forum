import mongoose from 'mongoose';

const ProjectProposalSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Developer',
      required: true,
    },
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project',
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    budget: {
      type: Number,
    },
    duration: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

const ProjectProposal = mongoose.model(
  'ProjectProposal',
  ProjectProposalSchema
);

export default ProjectProposal;
