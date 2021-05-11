import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    technologies: [],
    duration: {
      type: Number,
      required: true,
    },
    budget: {
      type: Number,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Recruiter',
    },
  },
  {
    timestamps: true,
  }
);

const Project = mongoose.model('Project', ProjectSchema);
export default Project;
